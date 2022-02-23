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

import type { ModelProcessManager as _ModelProcessManager } from './ModelProcessManager';

type spinalType = typeof _ModelProcessManager.spinal & { [key: string]: any };

declare global {
  var spinal: spinalType;

  var spinalCore: typeof _ModelProcessManager.spinal.spinalCore;
  // @ts-ignore
  var FileSystem: typeof _ModelProcessManager.spinal.FileSystem;
  var ModelProcessManager: typeof _ModelProcessManager.spinal.ModelProcessManager;

  var Process: typeof _ModelProcessManager.spinal.Process;
  var BindProcess: typeof _ModelProcessManager.spinal.BindProcess;

  var Model: typeof _ModelProcessManager.spinal.Model;
  var Obj: typeof _ModelProcessManager.spinal.Obj;
  var Bool: typeof _ModelProcessManager.spinal.Bool;
  var Val: typeof _ModelProcessManager.spinal.Val;
  var Str: typeof _ModelProcessManager.spinal.Str;
  var Lst: typeof _ModelProcessManager.spinal.Lst;
  var Vec: typeof _ModelProcessManager.spinal.Vec;
  var Choice: typeof _ModelProcessManager.spinal.Choice;
  var TypedArray: typeof _ModelProcessManager.spinal.TypedArray;
  var TypedArray_Int32: typeof _ModelProcessManager.spinal.TypedArray_Int32;
  var TypedArray_Float64: typeof _ModelProcessManager.spinal.TypedArray_Float64;

  var Directory: typeof _ModelProcessManager.spinal.Directory;
  // @ts-ignore
  var File: typeof _ModelProcessManager.spinal.File;
  var TiffFile: typeof _ModelProcessManager.spinal.TiffFile;
  var Path: typeof _ModelProcessManager.spinal.Path;
  var Ptr: typeof _ModelProcessManager.spinal.Ptr;
  var Pbr: typeof _ModelProcessManager.spinal.Pbr;
  var SessionModel: typeof _ModelProcessManager.spinal.SessionModel;
  var User: typeof _ModelProcessManager.spinal.User;
  var UserRight: typeof _ModelProcessManager.spinal.UserRight;
  var RightSetList: typeof _ModelProcessManager.spinal.RightSetList;
  var RightsItem: typeof _ModelProcessManager.spinal.RightsItem;
}
