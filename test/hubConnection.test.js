/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

// The connection through restarts of a real hub : a throwaway spinalhub started
// on a free port with an empty database. Runs the built dist.
//
//   SPINALHUB_BIN=/path/to/nerve-center/spinalhub npm test

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { execFile, spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const path = require('path');
const { spinalCore, FileSystem } = require('..');

const hubBinary = process.env.SPINALHUB_BIN;
const seedScript = path.join(__dirname, 'seedHub.js');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function until(condition, ms) {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > ms) return false;
    await sleep(50);
  }
  return true;
}

/** the last line a node script prints */
function runNode(script, args) {
  return new Promise((resolve, reject) =>
    execFile(process.execPath, [script, ...args.map(String)], { timeout: 60000 }, (error, stdout) =>
      error ? reject(error) : resolve(stdout.trim().split('\n').pop())
    )
  );
}

function canConnect(port) {
  return new Promise((resolve) => {
    const socket = net.connect(port, '127.0.0.1');
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
  });
}

/** distinct free ports, held together so that none is handed out twice */
async function freePorts(count) {
  const servers = await Promise.all(
    Array.from({ length: count }, () => new Promise((resolve, reject) => {
      const server = net.createServer();
      server.once('error', reject);
      server.listen(0, '127.0.0.1', () => resolve(server));
    }))
  );
  const ports = servers.map((server) => server.address().port);
  await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))));
  return ports;
}

/** a spinalhub on a free port and an empty database */
class ThrowawayHub {
  constructor(dir, port, binaryPort) {
    this.dir = dir;
    this.port = port;
    this.binaryPort = binaryPort;
    this.password = Math.random().toString(36).slice(2, 14);
    this.proc = null;
    this.disposed = false;
  }

  async start() {
    // a test that already failed may still be running : no hub after the cleanup
    if (this.disposed) throw new Error('the hub was disposed');
    fs.mkdirSync(path.join(this.dir, 'memory'), { recursive: true });
    fs.mkdirSync(path.join(this.dir, 'html'), { recursive: true });
    this.proc = spawn(
      hubBinary,
      ['-b', 'html', '--db-file', 'memory/dump.db', '--db-dir', 'memory/data.db',
        '-p', String(this.port), '-q', String(this.binaryPort), '-t', '2', '-x', this.password,
        // a dump every 2s : the dump of a young database at shutdown loses data
        '-d', '*/2 * * * * *'],
      { cwd: this.dir, stdio: 'ignore' }
    );
    const proc = this.proc;
    const startedAt = Date.now();
    while (!(await canConnect(this.port))) {
      if (proc.exitCode !== null || proc.signalCode !== null) {
        this.proc = null;
        throw new Error(`the hub exited at start (${proc.signalCode || proc.exitCode})`);
      }
      if (Date.now() - startedAt > 20000) throw new Error('the hub did not start');
      await sleep(50);
    }
  }

  /** graceful stop, waits for the process to exit ; a hub that hangs is killed */
  async stop(signal = 'SIGTERM') {
    const proc = this.proc;
    if (!proc) return;
    this.proc = null;
    // a process that already exited emits no exit event anymore
    if (proc.exitCode !== null || proc.signalCode !== null) return;
    const exited = new Promise((resolve) => proc.once('exit', resolve));
    proc.kill(signal);
    const killer = setTimeout(() => proc.kill('SIGKILL'), 20000);
    await exited;
    clearTimeout(killer);
  }

  async dispose() {
    this.disposed = true;
    await this.stop('SIGKILL');
  }

