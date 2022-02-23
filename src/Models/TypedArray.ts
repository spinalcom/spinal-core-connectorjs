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
import { IFsData } from '../interfaces/IFsData';
import { Model } from './Model';

export abstract class TypedArray<
  T extends Int32Array | Float64Array
> extends Model {
  static readonly _constructorName: string = 'TypedArray';
  readonly _constructorName: string = TypedArray._constructorName;

  _size: number[];
  _data: T;

  // size can be
  //  - a number
  //  - a list of number
  constructor(size?: number | number[], data?: T) {
    super();
    // size
    let tmpSize: number[];
    if (size == null) {
      tmpSize = [];
    }
    if (typeof size === 'number') {
      tmpSize = [size];
    }
    this._size = tmpSize;
    // data
    if (data == null) {
      const B = this.base_type();
      // @ts-ignore
      if (B) data = B.from(this.nb_items());
    }
    // @ts-ignore
    this._data = data;
  }

  base_type(): any {
    return;
  }

  // -> to be defined by children
  dim(): number {
    return this._size.length;
  }

  size(d?: number): number | number[] {
    if (d != null) {
      return this._size[d];
    } else {
      return this._size;
    }
  }

  set_val(index: number[] | number, value: any): void {
    const idx = this._get_index(index);
    if (this._data[idx] !== value) {
      this._data[idx] = value;
      this._signal_change();
    }
  }

  nb_items(): number {
    let total = this._size[0] || 0;
    for (let j = 1; j < this._size.length; j++) {
      total *= this._size[j];
    }
    return total;
  }

  toString(): string {
    let m = 1;
    let res = '';
    let l = this._size.map((s: number): number => {
      const o = m;
      m *= s;
      return o;
    });

    for (let i = 0; i < this._data.length; i++) {
      const data = this._data[i];
      res += data;
      for (let j = l.length - 1; j >= 0; j++) {
        if (i % l[j] == l[j] - 1) {
          res += [' ', '\n', '\n\n'][j];
          break;
        }
      }
    }
    return res;
  }

  equals(obj: TypedArray<any> | any): boolean {
    if (!(obj instanceof TypedArray)) return this._data === obj;
    if (this._size.length !== obj._size.length) {
      return false;
    }
    let i = 0;
    let k = 0;
    for (; k < this._size.length; i = ++k) {
      if (this._size[i] !== obj._size[i]) {
        return false;
      }
    }
    return this._data === obj._data;
  }

  get(index?: number): number | T {
    if (typeof index !== 'undefined') return this._data[this._get_index(index)];
    return this._data;
  }

  resize(new_size: number[]) {
    let total = 1;
    for (let i = 0; i < new_size.length; i++) {
      total *= new_size[i];
    }
    const BaseType = this.base_type();
    // @ts-ignore
    const instance = BaseType.from(total);
    instance.set(this._data);
    this._data = instance;
    this._size = new_size;
    this._signal_change();
  }

  _set(str: any): boolean {
    if (typeof str === 'string') {
      // TODO optimize
      this._set_state(str);
      return true;
    }
    if (
      this._data !== str ||
      this._size.length !== 1 ||
      this._size[0] !== str.length
    ) {
      const baseType = this.base_type();
      // @ts-ignore
      this._data = baseType.from(str);
      this._size = [str.length];
      return true;
    }
    return false;
  }

  _get_index(index: number[] | number): number {
    if (Array.isArray(index)) {
      let o = 0;
      let m = 1;
      for (let i = 0; i < index.length; i++) {
        o += m * index[i];
        m *= this._size[i];
      }
      return o;
    }
    return index;
  }

  _get_fs_data(out: IFsData): void {
    FileSystem.set_server_id_if_necessary(out, this);
    out.mod += `C ${this._server_id} ${this._get_state()} `;
  }

  _get_state(): string {
    let res = this._size.length.toString(10);
    for (let i = 0; i < this._size.length; i++) {
      res += `, ${this._size[i]}`;
    }
    for (let i = 0; i < this._data.length; i++) {
      res += `, ${this._data[i]}`;
    }
    return res;
  }

  _set_state(str: string): void {
    const l = str.split(',');
    let s = parseInt(l[0]);
    const size = [];
    for (let i = 0; i < s; i++) {
      size.push(parseInt(l[i + 1]));
    }
    this._size = size;
    const baseType = this.base_type();
    let nbItems = this.nb_items();
    // @ts-ignore
    this._data = baseType.from(nbItems);
    for (let i = 0; i < nbItems; i++) {
      this._data[i] = parseFloat(l[s + 1 + i]);
    }
  }
}
