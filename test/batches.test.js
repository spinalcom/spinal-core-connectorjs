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

// The batches of changes sent to a real hub, through a proxy that can delay or refuse them : a throwaway
// spinalhub started on a free port with an empty database. Runs the built dist.
//
//   SPINALHUB_BIN=/path/to/nerve-center/spinalhub npm test

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const net = require('net');
const os = require('os');
const path = require('path');
const { spinalCore, FileSystem, Model, Lst, Ptr, Str, TypedArray_Float64 } = require('..');

const hubBinary = process.env.SPINALHUB_BIN;
const skip = hubBinary && fs.existsSync(hubBinary) ? false : 'set SPINALHUB_BIN to a spinalhub binary to run these tests';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const PASSWORD = 'batches_test_admin';

async function until(condition, ms) {
  const start = Date.now();
  while (!condition()) {
    if (Date.now() - start > ms) return false;
    await sleep(50);
  }
  return true;
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

/** between the connector and the hub : records the bodies of the POSTs, delays or refuses them */
function startProxy(hubPort) {
  const proxy = { posts: [], delayMs: 0, maxBody: Infinity };
  proxy.server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      const post = req.method === 'POST' ? { body: body.toString(), status: null } : null;
      if (post) proxy.posts.push(post);
      if (post && body.length > proxy.maxBody) {
        post.status = 413;
        res.writeHead(413, { 'Content-Type': 'text/html' });
        return res.end('<html><body><h1>413 Request Entity Too Large</h1></body></html>');
      }
      const delay = post ? proxy.delayMs : 0;
      const up = http.request(
        { host: '127.0.0.1', port: hubPort, method: req.method, path: req.url, headers: req.headers },
        (hubRes) => {
          const answer = [];
          hubRes.on('data', (c) => answer.push(c));
          hubRes.on('end', () =>
            setTimeout(() => {
              if (post) post.status = hubRes.statusCode;
              if (res.destroyed) return;
              res.writeHead(hubRes.statusCode, hubRes.headers);
              res.end(Buffer.concat(answer));
            }, delay)
          );
        }
      );
      up.on('error', () => res.destroy());
      up.end(body);
    });
  });
  return new Promise((resolve) => proxy.server.listen(0, '127.0.0.1', () => resolve(proxy)));
}

/** another program : raw requests to the hub, a new session for each read */
class Reader {
  constructor(port) {
    this.port = port;
  }

  post(body) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        { host: '127.0.0.1', port: this.port, method: 'POST', path: '/sceen/_', agent: false },
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

