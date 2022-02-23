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
import type { SpinalLoadCallBack } from '../interfaces/SpinalLoadCallBack';
import { ModelProcessManager } from '../ModelProcessManager';
import type { Model } from '../Models/Model';
import { NewAlertMsg } from '../Utils/DomHelper/NewAlertMsg';
import { getUrlPath } from '../Utils/getUrlPath';
import { Directory } from './Models/Directory';
import type { Path } from './Models/Path';

export class FileSystem {
  static readonly _constructorName: string = 'FileSystem';
  // when object are saved, their _server_id is assigned to a tmp value
  public static debug: boolean = false;
  public static _disp: boolean = false;
  public static popup: NewAlertMsg = undefined;
  public static _cur_tmp_server_id: number = 0;
  public static _sig_server: boolean = true; // if changes has to be sent
  public static _userid: string | number = '644';
  public static _timeout_reconnect: number = 30000;
  public static is_cordova: boolean =
    typeof document !== 'undefined'
      ? document.URL.indexOf('http://') == -1 &&
        document.URL.indexOf('https://') == -1
      : false;

  // data are sent after a timeout (and are concatened before)
  public static _objects_to_send: { [serverId: number]: Model } = {};
  public static _timer_send: ReturnType<typeof setTimeout> = undefined;
  public static _timer_chan: ReturnType<typeof setTimeout> = undefined;

  //  functions to be called after an answer
  public static _nb_callbacks: number = 0;
  public static _callbacks: { [id: number]: SpinalLoadCallBack<Model> } = {};
  public static _type_callbacks: [string, SpinalLoadCallBack<Model>][] = []; // list of callbacks associated to a type: [ [ "type", function ], ... ]

  // instances of FileSystem
  public static _nb_insts: number = 0;
  public static _insts: { [idInstance: number]: FileSystem } = {};

  // ..._server_id -> object
  public static _files_to_upload: { [key: number]: Path } = {}; // ref to Path waiting to be registered before sending data
  public static _ptr_to_update: { [key: number]: Model } = {}; // Ptr objects that need an update, associated with @_tmp_objects
  public static _tmp_objects: { [key: number]: Model } = {}; // objects waiting for a real _server_id
  public static _objects: { [key: number]: Model } = {}; //_server_id -> object

  // url and port of the server
  public static _url: string = '127.0.0.1';
  public static _port: string | number = '8888';

  public static url_com: string = '/sceen/_';
  public static url_upload: string = '/sceen/upload';

  // conector type : Browser or Node
  public static CONNECTOR_TYPE: 'Node' | 'Browser' =
    typeof globalThis.global != 'undefined' ? 'Node' : 'Browser';

  // public static _def: { [constructorName: string]: typeof Model } = {};

  // default values
  public _data_to_send: string = '';
  public _session_num: number = -2;
  public _num_inst: number = FileSystem._nb_insts++;
  public make_channel_error_timer: number = 0;
  public static _password: string;
  static _XMLHttpRequest: any;
  static _home_dir: string;

  public constructor(sessionId?: number) {
    if (typeof global !== 'undefined') {
      const XMLHttpRequest_node = require('xhr2');
      FileSystem._XMLHttpRequest = XMLHttpRequest_node;
    }
    this._num_inst = FileSystem._nb_insts++;
    this.make_channel_error_timer = 0;
    // register this in FileSystem instances
    FileSystem._insts[this._num_inst] = this;
    // first, we need a session id fom the server

    if (!sessionId) {
      if (FileSystem._userid != null) {
        this.send(`U ${FileSystem._userid} ${FileSystem._password} `);
      }
      this.send(`S ${this._num_inst} `);
    } else {
      FileSystem._insts[this._num_inst]._session_num = sessionId;
      FileSystem._insts[this._num_inst].make_channel();
    }
  }

  /**
   * load object in $path and call $callback with the corresponding model ref
   *
   * @param {*} path
   * @param {*} callback
   * @memberof FileSystem
   */
  public load<T extends Model>(
    path: string,
    callback: SpinalLoadCallBack<T>
  ): void {
    FileSystem._send_chan();
    this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    FileSystem._nb_callbacks++;
  }

  // load all the objects of $type
  public load_type<T extends Model>(
    type: string,
    callback: SpinalLoadCallBack<T>
  ): void {
    FileSystem._send_chan();
    this.send(`R 0 ${type} `);
    FileSystem._type_callbacks.push([type, callback]);
  }

