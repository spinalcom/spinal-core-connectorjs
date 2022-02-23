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
import type { ISpinalModel } from './interfaces/ISpinalModels';
import type { SpinalCallBackError } from './interfaces/SpinalCallBackError';
import type { SpinalLoadCallBack } from './interfaces/SpinalLoadCallBack';
import type { SpinalLoadCallBackSucess } from './interfaces/SpinalLoadCallBackSucess';
import type { SpinalStoreCallBackSucess } from './interfaces/SpinalStoreCallBackSucess';
import { ModelProcessManager } from './ModelProcessManager';
import type { Model } from './Models/Model';

export namespace spinalCore {
  export const _def: ISpinalModel = ModelProcessManager._def;
  export const version = '2.5.0';

  export function connect(options: URL | string): FileSystem {
    const parsedOpt = typeof options === 'string' ? new URL(options) : options;
    if (parsedOpt.pathname.slice(-1)[0] !== '/') {
      parsedOpt.pathname += '/';
    }
    FileSystem._home_dir = parsedOpt.pathname;
    FileSystem._url = parsedOpt.hostname;
    FileSystem._port = parsedOpt.port;
    if (parsedOpt.username) {
      FileSystem._userid = parsedOpt.username;
      if (parsedOpt.password) {
        FileSystem._password = parsedOpt.password;
      }
    } else {
      // set default user id
      FileSystem._userid = 644;
      FileSystem._password = '';
    }
    return new FileSystem();
  }

  // stores a model in the file system
  export function store(
    fs: FileSystem,
    model: Model,
    path: string,
    callback_success: SpinalStoreCallBackSucess,
    callback_error?: SpinalCallBackError
  ): void {
    if (typeof callback_error === 'undefined') {
      callback_error = function () {
        return console.log(
          'Model could not be stored. You can pass a callback to handle this error.'
        );
      };
    }
    // Parse path
    const lst = path.split('/');
    const file_name = lst.pop();
    if (lst[0] === '') lst.splice(0, 1);
    path = lst.join('/'); // Absolute paths are not allowed
    return fs.load_or_make_dir(
      FileSystem._home_dir + path,
      function (dir: Directory, err: boolean): void {
        if (err) {
          callback_error();
        } else {
          const file = dir.detect(
            (x: File): boolean => x.name.get() === file_name
          );
          if (file != null) dir.remove(file);
          dir.add_file(file_name, model, {
            model_type: 'Model',
          });
          callback_success();
        }
      }
    );
  }

  export const register_models = ModelProcessManager.register_models;

  // loads a model from the file system
  export function load(
    fs: FileSystem,
    path: string,
    callback_success: SpinalLoadCallBackSucess,
    callback_error?: SpinalCallBackError
  ): void {
    if (typeof callback_error === 'undefined') {
      callback_error = function () {
        return console.log(
          'Model could not be loaded. You can pass a callback to handle this error.'
        );
      };
    }
    // Parse path
    const lst = path.split('/');
    const file_name = lst.pop();
    if (lst[0] === '') lst.splice(0, 1);
    path = lst.join('/'); // Absolute paths are not allowed
    return fs.load_or_make_dir(
      `${FileSystem._home_dir}${path}`,
      (current_dir: Directory, err: boolean): void => {
        if (err) {
          return callback_error();
        } else {
          const file = current_dir.detect(
            (x: File): boolean => x.name.get() === file_name
          );
          if (file != null) {
            return file.load((data: Model, err: boolean): void => {
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

  // loads all the models of a specific type
  export function load_type<T extends Model>(
    fs: FileSystem,
    type: string,
    callback_success: SpinalLoadCallBack<T>,
    callback_error?: SpinalCallBackError
  ) {
    if (typeof callback_error === 'undefined') {
      callback_error = function () {
        return console.log(
          'Model of this type could not be loaded. ' +
            'You can pass a callback to handle this error.'
        );
      };
    }
    return fs.load_type(type, (data: T, error: boolean): void => {
      if (!data || error) callback_error();
      else callback_success(data, error);
    });
  }

  export function load_right<T extends Model>(
    fs: FileSystem,
    ptr: number,
    callback_success: SpinalLoadCallBack<T>,
    callback_error?: SpinalCallBackError
  ): void {
    if (typeof callback_error === 'undefined') {
      callback_error = function () {
        return console.log(
          'Model Right could not be loaded.' +
            ' You can pass a callback to handle this error.'
        );
      };
    }
    return fs.load_right(ptr, (data: T, err: boolean): void => {
      if (err) return callback_error();
      else return callback_success(data, err);
    });
  }

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

  // "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
  export function extend(child: any, parent: any): any {
    return FileSystem.extend(child, parent);
  }
}
