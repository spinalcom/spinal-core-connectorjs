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

import { ModelProcessManager } from '../ModelProcessManager';

export function spinalRegisterModel(
  model: typeof Model,
  name: string = model._constructorName
) {
  (<any>globalThis)[name] = model;
  ModelProcessManager.spinal[name] = model;
  ModelProcessManager.register_models(model, name);
}

export function spinalRegister(obj: any, name: string) {
  (<any>globalThis)[name] = obj;
  ModelProcessManager.spinal[name] = obj;
}
