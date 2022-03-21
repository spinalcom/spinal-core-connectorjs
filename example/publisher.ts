/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
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

import { spinalCore, Val } from '..';

// connexion variables
const protocol = 'http';
const userId = 168;
const password = 'MY PASSWORD';
const spinalHubHost = 'localhost';
const spinalHubPort = 8888;

async function main(): Promise<void> {
  // create a connextion instance
  const connectOpt = `${protocol}://${userId}:${password}@${spinalHubHost}:${spinalHubPort}`;
  const spinalFs = spinalCore.connect(connectOpt);

  let data: Val;
  try {
    // retrieve a Val (number) in the virtual FileSystem
    data = await spinalCore.load(spinalFs, '/myVirtualData');
  } catch (e) {
    // load fail, it enter here on 1st call.
    // create a data then store it in the virtual FileSystem
    data = new Val(0);
    await spinalCore.store(spinalFs, data, '/myVirtualData');
  }
  // every 2 sec, set the value to Sinusoidal from +- 50
  let i = 0;
  setInterval(() => {
    data.set(50 * Math.sin((Math.PI / 100) * i++));
  }, 2000);
}
main();
