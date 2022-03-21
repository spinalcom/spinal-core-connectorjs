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

import {
  spinalCore,
  Val,
  ICreateSessionResponse,
  IAuthResponse,
} from '../declarations/types';

// connexion variables
const protocol = 'http';
const bosRegisterKey = 'bosRegisterKey';
const organName = 'my organ name';
const organType = 'my organ type';
const spinalHubHost = 'localhost';
const spinalHubPort = 8888;
const connectOpt = `${protocol}://${spinalHubHost}:${spinalHubPort}`;

async function authAndCreateSession(): Promise<{
  auth: IAuthResponse;
  session: ICreateSessionResponse;
}> {
  try {
    const auth = await spinalCore.authOrgan(
      connectOpt,
      bosRegisterKey,
      organName,
      organType
    );
    const session = await spinalCore.createSession(
      connectOpt,
      auth.accessToken
    );
    return {
      auth,
      session,
    };
  } catch (error) {
    console.error('Auth to the spinalhub server fail');
    process.exit(-1);
  }
}

async function main(): Promise<void> {
  const { auth, session } = await authAndCreateSession();

  // create a connextion instance
  const spinalFs = spinalCore.connectWithSessionId(
    connectOpt,
    session.sessionNumber,
    auth.accessToken
  );

  let data: Val;
  try {
    // retrieve a Val (number) in the virtual FileSystem
    data = await spinalCore.load(spinalFs, '/myVirtualData');
  } catch (e) {
    // load fail, it enter here on 1st call

    // create a data then store it in the virtual FileSystem
    data = new Val(0);
    await spinalCore.store(spinalFs, data, '/myVirtualData');
  }

  console.log('stating data = ', data.get());

  // subcribe to q ;odificqtion
  data.bind(() => {
    console.log('data = ', data.get());
  });
}
main();
