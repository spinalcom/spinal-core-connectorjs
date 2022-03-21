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

import type { FileSystem } from './FileSystem/FileSystem';
import type { Directory } from './FileSystem/Models/Directory';
import type { File } from './FileSystem/Models/File';
import type { Path } from './FileSystem/Models/Path';
import type { Pbr } from './FileSystem/Models/Pbr';
import type { Ptr } from './FileSystem/Models/Ptr';
import type { RightSetList } from './FileSystem/Models/RightSetList';
import type { RightsItem } from './FileSystem/Models/RightsItem';
import type { SessionModel } from './FileSystem/Models/SessionModel';
import type { TiffFile } from './FileSystem/Models/TiffFile';
import type { User } from './FileSystem/Models/User';
import type { UserRight } from './FileSystem/Models/UserRight';
import type { ISpinalModel } from './interfaces/ISpinalModels';
import type { IStateMap } from './interfaces/IStateMap';
import { Bool } from './Models/Bool';
import type { Choice } from './Models/Choice';
import { Lst } from './Models/Lst';
import { Model } from './Models/Model';
import type { Obj } from './Models/Obj';
import { Str } from './Models/Str';
import type { TypedArray } from './Models/TypedArray';
import type { TypedArray_Float64 } from './Models/TypedArray_Float64';
import type { TypedArray_Int32 } from './Models/TypedArray_Int32';
import { Val } from './Models/Val';
import type { Vec } from './Models/Vec';
import type { BindProcess } from './Processes/BindProcess';
import type { Process } from './Processes/Process';
import type { spinalCore } from './Spinalcore';
import type { SpinalUserManager } from './SpinalUserManager';
import { isIterable } from './Utils/isIterable';

export namespace ModelProcessManager {
  // nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
  export let _counter: number = 0;
  // changed models (current round)
  export const _modlist: Map<number, Model> = new Map();
  // new processes (that will need a first onchange call in "force" mode)
  export const _n_processes: Map<number, Process> = new Map();
  // current model id (used to create new ids)
  export let _cur_mid: number = 0;
  // current process id (used to create new ids)
  export let _cur_process_id: number = 0;
  // timer used to create a new "round"
  export let _timeout: ReturnType<typeof setTimeout> = undefined;
  // if _force_m == true, every has_been_modified function will return true
  export let _force_m: boolean = false;

  export const _def: ISpinalModel = {};

  export function new_from_state(): void {
    throw 'function obsolete';
  }
  export function load(): void {
    throw 'function obsolete';
  }

  /**
   * translate a normal javascript to their spinal model connter part
   * @export
   * @param {*} v
   * @return {*}  {Model}
   */
  export function conv(v: Model): Model;
  export function conv(v: any[]): Lst;
  export function conv(v: string): Str;
  export function conv(v: number): Val;
  export function conv(v: boolean): Bool;
  export function conv(v: any): Model;
  export function conv(v: any): Model {
    if (v instanceof Model) return v;
    if (v instanceof Array) return new Lst(v);
    if (typeof v === 'string') return new Str(v);
    if (typeof v === 'number') return new Val(v);
    if (typeof v === 'boolean') return new Bool(v);
    return new Model(v);
  }

  /**
   * @export
   * @param {Model} obj
   * @return {*}  {string}
   */
  export function get_object_class(obj: Model): string {
    if (obj?.constructor) {
      if ('_constructorName' in obj) return obj._constructorName;
      if ('name' in obj.constructor) return obj.constructor.name;
      if ('toString' in obj.constructor) {
        let arr = obj.constructor.toString().match(/class\s*(\w+)/);
        if (!arr) {
          arr = obj.constructor.toString().match(/function\s*(\w+)/);
        }
        if (arr?.length === 2) {
          return arr[1];
        }
      }
    }
  }

  /**
   * @export
   * @param {(Model | object)} m
   * @return {*}  {string[]}
   */
  export function _get_attribute_names(m: Model | object): string[] {
    if (m instanceof Model) {
      return m._attribute_names;
    }
    const res: string[] = [];
    for (const key in m) {
      if (Object.prototype.hasOwnProperty.call(m, key)) {
        res.push(key);
      }
    }
    return res;
  }

  /**
   * create a Model using a line of get_state(using.type, .data, ...)
   * @export
   * @template T
   * @param {string} mid
   * @param {IStateMap<T>} map
   * @return {*}  {T}
   */
  export function _new_model_from_state<T extends Model>(
    mid: string,
    map: IStateMap<T>
  ): T {
    var info = map[mid];
    info.buff = new ModelProcessManager._def[info.type]();
    info.buff._set_state(info.data, map);
    return info.buff;
  }

