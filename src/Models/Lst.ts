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
import type { IFlatModelMap } from '../interfaces/IFlatModelMap';
import type { IFsData } from '../interfaces/IFsData';
import type { IStateMap } from '../interfaces/IStateMap';
import type { SpinalFilterFunction } from '../interfaces/SpinalFilterFunction';
import type { SpinalSortFunction } from '../interfaces/SpinalSortFunction';
import { ModelProcessManager } from '../ModelProcessManager';
import { Model } from './Model';

export class Lst<T extends Model = any> extends Model {
  static readonly _constructorName: string = 'Lst';
  readonly _constructorName: string = Lst._constructorName;

  public length: number = 0;

  constructor(data?: any) {
    super();
    const s = this.static_length();
    if (s >= 0) {
      const d = this.default_value();
      for (let i = 0; i <= s; i++) {
        // @ts-ignore
        this.push(d, true);
      }
    }
    if (data) this._set(data);
  }

  static_length(): number {
    return -1;
  }

  default_value(): number {
    return 0;
  }

  base_type(): any {
    return undefined;
  }

  get(): Array<T> {
    const res = [];

    for (let i = 0; i < this.length; i++) {
      if (this[i]) res.push(this[i].get());
    }

    return res;
  }

  size(): any {
    return [this.length];
  }

  toString(): string {
    let res = [];

    for (let i = 0; i < this.length; i++) {
      res.push(this[i].toString());
    }
    if (res.length > 0) return res.join();
    return '';
  }

  equals(lst: Lst<T>): boolean {
    if (lst.length !== this.length) return false;
    for (let i = 0; i < this.length; i++) {
      if (!this[i].equals(lst[i])) return false;
    }

    return true;
  }

  push(value: T, force: boolean = false): void {
    if (this._static_size_check(force)) return;

    let b = this.base_type();

    if (b) {
      if (!(value instanceof b)) value = new b(value);
    } else {
      // @ts-ignore
      value = ModelProcessManager.conv(value);
    }

    if (value._parents.indexOf(this) === -1) {
      value._parents.push(this);
    }

    this[this.length++] = value;
    this._signal_change();
  }

  pop(): T {
    if (this._static_size_check(false)) {
      return;
    }

    if (this.length <= 0) return;

    const res = this[--this.length];
    this.rem_attr(this.length.toString(10));
    return res;
  }

  clear(): void {
    while (this.length) {
      this.pop();
    }
  }

  unshift(value: any): number {
    if (this._static_size_check(false)) {
      return;
    }
    const b = this.base_type();
    if (b != null) {
      if (!(value instanceof b)) {
        value = new b(value);
      }
    } else {
      value = <unknown>ModelProcessManager.conv(value);
    }
    if (value._parents.indexOf(this) < 0) {
      value._parents.push(this);
    }
    if (this.length) {
      let i, j, ref;
      for (
        i = j = ref = this.length - 1;
        ref <= 0 ? j <= 0 : j >= 0;
        i = ref <= 0 ? ++j : --j
      ) {
        this[i + 1] = this[i];
      }
    }
    this[0] = value;
    this.length += 1;
    this._signal_change();
    return this.length;
  }

  shift(): T {
    const res = this[0];
    this.slice(0, 1);
    return res;
  }

  remove(item: T): void {
    const index = this.indexOf(item);
    if (index >= 0) this.slice(index, 1);
  }

  remove_ref(item: T): void {
    const index = this.indexOf_ref(item);
    if (index >= 0) this.slice(index, 1);
  }

  filter(f: SpinalFilterFunction<T>): T[] {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      if (f(this[i])) res.push(this[i]);
    }

