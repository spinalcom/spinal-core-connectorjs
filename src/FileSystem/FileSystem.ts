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

import type { IFsData } from '../interfaces/IFsData';
import type {
  IOptionFileSystem,
  IOptionFileSystemWithSessionId,
  IOptionFileSystemWithUser,
} from '../interfaces/IOptionFilesystem';
import type { SpinalLoadCallBack } from '../interfaces/SpinalLoadCallBack';
import { ModelProcessManager } from '../ModelProcessManager';
import type { Model } from '../Models/Model';
import { NewAlertMsg } from '../Utils/DomHelper/NewAlertMsg';
import { getUrlPath } from '../Utils/getUrlPath';
import { waitTimeout } from '../Utils/waitTimeout';
import { Directory } from './Models/Directory';
import type { Path } from './Models/Path';
import type { RightsItem } from './Models/RightsItem';

import axios, { AxiosInstance } from 'axios';
import { SpinalEventEmitter } from '../Utils/SpinalEventEmitter';
import debounce = require('lodash.debounce');

enum EventConnectorJS {
  SEND_RESPONSE_END = 'spinalhub:send:response:end',
  SUBCRIBE_RESPONSE_END = 'spinalhub:subscribe:response:end',
}

/**
 * intance of the connection to an server
 * @export
 * @class FileSystem
 */
export class FileSystem {
  static _constructorName: string = 'FileSystem';
  // when object are saved, their _server_id is assigned to a tmp value
  /**
   *  set to true to get warning for creating unknown Model type
   * @static
   * @type {boolean}
   * @memberof FileSystem
   */
  public static debug: boolean = false;
  /**
   * if true, print the IO with the server
   * @static
   * @type {boolean}
   * @memberof FileSystem
   */
  public static _disp: boolean = false;
  /**
   * @private
   * @static
   * @type {NewAlertMsg}
   * @memberof FileSystem
   */
  private static popup: NewAlertMsg = undefined;
  /**
   * @private
   * @static
   * @type {number}
   * @memberof FileSystem
   */
  private static _cur_tmp_server_id: number = 0;
  /**
   * if true, eval server response.
   * @static
   * @type {boolean}
   * @memberof FileSystem
   */
  public static _sig_server: boolean = true; // if changes has to be sent

  /**
   * @deprecated
   * @readonly
   * @static
   * @type {(string | number)}
   * @memberof FileSystem
   */
  public static readonly _userid: string | number = 644;

  /**
   * @static
   * @type {number}
   * @default 30000
   * @memberof FileSystem
   */
  public static _timeout_reconnect: number = 30000;
  /**
   * @static
   * @type {boolean}
   * @memberof FileSystem
   */
  public static is_cordova: boolean =
    typeof document !== 'undefined'
      ? document.URL.indexOf('http://') == -1 &&
        document.URL.indexOf('https://') == -1
      : false;

  /**
   * data are sent after a timeout (and are concatened before)
   * @static
   * @type Map<number, Model>
   * @memberof FileSystem
   */
  public static _objects_to_send = new Map<number, Model>();

  /**
   * functions to be called after an answer
   * @static
   * @type {number}
   * @memberof FileSystem
   */
  public static _nb_callbacks: number = 0;
  /**
   * @static
   * @type {{ [id: number]: SpinalLoadCallBack<Model> }}
   * @memberof FileSystem
   */
  public static _callbacks: { [id: number]: SpinalLoadCallBack<Model> } = {};
  /**
   * @static
   * @type {[string, SpinalLoadCallBack<Model>][]}
   * @memberof FileSystem
   */
  public static _type_callbacks: [string, SpinalLoadCallBack<Model>][] = []; // list of callbacks associated to a type: [ [ "type", function ], ... ]

  /**
   * number of instances of FileSystem
   * @private
   * @static
   * @type {number}
   * @memberof FileSystem
   */
  private static _nb_insts: number = 0;
  /**
   * @private
   * @static
   * @type {{ [idInstance: number]: FileSystem }}
   * @memberof FileSystem
   */
  private static _insts: { [idInstance: number]: FileSystem } = {};

