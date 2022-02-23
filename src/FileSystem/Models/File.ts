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

import type { IFileInfo } from '../../interfaces/IFileInfo';
import type { SpinalLoadCallBack } from '../../interfaces/SpinalLoadCallBack';
import { ModelProcessManager } from '../../ModelProcessManager';
import { Model } from '../../Models/Model';
import type { Str } from '../../Models/Str';
import { Ptr } from './Ptr';

export class File<T extends Model = any> extends Model {
  static readonly _constructorName: string = 'File';
  readonly _constructorName: string = File._constructorName;

  name: Str;
  _created_at: Str;
  _ptr: Ptr;
  _info: IFileInfo;

  constructor(name: string = '', ptr_or_model: number | T = 0, info: any = {}) {
    super();
    const cp_info: any = {};
    for (const key in info) {
      cp_info[key] = info[key];
    }
    if (ptr_or_model instanceof Model) {
      if ('model_type' in cp_info) {
        cp_info.model_type = ModelProcessManager.get_object_class(ptr_or_model);
      }
      ptr_or_model.get_file_info?.(cp_info);
    }
    this.add_attr({
      name: name,
      _created_at: Date.now(),
      _ptr: new Ptr(ptr_or_model),
      _info: cp_info,
    });
  }

  load(callback: SpinalLoadCallBack<T>) {
    return this._ptr.load(callback);
  }
}
