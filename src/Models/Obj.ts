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

import { FileSystem } from '../FileSystem/FileSystem';
import type { IFsData } from '../interfaces/IFsData';
import { Model } from './Model';

export class Obj<T = string | number | boolean> extends Model {
  static readonly _constructorName: string = 'Obj';
  readonly _constructorName: string = Obj._constructorName;
  _data: T;

  constructor(data?: any) {
    super();
    if (data != null) {
      this._set(data);
    }
  }

  toString(): string {
    return this._data?.toString();
  }

  equals(obj: any): boolean {
    return obj instanceof Obj ? this._data === obj._data : this._data === obj;
  }

  get(): any {
    return this._data;
  }
  _get_fs_data(out: IFsData): void {
    FileSystem.set_server_id_if_necessary(out, this);
    out.mod += `C ${this._server_id} ${this.toString()} `;
  }

  _set(value: T): boolean {
    if (this._data !== value) {
      this._data = value;
      return true;
    }
    return false;
  }

  _get_state(): string {
    return this.toString();
  }

  _set_state(str: string, _map: unknown): boolean {
    return this.set(str);
  }
}