  /**
   * ref to Path waiting to be registered before sending data
   * @static
   * @type {{ [key: number]: Path }}
   * @memberof FileSystem
   */
  public static _files_to_upload: { [key: number]: Path } = {};
  /**
   * Ptr objects that need an update, associated with FileSystem_tmp_objects
   * @static
   * @type {{ [key: number]: Model }}
   * @memberof FileSystem
   */
  public static _ptr_to_update: { [key: number]: Model } = {};
  /**
   * objects waiting for a real _server_id
   * @static
   * @type {{ [key: number]: Model }}
   * @memberof FileSystem
   */
  public static _tmp_objects: { [key: number]: Model } = {};
  /**
   * _server_id -> object
   * @static
   * @type {{ [key: number]: Model }}
   * @memberof FileSystem
   */
  public static _objects: { [key: number]: Model } = {};

  /**
   * @private
   * @type {string}
   * @memberof FileSystem
   */
  private _url: string = '127.0.0.1';
  /**
   * @private
   * @type {(string | number)}
   * @memberof FileSystem
   */
  private _port: string | number = '8888';
  /**
   * @type {string}
   * @memberof FileSystem
   */
  public _home_dir: string;
  /**
   * @private
   * @type {string}
   * @memberof FileSystem
   */
  private _accessToken: string = null;

  /**
   * @static
   * @type {string}
   * @memberof FileSystem
   */
  public static url_com: string = '/sceen/_';
  /**
   * @static
   * @type {string}
   * @memberof FileSystem
   */
  public static url_upload: string = '/sceen/upload';

  /**
   * conector type : Browser or Node
   * @static
   * @type {('Node' | 'Browser')}
   * @memberof FileSystem
   */
  public static CONNECTOR_TYPE: 'Node' | 'Browser' =
    typeof globalThis.global != 'undefined' ? 'Node' : 'Browser';

  _protocol: string; // 'http:' | 'https:';
  // default values
  public _data_to_send: string = '';
  public _session_num: number = -2;
  public _num_inst: number;
  static _in_mk_chan_eval = false;
  _axiosInst: AxiosInstance;
  static _sending_data: boolean = false;
  static _XMLHttpRequest: any;
  /**
   * debounce from set
   * @static
   * @memberof FileSystem
   */
  static _have_model_changed_debounced = debounce(
    FileSystem._model_changed_func,
    250,
    { leading: false }
  );
  /**
   * debounce from send
   * @static
   * @memberof FileSystem
   */
  static _send_data_to_hub_debounced = debounce(
    FileSystem._send_data_to_hub_func,
    20,
    { leading: false }
  );
  static send_model_limit = 250;

  /**
   * Creates an instance of FileSystem.
   * @param {IOptionFileSystemWithSessionId} {
   *     protocol,
   *     url,
   *     port,
   *     home_dir,
   *     sessionId,
   *     accessToken,
   *   }
   * @memberof FileSystem
   */
  public constructor({
    protocol,
    url,
    port,
    home_dir,
    sessionId,
    accessToken,
  }: IOptionFileSystemWithSessionId);

  /**
   * Creates an instance of FileSystem.
   * @param {IOptionFileSystemWithUser} {
   *     protocol,
   *     url,
   *     port,
   *     userid,
   *     password,
   *     home_dir,
   *     accessToken,
   *   }
   * @memberof FileSystem
   */
  public constructor({
    protocol,
    url,
    port,
    userid,
    password,
    home_dir,
    accessToken,
  }: IOptionFileSystemWithUser);

