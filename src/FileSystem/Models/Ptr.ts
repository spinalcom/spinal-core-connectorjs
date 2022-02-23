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

import type { IFsData } from '../../interfaces/IFsData';
import type { SpinalLoadCallBack } from '../../interfaces/SpinalLoadCallBack';
import { Model } from '../../Models/Model';
import { FileSystem } from '../FileSystem';

export class Ptr<T extends Model = any> extends Model {
  static readonly _constructorName: string = 'Ptr';
  readonly _constructorName: string = Ptr._constructorName;

  public data: { model?: T; value?: any } = {};

  // model may be a number (the pointer)
  constructor(model: any) {
    super();
    this._set(model);
  }

  load(callback: SpinalLoadCallBack<T>) {
    var ref;
    if (this.data.model != null) callback(this.data.model, false);
    else FileSystem.get_inst()?.load_ptr(this.data.value, callback);
  }

  _get_fs_data(out: IFsData): void {
    FileSystem.set_server_id_if_necessary(out, this);
    if (this.data.model != null) {
      FileSystem.set_server_id_if_necessary(out, this.data.model);
      out.mod += `C ${this._server_id} ${this.data.model._server_id} `;

      this.data.value = this.data.model._server_id;
      if (this.data.model._server_id & 3) {
        FileSystem._ptr_to_update[this.data.model._server_id] = this;
      }
    } else {
      out.mod += `C ${this._server_id} ${this.data.value} `;
    }
  }

  _set(model: number | T): boolean {
    var res;
    if (typeof model === 'number') {
      res = this.data.value !== model;
      this.data = {
        value: model,
      };
      return res;
    }
    if (model instanceof Model) {
      res = this.data.value !== model._server_id;
      this.data = {
        model: model,
        value: model._server_id,
      };
      return res;
    }
    return false;
  }

  _get_state() {
    return this.data.toString();
  }

  _set_state(str: string, _map: unknown): boolean {
    return this.set(str);
  }
}