  /**
   * A restarting hub drops some of the models created during its last
   * seconds, crashes (SIGFPE) when its database is almost empty, and can lose
   * the users of a young database : the tests start from models that already
   * went through a restart. Stores them, restarts the hub, and checks they all
   * came back, waiting longer before the restart if not. Resolves with their
   * server ids, the hub stopped.
   */
  async prepare(other) {
    let problem;
    for (const wait of [5000, 15000, 30000]) {
      fs.rmSync(this.dir, { recursive: true, force: true });
      try {
        await this.start();
        const ids = JSON.parse(await runNode(seedScript, [this.port, this.password]));
        await sleep(wait);
        await this.stop();
        await this.start();
        problem = await other.checkSeed(ids);
        if (!problem) {
          await this.stop();
          return ids;
        }
      } catch (error) {
        problem = String(error);
      }
      await this.stop('SIGKILL');
      console.log(`the test hub lost data through its first restart (${problem}), trying again`);
    }
    throw new Error(`the test hub does not keep its data through a restart: ${problem}`);
  }
}

/** another program : raw requests, each on a new socket */
class OtherProgram {
  constructor(hub) {
    this.hub = hub;
  }

  post(body) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        { host: '127.0.0.1', port: this.hub.port, method: 'POST', path: '/sceen/_', agent: false },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => resolve(data));
        }
      );
      req.on('error', reject);
      req.end(body);
    });
  }

  async send(commands) {
    const answer = await this.post(`U 168 ${this.hub.password} S 0 E `);
    const session = answer.match(/_session_num = '([^']+)'/)[1];
    return this.post(`s ${session} ${commands}E `);
  }

  /** what the hub lost among the models the tests start from, '' when nothing */
  async checkSeed(ids) {
    const all = [ids.root, ids.target, ids.race, ...ids.nodes];
    const answer = await this.send(all.map((id, i) => `l ${i} ${id} `).join(''));
    const attributes = (id) => {
      const match = answer.match(new RegExp(`FSo\\[${id}\\]\\.set_attr\\(\\{([^}]*)\\}\\);`));
      return match ? [...match[1].matchAll(/"(\w+)":/g)].map((m) => m[1]).join() : '';
    };
    const problems = [];
    const missing = (answer.match(/_c\.push\(\[\d+,0,true\]\)/g) || []).length;
    if (missing) problems.push(`${missing} models missing`);
    if (attributes(ids.root) !== 'name,value,items,ptr') problems.push('the root lost attributes');
    if (attributes(ids.target) !== 'label,counter') problems.push('the target lost attributes');
    const empty = ids.nodes.filter((id) => attributes(id) !== 'value').length;
    if (empty) problems.push(`${empty} nodes lost their value`);
    return problems.join(', ');
  }

  /** the values the hub has for these Val / Str */
  async read(ids) {
    const answer = await this.send(ids.map((id, i) => `l ${i} ${id} `).join(''));
    const values = new Map();
    for (const [, id, value] of answer.matchAll(/FSo\[(\d+)\]\.set\(([^;]*)\);/g)) {
      values.set(Number(id), value.replace(/^dUriC\('(.*)'\)$/, '$1'));
    }
    return values;
  }
}

const skip = hubBinary && fs.existsSync(hubBinary) ? false : 'set SPINALHUB_BIN to a spinalhub binary to run these tests';