  public constructor({
    protocol,
    url,
    port,
    home_dir,
    userid,
    password,
    sessionId,
    accessToken,
  }: IOptionFileSystem) {
    this._protocol = protocol ? protocol : 'http:';
    this._url = url;
    this._port = port;
    this._home_dir = home_dir;
    if (typeof accessToken === 'string') {
      let _accessToken = accessToken.startsWith('Bearer ')
        ? accessToken
        : `Bearer ${accessToken}`;
      this._accessToken = _accessToken;
    }
    this._num_inst = FileSystem._nb_insts++;
    // register this in FileSystem instances
    FileSystem._insts[this._num_inst] = this;
    // first, we need a session id fom the server

    if (!sessionId) {
      if (userid != null) {
        this.send(`U ${userid} ${password} `);
      }
      this.send(`S ${this._num_inst} `);
    } else {
      FileSystem._insts[this._num_inst]._session_num = sessionId;
    }

    this._axiosInst = axios.create({
      headers: {
        authorization: this._accessToken,
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    this.make_channel_loop();
  }

  /**
   * load object in $path and call $callback with the corresponding model ref
   * @param {string} path
   * @return {*}  {Promise<Directory>}
   * @memberof FileSystem
   */
  public load(path: string): Promise<Directory>;
  /**
   * load object in $path and call $callback with the corresponding model ref
   * @template T
   * @param {string} path
   * @param {SpinalLoadCallBack<T>} callback
   * @memberof FileSystem
   */
  public load(path: string, callback: SpinalLoadCallBack<Directory>): void;
  public load(
    path: string,
    callback?: SpinalLoadCallBack<Directory>
  ): Promise<Directory> {
    if (typeof callback === 'undefined') {
      return new Promise((resolve, reject): void => {
        FileSystem._send_chan();
        this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = (
          model: Directory,
          isError: boolean
        ): void => {
          if (!model || isError) reject(new Error('Error Load'));
          resolve(model);
        };
        FileSystem._nb_callbacks++;
      });
    }
    FileSystem._send_chan();
    this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    FileSystem._nb_callbacks++;
  }

  /**
   * load all the objects of $type
   * @template T
   * @param {string} type
   * @param {SpinalLoadCallBack<T>} callback
   * @memberof FileSystem
   */
  public load_type<T extends Model>(
    type: string,
    callback: SpinalLoadCallBack<T>
  ): void {
    FileSystem._send_chan();
    this.send(`R 0 ${type} `);
    FileSystem._type_callbacks.push([type, callback]);
  }

  private async load_or_make_dirProm(dir: string): Promise<Directory> {
    try {
      const res: Directory = await this.load(dir);
      return res;
    } catch (error) {
      if (dir === '/') throw error;
      const lst = dir
        .split('/')
        .reduce((acc: string[], v: string): string[] => {
          if (v.length) acc.push(v);
          return acc;
        }, []);
      const nir = lst.pop();
      const oir = '/' + lst.join('/');
      try {
        const n_res = await this.load_or_make_dirProm(oir);
        const n_dir = new Directory();
        n_res.add_file(nir, n_dir);
        return n_dir;
      } catch (error) {
        throw error;
      }
    }
  }

  /**
   * make dir if not already present in the server. Call callback
   * as in the @load proc -- when done (i.e. when loaded or created)
   * @param {string} dir
   * @return {*}  {Promise<Directory>}
   * @memberof FileSystem
   */
  public load_or_make_dir(dir: string): Promise<Directory>;
  /**
   * make dir if not already present in the server. Call callback
   * as in the @load proc -- when done (i.e. when loaded or created)
   * @param {string} dir
   * @param {SpinalLoadCallBack<Directory>} callback
   * @memberof FileSystem
   */
  public load_or_make_dir(
    dir: string,
    callback: SpinalLoadCallBack<Directory>
  ): void;
  public load_or_make_dir(
    dir: string,
    callback?: SpinalLoadCallBack<Directory>
  ): Promise<Directory> {
    if (typeof callback === 'undefined') return this.load_or_make_dirProm(dir);
    this.load(dir, (res: Directory, err): void => {
      if (err) {
        if (dir === '/') {
          return callback(null, err);
        } else {
          const lst = dir
            .split('/')
            .reduce((acc: string[], v: string): string[] => {
              if (v.length) acc.push(v);
              return acc;
            }, []);
          const nir = lst.pop();
          const oir = '/' + lst.join('/');
          this.load_or_make_dir(oir, (n_res: Directory, n_err): void => {
            if (n_err) {
              return callback(null, n_err);
            } else {
              const n_dir = new Directory();
              n_res.add_file(nir, n_dir);
              return callback(n_dir, n_err);
            }
          });
        }
      } else {
        return callback(res, err);
      }
    });
  }

  /**
   * load an object using is pointer and call $callback with the corresponding ref
   * @template T
   * @param {number} ptr
   * @return {*}  {Promise<T>}
   * @memberof FileSystem
   */
  public load_ptr<T extends Model>(ptr: number): Promise<T>;
  /**
   * load an object using is pointer and call $callback with the corresponding ref
   * @template T
   * @param {number} ptr
   * @param {SpinalLoadCallBack<T>} callback
   * @memberof FileSystem
   */
  public load_ptr<T extends Model>(
    ptr: number,
    callback: SpinalLoadCallBack<T>
  ): void;
  public load_ptr<T extends Model>(
    ptr: number,
    callback?: SpinalLoadCallBack<T>
  ): Promise<T> {
    if (typeof callback === 'undefined') {
      if (!ptr) return Promise.reject('Error Load ptr');
      if (typeof FileSystem._objects[ptr] !== 'undefined') {
        return Promise.resolve(<T>FileSystem._objects[ptr]);
      }
      return new Promise((resolve, reject): void => {
        FileSystem._send_chan();
        this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = (
          model: T,
          isError: boolean
        ): void => {
          if (!model || isError) reject(new Error('Error Load ptr'));
          resolve(model);
        };
        FileSystem._nb_callbacks++;
      });
    }
    if (!ptr) setImmediate((): void => callback(undefined));
    else if (typeof FileSystem._objects[ptr] !== 'undefined') {
      setImmediate((): void => callback(<T>FileSystem._objects[ptr]));
    } else {
      FileSystem._send_chan();
      this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
      FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
      FileSystem._nb_callbacks++;
    }
  }

  public load_right(ptr: number): Promise<RightsItem>;
  public load_right(
    ptr: number,
    callback: SpinalLoadCallBack<RightsItem>
  ): void;
  public load_right(
    ptr: number,
    callback?: SpinalLoadCallBack<RightsItem>
  ): Promise<RightsItem> {
    if (typeof callback === 'undefined') {
      return new Promise((resolve, reject): void => {
        FileSystem._send_chan();
        this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = (
          model: RightsItem
        ): void => {
          if (!model) reject(new Error('Error load_right'));
          resolve(model);
        };
        FileSystem._nb_callbacks++;
      });
    }
    FileSystem._send_chan();
    this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    FileSystem._nb_callbacks++;
  }

  /**
   * @param {(Model | number)} ptr
   * @param {string} file_name
   * @param {number} share_type
   * @param {string} targetName
   * @memberof FileSystem
   */
  public share_model(
    ptr: Model | number,
    file_name: string,
    share_type: number,
    targetName: string
  ): void {
    FileSystem._send_chan();
    this.send(
      `h ${
        typeof ptr === 'number' ? ptr : ptr._server_id
      } ${share_type} ${encodeURI(targetName)} ${encodeURI(file_name)} `
    );
  }

  /**
   * explicitly send a command
   * @private
   * @param {string} data
   * @memberof FileSystem
   */
  private send(data: string): void {
    this._data_to_send += data;
    FileSystem._send_data_to_hub_debounced();
  }

  /**
   * debounced function to send data to the server
   * @private
   * @static
   * @return {*}
   * @memberof FileSystem
   */
  private static async _send_data_to_hub_func() {
    if (FileSystem._sending_data === true) {
      FileSystem._send_data_to_hub_debounced();
      return;
    }
    const map_prom = [];
    for (const k in FileSystem._insts) {
      map_prom.push(FileSystem._insts[k]._send_data_to_hub_instance());
    }
    try {
      await Promise.all(map_prom);
    } catch (error) {
      console.log(error);
      return FileSystem.onConnectionError(4);
    }
    FileSystem._sending_data = false;
    if (FileSystem._objects_to_send.size !== 0) {
      this._send_chan();
    } else {
      SpinalEventEmitter.getInstance().emit(EventConnectorJS.SEND_RESPONSE_END);
    }
  }

  /**
   * send the data to the server
   * @private
   * @return {*}
   * @memberof FileSystem
   */
  private async _send_data_to_hub_instance() {
    if (this._data_to_send.length === 0 || this._session_num === -1) return;
    FileSystem._sending_data = true;
    if (this._session_num === -2) {
      this._session_num = -1;
    } else {
      this._data_to_send = `s ${this._session_num} ${this._data_to_send}`;
    }
    const tmp_data = this._data_to_send + 'E ';
    this._data_to_send = '';
    let path = getUrlPath(this._protocol, this._url, this._port);
    if (FileSystem._disp) console.log('sent ->', tmp_data);
    try {
      const response = await this._axiosInst.post<string>(path, tmp_data, {
        headers: {
          'Content-Type': 'text/plain',
          authorization: this._accessToken,
        },
      });
      this.send_data_eval(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 0 ||
          (error.response.status >= 400 && error.response.status < 600))
      ) {
        console.error(
          'Error sending data to the server, status=',
          error.response?.status,
          'data=',
          error.response?.data
        );
        FileSystem.onConnectionError(4);
      } else {
        console.error('Error sending data to the server', error);
      }
    }
  }
  private send_data_eval(responseText: string): void {
    if (FileSystem._disp) console.log('resp ->', responseText);
    const _c: [nbCb: number, servId: number, error: boolean][] = []; // callbacks
    const created: { cb: SpinalLoadCallBack<Model>; _obj: Model }[] = [];
    const _w = (sid: number, className: string): void => {
      const _obj = FileSystem._create_model_by_name(className);
      if (sid != null && _obj != null) {
        _obj._server_id = sid;
        FileSystem._objects[sid] = _obj;
        for (const [type, cb] of FileSystem._type_callbacks) {
          const mod_R: typeof Model =
            ModelProcessManager.spinal[type] || ModelProcessManager._def[type];
          if (_obj instanceof mod_R) {
            created.push({ cb, _obj });
          }
        }
      }
    };
    FileSystem._sig_server = false;
    eval(responseText);
    FileSystem._sig_server = true;
    for (const { cb, _obj } of created) {
      cb(_obj);
    }
    for (const [nbCb, servId, error] of _c) {
      if (servId != 0 && typeof FileSystem._objects[servId] === 'undefined') {
        const interval = setInterval((): void => {
          if (typeof FileSystem._objects[servId] !== 'undefined') {
            clearInterval(interval);
            FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
          }
        }, 200);
      } else FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
    }
  }

  private make_channel_eval(responseText: string): void {
    if (FileSystem._disp) {
      console.log('chan ->', responseText);
    }
    const created: { cb: SpinalLoadCallBack<Model>; _obj: Model }[] = [];
    const _w = (sid: number, obj: string): void => {
      const _obj = FileSystem._create_model_by_name(obj);
      if (sid != null && _obj != null) {
        _obj._server_id = sid;
        FileSystem._objects[sid] = _obj;
        for (const [type, cb] of FileSystem._type_callbacks) {
          // @ts-ignore
          const mod_R =
            ModelProcessManager._def[type] || ModelProcessManager.spinal[type];
          if (_obj instanceof mod_R) {
            created.push({ cb, _obj });
          }
        }
      }
    };
    FileSystem._sig_server = false;
    eval(responseText);
    FileSystem._sig_server = true;
    for (const { cb, _obj } of created) cb(_obj);
  }

  private async make_channel_loop(): Promise<void> {
    if (this._session_num <= 0) {
      // wait for the end of the 1st response from the server
      await SpinalEventEmitter.getInstance().waitEvt(
        EventConnectorJS.SEND_RESPONSE_END
      );
    }
    while (true) {
      const data = await this._send_make_channel();
      FileSystem._in_mk_chan_eval = true;
      if (FileSystem._sending_data === true) {
        await SpinalEventEmitter.getInstance().waitEvt(
          EventConnectorJS.SEND_RESPONSE_END
        );
      }
      this.make_channel_eval(data);
      FileSystem._in_mk_chan_eval = false;
      SpinalEventEmitter.getInstance().emit(
        EventConnectorJS.SUBCRIBE_RESPONSE_END
      );
    }
  }

  private async _send_make_channel(): Promise<string> {
    let startDate = Date.now();
    while (true) {
      if (Date.now() - startDate > FileSystem._timeout_reconnect) {
        FileSystem.onConnectionError(2);
        return;
      }
      try {
        const res = await this._axiosInst.get(
          getUrlPath(
            this._protocol,
            this._url,
            this._port,
            '?s=' + this._session_num
          )
        );
        return res.data;
      } catch (error) {
        if (!error.response)
          console.error('Error sending data to the server', error);
        else if (
          error.response.status === 401 ||
          (error.response.status >= 500 && error.response.status < 600)
        )
          throw FileSystem.onConnectionError(3);
        console.log('Trying to reconnect.');
        FileSystem.onConnectionError(1);
        await waitTimeout(1000);
      }
    }
  }

  static async _model_changed_func(): Promise<void> {
    if (FileSystem._in_mk_chan_eval === true) {
      await SpinalEventEmitter.getInstance().waitEvt(
        EventConnectorJS.SUBCRIBE_RESPONSE_END
      );
    }
    FileSystem._send_chan();
  }

  /**
   * send a request for a "push" channel.
   * Called in the server response
   * @private
   * @memberof FileSystem
   * @deprecated
   */
  private make_channel(): void {
    // Called in the server response
    // leave empty
  }

  /**
   * to be refedifined to change the handleing for connections error
   * @static
   * @memberof FileSystem
   */
  public static onConnectionError: (error_code: number) => void =
    FileSystem._onConnectionError;

  /**
   * default callback on make_channel error after the timeout disconnected reached
   * This method can be surcharged.
   * error_code :
   * - 0 = Error resolved
   * - 1 = 1st disconnection
   * - 2 = disconnection timeout
   * - 3 = Server went down Reinit everything
   * - 4 = Server down on connection
   * @private
   * @static
   * @param {number} error_code
   * @memberof FileSystem
   */
  private static _onConnectionError(error_code: number): void {
    let msg = '';
    if (error_code === 0) {
      // Error resolved
      if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
        FileSystem.popup.hide();
      } else {
        console.log('Reconnected to the server.');
      }
    } else if (error_code === 1) {
      // 1st disconnection
      if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
        msg = 'Disconnected from the server, trying to reconnect...';
      } else {
        console.error('Disconnected from the server, trying to reconnect...');
      }
    } else if (error_code === 2 || error_code === 3 || error_code === 4) {
      if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
        msg = 'Disconnected from the server, please refresh the window.';
      } else if (FileSystem.CONNECTOR_TYPE === 'Node') {
        console.error('Disconnected from the server.');
        process.exit();
      } else {
        console.error('Disconnected from the server.');
      }
    }
    if (msg !== '') {
      if (typeof FileSystem.popup === 'undefined') {
        FileSystem.popup = new NewAlertMsg({
          parent: document.getElementsByTagName('BODY')[0],
          msg: msg,
          btn: [
            {
              txt: 'reload page',
              click: window.location.reload.bind(window.location),
              backgroundColor: '#ff5b57',
            },
            {
              txt: 'close',
              backgroundColor: '#348fe2',
              click: function () {
                return FileSystem.popup.hide();
              },
            },
          ],
        });
      } else {
        FileSystem.popup.show();
      }
      if (error_code === 2 || error_code === 3 || error_code === 4) {
        FileSystem.popup.show_btn();
      } else {
        FileSystem.popup.hide_btn();
      }
      FileSystem.popup.setMsg(msg);
    }
  }

  /**
   * get the first running inst
   * @static
   * @return {*}  {FileSystem}
   * @memberof FileSystem
   */
  static get_inst(): FileSystem {
    for (const k in FileSystem._insts) {
      return FileSystem._insts[k];
    }
  }

  /**
   * @static
   * @param {IFsData} out
   * @param {Model} obj
   * @memberof FileSystem
   */
  static set_server_id_if_necessary(out: IFsData, obj: Model): void {
    if (obj._server_id == null) {
      // registering
      obj._server_id = FileSystem._get_new_tmp_server_id();
      FileSystem._tmp_objects[obj._server_id] = obj;
      // new object
      let ncl = ModelProcessManager.get_object_class(obj);
      if (obj._underlying_fs_type != null) {
        out.mod += `T ${obj._server_id} ${ncl} `;
        ncl = obj._underlying_fs_type();
      }
      out.cre += `N ${obj._server_id} ${ncl} `;
      // data
      obj._get_fs_data(out);
    }
  }

  /**
   * send changes of m to instances.
   * @static
   * @param {Model} m
   * @memberof FileSystem
   */
  static signal_change(m: Model): void {
    if (FileSystem._sig_server) {
      FileSystem._objects_to_send.set(m.model_id, m);
      this._have_model_changed_debounced();
    }
  }

  /**
   * @static
   * @param {number} tmp_id
   * @param {number} res
   * @return {*}  {void}
   * @memberof FileSystem
   */
  static async _tmp_id_to_real(tmp_id: number, res: number): Promise<void> {
    const tmp = FileSystem._tmp_objects[tmp_id];
    FileSystem._objects[res] = tmp;
    tmp._server_id = res;
    delete FileSystem._tmp_objects[tmp_id];

    const ptr = FileSystem._ptr_to_update[tmp_id];
    if (ptr != null) {
      delete FileSystem._ptr_to_update[tmp_id];
      ptr.data.value = res;
    }
    FileSystem.signal_change(FileSystem._objects[res]);
    if (FileSystem._files_to_upload[tmp_id] != null && tmp.file != null) {
      const p = FileSystem._files_to_upload[tmp_id];
      delete FileSystem._files_to_upload[tmp_id];
      // send the file
      const fs = FileSystem.get_inst();
      let path = getUrlPath(
        fs._protocol,
        fs._url,
        fs._port,
        `?s=${fs._session_num}&p=${p._server_id}`
      );
      try {
        const contentType = p.mimeType
          ? p.mimeType
          : 'application/octet-stream';
        await fs._axiosInst.put(path, tmp.file, {
          headers: {
            'Content-Type': contentType,
          },
        });
        delete tmp.file;
        tmp.remaining.set(0);
      } catch (error) {
        console.error('Error sending file', error.response);
      }
    }
  }

  private static _create_model_by_name(name: string): any {
    if (typeof name !== 'string') {
      return name; // for old spinalcore version
    }
    if (typeof ModelProcessManager._def[name] !== 'undefined') {
      return new ModelProcessManager._def[name]();
    }
    if (typeof ModelProcessManager.spinal[name] === 'undefined') {
      if (FileSystem.debug === true) {
        console.warn(`Got Model type \"${name}\" from hub but not registered.`);
      }
      ModelProcessManager.spinal[name] = new Function(
        `return class ${name} extends ModelProcessManager._def[\"Model\"] {}`
      )();
      return new ModelProcessManager.spinal[name]();
    }
    return new ModelProcessManager.spinal[name]();
  }

  /**
   * @deprecated
   * @static
   * @param {*} _child
   * @param {*} _parent
   * @return {*}  {*}
   * @memberof FileSystem
   */
  static extend(_child: any, _parent: any): any {
    throw 'FileSystem.extend is a legacy function, do not use';
  }

  /**
   * @private
   * @static
   * @return {*}  {number}
   * @memberof FileSystem
   */
  private static _get_new_tmp_server_id(): number {
    FileSystem._cur_tmp_server_id++;
    if (FileSystem._cur_tmp_server_id % 4 === 0) {
      FileSystem._cur_tmp_server_id++;
    }
    return FileSystem._cur_tmp_server_id;
  }

  /**
   * send changes
   * @private
   * @static
   * @memberof FileSystem
   */
  private static _send_chan(): void {
    const out = FileSystem._get_chan_data();
    for (const f in FileSystem._insts) {
      FileSystem._insts[f].send(out);
    }
  }

  /**
   * get data of objects to send
   * @private
   * @static
   * @return {*}  {string}
   * @memberof FileSystem
   */
  private static _get_chan_data(): string {
    const out = {
      cre: '',
      mod: '',
    };
    let nb_model = 0;
    for (const [id, model] of FileSystem._objects_to_send) {
      nb_model++;
      if (nb_model > FileSystem.send_model_limit) break;
      model._get_fs_data(out);
      FileSystem._objects_to_send.delete(id);
    }
    return out.cre + out.mod;
  }

  /**
   * @private
   * @static
   * @memberof FileSystem
   * @deprecated
   * do not remove used in eval
   */
  private static _timeout_send_func(): void {}

  /**
   * @static
   * @return {*}  {*}
   * @memberof FileSystem
   */
  public static _my_xml_http_request(): any {
    if (FileSystem.CONNECTOR_TYPE === 'Browser') {
      if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
      if (window.ActiveXObject) {
        return new ActiveXObject('Microsoft.XMLHTTP');
      }
      return alert(
        'Your browser does not seem to support XMLHTTPRequest objects...'
      );
    } else if (FileSystem.CONNECTOR_TYPE === 'Node') {
      if (!FileSystem._XMLHttpRequest) {
        const XMLHttpRequest_node = require('xhr2');
        FileSystem._XMLHttpRequest = XMLHttpRequest_node;
      }
      return new FileSystem._XMLHttpRequest();
    } else {
      console.error('you must define CONNECTOR_TYPE');
    }
  }
}
