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

import { FileSystem } from './FileSystem/FileSystem';
import type { Directory } from './FileSystem/Models/Directory';
import type { File } from './FileSystem/Models/File';
import { RightsItem } from './FileSystem/Models/RightsItem';
import type { IFileInfoOption } from './interfaces/IFileInfoOption';
import {
  IOptionFileSystemWithSessionId,
  IOptionFileSystemWithUser,
} from './interfaces/IOptionFilesystem';
import type { ISpinalModel } from './interfaces/ISpinalModels';
import type { SpinalCallBackError } from './interfaces/SpinalCallBackError';
import type { SpinalLoadCallBack } from './interfaces/SpinalLoadCallBack';
import type { SpinalStoreCallBackSucess } from './interfaces/SpinalStoreCallBackSucess';
import { ModelProcessManager } from './ModelProcessManager';
import type { Model } from './Models/Model';

export namespace spinalCore {
  export const _def: ISpinalModel = ModelProcessManager._def;
  export const version: string = /*#__PURE__*/ process.env.PACKAGE_VERSION;

  /**
   * @export
   * @param {(URL | string)} options
   * @param {string} [accessToken]
   * @return {*}  {FileSystem}
   */
  export function connect(
    options: URL | string,
    accessToken?: string
  ): FileSystem {
    const parsedOpt = typeof options === 'string' ? new URL(options) : options;
    if (parsedOpt.pathname.slice(-1)[0] !== '/') {
      parsedOpt.pathname += '/';
    }
    const opt: IOptionFileSystemWithUser = {
      home_dir: parsedOpt.pathname,
      url: parsedOpt.hostname,
      port: parsedOpt.port,
      userid: parsedOpt.username,
      password: parsedOpt.password,
      accessToken,
    };
    return new FileSystem(opt);
  }

  /**
   * @export
   * @param {(URL | string)} options
   * @param {number} sessionId
   * @param {string} [accessToken]
   * @return {*}  {FileSystem}
   */
  export function connectWithSessionId(
    options: URL | string,
    sessionId: number,
    accessToken?: string
  ): FileSystem {
    const parsedOpt = typeof options === 'string' ? new URL(options) : options;
    if (parsedOpt.pathname.slice(-1)[0] !== '/') {
      parsedOpt.pathname += '/';
    }
    const opt: IOptionFileSystemWithSessionId = {
      home_dir: parsedOpt.pathname,
      url: parsedOpt.hostname,
      port: parsedOpt.port,
      sessionId,
      accessToken,
    };
    return new FileSystem(opt);
  }

  export function connectAndLoadWithApi(
    options: URL | string,
    username: string,
    password: string,
    organAccessToken?: string
  ): FileSystem {
    const parsedOpt = typeof options === 'string' ? new URL(options) : options;
    if (parsedOpt.pathname.slice(-1)[0] !== '/') {
      parsedOpt.pathname += '/';
    }
    // do axios get
    // username,
    // password: string,

    const opt: IOptionFileSystemWithUser = {
      home_dir: parsedOpt.pathname,
      url: parsedOpt.hostname,
      port: parsedOpt.port,
      userid: username,
      password: password,
      // accessToken,
    };
    return new FileSystem(opt);
  }