describe('connection through restarts of the hub', { skip, timeout: 180000 }, () => {
  let dir;
  let hub;
  let other;
  let conn;
  const realExit = process.exit;
  const exits = [];

  /** resolves once every local change left and was answered */
  async function flushed() {
    await until(
      () => conn._data_to_send.length === 0 && FileSystem._objects_to_send.size === 0 && !FileSystem._sending_data,
      10000
    );
    await sleep(300);
  }

  function reconnected(sessions) {
    return until(() => {
      const status = conn.getConnectionStatus();
      return status.state === 'connected' && status.sessionsOpened === sessions;
    }, 30000);
  }

  before(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'spinalhub-test-'));
    const [port, binaryPort] = await freePorts(2);
    hub = new ThrowawayHub(dir, port, binaryPort);
    other = new OtherProgram(hub);
    await hub.prepare(other);
    FileSystem.reconnect_max_delay = 1000;
    // giving up exits the process : the tests fail instead
    process.exit = (code) => {
      exits.push(code);
    };
  });

  after(async () => {
    process.exit = realExit;
    if (conn) conn.close();
    if (hub) await hub.dispose();
    if (dir) fs.rmSync(dir, { recursive: true, force: true });
  });

  let root;
  let target;
  let nodes;

  it('waits for a hub that is not up yet', async () => {
    conn = spinalCore.connect(`http://168:${hub.password}@127.0.0.1:${hub.port}/`);
    await sleep(2500);
    assert.equal(conn.getConnectionStatus().state, 'connecting');

    await hub.start();
    assert.ok(await until(() => conn.getConnectionStatus().state === 'connected', 10000));
    // the models prepare stored, already through a restart of the hub
    root = await spinalCore.load(conn, '/__users__/admin/reconnection');
    target = await root.ptr.load();
    const race = await spinalCore.load(conn, '/__users__/admin/race');
    nodes = await Promise.all(Array.from({ length: race.items.length }, (_, i) => race.items[i].load()));
    assert.equal(nodes.length, 500);
  });

  it('keeps its models and follows their changes again after a restart of the hub', async () => {
    const before = { root, value: root.value, item: root.items[0], target };
    await hub.stop();
    // written while the hub is down
    root.value.set(777);
    await sleep(1500);
    assert.equal(conn.getConnectionStatus().state, 'disconnected');
    await hub.start();
    assert.ok(await reconnected(2), 'a new session is opened');

    assert.equal(FileSystem._objects[root._server_id], before.root);
    assert.equal(root.value, before.value);
    assert.equal(root.items[0], before.item);
    assert.equal(FileSystem._objects[target._server_id], before.target);
    assert.equal((await other.read([root.value._server_id])).get(root.value._server_id), '777');

    await other.send(`C ${root.name._server_id} pushed `);
    assert.ok(await until(() => root.name.get() === 'pushed', 5000), 'pushed again');
    await other.send(`C ${target.counter._server_id} 42 `);
    assert.ok(await until(() => target.counter.get() === 42, 5000), 'pushed on a pointed model');
  });

  it('sends again what it changed just before the hub restarted', async () => {
    // acknowledged by the hub, which forgets it when it restarts right after
    root.value.set(888);
    await flushed();
    await hub.stop();
    await hub.start();
    assert.ok(await reconnected(3));
    await flushed();
    assert.equal((await other.read([root.value._server_id])).get(root.value._server_id), '888');
    assert.equal(root.value.get(), 888);
  });

  it('gets the changes another program made while it was away', async () => {
    await sleep(3500);
    await hub.stop();
    await hub.start();
    await other.send(`C ${root.name._server_id} changed-while-away `);
    assert.ok(await reconnected(4));
    assert.ok(await until(() => root.name.get() === 'changed-while-away', 5000));
  });

  it('loses none of the changes made while it loads its models back', async () => {
    const written = new Map();
    let seq = 1;
    let writing = true;
    let writerError;
    const writer = (async () => {
      while (writing) {
        for (let k = 0; k < 10; k++) {
          const node = nodes[Math.floor(Math.random() * nodes.length)];
          // a model the hub lost with its last restart has no value anymore
          if (!node.value) continue;
          node.value.set(1000000 + seq);
          written.set(node, 1000000 + seq++);
        }
        await sleep(5);
      }
    })().catch((error) => {
      writerError = error;
    });
    await sleep(1000);
    await hub.stop();
    await sleep(500);
    await hub.start();
    assert.ok(await reconnected(5));
    await sleep(1000);
    writing = false;
    await writer;
    assert.equal(writerError, undefined);
    await flushed();

    const ids = [...written.keys()].map((node) => node.value._server_id);
    const onHub = await other.read(ids);
    const wrong = [...written].filter(
      ([node, value]) => node.value.get() !== value || onHub.get(node.value._server_id) !== String(value)
    );
    assert.equal(wrong.length, 0, `${wrong.length}/${written.size} models differ between the program, its memory and the hub`);
  });

  it('never gave up', () => {
    assert.deepEqual(exits, []);
  });
});