    return res;
  }

  detect(f: SpinalFilterFunction<T>): T {
    for (let i = 0; i < this.length; i++) {
      if (f(this[i])) return this[i];
    }
    return undefined;
  }

  sorted(sort: SpinalSortFunction<T>): Array<T> {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      res.push(this[i]);
    }

    return res.sort(sort);
  }

  has(f: SpinalFilterFunction<T>): boolean {
    for (let i = 0; i < this.length; i++) {
      if (f(this[i])) return true;
    }
    return false;
  }

  indexOf(value: T): 1 | -1 {
    for (let i = 0; i < this.length; i++) {
      if (this[i].equals(value)) return 1;
    }
    return -1;
  }

  indexOf_ref(value: T): number {
    for (let i = 0; i < this.length; i++) {
      if (this[i] == value) return i;
    }
    return -1;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  contains_ref(value: T): boolean {
    return this.indexOf_ref(value) !== -1;
  }

  toggle(value: T): boolean {
    const index = this.indexOf(value);
    if (index !== -1) {
      this.splice(index);
      return false;
    } else {
      this.push(value);
      return true;
    }
  }

  toggle_ref(value: T): boolean {
    const index = this.indexOf_ref(value);
    if (index !== -1) {
      this.splice(index);
      return false;
    } else {
      this.push(value);
      return true;
    }
  }

  slice(begin: number, end: number = this.length): Lst<T> {
    const res = new Lst<T>();

    if (begin < 0) begin = 0;
    if (end > this.length) end = this.length;

    for (let i = begin; i < end; i++) {
      res.push(this[i].get());
    }

    return res;
  }

  concat(new_tab: Lst<T>, force: boolean = false): void {
    if (this._static_size_check(force)) return;

    if (new_tab.length) {
      for (let i = 0; i < new_tab.length; i++) {
        this.push(new_tab[i]);
      }
    }
  }

  splice(index: number, n: number = 1): void {
    if (this._static_size_check(false)) return;

    const end = Math.min(index + n, this.length);

    for (let i = index; i < end; i++) {
      this.rem_attr(i.toString(0));
    }

    for (let i = index; i < this.length - n; i++) {
      this[i] = this[i + n];
    }

    for (let i = this.length - n; i < this.length; i++) {
      delete this[i];
    }

    this.length -= n;

    this._signal_change();
  }

  insert(index: number, lst: Lst<T>): void {
    const end = Math.max(this.length - index, 0);
    const res = [];
    for (let i = 0; i < end; i++) {
      res.push(this.pop());
    }
    res.reverse();
    for (let i = 0; i < lst.length; i++) {
      this.push(lst[i]);
    }
    for (let i = 0; i < res.length; i++) {
      this.push(res[i]);
    }
  }

  set_or_push(index: number, val: T) {
    if (index < this.length) {
      // @ts-ignore
      return this.mod_attr(index, val);
    }
    if (index === this.length) {
      this.push(val);
    }
  }

  trim(size: number): void {
    while (this.length > size) this.pop();
  }
  join(sep: string) {
    return this.get().join(sep);
  }

  deep_copy(): any {
    const res = new Lst();

    for (let i = 0; i < this.length; i++) {
      res.push(this[i].deep_copy());
    }

    return res;
  }

  back() {
    return this[this.length - 1];
  }

  real_change(): boolean {
    if (this.has_been_directly_modified()) return true;

    for (let i = 0; i < this.length; i++) {
      if (this[i].real_change()) return true;
    }

    return false;
  }

  _set(value: Lst<T>): boolean {
    let change = Number(this.length != value.length);

    const s = this.static_length();

    if (s >= 0 && change) {
      console.error(
        `resizing a static array (type ${ModelProcessManager.get_object_class(
          this
        )}) is forbidden`
      );
    }

    for (let i = 0; i < value.length; i++) {
      if (i < this.length) change |= this[i].set(value[i]);
      else if (s < 0) {
        this.push(value[i]);
      }
    }
    if (s < 0) {
      while (this.length > value.length) {
        this.pop();
      }

      this.length = value.length;
    }

    return Boolean(change);
  }

  _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap {
    map[this.model_id] = this;

    for (let i = 0; i < this.length; i++) {
      if (!map.hasOwnProperty(this[i]))
        if (this[i]._date_last_modification > date)
          this[i]._get_flat_model_map(map, date);
    }
    return map;
  }

  _get_fs_data(out: IFsData): void {
    FileSystem.set_server_id_if_necessary(out, this);
    const res = [];
    for (let i = 0; i < this.length; i++) {
      const obj = this[i];
      FileSystem.set_server_id_if_necessary(out, obj);
      res.push(obj._server_id);
    }
    out.mod += `C ${this._server_id} ${res.join(',')} `;
  }

  _get_state(): string {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      res.push(this[i].model_id);
    }

    return res.join(',');
  }

  _set_state(str: string, map: IStateMap<T>): void {
    const l_id = str.split(',').filter((x) => {
      return x.length;
    });
    while (this.length > l_id.length) this.pop();

    for (let i = 0; i < this.length; i++) {
      const k_id = l_id[i];

      if (map[k_id].buff) {
        if (map[k_id].buff != this[i])
          this.mod_attr(i.toString(10), map[k_id].buff);
      } else if (!this[i]._set_state_if_same_type(k_id, map)) {
        this.mod_attr(
          i.toString(10),
          ModelProcessManager._new_model_from_state(k_id, map)
        );
      }
    }

    for (let i = this.length; i < l_id.length; i++) {
      const k_id = l_id[i];
      if (map[k_id].hasOwnProperty('buff') && map[k_id].buff !== null)
        this.push(map[k_id].buff);
      else this.push(ModelProcessManager._new_model_from_state(k_id, map));
    }
  }

  _static_size_check(force: boolean): boolean {
    if (this.static_length() >= 0 && !force) {
      console.error(
        `resizing a static array (type ` +
          `${ModelProcessManager.get_object_class(this)}) is forbidden`
      );
      return true;
    }
    return false;
  }

  *[Symbol.iterator](): Generator<T, void, unknown> {
    for (const key of this._attribute_names) {
      yield <T>this[key]; // yield [key, value] pair
    }
  }
}