  /**
   * stores a model in the file system
   * @export
   * @param {FileSystem} fs
   * @param {Model} model
   * @param {string} path
   * @return {*}  {Promise<void>}
   */
  export async function store(
    fs: FileSystem,
    model: Model,
    path: string,
    fileOption: IFileInfoOption
  ): Promise<void>;
  /**
   * stores a model in the file system
   * @export
   * @param {FileSystem} fs
   * @param {Model} model
   * @param {string} path
   * @param {SpinalStoreCallBackSucess} callback_success
   * @param {SpinalCallBackError} [callback_error]
   * @return {*}  {void}
   */
  export function store(
    fs: FileSystem,
    model: Model,
    path: string,
    callback_success: SpinalStoreCallBackSucess,
    callback_error?: SpinalCallBackError,
    fileOption?: IFileInfoOption
  ): void;
  export async function store(
    fs: FileSystem,
    model: Model,
    path: string,
    optionOrCb?: SpinalStoreCallBackSucess | IFileInfoOption,
    callback_error?: SpinalCallBackError,
    fileOption: IFileInfoOption = {
      model_type: 'Model',
    }
  ): Promise<void> {
    // Parse path
    const lst = path.split('/');
    const file_name = lst.pop();
    if (lst[0] === '') lst.splice(0, 1);
    path = lst.join('/'); // Absolute paths are not allowed
    const home_dir = FileSystem.get_inst()._home_dir;
    try {
      const dir = await fs.load_or_make_dir(home_dir + path);
      const file = dir.detect((x: File): boolean => x.name.get() === file_name);
      if (file != null) dir.remove(file);
      if (typeof optionOrCb === 'function') {
        dir.add_file(file_name, model, fileOption);
        optionOrCb();
      } else {
        dir.add_file(file_name, model, optionOrCb ? optionOrCb : fileOption);
      }
      return;
    } catch (error) {
      if (typeof optionOrCb === 'undefined') throw error;
      if (typeof callback_error === 'undefined') {
        defaultCallbackError();
      } else callback_error();
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
    if (name)
      return ModelProcessManager.register_models(<typeof Model>modelList, name);
    return ModelProcessManager.register_models(
      <typeof Model[] | { [key: string]: typeof Model }>modelList
    );
  }

  /**
   * @template T
   * @param {FileSystem} fs
   * @param {string} path
   * @return {*}  {Promise<T>}
   */
  async function loadPromise<T extends Model>(
    fs: FileSystem,
    path: string
  ): Promise<T> {
    // Parse path
    const lst = path.split('/');
    const file_name = lst.pop();
    if (lst[0] === '') lst.splice(0, 1);
    path = lst.join('/'); // Absolute paths are not allowed
    const home_dir = FileSystem.get_inst()._home_dir;
    const current_dir = await fs.load_or_make_dir(`${home_dir}${path}`);
    const file = current_dir.detect(
      (x: File): boolean => x.name.get() === file_name
    );
    if (file) return file.load();
    throw new Error('File not Found');
  }

  /**
   * loads a model from the file system
   * @export
   * @template T
   * @param {FileSystem} fs
   * @param {string} path
   * @return {*}  {Promise<T>}
   */
  export function load<T extends Model>(
    fs: FileSystem,
    path: string
  ): Promise<T>;
  /**
   * loads a model from the file system
   * @export
   * @template T
   * @param {FileSystem} fs
   * @param {string} path
   * @param {SpinalLoadCallBack<T>} callback_success
   * @param {SpinalCallBackError} [callback_error]
   */
  export function load<T extends Model>(
    fs: FileSystem,
    path: string,
    callback_success: SpinalLoadCallBack<T>,
    callback_error?: SpinalCallBackError
  ): void;
  export function load<T extends Model>(
    fs: FileSystem,
    path: string,
    callback_success?: SpinalLoadCallBack<T>,
    callback_error?: SpinalCallBackError
  ): Promise<T> {
    if (typeof callback_success === 'undefined') return loadPromise(fs, path);
    if (typeof callback_error === 'undefined')
      callback_error = defaultCallbackError;
    // Parse path
    const lst = path.split('/');
    const file_name = lst.pop();
    if (lst[0] === '') lst.splice(0, 1);
    path = lst.join('/'); // Absolute paths are not allowed
    const home_dir = FileSystem.get_inst()._home_dir;
    fs.load_or_make_dir(
      `${home_dir}${path}`,
      (current_dir: Directory, err: boolean): void => {
        if (err) {
          return callback_error();
        } else {
          const file = current_dir.detect(
            (x: File): boolean => x.name.get() === file_name
          );
          if (file != null) {
            return file.load((data: T, err: boolean): void => {
              if (err) {
                return callback_error();
              } else {
                return callback_success(data);
              }
            });
          } else {
            return callback_error();
          }
        }
      }
    );
  }

  /**
   * loads all the models of a specific type
   * @export
   * @template T
   * @param {FileSystem} fs
   * @param {string} type
   * @param {SpinalLoadCallBack<T>} callback_success
   * @param {SpinalCallBackError} [callback_error]
   * @return {*}
   */
  export function load_type<T extends Model>(
    fs: FileSystem,
    type: string,
    callback_success: SpinalLoadCallBack<T>,
    callback_error?: SpinalCallBackError
  ) {
    if (typeof callback_error === 'undefined') {
      callback_error = defaultCallbackError;
    }
    return fs.load_type(type, (data: T, error: boolean): void => {
      if (!data || error) callback_error();
      else callback_success(data, error);
    });
  }

  /**
   * @export
   * @param {FileSystem} fs
   * @param {number} ptr
   * @return {*}  {Promise<RightsItem>}
   */
  export function load_right(fs: FileSystem, ptr: number): Promise<RightsItem>;
  /**
   * @export
   * @param {FileSystem} fs
   * @param {number} ptr
   * @param {SpinalLoadCallBack<RightsItem>} callback_success
   * @param {SpinalCallBackError} [callback_error]
   */
  export function load_right(
    fs: FileSystem,
    ptr: number,
    callback_success: SpinalLoadCallBack<RightsItem>,
    callback_error?: SpinalCallBackError
  ): void;
  export function load_right(
    fs: FileSystem,
    ptr: number,
    callback_success?: SpinalLoadCallBack<RightsItem>,
    callback_error?: SpinalCallBackError
  ): Promise<RightsItem> {
    if (typeof callback_success === 'function') {
      if (typeof callback_error === 'undefined') {
        callback_error = defaultCallbackError;
      }
      fs.load_right(ptr, (data: RightsItem, err: boolean): void => {
        if (err) return callback_error();
        else return callback_success(data, err);
      });
    } else {
      return fs.load_right(ptr);
    }
  }

  /**
   * @export
   * @param {FileSystem} fs
   * @param {number} ptr
   * @param {string} file_name
   * @param {number} right_flag
   * @param {string} targetName
   * @return {*}  {void}
   */
  export function share_model(
    fs: FileSystem,
    ptr: number,
    file_name: string,
    right_flag: number,
    targetName: string
  ): void {
    return fs.share_model(ptr, file_name, right_flag, targetName);
  }

  export const right_flag = { AD: 1, WR: 2, RD: 4 };

  /**
   * "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
   * @deprecated
   * @export
   * @param {*} child
   * @param {*} parent
   * @return {*}  {*}
   */
  export function extend(child: any, parent: any): any {
    return FileSystem.extend(child, parent);
  }

  /**
   * default callback function
   * @return {*}  {void}
   */
  function defaultCallbackError(): void {
    return console.log(
      'Model could not be loaded. You can pass a callback to handle this error.'
    );
  }
}