  /** what a new session gets when it loads the model */
  async load(id) {
    const answer = await this.post(`U 168 ${PASSWORD} S 0 E `);
    const session = answer.match(/_session_num = '([^']+)'/)[1];
    return this.post(`s ${session} l 0 ${id} E `);
  }

  async str(id) {
    const match = (await this.load(id)).match(new RegExp(`FSo\\[${id}\\]\\.set\\(dUriC\\('([^']*)'\\)\\)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  async items(id) {
    const answer = (await this.load(id)).split(`var tmp = FSo[${id}];`)[1];
    return answer ? [...answer.split('tmp.trim(')[0].matchAll(/set_or_push\(\d+,FSo\[(\d+)\]\)/g)].map((m) => Number(m[1])) : null;
  }

  async attributes(id) {
    const match = (await this.load(id)).match(new RegExp(`FSo\\[${id}\\]\\.set_attr\\(\\{([^}]*)\\}\\);`));
    return match ? Object.fromEntries([...match[1].matchAll(/"([^"]+)":FSo\[(\d+)\]/g)].map((m) => [m[1], Number(m[2])])) : null;
  }
}

/** a model type whose creations can be found in the bodies */
class TracedModel extends Model {}
TracedModel._constructorName = 'TracedModel';
spinalCore.register_models(TracedModel);

describe('batches of changes', { skip, timeout: 180000 }, () => {
  let dir, hub, proxy, conn, reader, root;
  const failures = [];
  const settled = () =>
    until(
      () =>
        !Object.keys(FileSystem._tmp_objects).length &&
        !conn._data_to_send.length &&
        !FileSystem._objects_to_send.size &&
        !FileSystem._sending_data,
      30000
    );
  const store = (model, name) =>
    new Promise((resolve, reject) =>
      spinalCore.store(conn, model, `/__users__/admin/${name}`, () => resolve(), reject)
    );

  before(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'connector-batches-'));
    fs.mkdirSync(path.join(dir, 'memory'));
    fs.mkdirSync(path.join(dir, 'html'));
    const port = await freePort();
    hub = spawn(
      hubBinary,
      ['-b', 'html', '-p', String(port), '-q', String(await freePort()), '-t', '2', '-x', PASSWORD,
        '-d', '0 0 0 1 1 *', '-g', '0 0 0 1 1 *'],
      { cwd: dir, stdio: 'ignore' }
    );
    while (!(await new Promise((resolve) => {
      const s = net.connect(port, '127.0.0.1');
      s.once('connect', () => { s.destroy(); resolve(true); });
      s.once('error', () => resolve(false));
    }))) await sleep(50);
    proxy = await startProxy(port);
    reader = new Reader(port);
    FileSystem.onConnectionError = (code) => failures.push(code);
    conn = spinalCore.connect(`http://168:${PASSWORD}@127.0.0.1:${proxy.server.address().port}/`);
    root = new Model({ label: 'start', items: new Lst(), refs: new Lst(), ptr: new Ptr(0) });
    await store(root, 'batches');
    assert.ok(await settled(), 'the root was not stored');
  });

  after(async () => {
    if (conn) conn.close();
    if (proxy) proxy.server.close();
    if (hub) hub.kill('SIGKILL');
    if (dir) fs.rmSync(dir, { recursive: true, force: true });
  });

  it('writes a change once the request creating its models is answered', async () => {
    // the hub knows a temporary id only in the request that created it
    proxy.delayMs = 1000;
    proxy.posts.length = 0;
    const x = new TracedModel({ tag: 'x' });
    root.items.push(x);
    // the request creating x is in flight
    await until(() => proxy.posts.length === 1, 5000);
    await sleep(300);
    root.refs.push(x);
    root.ptr.set(x);
    x.tag.set('changed while its creation was in flight');
    assert.ok(await settled(), 'not sent');
    proxy.delayMs = 0;
    const creating = proxy.posts.findIndex((p) => / N (\d+) TracedModel /.test(p.body));
    const tmp = proxy.posts[creating].body.match(/ N (\d+) TracedModel /)[1];
    for (const [i, post] of proxy.posts.entries()) {
      if (i !== creating) {
        assert.doesNotMatch(post.body, new RegExp(`[ ,:]${tmp}[ ,]`), `request ${i} refers to the temporary id ${tmp} of request ${creating}`);
      }
    }
    assert.deepEqual(await reader.items(root.refs._server_id), [x._server_id]);
    assert.equal((await reader.load(root.ptr._server_id)).includes(`FSo[${root.ptr._server_id}].set(${x._server_id})`), true);
    assert.equal(await reader.str(x.tag._server_id), 'changed while its creation was in flight');
  });

  it('splits a big batch, the items before their list', async () => {
    const previous = FileSystem.max_batch_size;
    FileSystem.max_batch_size = 100000;
    proxy.posts.length = 0;
    const lst = new Lst();
    root.add_attr('many', lst);
    for (let i = 0; i < 20000; i++) lst.push(new Model({ n: i }));
    assert.ok(await settled(), 'not sent');
    FileSystem.max_batch_size = previous;
    assert.ok(proxy.posts.length > 5, `${proxy.posts.length} requests`);
    // the budget is reached before the next new model : a little more, and the list itself is whole
    const items = proxy.posts.slice(0, -1).map((p) => p.body.length);
    assert.ok(Math.max(...items) < 101000, `a request of ${Math.max(...items)} characters`);
    assert.equal((await reader.items(lst._server_id)).length, 20000);
  });

  it('drops a command the hub refuses, sends the changes made with it again, opens no new session', async () => {
    const sessions = conn.getConnectionStatus().sessionsOpened;
    proxy.posts.length = 0;
    root.label.set('changed with a malformed load');
    const load = conn.load_ptr('12abc').then(() => 'resolved', () => 'rejected');
    assert.equal(await load, 'rejected');
    assert.ok(await settled(), 'not sent');
    root.label.set('changed after');
    assert.ok(await settled(), 'not sent');
    assert.deepEqual(proxy.posts.map((p) => p.status), [400, 200, 200]);
    assert.equal(await reader.str(root.label._server_id), 'changed after');
    assert.equal(conn.getConnectionStatus().sessionsOpened, sessions);
  });

  it('sends a batch a proxy refused as too large again, alone, until it takes it', async () => {
    const sessions = conn.getConnectionStatus().sessionsOpened;
    proxy.maxBody = 1000;
    proxy.posts.length = 0;
    const big = new Str('x'.repeat(5000));
    root.add_attr('big', big);
    await until(() => proxy.posts.filter((p) => p.status === 413).length >= 2, 10000);
    root.label.set('changed while refused');
    await sleep(1500);
    // the batch is sent again as it was : nothing added to it, no new session
    const refused = proxy.posts.filter((p) => p.status === 413).map((p) => p.body.length);
    assert.ok(refused.length >= 2);
    assert.equal(new Set(refused).size, 1, `the refused batch changed: ${refused}`);
    assert.equal(conn.getConnectionStatus().sessionsOpened, sessions);
    proxy.maxBody = Infinity;
    assert.ok(await settled(), 'not sent once the proxy takes it');
    assert.equal(await reader.str(big._server_id), 'x'.repeat(5000));
    assert.equal(await reader.str(root.label._server_id), 'changed while refused');
  });

  it('waits longer for an answer slower than the timeout, the hub runs the batch less and less', async () => {
    const previous = FileSystem.send_timeout;
    FileSystem.send_timeout = 1000;
    proxy.delayMs = 1500;
    proxy.posts.length = 0;
    root.label.set('slow 1');
    assert.ok(await settled(), 'not sent');
    const first = proxy.posts.length;
    root.label.set('slow 2');
    assert.ok(await settled(), 'not sent');
    proxy.delayMs = 0;
    FileSystem.send_timeout = previous;
    // 1 s : timeout, 2 s : answered. The next batch waits 2 s at once
    assert.equal(first, 2);
    assert.equal(proxy.posts.length - first, 1);
    assert.equal(await reader.str(root.label._server_id), 'slow 2');
  });

  it('sends a string with half of a surrogate pair, and the changes after it', async () => {
    root.label.set('cut emoji \uD83D');
    assert.ok(await settled(), 'not sent');
    assert.equal(await reader.str(root.label._server_id), 'cut emoji �');
    root.label.set('after the cut emoji');
    assert.ok(await settled(), 'not sent');
    assert.equal(await reader.str(root.label._server_id), 'after the cut emoji');
  });

  it('sends typed arrays in the format of the hub', async () => {
    const values = new TypedArray_Float64(3, new Float64Array([1.5, 2.5, 3.5]));
    root.add_attr('values', values);
    assert.ok(await settled(), 'not sent');
    assert.match(await reader.load(values._server_id), /'1,3,1\.5,2\.5,3\.5'/);
  });

  it('refuses an attribute name the hub can not store', () => {
    for (const name of ['a b', 'a,b', 'a:b', 'a"b', 'a\\b', 'a\nb']) {
      assert.throws(() => new Model({ [name]: 1 }), /can't be stored on the hub/, name);
    }
    assert.doesNotThrow(() => new Model({ name: 1, 'with-dash_and.dot': 2, 123: 3 }));
  });

  it('never gave up', () => {
    assert.deepEqual(failures, []);
  });
});