  /**
   * say that something will need a call
   * to ModelProcessManager._sync_processes during the next round
   * @export
   * @return {*}  {ReturnType<typeof setTimeout>}
   */
  export function _need_sync_processes(): ReturnType<typeof setTimeout> {
    if (_timeout == null) {
      _timeout = setTimeout(_sync_processes, 1);
      return _timeout;
    }
  }

  /**
   * @export
   * @param {typeof Model} model
   * @param {string} [name]
   */
  export function register_models(model: typeof Model, name?: string): void;

  /**
   * @export
   * @param {(typeof Model[]
   *       | {
   *           [key: string]: typeof Model;
   *         })} modelList
   */
  export function register_models(
    modelList:
      | typeof Model[]
      | {
          [key: string]: typeof Model;
        }
  ): void;
  export function register_models(
    modelList: typeof Model | typeof Model[] | { [key: string]: typeof Model },
    name?: string
  ): void {
    if (modelList) {
      // function
      if (modelList instanceof Function) {
        ModelProcessManager._register_models_check(modelList, name);
      } else if (isIterable(modelList)) {
        // array
        const l: typeof Model[] = <typeof Model[]>modelList;
        for (const m of l) {
          ModelProcessManager.register_models(m);
        }
      } else {
        // obj
        const obj: { [key: string]: typeof Model } = <
          { [key: string]: typeof Model }
        >modelList;
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            ModelProcessManager._register_models_check(obj[key], key);
          }
        }
      }
    }
  }

  /**
   * @export
   * @param {typeof Model} func
   * @param {string} [name]
   */
  export function _register_models_check(
    func: typeof Model,
    name?: string
  ): void {
    if (!name) name = func._constructorName ? func._constructorName : func.name;
    if (
      typeof ModelProcessManager._def[name] !== 'undefined' &&
      ModelProcessManager._def[name] !== func
    ) {
      console.error(
        `trying to register \"${name}\" Model but was already defined`
      );
      console.error('old =', ModelProcessManager._def[name]);
      console.error('new =', func);
    } else ModelProcessManager._def[name] = func;
    // @ts-ignore
    func._constructorName = name;
  }

  /**
   * the function that is called after a very short timeout,
   * when at least one object has been modified
   * @export
   */
  export function _sync_processes(): void {
    const processes: Map<number, { value: Process; force: boolean }> =
      new Map();
    for (const [, model] of ModelProcessManager._modlist) {
      for (const process of model._processes) {
        processes.set(process.process_id, {
          value: process,
          force: false,
        });
      }
    }
    for (const [id, process] of ModelProcessManager._n_processes) {
      processes.set(id, {
        value: process,
        force: true,
      });
    }
    ModelProcessManager._timeout = undefined;
    ModelProcessManager._modlist.clear();
    ModelProcessManager._n_processes.clear();
    ModelProcessManager._counter += 2;
    for (const [, process] of processes) {
      ModelProcessManager._force_m = process.force;
      process.value.onchange();
    }
    ModelProcessManager._force_m = false;
  }

  export const spinal: Partial<{
    version: string;
    spinalCore: typeof spinalCore;
    FileSystem: typeof FileSystem;
    ModelProcessManager: typeof ModelProcessManager;
    SpinalUserManager: typeof SpinalUserManager;
    Process: typeof Process;
    BindProcess: typeof BindProcess;
    Model: typeof Model;
    Obj: typeof Obj;
    Bool: typeof Bool;
    Val: typeof Val;
    Str: typeof Str;
    Lst: typeof Lst;
    Vec: typeof Vec;
    Choice: typeof Choice;
    TypedArray: typeof TypedArray;
    TypedArray_Int32: typeof TypedArray_Int32;
    TypedArray_Float64: typeof TypedArray_Float64;
    Directory: typeof Directory;
    File: typeof File;
    TiffFile: typeof TiffFile;
    Path: typeof Path;
    Ptr: typeof Ptr;
    Pbr: typeof Pbr;
    SessionModel: typeof SessionModel;
    User: typeof User;
    UserRight: typeof UserRight;
    RightSetList: typeof RightSetList;
    RightsItem: typeof RightsItem;
    [key: string]: any;
  }> = {
    version: /*#__PURE__*/ process.env.PACKAGE_VERSION,
  };
}