  // make dir if not already present in the server. Call callback
  // as in the @load proc -- when done (i.e. when loaded or created)
  public load_or_make_dir(
    dir: string,
    callback: SpinalLoadCallBack<Directory>
  ): void {
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

  // load an object using is pointer and call $callback with the corresponding ref
  public load_ptr<T extends Model>(
    ptr: number,
    callback: SpinalLoadCallBack<T>
  ): void {
    FileSystem._send_chan();
    this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    FileSystem._nb_callbacks++;
  }

  public load_right<T extends Model>(
    ptr: number,
    callback: SpinalLoadCallBack<T>
  ): void {
    FileSystem._send_chan();
    this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
    FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
    FileSystem._nb_callbacks++;
  }

  public share_model(
    ptr: Model,
    file_name: string,
    share_type: number,
    targetName: string
  ): void;
  public share_model(
    ptr: number,
    file_name: string,
    share_type: number,
    targetName: string
  ): void;
  share_model(
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

  // explicitly send a command
  private send(data: string): void {
    this._data_to_send += data;
    if (FileSystem._timer_send == null) {
      FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
    }
  }

  // send a request for a "push" channel
  make_channel(): void {
    let path = getUrlPath(`?s=${this._session_num}`);
    const xhr_object = FileSystem._my_xml_http_request();
    xhr_object.open('GET', path, true);
    xhr_object.onreadystatechange = function (): void {
      if (this.readyState === 4 && this.status === 200) {
        const _fs = FileSystem.get_inst();
        if (_fs.make_channel_error_timer !== 0) {
          _fs.onConnectionError(0);
        }
        _fs.make_channel_error_timer = 0;
        if (FileSystem._disp) {
          console.log('chan ->', this.responseText);
        }
        const created: { cb: SpinalLoadCallBack<Model>; _obj: Model }[] = [];
        function _w(sid: number, obj: string): void {
          const _obj = FileSystem._create_model_by_name(obj);
          if (sid != null && _obj != null) {
            _obj._server_id = sid;
            FileSystem._objects[sid] = _obj;
            for (const [type, cb] of FileSystem._type_callbacks) {
              // @ts-ignore
              const mod_R =
                ModelProcessManager._def[type] ||
                ModelProcessManager.spinal[type];
              if (_obj instanceof mod_R) {
                created.push({ cb, _obj });
              }
            }
          }
        }
        FileSystem._sig_server = false;
        eval(this.responseText);
        FileSystem._sig_server = true;
        for (const { cb, _obj } of created) {
          cb(_obj);
        }
      } else if (this.readyState === 4 && this.status === 0) {
        console.error(`Disconnected from the server with request : ${path}.`);
        const _fs = FileSystem.get_inst();
        if (_fs.make_channel_error_timer === 0) {
          //first disconnect
          console.log('Trying to reconnect.');
          _fs.make_channel_error_timer = Date.now();
          setTimeout(_fs.make_channel.bind(_fs), 1000);
          return _fs.onConnectionError(1);
        } else if (
          Date.now() - _fs.make_channel_error_timer <
          FileSystem._timeout_reconnect
        ) {
          // under timeout
          setTimeout(_fs.make_channel.bind(_fs), 1000); // timeout reached
        } else {
          return _fs.onConnectionError(2);
        }
      } else if (this.readyState === 4 && this.status === 500) {
        FileSystem.get_inst().onConnectionError(3);
      }
    };
    xhr_object.send();
  }

  // default callback on make_channel error after the timeout disconnected reached
  // This method can be surcharged.
  // error_code :
  // 0 = Error resolved
  // 1 = 1st disconnection
  // 2 = disconnection timeout
  // 3 = Server went down Reinit everything
  // 4 = Server down on connection
  onConnectionError(error_code: number): void {
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

  // get the first running inst
  static get_inst(): FileSystem {
    for (const k in FileSystem._insts) {
      return FileSystem._insts[k];
    }
    return new FileSystem();
  }

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

  // send changes of m to instances.
  static signal_change(m: Model): void {
    if (FileSystem._sig_server) {
      FileSystem._objects_to_send[m.model_id] = m;
      if (FileSystem._timer_chan != null) {
        clearTimeout(FileSystem._timer_chan);
      }
      FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
    }
  }

  static _tmp_id_to_real(tmp_id: number, res: number): void {
    const tmp = FileSystem._tmp_objects[tmp_id];
    if (tmp == null) {
      console.log(tmp_id);
    }
    FileSystem._objects[res] = tmp;
    tmp._server_id = res;
    delete FileSystem._tmp_objects[tmp_id];

    const ptr = FileSystem._ptr_to_update[tmp_id];
    if (ptr != null) {
      delete FileSystem._ptr_to_update[tmp_id];
      ptr.data.value = res;
    }
    if (FileSystem._files_to_upload[tmp_id] != null && tmp.file != null) {
      delete FileSystem._files_to_upload[tmp_id];
      // send the file
      const fs = FileSystem.get_inst();
      let path = getUrlPath(`?s=${fs._session_num}&p=${tmp._server_id}`);
      const xhr_object = FileSystem._my_xml_http_request();
      xhr_object.open('PUT', path, true);
      xhr_object.onreadystatechange = function () {
        let _w;
        if (this.readyState === 4 && this.status === 200) {
          _w = function (sid: number, obj: string): Model {
            const _obj: Model = FileSystem._create_model_by_name(obj);
            if (sid != null && _obj != null) {
              _obj._server_id = sid;
              return (FileSystem._objects[sid] = _obj);
            }
          };
          return eval(this.responseText);
        }
      };
      xhr_object.send(tmp.file);
      delete tmp.file;
    }
    return FileSystem.signal_change(FileSystem._objects[res]);
  }

  static _create_model_by_name(name: string): any {
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
      ModelProcessManager._def[name] = new Function(
        `return class ${name} extends ModelProcessManager._def[\"Model\"] {}`
      )();
      return new ModelProcessManager._def[name]();
    }
  }

  static extend(child: any, parent: any): any {
    throw 'FileSystem.extend is a legacy function, do ont use';
  }

  static _get_new_tmp_server_id(): number {
    FileSystem._cur_tmp_server_id++;
    if (FileSystem._cur_tmp_server_id % 4 === 0) {
      FileSystem._cur_tmp_server_id++;
    }
    return FileSystem._cur_tmp_server_id;
  }

  // send changes
  static _send_chan(): void {
    const out = FileSystem._get_chan_data();
    for (const f in FileSystem._insts) {
      FileSystem._insts[f].send(out);
    }
  }

  // timeout for at least one changed object
  static _timeout_chan_func(): void {
    FileSystem._send_chan();
    delete FileSystem._timer_chan;
  }

  // get data of objects to send
  static _get_chan_data(): string {
    const out = {
      cre: '',
      mod: '',
    };
    for (const n in FileSystem._objects_to_send) {
      FileSystem._objects_to_send[n]._get_fs_data(out);
    }
    FileSystem._objects_to_send = {};
    return out.cre + out.mod;
  }

  static _timeout_send_func() {
    // if some model have changed, we have to send the changes now
    const out = FileSystem._get_chan_data();

    for (const k in FileSystem._insts) {
      FileSystem._insts[k]._data_to_send += out;
    }
    // send data
    for (const k in FileSystem._insts) {
      const f = FileSystem._insts[k];
      if (!f._data_to_send.length) {
        continue;
      }
      // if we are waiting for a session id, do not send the data
      // (@responseText will contain another call to @_timeout_send with the session id)
      if (f._session_num === -1) {
        continue;
      }
      // for first call, do not add the session id (but say that we are waiting for one)
      if (f._session_num === -2) {
        f._session_num = -1;
      } else {
        f._data_to_send = `s ${f._session_num} ` + f._data_to_send;
      }
      // request
      let path = getUrlPath();
      const xhr_object = FileSystem._my_xml_http_request();
      xhr_object.open('POST', path, true);
      xhr_object.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          if (FileSystem._disp) {
            console.log('resp ->', this.responseText);
          }
          const _c: [nbCb: number, servId: number, error: boolean][] = []; // callbacks
          const created: { cb: SpinalLoadCallBack<Model>; _obj: Model }[] = [];
          function _w(sid: number, obj: string): void {
            const _obj = FileSystem._create_model_by_name(obj);
            if (sid != null && _obj != null) {
              _obj._server_id = sid;
              FileSystem._objects[sid] = _obj;
              for (const [type, cb] of FileSystem._type_callbacks) {
                const mod_R: typeof Model =
                  ModelProcessManager.spinal[type] ||
                  ModelProcessManager._def[type];
                if (_obj instanceof mod_R) {
                  created.push({ cb, _obj });
                }
              }
            }
          }
          FileSystem._sig_server = false;
          eval(this.responseText);
          FileSystem._sig_server = true;
          for (const { cb, _obj } of created) {
            cb(_obj);
          }
          for (const [nbCb, servId, error] of _c) {
            FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
          }
        } else if (
          this.readyState === 4 &&
          (this.status === 0 || this.status === 500)
        ) {
          return FileSystem.get_inst().onConnectionError(4);
        }
      };
      if (FileSystem._disp) {
        console.log('sent ->', f._data_to_send + 'E ');
      }
      xhr_object.setRequestHeader('Content-Type', 'text/plain');
      xhr_object.send(f._data_to_send + 'E ');
      f._data_to_send = '';
    }

    FileSystem._objects_to_send = {};
    return delete FileSystem._timer_send;
  }

  static _my_xml_http_request(): any {
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
      return new FileSystem._XMLHttpRequest();
    } else {
      console.error('you must define CONNECTOR_TYPE');
    }
  }
}
