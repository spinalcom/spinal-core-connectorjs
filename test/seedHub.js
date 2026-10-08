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

// Stores the models the tests of hubConnection.test.js start from, and prints
// their server ids. Run in its own process, so that the tests start with
// nothing in memory.
//
//   node seedHub.js <port> <password>

const { spinalCore, FileSystem, Model, Lst, Ptr } = require('..');

const [port, password] = process.argv.slice(2);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  const conn = spinalCore.connect(`http://168:${password}@127.0.0.1:${port}/`);
  const store = (model, name) =>
    new Promise((resolve, reject) =>
      spinalCore.store(conn, model, `/__users__/admin/${name}`, () => resolve(), reject)
    );
  const target = new Model({ label: 'target', counter: 1 });
  const root = new Model({ name: 'start', value: 1, items: new Lst([new Model({ n: 'i0' })]), ptr: new Ptr(target) });
  const nodes = Array.from({ length: 500 }, (_, i) => new Model({ value: i }));
  const race = new Model({ items: new Lst(nodes.map((node) => new Ptr(node))) });
  await store(root, 'reconnection');
  await store(race, 'race');
  while (
    Object.keys(FileSystem._tmp_objects).length || conn._data_to_send.length ||
    FileSystem._objects_to_send.size || FileSystem._sending_data
  ) {
    await sleep(50);
  }
  await sleep(300);
  console.log(JSON.stringify({
    root: root._server_id,
    target: target._server_id,
    race: race._server_id,
    nodes: nodes.map((node) => node._server_id),
  }));
  process.exit(0);
})();
