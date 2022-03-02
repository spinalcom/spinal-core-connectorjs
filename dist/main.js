var $8zHUo$process = require("process");
var $8zHUo$xhr2 = require("xhr2");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire9708"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire9708"] = parcelRequire;
}
parcelRequire.register("kTWwb", function(module, exports) {

$parcel$export(module.exports, "FileSystem", () => FileSystem, (v) => FileSystem = v);

var $kpG8j = parcelRequire("kpG8j");

var $8ITXC = parcelRequire("8ITXC");

var $bXDXC = parcelRequire("bXDXC");

var $bu6Xb = parcelRequire("bu6Xb");

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
 */ var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class FileSystem {
    constructor({ url , port , home_dir , userid , password , sessionId , accessToken ,  }){
        // url and port of the server
        this._url = '127.0.0.1';
        this._port = '8888';
        this._accessToken = null;
        // default values
        this._data_to_send = '';
        this._session_num = -2;
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        this._url = url;
        this._port = port;
        this._home_dir = home_dir;
        this._accessToken = accessToken;
        if (typeof $parcel$global !== 'undefined') {
            const XMLHttpRequest_node = $8zHUo$xhr2;
            FileSystem._XMLHttpRequest = XMLHttpRequest_node;
        }
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        // register this in FileSystem instances
        FileSystem._insts[this._num_inst] = this;
        // first, we need a session id fom the server
        if (!sessionId) {
            if (userid != null) this.send(`U ${userid} ${password} `);
            this.send(`S ${this._num_inst} `);
        } else {
            FileSystem._insts[this._num_inst]._session_num = sessionId;
            FileSystem._insts[this._num_inst].make_channel();
        }
    }
    static get _userid() {
        console.warn('Using FileSystem._userid is deprecated.');
        return 644;
    }
    load(path, callback) {
        if (typeof callback === 'undefined') return new Promise((resolve, reject)=>{
            FileSystem._send_chan();
            this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
            FileSystem._callbacks[FileSystem._nb_callbacks] = (model, isError)=>{
                if (!model || isError) reject(new Error('Error Load'));
                resolve(model);
            };
            FileSystem._nb_callbacks++;
        });
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
     */ load_type(type, callback) {
        FileSystem._send_chan();
        this.send(`R 0 ${type} `);
        FileSystem._type_callbacks.push([
            type,
            callback
        ]);
    }
    load_or_make_dirProm(dir) {
        return __awaiter(this, void 0, void 0, function*() {
            try {
                const res = yield this.load(dir);
                return res;
            } catch (error) {
                if (dir === '/') throw error;
                const lst = dir.split('/').reduce((acc, v)=>{
                    if (v.length) acc.push(v);
                    return acc;
                }, []);
                const nir = lst.pop();
                const oir = '/' + lst.join('/');
                try {
                    const n_res = yield this.load_or_make_dirProm(oir);
                    const n_dir = new $bu6Xb.Directory();
                    n_res.add_file(nir, n_dir);
                    return n_dir;
                } catch (error) {
                    throw error;
                }
            }
        });
    }
    load_or_make_dir(dir, callback) {
        if (typeof callback === 'undefined') return this.load_or_make_dirProm(dir);
        this.load(dir, (res, err)=>{
            if (err) {
                if (dir === '/') return callback(null, err);
                else {
                    const lst = dir.split('/').reduce((acc, v)=>{
                        if (v.length) acc.push(v);
                        return acc;
                    }, []);
                    const nir = lst.pop();
                    const oir = '/' + lst.join('/');
                    this.load_or_make_dir(oir, (n_res, n_err)=>{
                        if (n_err) return callback(null, n_err);
                        else {
                            const n_dir = new $bu6Xb.Directory();
                            n_res.add_file(nir, n_dir);
                            return callback(n_dir, n_err);
                        }
                    });
                }
            } else return callback(res, err);
        });
    }
    load_ptr(ptr, callback) {
        if (typeof callback === 'undefined') {
            if (!ptr) return Promise.reject('Error Load ptr');
            if (typeof FileSystem._objects[ptr] !== 'undefined') return Promise.resolve(FileSystem._objects[ptr]);
            return new Promise((resolve, reject)=>{
                FileSystem._send_chan();
                this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
                FileSystem._callbacks[FileSystem._nb_callbacks] = (model, isError)=>{
                    if (!model || isError) reject(new Error('Error Load ptr'));
                    resolve(model);
                };
                FileSystem._nb_callbacks++;
            });
        }
        if (!ptr) setImmediate(()=>callback(undefined)
        );
        else if (typeof FileSystem._objects[ptr] !== 'undefined') setImmediate(()=>callback(FileSystem._objects[ptr])
        );
        else {
            FileSystem._send_chan();
            this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
            FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
            FileSystem._nb_callbacks++;
        }
    }
    load_right(ptr, callback) {
        if (typeof callback === 'undefined') return new Promise((resolve, reject)=>{
            FileSystem._send_chan();
            this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
            FileSystem._callbacks[FileSystem._nb_callbacks] = (model)=>{
                if (!model) reject(new Error('Error load_right'));
                resolve(model);
            };
            FileSystem._nb_callbacks++;
        });
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
     */ share_model(ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        this.send(`h ${typeof ptr === 'number' ? ptr : ptr._server_id} ${share_type} ${encodeURI(targetName)} ${encodeURI(file_name)} `);
    }
    /**
     * explicitly send a command
     * @private
     * @param {string} data
     * @memberof FileSystem
     */ send(data) {
        this._data_to_send += data;
        if (FileSystem._timer_send == null) FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
    }
    /**
     * send a request for a "push" channel
     * @private
     * @memberof FileSystem
     */ make_channel() {
        const fs = FileSystem.get_inst();
        let path = $bXDXC.getUrlPath(fs._url, fs._port, `?s=${this._session_num}`);
        const xhr_object = FileSystem._my_xml_http_request();
        if (fs._accessToken) xhr_object.setRequestHeader('x-access-token', fs._accessToken);
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (fs.make_channel_error_timer !== 0) FileSystem.onConnectionError(0);
                fs.make_channel_error_timer = 0;
                if (FileSystem._disp) console.log('chan ->', this.responseText);
                const created = [];
                function _w(sid, obj) {
                    const _obj = FileSystem._create_model_by_name(obj);
                    if (sid != null && _obj != null) {
                        _obj._server_id = sid;
                        FileSystem._objects[sid] = _obj;
                        for (const [type, cb] of FileSystem._type_callbacks){
                            // @ts-ignore
                            const mod_R = $kpG8j.ModelProcessManager._def[type] || $kpG8j.ModelProcessManager.spinal[type];
                            if (_obj instanceof mod_R) created.push({
                                cb,
                                _obj
                            });
                        }
                    }
                }
                FileSystem._sig_server = false;
                eval(this.responseText);
                FileSystem._sig_server = true;
                for (const { cb: cb1 , _obj: _obj1  } of created)cb1(_obj1);
            } else if (this.readyState === 4 && this.status === 0) {
                console.error(`Disconnected from the server with request : ${path}.`);
                if (fs.make_channel_error_timer === 0) {
                    //first disconnect
                    console.log('Trying to reconnect.');
                    fs.make_channel_error_timer = Date.now();
                    setTimeout(fs.make_channel.bind(fs), 1000);
                    return FileSystem.onConnectionError(1);
                } else if (Date.now() - fs.make_channel_error_timer < FileSystem._timeout_reconnect) // under timeout
                setTimeout(fs.make_channel.bind(fs), 1000); // timeout reached
                else return FileSystem.onConnectionError(2);
            } else if (this.readyState === 4 && this.status === 500) FileSystem.onConnectionError(3);
        };
        xhr_object.send();
    }
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
     */ static onConnectionError(error_code) {
        let msg = '';
        if (error_code === 0) {
            // Error resolved
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) FileSystem.popup.hide();
            else console.log('Reconnected to the server.');
        } else if (error_code === 1) {
            // 1st disconnection
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) msg = 'Disconnected from the server, trying to reconnect...';
            else console.error('Disconnected from the server, trying to reconnect...');
        } else if (error_code === 2 || error_code === 3 || error_code === 4) {
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) msg = 'Disconnected from the server, please refresh the window.';
            else if (FileSystem.CONNECTOR_TYPE === 'Node') {
                console.error('Disconnected from the server.');
                $8zHUo$process.exit();
            } else console.error('Disconnected from the server.');
        }
        if (msg !== '') {
            if (typeof FileSystem.popup === 'undefined') FileSystem.popup = new $8ITXC.NewAlertMsg({
                parent: document.getElementsByTagName('BODY')[0],
                msg: msg,
                btn: [
                    {
                        txt: 'reload page',
                        click: window.location.reload.bind(window.location),
                        backgroundColor: '#ff5b57'
                    },
                    {
                        txt: 'close',
                        backgroundColor: '#348fe2',
                        click: function() {
                            return FileSystem.popup.hide();
                        }
                    }, 
                ]
            });
            else FileSystem.popup.show();
            if (error_code === 2 || error_code === 3 || error_code === 4) FileSystem.popup.show_btn();
            else FileSystem.popup.hide_btn();
            FileSystem.popup.setMsg(msg);
        }
    }
    /**
     * get the first running inst
     * @static
     * @return {*}  {FileSystem}
     * @memberof FileSystem
     */ static get_inst() {
        for(const k in FileSystem._insts)return FileSystem._insts[k];
    }
    /**
     * @static
     * @param {IFsData} out
     * @param {Model} obj
     * @memberof FileSystem
     */ static set_server_id_if_necessary(out, obj) {
        if (obj._server_id == null) {
            // registering
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            // new object
            let ncl = $kpG8j.ModelProcessManager.get_object_class(obj);
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
     */ static signal_change(m) {
        if (FileSystem._sig_server) {
            FileSystem._objects_to_send[m.model_id] = m;
            if (FileSystem._timer_chan != null) clearTimeout(FileSystem._timer_chan);
            FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
        }
    }
    static _tmp_id_to_real(tmp_id, res) {
        const tmp = FileSystem._tmp_objects[tmp_id];
        if (tmp == null) console.log(tmp_id);
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
            let path = $bXDXC.getUrlPath(fs._url, fs._port, `?s=${fs._session_num}&p=${tmp._server_id}`);
            const xhr_object = FileSystem._my_xml_http_request();
            if (fs._accessToken) xhr_object.setRequestHeader('x-access-token', fs._accessToken);
            xhr_object.open('PUT', path, true);
            xhr_object.onreadystatechange = function() {
                let _w;
                if (this.readyState === 4 && this.status === 200) {
                    _w = function(sid, obj) {
                        const _obj = FileSystem._create_model_by_name(obj);
                        if (sid != null && _obj != null) {
                            _obj._server_id = sid;
                            return FileSystem._objects[sid] = _obj;
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
    static _create_model_by_name(name) {
        if (typeof name !== 'string') return name; // for old spinalcore version
        if (typeof $kpG8j.ModelProcessManager._def[name] !== 'undefined') return new $kpG8j.ModelProcessManager._def[name]();
        if (typeof $kpG8j.ModelProcessManager.spinal[name] === 'undefined') {
            if (FileSystem.debug === true) console.warn(`Got Model type \"${name}\" from hub but not registered.`);
            $kpG8j.ModelProcessManager._def[name] = new Function(`return class ${name} extends ModelProcessManager._def[\"Model\"] {}`)();
            return new $kpG8j.ModelProcessManager._def[name]();
        }
    }
    /**
     * @deprecated
     * @static
     * @param {*} _child
     * @param {*} _parent
     * @return {*}  {*}
     * @memberof FileSystem
     */ static extend(_child, _parent) {
        throw 'FileSystem.extend is a legacy function, do not use';
    }
    /**
     * @private
     * @static
     * @return {*}  {number}
     * @memberof FileSystem
     */ static _get_new_tmp_server_id() {
        FileSystem._cur_tmp_server_id++;
        if (FileSystem._cur_tmp_server_id % 4 === 0) FileSystem._cur_tmp_server_id++;
        return FileSystem._cur_tmp_server_id;
    }
    /**
     * send changes
     * @private
     * @static
     * @memberof FileSystem
     */ static _send_chan() {
        const out = FileSystem._get_chan_data();
        for(const f in FileSystem._insts)FileSystem._insts[f].send(out);
    }
    /**
     * timeout for at least one changed object
     * @private
     * @static
     * @memberof FileSystem
     */ static _timeout_chan_func() {
        FileSystem._send_chan();
        delete FileSystem._timer_chan;
    }
    // get data of objects to send
    static _get_chan_data() {
        const out = {
            cre: '',
            mod: ''
        };
        for(const n in FileSystem._objects_to_send)FileSystem._objects_to_send[n]._get_fs_data(out);
        FileSystem._objects_to_send = {
        };
        return out.cre + out.mod;
    }
    static _timeout_send_func() {
        // if some model have changed, we have to send the changes now
        const out = FileSystem._get_chan_data();
        for(const k in FileSystem._insts)FileSystem._insts[k]._data_to_send += out;
        // send data
        for(const k1 in FileSystem._insts){
            const fs = FileSystem._insts[k1];
            if (!fs._data_to_send.length || fs._session_num === -1) continue;
            // (@responseText will contain another call to @_timeout_send with the session id)
            // for first call, do not add the session id (but say that we are waiting for one)
            if (fs._session_num === -2) fs._session_num = -1;
            else fs._data_to_send = `s ${fs._session_num} ${fs._data_to_send}`;
            // request
            let path = $bXDXC.getUrlPath(fs._url, fs._port);
            const xhr_object = FileSystem._my_xml_http_request();
            if (fs._accessToken) xhr_object.setRequestHeader('x-access-token', fs._accessToken);
            xhr_object.open('POST', path, true);
            xhr_object.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if (FileSystem._disp) console.log('resp ->', this.responseText);
                    const _c = []; // callbacks
                    const created = [];
                    function _w(sid, obj) {
                        const _obj = FileSystem._create_model_by_name(obj);
                        if (sid != null && _obj != null) {
                            _obj._server_id = sid;
                            FileSystem._objects[sid] = _obj;
                            for (const [type, cb] of FileSystem._type_callbacks){
                                const mod_R = $kpG8j.ModelProcessManager.spinal[type] || $kpG8j.ModelProcessManager._def[type];
                                if (_obj instanceof mod_R) created.push({
                                    cb,
                                    _obj
                                });
                            }
                        }
                    }
                    FileSystem._sig_server = false;
                    eval(this.responseText);
                    FileSystem._sig_server = true;
                    for (const { cb: cb3 , _obj: _obj3  } of created)cb3(_obj3);
                    for (const [nbCb, servId, error] of _c)FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
                } else if (this.readyState === 4 && (this.status === 0 || this.status === 500)) return FileSystem.onConnectionError(4);
            };
            if (FileSystem._disp) console.log('sent ->', fs._data_to_send + 'E ');
            xhr_object.setRequestHeader('Content-Type', 'text/plain');
            xhr_object.send(fs._data_to_send + 'E ');
            fs._data_to_send = '';
        }
        FileSystem._objects_to_send = {
        };
        delete FileSystem._timer_send;
    }
    static _my_xml_http_request() {
        if (FileSystem.CONNECTOR_TYPE === 'Browser') {
            if (window.XMLHttpRequest) return new XMLHttpRequest();
            if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
            return alert('Your browser does not seem to support XMLHTTPRequest objects...');
        } else if (FileSystem.CONNECTOR_TYPE === 'Node') return new FileSystem._XMLHttpRequest();
        else console.error('you must define CONNECTOR_TYPE');
    }
}
FileSystem._constructorName = 'FileSystem';
// when object are saved, their _server_id is assigned to a tmp value
FileSystem.debug = false;
FileSystem._disp = false;
FileSystem.popup = undefined;
FileSystem._cur_tmp_server_id = 0;
FileSystem._sig_server = true; // if changes has to be sent
FileSystem._timeout_reconnect = 30000;
FileSystem.is_cordova = typeof document !== 'undefined' ? document.URL.indexOf('http://') == -1 && document.URL.indexOf('https://') == -1 : false;
// data are sent after a timeout (and are concatened before)
FileSystem._objects_to_send = {
};
FileSystem._timer_send = undefined;
FileSystem._timer_chan = undefined;
//  functions to be called after an answer
FileSystem._nb_callbacks = 0;
FileSystem._callbacks = {
};
FileSystem._type_callbacks = []; // list of callbacks associated to a type: [ [ "type", function ], ... ]
// instances of FileSystem
FileSystem._nb_insts = 0;
FileSystem._insts = {
};
// ..._server_id -> object
FileSystem._files_to_upload = {
}; // ref to Path waiting to be registered before sending data
FileSystem._ptr_to_update = {
}; // Ptr objects that need an update, associated with @_tmp_objects
FileSystem._tmp_objects = {
}; // objects waiting for a real _server_id
FileSystem._objects = {
}; //_server_id -> object
FileSystem.url_com = '/sceen/_';
FileSystem.url_upload = '/sceen/upload';
// conector type : Browser or Node
FileSystem.CONNECTOR_TYPE = typeof globalThis.global != 'undefined' ? 'Node' : 'Browser';

});
parcelRequire.register("kpG8j", function(module, exports) {

$parcel$export(module.exports, "ModelProcessManager", () => $edc6d33007d6919d$export$30855ecba71b29fd);

var $wlgMR = parcelRequire("wlgMR");

var $bwucJ = parcelRequire("bwucJ");

var $laC9O = parcelRequire("laC9O");

var $9hnUG = parcelRequire("9hnUG");

var $7PsNg = parcelRequire("7PsNg");

var $2Cp37 = parcelRequire("2Cp37");
var $edc6d33007d6919d$export$30855ecba71b29fd;
(function($edc6d33007d6919d$export$30855ecba71b29fd) {
    // nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
    $edc6d33007d6919d$export$30855ecba71b29fd._counter = 0;
    // changed models (current round)
    $edc6d33007d6919d$export$30855ecba71b29fd._modlist = new Map();
    // new processes (that will need a first onchange call in "force" mode)
    $edc6d33007d6919d$export$30855ecba71b29fd._n_processes = new Map();
    // current model id (used to create new ids)
    $edc6d33007d6919d$export$30855ecba71b29fd._cur_mid = 0;
    // current process id (used to create new ids)
    $edc6d33007d6919d$export$30855ecba71b29fd._cur_process_id = 0;
    // timer used to create a new "round"
    $edc6d33007d6919d$export$30855ecba71b29fd._timeout = undefined;
    // if _force_m == true, every has_been_modified function will return true
    $edc6d33007d6919d$export$30855ecba71b29fd._force_m = false;
    $edc6d33007d6919d$export$30855ecba71b29fd._def = {
    };
    function new_from_state() {
        throw 'function obsolete';
    }
    $edc6d33007d6919d$export$30855ecba71b29fd.new_from_state = new_from_state;
    function load() {
        throw 'function obsolete';
    }
    $edc6d33007d6919d$export$30855ecba71b29fd.load = load;
    function conv(v) {
        if (v instanceof $laC9O.Model) return v;
        if (v instanceof Array) return new $bwucJ.Lst(v);
        if (typeof v === 'string') return new $9hnUG.Str(v);
        if (typeof v === 'number') return new $7PsNg.Val(v);
        if (typeof v === 'boolean') return new $wlgMR.Bool(v);
        return new $laC9O.Model(v);
    }
    $edc6d33007d6919d$export$30855ecba71b29fd.conv = conv;
    /**
     * @export
     * @param {Model} obj
     * @return {*}  {string}
     */ function get_object_class(obj) {
        if (obj === null || obj === void 0 ? void 0 : obj.constructor) {
            if ('_constructorName' in obj) return obj._constructorName;
            if ('name' in obj.constructor) return obj.constructor.name;
            if ('toString' in obj.constructor) {
                let arr = obj.constructor.toString().match(/class\s*(\w+)/);
                if (!arr) arr = obj.constructor.toString().match(/function\s*(\w+)/);
                if ((arr === null || arr === void 0 ? void 0 : arr.length) === 2) return arr[1];
            }
        }
    }
    $edc6d33007d6919d$export$30855ecba71b29fd.get_object_class = get_object_class;
    /**
     * @export
     * @param {(Model | object)} m
     * @return {*}  {string[]}
     */ function _get_attribute_names(m) {
        if (m instanceof $laC9O.Model) return m._attribute_names;
        const res = [];
        for(const key in m)if (Object.prototype.hasOwnProperty.call(m, key)) res.push(key);
        return res;
    }
    $edc6d33007d6919d$export$30855ecba71b29fd._get_attribute_names = _get_attribute_names;
    /**
     * create a Model using a line of get_state(using.type, .data, ...)
     * @export
     * @template T
     * @param {string} mid
     * @param {IStateMap<T>} map
     * @return {*}  {T}
     */ function _new_model_from_state(mid, map) {
        var info = map[mid];
        info.buff = new $edc6d33007d6919d$export$30855ecba71b29fd._def[info.type]();
        info.buff._set_state(info.data, map);
        return info.buff;
    }
    $edc6d33007d6919d$export$30855ecba71b29fd._new_model_from_state = _new_model_from_state;
    /**
     * say that something will need a call
     * to ModelProcessManager._sync_processes during the next round
     * @export
     * @return {*}  {ReturnType<typeof setTimeout>}
     */ function _need_sync_processes() {
        if ($edc6d33007d6919d$export$30855ecba71b29fd._timeout == null) {
            $edc6d33007d6919d$export$30855ecba71b29fd._timeout = setTimeout(_sync_processes, 1);
            return $edc6d33007d6919d$export$30855ecba71b29fd._timeout;
        }
    }
    $edc6d33007d6919d$export$30855ecba71b29fd._need_sync_processes = _need_sync_processes;
    function register_models(modelList, name) {
        if (modelList) {
            // function
            if (modelList instanceof Function) $edc6d33007d6919d$export$30855ecba71b29fd._register_models_check(modelList, name);
            else if ($2Cp37.isIterable(modelList)) {
                // array
                const l = modelList;
                for (const m of l)$edc6d33007d6919d$export$30855ecba71b29fd.register_models(m);
            } else {
                // obj
                const obj = modelList;
                for(const key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) $edc6d33007d6919d$export$30855ecba71b29fd._register_models_check(obj[key], key);
            }
        }
    }
    $edc6d33007d6919d$export$30855ecba71b29fd.register_models = register_models;
    /**
     * @export
     * @param {typeof Model} func
     * @param {string} [name]
     */ function _register_models_check(func, name) {
        if (!name) name = func._constructorName ? func._constructorName : func.name;
        if (typeof $edc6d33007d6919d$export$30855ecba71b29fd._def[name] !== 'undefined' && $edc6d33007d6919d$export$30855ecba71b29fd._def[name] !== func) {
            console.error(`trying to register \"${name}\" Model but was already defined`);
            console.error('old =', $edc6d33007d6919d$export$30855ecba71b29fd._def[name]);
            console.error('new =', func);
        } else $edc6d33007d6919d$export$30855ecba71b29fd._def[name] = func;
        // @ts-ignore
        func._constructorName = name;
    }
    $edc6d33007d6919d$export$30855ecba71b29fd._register_models_check = _register_models_check;
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @export
     */ function _sync_processes() {
        const processes = new Map();
        for (const [, model] of $edc6d33007d6919d$export$30855ecba71b29fd._modlist)for (const process of model._processes)processes.set(process.process_id, {
            value: process,
            force: false
        });
        for (const [id, process1] of $edc6d33007d6919d$export$30855ecba71b29fd._n_processes)processes.set(id, {
            value: process1,
            force: true
        });
        $edc6d33007d6919d$export$30855ecba71b29fd._timeout = undefined;
        $edc6d33007d6919d$export$30855ecba71b29fd._modlist.clear();
        $edc6d33007d6919d$export$30855ecba71b29fd._n_processes.clear();
        $edc6d33007d6919d$export$30855ecba71b29fd._counter += 2;
        for (const [, process2] of processes){
            $edc6d33007d6919d$export$30855ecba71b29fd._force_m = process2.force;
            process2.value.onchange();
        }
        $edc6d33007d6919d$export$30855ecba71b29fd._force_m = false;
    }
    $edc6d33007d6919d$export$30855ecba71b29fd._sync_processes = _sync_processes;
    $edc6d33007d6919d$export$30855ecba71b29fd.spinal = {
        version: "2.5.0"
    };
})($edc6d33007d6919d$export$30855ecba71b29fd || ($edc6d33007d6919d$export$30855ecba71b29fd = {
}));

});
parcelRequire.register("wlgMR", function(module, exports) {

$parcel$export(module.exports, "Bool", () => $06137d01294232c7$export$6e6298e1abe0d5b);

var $kTWwb = parcelRequire("kTWwb");

var $jJj5z = parcelRequire("jJj5z");
class $06137d01294232c7$export$6e6298e1abe0d5b extends $jJj5z.Obj {
    constructor(data = false){
        super();
        this._constructorName = $06137d01294232c7$export$6e6298e1abe0d5b._constructorName;
        this._set(data);
    }
    // toggle true / false ( 1 / 0 )
    toggle() {
        return this.set(!this._data);
    }
    toBoolean() {
        return this._data;
    }
    deep_copy() {
        return new $06137d01294232c7$export$6e6298e1abe0d5b(this._data);
    }
    // we do not take _set from Obj because we want a conversion if value is not a boolean
    _set(value) {
        let n;
        if (value === 'false') n = false;
        else if (value === 'true') n = true;
        else if (value instanceof $06137d01294232c7$export$6e6298e1abe0d5b) n = value._data;
        else n = Boolean(value);
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._data ? 1 : 0} `;
    }
}
$06137d01294232c7$export$6e6298e1abe0d5b._constructorName = 'Bool';

});
parcelRequire.register("jJj5z", function(module, exports) {

$parcel$export(module.exports, "Obj", () => $e5d106f501038969$export$6738a6d9146a0cdc);

var $kTWwb = parcelRequire("kTWwb");

var $laC9O = parcelRequire("laC9O");
class $e5d106f501038969$export$6738a6d9146a0cdc extends $laC9O.Model {
    constructor(data){
        super();
        this._constructorName = $e5d106f501038969$export$6738a6d9146a0cdc._constructorName;
        if (data != null) this._set(data);
    }
    toString() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.toString();
    }
    equals(obj) {
        return obj instanceof $e5d106f501038969$export$6738a6d9146a0cdc ? this._data === obj._data : this._data === obj;
    }
    get() {
        return this._data;
    }
    _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this.toString()} `;
    }
    _set(value) {
        if (this._data !== value) {
            this._data = value;
            return true;
        }
        return false;
    }
    _get_state() {
        return this.toString();
    }
    _set_state(str, _map) {
        return this.set(str);
    }
}
$e5d106f501038969$export$6738a6d9146a0cdc._constructorName = 'Obj';

});
parcelRequire.register("laC9O", function(module, exports) {

$parcel$export(module.exports, "Model", () => $f6982164cc9be0fa$export$a1edc412be3e1841);

var $kTWwb = parcelRequire("kTWwb");

var $kpG8j = parcelRequire("kpG8j");

var $iPDrE = parcelRequire("iPDrE");

var $jMVQf = parcelRequire("jMVQf");
class $f6982164cc9be0fa$export$a1edc412be3e1841 {
    constructor(attr){
        this._constructorName = $f6982164cc9be0fa$export$a1edc412be3e1841._constructorName;
        this._attribute_names = [];
        this.model_id = $kpG8j.ModelProcessManager._cur_mid;
        $kpG8j.ModelProcessManager._cur_mid += 1;
        this._processes = [];
        this._parents = [];
        this._date_last_modification = $kpG8j.ModelProcessManager._counter + 2;
        if (attr != null) this._set(attr);
    }
    destructor() {
    }
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @return {*}  {boolean}
     * @memberof Model
     */ has_been_modified() {
        return this._date_last_modification > $kpG8j.ModelProcessManager._counter - 2 || $kpG8j.ModelProcessManager._force_m;
    }
    /**
     * return true if this has changed since previous synchronisation due
     * to a direct modification (not from a child one)
     * @return {*}  {boolean}
     * @memberof Model
     */ has_been_directly_modified() {
        return this._date_last_modification > $kpG8j.ModelProcessManager._counter - 1 || $kpG8j.ModelProcessManager._force_m;
    }
    /**
     * if this has been modified during the preceding round, f will be called
     * If f is a process:
     *  process.onchange will be called each time this (or a child of this) will be modified.
     *  process.destructor will be called if this is destroyed.
     *  ...
     *  can be seen as a bind with an object
     * @param {(Process | (() => void))} f
     * @param {boolean} [onchange_construction=true]  true means that onchange will be automatically called after the bind
     * @return {*}  {Process}
     * @memberof Model
     */ bind(f, onchange_construction) {
        if (f instanceof $jMVQf.Process) {
            this._processes.push(f);
            f._models.push(this);
            if (onchange_construction) {
                $kpG8j.ModelProcessManager._n_processes.set(f.process_id, f);
                $kpG8j.ModelProcessManager._need_sync_processes();
                return f;
            }
        } else return new $iPDrE.BindProcess(this, onchange_construction, f);
    }
    //  ...
    unbind(f) {
        if (f instanceof $jMVQf.Process) {
            this._processes.splice(this._processes.indexOf(f), 1);
            f._models.splice(f._models.indexOf(this), 1);
        } else {
            for (const process of this._processes)if (process instanceof $iPDrE.BindProcess && process.f === f) this.unbind(process);
        }
    }
    /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     * @return {*}  {*}
     * @memberof Model
     */ get() {
        const res = {
        };
        for (const name of this._attribute_names)Object.assign(res, {
            [name]: this[name].get()
        });
        return res;
    }
    /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     *
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */ set(value) {
        if (this._set(value)) {
            // change internal data
            this._signal_change();
            return true;
        }
        return false;
    }
    /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param {string} str
     * @memberof Model
     */ set_state(str) {
        const map = {
        };
        const lst = str.split('\n');
        const mid = lst.shift();
        for (const l of lst){
            if (!l.length) continue;
            const s = l.split(' ');
            map[s[0]] = {
                type: s[1],
                data: s[2],
                buff: void 0
            };
        }
        // fill / update this with data in map[ mid ]
        map[mid].buff = this;
        this._set_state(map[mid].data, map);
    }
    // return a string which describes the changes in this and children since date
    get_state(date = -1) {
        // get sub models
        const fmm = {
        };
        this._get_flat_model_map(fmm, date);
        let res = this.model_id.toString();
        if (this._date_last_modification > date) for(const id in fmm){
            const obj = fmm[id];
            res += `\n${obj.model_id} ${$kpG8j.ModelProcessManager.get_object_class(obj)} ${obj._get_state()}`;
        }
        return res;
    }
    /**
     * add attribute (p.values must contain models)
     * can be called with
     *  - name, instance of Model (two arguments)
     *  - { name_1: instance_1, name_2: instance_2, ... } (only one argument)
     * @param {(string | { [nameAttr: string]: any })} name
     * @param {*} [instanceOfModel]
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */ add_attr(name, instanceOfModel, signal_change = true) {
        // name, model
        if (typeof name === 'string') {
            if (typeof instanceOfModel === 'function') this[name] = instanceOfModel;
            else {
                if (this[name] != null) console.error(`attribute ${name} already exists in ${$kpG8j.ModelProcessManager.get_object_class(this)}`);
                const model = $kpG8j.ModelProcessManager.conv(instanceOfModel);
                if (model._parents.indexOf(this) < 0) model._parents.push(this);
                this._attribute_names.push(name);
                this[name] = model;
                if (signal_change) this._signal_change();
            }
        } else {
            // else, asuming { name_1: instance_1, name_2: instance_2, ... }
            for(const key in name)if (Object.prototype.hasOwnProperty.call(name, key)) {
                const val = name[key];
                this.add_attr(key, val, signal_change);
            }
        }
    }
    /**
     * remove attribute named name
     * @param {string} name
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */ rem_attr(name, signal_change = true) {
        const item = this[name];
        if (item instanceof $f6982164cc9be0fa$export$a1edc412be3e1841) {
            let i = item._parents.indexOf(this);
            if (i >= 0) {
                item._parents.splice(i, 1);
                if (item._parents.length === 0) item.destructor();
            }
            delete this[name];
            i = this._attribute_names.indexOf(name);
            if (i >= 0) this._attribute_names.splice(i, 1);
            if (signal_change) this._signal_change();
        }
    }
    /**
     * change attribute named nname to instanceOfModel (use references for comparison)
     * @param {string} name
     * @param {*} instanceOfModel
     * @param {boolean} [signal_change=true]
     * @return {*}  {void}
     * @memberof Model
     */ mod_attr(name, instanceOfModel, signal_change = true) {
        if (this[name] !== instanceOfModel) {
            this.rem_attr(name);
            return this.add_attr(name, instanceOfModel, signal_change);
        }
    }
    /**
     * add / mod / rem attr to get the same data than o
     *  (assumed to be something like { key: val, ... })
     * @param {object} instanceOfModel
     * @memberof Model
     */ set_attr(instanceOfModel) {
        // new ones / updates
        for(const k in instanceOfModel)this.mod_attr(k, instanceOfModel[k]);
        this._attribute_names.filter((attrName)=>instanceOfModel[attrName] == null
        ).forEach((attrName)=>this.rem_attr(attrName)
        );
    }
    /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     *  [ nb_row, nb_cols ] for a matrix...
     * @param {number} [_for_display=0]
     * @return {*}  {(number | number[])}
     * @memberof Model
     */ size(_for_display = 0) {
        return [];
    }
    /**
     * dimensionnality of the object -> 0 for a scalar, 1 for a vector, ...
     * @param {boolean} [_for_display]
     * @return {*} {number}
     * @memberof Model
     */ dim(_for_display = 0) {
        const size = this.size(_for_display);
        return Array.isArray(size) ? size.length : size;
    }
    /**
     * @param {Model} m
     * @return {*}  {boolean}
     * @memberof Model
     */ equals(m) {
        if (this === m) return true;
        if (this._attribute_names.length !== m._attribute_names.length) return false;
        // check all own attrs exist in target
        for (const attrName of this._attribute_names){
            if (!m._attribute_names.includes(attrName)) return false;
        }
        // check target attrs exist in own and is equal
        for (const attrName1 of m._attribute_names){
            if (this[attrName1] == null) return false;
            const attrModel = m[attrName1];
            if (!this[attrName1].equals(attrModel)) return false;
        }
        return true;
    }
    /**
     * get first parents that checks func_to_check
     * @param {(model: Model) => boolean} func_to_check
     * @return {*}  {Model[]}
     * @memberof Model
     */ get_parents_that_check(func_to_check) {
        const res = [];
        const visited = {
        };
        this._get_parents_that_check_rec(res, visited, func_to_check);
        return res;
    }
    /**
     * @return {*}  {Model}
     * @memberof Model
     */ deep_copy() {
        const tmp = {
        };
        for (const key of this._attribute_names)tmp[key] = this[key].deep_copy();
        const res = new $kpG8j.ModelProcessManager._def[$kpG8j.ModelProcessManager.get_object_class(this)]();
        res.set_attr(tmp);
        return res;
    }
    /**
     * returns true if change is not "cosmetic"
     * @return {*}  {boolean}
     * @memberof Model
     */ real_change() {
        if (this.has_been_directly_modified() && !this._attribute_names.length) return true;
        for (const attrNames of this._attribute_names){
            if (typeof this.cosmetic_attribute === 'function' ? this.cosmetic_attribute(attrNames) : null) continue;
            if (this[attrNames].real_change()) return true;
        }
        return false;
    }
    /**
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof Model
     */ cosmetic_attribute(name) {
        return false;
    }
    /**
     * may be redefined
     * @return {*}  {string}
     * @memberof Model
     */ _get_state() {
        return this._attribute_names.map((attrName)=>`${attrName}:${this[attrName].model_id}`
        ).join(',');
    }
    /**
     * send data to server
     * @param {IFsData} out
     * @return {*}  {string}
     * @memberof Model
     */ _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        const data = this._attribute_names.map((attrName)=>{
            const obj = this[attrName];
            $kTWwb.FileSystem.set_server_id_if_necessary(out, obj);
            return attrName + ':' + obj._server_id;
        }).join(',');
        out.mod += `C ${this._server_id} ${data} `;
    }
    /**
     * may be redefined.
     * by default, add attributes using keys and values (and remove old unused values)
     * must return true if data is changed
     * @param {(Model | object)} value
     * @return {*}  {boolean}
     * @memberof Model
     */ _set(value) {
        let change = 0;
        const used = {
        };
        // rem
        for (const attrName of $kpG8j.ModelProcessManager._get_attribute_names(value))used[attrName] = true;
        for (const key of this._attribute_names)if (!used[key]) {
            change = 1;
            this.rem_attr(key, false);
        }
        // mod / add
        for(const key1 in value)if (Object.prototype.hasOwnProperty.call(value, key1)) {
            const val = value[key1];
            if (val != null) {
                if (this[key1] != null) {
                    if (this[key1].constructor === val.constructor) change |= this[key1].set(val);
                    else {
                        change = 1;
                        this.mod_attr(key1, val, false);
                    }
                } else this.add_attr(key1, val, false);
            }
        }
        return !!change;
    }
    /**
     * called by set. change_level should not be defined by the user
     *  (it permits to != change from child of from this)
     * @param {number} [change_level=2]
     * @return {*}  {ReturnType<typeof setTimeout>}
     * @memberof Model
     */ _signal_change(change_level = 2) {
        if (change_level === 2 && this._server_id != null) $kTWwb.FileSystem.signal_change(this);
        // register this as a modified model
        $kpG8j.ModelProcessManager._modlist.set(this.model_id, this);
        // do the same thing for the parents
        if (this._date_last_modification <= $kpG8j.ModelProcessManager._counter) {
            this._date_last_modification = $kpG8j.ModelProcessManager._counter + change_level;
            for (const parent of this._parents)parent._signal_change(1);
        }
        // start if not done a timer
        return $kpG8j.ModelProcessManager._need_sync_processes();
    }
    /**
     * generic definition of _set_state. ( called by _use_state )
     * @param {string} str
     * @param {IStateMap} map
     * @memberof Model
     */ _set_state(str, map) {
        const used = {
        }; // used attributes. Permits to know what to destroy
        if (str.length) for (const spl of str.split(',')){
            const [attr, k_id] = spl.split(':');
            used[attr] = true;
            const model = this[attr];
            if (map[k_id].buff != null) {
                // if already defined in the map
                if (model == null) this.add_attr(attr, map[k_id].buff);
                else if (map[k_id].buff !== model) this.mod_attr(attr, map[k_id].buff);
            } else if (model == null) // else, if the attribute does not exist, we create if
            this.add_attr(attr, $kpG8j.ModelProcessManager._new_model_from_state(k_id, map));
            else if (!model._set_state_if_same_type(k_id, map)) // else, we already have an attribute and map has not been already explored
            this.mod_attr(attr, $kpG8j.ModelProcessManager._new_model_from_state(k_id, map));
        }
        for (const attrName of this._attribute_names)if (!used[attrName]) this.rem_attr(attrName);
    }
    /**
     * see get_parents_that_check
     * @param {Model[]} res
     * @param {{ [attrName: string]: boolean }} visited
     * @param {(model: Model) => boolean} func_to_check
     * @memberof Model
     */ _get_parents_that_check_rec(res, visited, func_to_check) {
        if (visited[this.model_id] == null) {
            visited[this.model_id] = true;
            if (func_to_check(this)) res.push(this);
            else for (const parent of this._parents)parent._get_parents_that_check_rec(res, visited, func_to_check);
        }
    }
    /**
     * return true if info from map[ mid ] if compatible with this.
     * If it's the case, use this information to update data
     * @param {string} mid
     * @param {IStateMap} map
     * @return {*}  {boolean}
     * @memberof Model
     */ _set_state_if_same_type(mid, map) {
        var dat;
        dat = map[mid];
        if ($kpG8j.ModelProcessManager.get_object_class(this) === dat.type) {
            dat.buff = this;
            this._set_state(dat.data, map);
            return true;
        }
        return false;
    }
    /**
     * map[ id ] = obj for each objects starting from this recursively
     * @param {{ [id: number]: Model }} map
     * @param {number} date
     * @memberof Model
     */ _get_flat_model_map(map, date) {
        map[this.model_id] = this;
        for (const name of this._attribute_names){
            const obj = this[name];
            if (map[obj.model_id] == null) {
                if (obj._date_last_modification > date) obj._get_flat_model_map(map, date);
            }
        }
        return map;
    }
}
$f6982164cc9be0fa$export$a1edc412be3e1841._constructorName = 'Model';

});
parcelRequire.register("iPDrE", function(module, exports) {

$parcel$export(module.exports, "BindProcess", () => $db5b965abab6b355$export$3f2ba963eed9fec6);

var $jMVQf = parcelRequire("jMVQf");
class $db5b965abab6b355$export$3f2ba963eed9fec6 extends $jMVQf.Process {
    constructor(model, onchange_construction, f){
        super(model, onchange_construction);
        this.f = f;
    }
    onchange() {
        return this.f();
    }
}
$db5b965abab6b355$export$3f2ba963eed9fec6._constructorName = 'BindProcess';

});
parcelRequire.register("jMVQf", function(module, exports) {

$parcel$export(module.exports, "Process", () => $e67f5e32da64e3a7$export$ddab65ae98aaa487);

var $kpG8j = parcelRequire("kpG8j");

var $laC9O = parcelRequire("laC9O");

var $2Cp37 = parcelRequire("2Cp37");
class $e67f5e32da64e3a7$export$ddab65ae98aaa487 {
    constructor(m, onchange_construction = true){
        this._models = []; // what this is observing
        this.process_id = $kpG8j.ModelProcessManager._cur_process_id;
        $kpG8j.ModelProcessManager._cur_process_id += 1;
        if (m instanceof $laC9O.Model) m.bind(this, onchange_construction);
        else if ($2Cp37.isIterable(m)) for (const model of m)model.bind(this, onchange_construction);
        else if (m != null) console.error("Process constructor doesn't know what to do with", m);
    }
    destructor() {
        for (const model of this._models){
            const idx = model._processes.indexOf(this);
            if (idx >= 0) model._processes.splice(idx, 1);
        }
    }
    /**
     * called if at least one of the corresponding models has changed
     * in the previous round
     * @memberof Process
     */ onchange() {
    }
}
$e67f5e32da64e3a7$export$ddab65ae98aaa487._constructorName = 'Process';

});
parcelRequire.register("2Cp37", function(module, exports) {

$parcel$export(module.exports, "isIterable", () => $1e828fac855fda86$export$9652023d9040757);
function $1e828fac855fda86$export$9652023d9040757(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
}

});






parcelRequire.register("bwucJ", function(module, exports) {

$parcel$export(module.exports, "Lst", () => $863a1ccd3c9d897d$export$774a0e74f4f3f461);

var $kTWwb = parcelRequire("kTWwb");

var $kpG8j = parcelRequire("kpG8j");

var $laC9O = parcelRequire("laC9O");
class $863a1ccd3c9d897d$export$774a0e74f4f3f461 extends $laC9O.Model {
    constructor(data){
        super();
        this._constructorName = $863a1ccd3c9d897d$export$774a0e74f4f3f461._constructorName;
        this.length = 0;
        const s = this.static_length();
        if (s >= 0) {
            const d = this.default_value();
            for(let i = 0; i <= s; i++)// @ts-ignore
            this.push(d, true);
        }
        if (data) this._set(data);
    }
    static_length() {
        return -1;
    }
    default_value() {
        return 0;
    }
    base_type() {
        return undefined;
    }
    get() {
        const res = [];
        for(let i = 0; i < this.length; i++)if (this[i]) res.push(this[i].get());
        return res;
    }
    size() {
        return [
            this.length
        ];
    }
    toString() {
        let res = [];
        for(let i = 0; i < this.length; i++)res.push(this[i].toString());
        if (res.length > 0) return res.join();
        return '';
    }
    equals(lst) {
        if (lst.length !== this.length) return false;
        for(let i = 0; i < this.length; i++){
            if (!this[i].equals(lst[i])) return false;
        }
        return true;
    }
    push(value, force = false) {
        if (this._static_size_check(force)) return;
        let b = this.base_type();
        if (b) {
            if (!(value instanceof b)) value = new b(value);
        } else // @ts-ignore
        value = $kpG8j.ModelProcessManager.conv(value);
        if (value._parents.indexOf(this) === -1) value._parents.push(this);
        this[this.length++] = value;
        this._signal_change();
    }
    pop() {
        if (this._static_size_check(false)) return;
        if (this.length <= 0) return;
        const res = this[--this.length];
        this.rem_attr(this.length.toString(10));
        return res;
    }
    clear() {
        while(this.length)this.pop();
    }
    unshift(value) {
        if (this._static_size_check(false)) return;
        const b = this.base_type();
        if (b != null) {
            if (!(value instanceof b)) value = new b(value);
        } else value = $kpG8j.ModelProcessManager.conv(value);
        if (value._parents.indexOf(this) < 0) value._parents.push(this);
        if (this.length) {
            let i, j, ref;
            for(i = j = ref = this.length - 1; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j)this[i + 1] = this[i];
        }
        this[0] = value;
        this.length += 1;
        this._signal_change();
        return this.length;
    }
    shift() {
        const res = this[0];
        this.slice(0, 1);
        return res;
    }
    remove(item) {
        const index = this.indexOf(item);
        if (index >= 0) this.slice(index, 1);
    }
    remove_ref(item) {
        const index = this.indexOf_ref(item);
        if (index >= 0) this.slice(index, 1);
    }
    filter(f) {
        const res = [];
        for(let i = 0; i < this.length; i++)if (f(this[i])) res.push(this[i]);
        return res;
    }
    detect(f) {
        for(let i = 0; i < this.length; i++){
            if (f(this[i])) return this[i];
        }
        return undefined;
    }
    sorted(sort) {
        const res = [];
        for(let i = 0; i < this.length; i++)res.push(this[i]);
        return res.sort(sort);
    }
    has(f) {
        for(let i = 0; i < this.length; i++){
            if (f(this[i])) return true;
        }
        return false;
    }
    indexOf(value) {
        for(let i = 0; i < this.length; i++){
            if (this[i].equals(value)) return 1;
        }
        return -1;
    }
    indexOf_ref(value) {
        for(let i = 0; i < this.length; i++){
            if (this[i] == value) return i;
        }
        return -1;
    }
    contains(value) {
        return this.indexOf(value) !== -1;
    }
    contains_ref(value) {
        return this.indexOf_ref(value) !== -1;
    }
    toggle(value) {
        const index = this.indexOf(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        } else {
            this.push(value);
            return true;
        }
    }
    toggle_ref(value) {
        const index = this.indexOf_ref(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        } else {
            this.push(value);
            return true;
        }
    }
    slice(begin, end = this.length) {
        const res = new $863a1ccd3c9d897d$export$774a0e74f4f3f461();
        if (begin < 0) begin = 0;
        if (end > this.length) end = this.length;
        for(let i = begin; i < end; i++)res.push(this[i].get());
        return res;
    }
    concat(new_tab, force = false) {
        if (this._static_size_check(force)) return;
        if (new_tab.length) for(let i = 0; i < new_tab.length; i++)this.push(new_tab[i]);
    }
    splice(index, n = 1) {
        if (this._static_size_check(false)) return;
        const end = Math.min(index + n, this.length);
        for(let i = index; i < end; i++)this.rem_attr(i.toString(0));
        for(let i1 = index; i1 < this.length - n; i1++)this[i1] = this[i1 + n];
        for(let i2 = this.length - n; i2 < this.length; i2++)delete this[i2];
        this.length -= n;
        this._signal_change();
    }
    insert(index, lst) {
        const end = Math.max(this.length - index, 0);
        const res = [];
        for(let i = 0; i < end; i++)res.push(this.pop());
        res.reverse();
        for(let i3 = 0; i3 < lst.length; i3++)this.push(lst[i3]);
        for(let i4 = 0; i4 < res.length; i4++)this.push(res[i4]);
    }
    set_or_push(index, val) {
        if (index < this.length) // @ts-ignore
        return this.mod_attr(index, val);
        if (index === this.length) this.push(val);
    }
    trim(size) {
        while(this.length > size)this.pop();
    }
    join(sep) {
        return this.get().join(sep);
    }
    deep_copy() {
        const res = new $863a1ccd3c9d897d$export$774a0e74f4f3f461();
        for(let i = 0; i < this.length; i++)res.push(this[i].deep_copy());
        return res;
    }
    back() {
        return this[this.length - 1];
    }
    real_change() {
        if (this.has_been_directly_modified()) return true;
        for(let i = 0; i < this.length; i++){
            if (this[i].real_change()) return true;
        }
        return false;
    }
    _set(value) {
        let change = Number(this.length != value.length);
        const s = this.static_length();
        if (s >= 0 && change) console.error(`resizing a static array (type ${$kpG8j.ModelProcessManager.get_object_class(this)}) is forbidden`);
        for(let i = 0; i < value.length; i++){
            if (i < this.length) change |= this[i].set(value[i]);
            else if (s < 0) this.push(value[i]);
        }
        if (s < 0) {
            while(this.length > value.length)this.pop();
            this.length = value.length;
        }
        return Boolean(change);
    }
    _get_flat_model_map(map, date) {
        map[this.model_id] = this;
        for(let i = 0; i < this.length; i++){
            if (!map.hasOwnProperty(this[i])) {
                if (this[i]._date_last_modification > date) this[i]._get_flat_model_map(map, date);
            }
        }
        return map;
    }
    _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        const res = [];
        for(let i = 0; i < this.length; i++){
            const obj = this[i];
            $kTWwb.FileSystem.set_server_id_if_necessary(out, obj);
            res.push(obj._server_id);
        }
        out.mod += `C ${this._server_id} ${res.join(',')} `;
    }
    _get_state() {
        const res = [];
        for(let i = 0; i < this.length; i++)res.push(this[i].model_id);
        return res.join(',');
    }
    _set_state(str, map) {
        const l_id = str.split(',').filter((x)=>{
            return x.length;
        });
        while(this.length > l_id.length)this.pop();
        for(let i = 0; i < this.length; i++){
            const k_id = l_id[i];
            if (map[k_id].buff) {
                if (map[k_id].buff != this[i]) this.mod_attr(i.toString(10), map[k_id].buff);
            } else if (!this[i]._set_state_if_same_type(k_id, map)) this.mod_attr(i.toString(10), $kpG8j.ModelProcessManager._new_model_from_state(k_id, map));
        }
        for(let i5 = this.length; i5 < l_id.length; i5++){
            const k_id = l_id[i5];
            if (map[k_id].hasOwnProperty('buff') && map[k_id].buff !== null) this.push(map[k_id].buff);
            else this.push($kpG8j.ModelProcessManager._new_model_from_state(k_id, map));
        }
    }
    _static_size_check(force) {
        if (this.static_length() >= 0 && !force) {
            console.error(`resizing a static array (type ` + `${$kpG8j.ModelProcessManager.get_object_class(this)}) is forbidden`);
            return true;
        }
        return false;
    }
    *[Symbol.iterator]() {
        for (const key of this._attribute_names)yield this[key]; // yield [key, value] pair
    }
}
$863a1ccd3c9d897d$export$774a0e74f4f3f461._constructorName = 'Lst';

});

parcelRequire.register("9hnUG", function(module, exports) {

$parcel$export(module.exports, "Str", () => $6c18403d20d70b72$export$ed61451db706e904);

var $kTWwb = parcelRequire("kTWwb");

var $laC9O = parcelRequire("laC9O");

var $jJj5z = parcelRequire("jJj5z");
class $6c18403d20d70b72$export$ed61451db706e904 extends $jJj5z.Obj {
    /**
     * Creates an instance of Str.
     * @param {(string | Str)} [data='']
     * @memberof Str
     */ constructor(data = ''){
        super();
        this._constructorName = $6c18403d20d70b72$export$ed61451db706e904._constructorName;
        this._data = data.toString();
    }
    /**
     * @readonly
     * @type {number}
     * @memberof Str
     */ get length() {
        return this._data.length;
    }
    /**
     * toggle presence of str in this
     * @param {string} str
     * @param {string} [space=' ']
     * @return {*}  {boolean}
     * @memberof Str
     */ toggle(str, space = ' ') {
        var i, l;
        l = this._data.split(space);
        i = l.indexOf(str);
        if (i < 0) l.push(str);
        else l.splice(i, 1);
        return this.set(l.join(' '));
    }
    /**
     * true if str is contained in this
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */ contains(str) {
        return this._data.indexOf(str) >= 0;
    }
    /**
     * @param {(string | Model)} str
     * @return {*}  {boolean}
     * @memberof Str
     */ equals(str) {
        return str instanceof $laC9O.Model ? this.toString() === str.toString() : this._data === str;
    }
    /**
     * @return {*}  {string}
     * @memberof Str
     */ toString() {
        return this._data;
    }
    /**
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */ ends_with(str) {
        return this._data.endsWith(str);
    }
    /**
     * @return {*}  {Str}
     * @memberof Str
     */ deep_copy() {
        return new $6c18403d20d70b72$export$ed61451db706e904(this._data);
    }
    /**
     * @param {IFsData} out
     * @memberof Str
     */ _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${encodeURI(this._data)} `;
    }
    /**
     * @protected
     * @param {(Str | string)} [value='']
     * @return {*}  {boolean}
     * @memberof Str
     */ _set(value = '') {
        const n = value.toString();
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    /**
     * @return {*}  {string}
     * @memberof Str
     */ _get_state() {
        return encodeURI(this._data);
    }
    _set_state(str, _map) {
        return this.set(decodeURIComponent(str));
    }
}
$6c18403d20d70b72$export$ed61451db706e904._constructorName = 'Str';

});

parcelRequire.register("7PsNg", function(module, exports) {

$parcel$export(module.exports, "Val", () => $5b33a1a5d4a9c106$export$38dfac6a73b2b45e);

var $jJj5z = parcelRequire("jJj5z");
class $5b33a1a5d4a9c106$export$38dfac6a73b2b45e extends $jJj5z.Obj {
    /**
     * Creates an instance of Val.
     * @param {(number | Val)} [data=0]
     * @memberof Val
     */ constructor(data = 0){
        super();
        this._constructorName = $5b33a1a5d4a9c106$export$38dfac6a73b2b45e._constructorName;
        this._set(data);
    }
    /**
     * toggle true / false ( 1 / 0 )
     * @return {*}  {boolean}
     * @memberof Val
     */ toggle() {
        return this.set(!this._data);
    }
    /**
     * @return {*}  {boolean}
     * @memberof Val
     */ toBoolean() {
        return Boolean(this._data);
    }
    /**
     * @return {*}  {Val}
     * @memberof Val
     */ deep_copy() {
        return new $5b33a1a5d4a9c106$export$38dfac6a73b2b45e(this._data);
    }
    /**
     * @param {number} v
     * @memberof Val
     */ add(v) {
        if (v) {
            this._data += v;
            this._signal_change();
        }
    }
    /**
     * we do not take _set from Obj because we want a conversion if value is not a number
     * @protected
     * @param {(string | boolean | number | Val)} value
     * @return {*}  {boolean}
     * @memberof Val
     */ _set(value) {
        let n;
        if (typeof value === 'string' || typeof value === 'boolean') {
            n = Number(value);
            if (isNaN(n)) console.log(`Don't know how to transform ${value} to a Val`);
        } else if (value instanceof $5b33a1a5d4a9c106$export$38dfac6a73b2b45e) n = value._data;
        else n = value;
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
}
$5b33a1a5d4a9c106$export$38dfac6a73b2b45e._constructorName = 'Val';

});


parcelRequire.register("8ITXC", function(module, exports) {

$parcel$export(module.exports, "NewAlertMsg", () => $659dd76873e578ab$export$e6de3ff0fa45a019);

var $9aJ8R = parcelRequire("9aJ8R");

var $8I4LJ = parcelRequire("8I4LJ");
class $659dd76873e578ab$export$e6de3ff0fa45a019 {
    constructor(params = {
    }){
        this.params = params;
        this.hideBtn = this.hide_btn.bind(this);
        this.showBtn = this.show_btn.bind(this);
        this.createBackground();
        this.createPopup();
        this.createContent();
        this.createFooter();
    }
    hide_btn() {
        this.footer.style.display = 'none';
        this.img.style.display = 'inline';
    }
    show_btn() {
        this.footer.style.display = 'block';
        this.img.style.display = 'none';
    }
    hide() {
        this.background.style.display = 'none';
    }
    show() {
        this.background.style.display = 'block';
    }
    setMsg(msg) {
        this.msg.innerHTML = msg;
    }
    createBackground() {
        this.background = $8I4LJ.newDomElement({
            nodeName: 'div',
            style: {
                position: 'fixed',
                height: '100%',
                width: '100%',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(36, 42, 48, 0.38)',
                zIndex: 100000,
                textAlign: 'center'
            },
            onclick: (evt)=>{
                if (evt.target != this.background) return;
                if (evt.target !== this.background) return;
                if (typeof this.params.onclose === 'function') this.params.onclose();
                // this.hide();
                if (typeof evt.stopPropagation === 'function') evt.stopPropagation();
                if (typeof evt.preventDefault === 'function') evt.preventDefault();
                if (typeof evt.stopImmediatePropagation === 'function') evt.stopImmediatePropagation();
                return false;
            }
        });
        if (this.params.parent != null) this.params.parent.appendChild(this.background);
    }
    createPopup() {
        this.popup = $8I4LJ.newDomElement({
            nodeName: 'div',
            style: {
                marginTop: '30px',
                display: 'inline-block',
                width: '80%',
                backgroundColor: '#FFF',
                zIndex: 100001,
                borderRadius: '30px'
            }
        });
        this.background.appendChild(this.popup);
    }
    createContent() {
        const content = $8I4LJ.newDomElement({
            style: {
                width: '100%',
                color: '#000',
                position: 'relative',
                padding: '15px',
                fontSize: 'xx-large'
            }
        });
        this.popup.appendChild(content);
        this.img = $8I4LJ.newDomElement({
            nodeName: 'img',
            src: $9aJ8R.loadingGif,
            style: {
                height: '35px',
                marginRight: '20px'
            }
        });
        content.appendChild(this.img);
        this.msg = $8I4LJ.newDomElement({
            nodeName: 'span'
        });
        content.appendChild(this.msg);
    }
    createFooter() {
        this.footer = $8I4LJ.newDomElement({
            style: {
                width: '100%',
                color: '#000',
                position: 'relative',
                padding: '15px',
                height: '100px'
            }
        });
        this.popup.appendChild(this.footer);
        for (const btn of this.params.btn){
            const d = $8I4LJ.newDomElement({
                style: {
                    width: `${100 / this.params.btn.length}%`,
                    paddingRight: '5px',
                    paddingLeft: '5px',
                    float: 'left'
                }
            });
            const b = $8I4LJ.newDomElement({
                nodeName: 'button',
                innerHTML: btn.txt,
                onclick: btn.click,
                style: {
                    display: 'inline-block',
                    padding: '6px 12px',
                    marginBottom: '0',
                    fontSize: 'x-large',
                    fontWeight: '400',
                    height: '70px',
                    lineHeight: '1.42857143',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                    touchAction: 'manipulation',
                    cursor: 'pointer',
                    userSelect: 'none',
                    border: '1px solid transparent',
                    borderRadius: '4px',
                    width: '100%',
                    backgroundColor: btn.backgroundColor,
                    color: '#fff'
                }
            });
            this.footer.appendChild(d);
            d.appendChild(b);
        }
    }
}
$659dd76873e578ab$export$e6de3ff0fa45a019._constructorName = 'NewAlertMsg';
globalThis.NewAlertMsg = $659dd76873e578ab$export$e6de3ff0fa45a019;
globalThis.new_alert_msg = $659dd76873e578ab$export$e6de3ff0fa45a019;

});
parcelRequire.register("9aJ8R", function(module, exports) {

$parcel$export(module.exports, "loadingGif", () => $6ad810796f232535$export$8175ce17077f5db7);
const $6ad810796f232535$export$8175ce17077f5db7 = 'data:image/gif;base64,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';

});

parcelRequire.register("8I4LJ", function(module, exports) {

$parcel$export(module.exports, "newDomElement", () => $657621cc246cefba$export$a1b2c8d27e3b1729);
function $657621cc246cefba$export$a1b2c8d27e3b1729(params = {
}, nodeName = 'div') {
    const n = document.createElement(params.nodeName || nodeName);
    for(const name in params){
        const val = params[name];
        switch(name){
            case 'parentNode':
                val.appendChild(n);
                break;
            case 'nodeName':
                break;
            case 'style':
                for(const k in val)// @ts-ignore
                n.style[k] = val[k];
                break;
            case 'txt':
                n.innerHTML = val;
                break;
            default:
                // @ts-ignore
                n[name] = val;
        }
    }
    return n;
}
globalThis.new_dom_element = $657621cc246cefba$export$a1b2c8d27e3b1729;
globalThis.newDomElement = $657621cc246cefba$export$a1b2c8d27e3b1729;

});


parcelRequire.register("bXDXC", function(module, exports) {

$parcel$export(module.exports, "getUrlPath", () => $8b5433c107cc84a4$export$e947614430708c91);

var $kTWwb = parcelRequire("kTWwb");
function $8b5433c107cc84a4$export$e947614430708c91(url, port, searchQuery = '') {
    let path = '';
    if ($kTWwb.FileSystem.CONNECTOR_TYPE === 'Node' || $kTWwb.FileSystem.is_cordova) {
        path = `http://${url}`;
        if (port) path += `:${port}`;
        path += `${$kTWwb.FileSystem.url_com}${searchQuery}`;
    } else if ($kTWwb.FileSystem.CONNECTOR_TYPE === 'Browser') path = `${$kTWwb.FileSystem.url_com}${searchQuery}`;
    return path;
}

});

parcelRequire.register("bu6Xb", function(module, exports) {

$parcel$export(module.exports, "Directory", () => $85c7e3e53e8b8115$export$1dbf9926a0d54d98);

var $bwucJ = parcelRequire("bwucJ");

var $1QqRJ = parcelRequire("1QqRJ");

var $hWlaF = parcelRequire("hWlaF");
class $85c7e3e53e8b8115$export$1dbf9926a0d54d98 extends $bwucJ.Lst {
    constructor(){
        super();
        this._constructorName = $85c7e3e53e8b8115$export$1dbf9926a0d54d98._constructorName;
    }
    base_() {
        return $1QqRJ.File;
    }
    find(name) {
        for(let i = 0; i < this.length; i++){
            const file = this[i];
            if (file.hasOwnProperty('name') && file.name.equals(name)) return file;
        }
        return undefined;
    }
    load(name, callback) {
        let f = this.find(name);
        if (f) f.load(callback);
        else callback(undefined, 'file does not exist');
    }
    has(name) {
        if (typeof name === 'string') {
            for(let i = 0; i < this.length; i++){
                const file = this[i];
                if (file.name.equals(name)) return true;
            }
            return false;
        }
        for(let i = 0; i < this.length; i++){
            if (name(this[i])) return true;
        }
        return false;
    }
    add_file(name, obj, params = {
    }) {
        const f = this.find(name);
        if (f) return f;
        let res = new $1QqRJ.File(name, obj, params);
        this.push(res);
        return res;
    }
    add_tiff_file(name, obj, tiff_obj, params = {
    }) {
        const f = this.find(name);
        if (f) return f;
        const res = new $hWlaF.TiffFile(name, obj, tiff_obj, params);
        this.push(res);
        return res;
    }
    force_add_file(name, obj, params = {
    }) {
        let num = 0;
        let filename = name;
        let f = this.find(filename);
        while(f){
            filename = name + '_' + num;
            f = this.find(filename);
            if (f) num++;
        }
        let res = new $1QqRJ.File(filename, obj, params);
        this.push(res);
        return res;
    }
    get_file_info(info) {
        return info.icon = 'folder';
    }
}
$85c7e3e53e8b8115$export$1dbf9926a0d54d98._constructorName = 'Directory';

});
parcelRequire.register("1QqRJ", function(module, exports) {

$parcel$export(module.exports, "File", () => $157f7cbd83dcf244$export$b6afa8811b7e644e);

var $kpG8j = parcelRequire("kpG8j");

var $laC9O = parcelRequire("laC9O");

var $6s0Bi = parcelRequire("6s0Bi");
class $157f7cbd83dcf244$export$b6afa8811b7e644e extends $laC9O.Model {
    constructor(name = '', ptr_or_model = 0, info = {
    }){
        var _a;
        super();
        this._constructorName = $157f7cbd83dcf244$export$b6afa8811b7e644e._constructorName;
        const cp_info = {
        };
        for(const key in info)cp_info[key] = info[key];
        if (ptr_or_model instanceof $laC9O.Model) {
            if ('model_type' in cp_info) cp_info.model_type = $kpG8j.ModelProcessManager.get_object_class(ptr_or_model);
            (_a = ptr_or_model.get_file_info) === null || _a === void 0 || _a.call(ptr_or_model, cp_info);
        }
        this.add_attr({
            name: name,
            _created_at: Date.now(),
            _ptr: new $6s0Bi.Ptr(ptr_or_model),
            _info: cp_info
        });
    }
    load(callback) {
        if (typeof callback === 'function') this._ptr.load(callback);
        else return this._ptr.load();
    }
}
$157f7cbd83dcf244$export$b6afa8811b7e644e._constructorName = 'File';

});
parcelRequire.register("6s0Bi", function(module, exports) {

$parcel$export(module.exports, "Ptr", () => $4b25d2d7c823331f$export$96d7e0bc5363b2c6);

var $laC9O = parcelRequire("laC9O");

var $kTWwb = parcelRequire("kTWwb");
class $4b25d2d7c823331f$export$96d7e0bc5363b2c6 extends $laC9O.Model {
    /**
     * Creates an instance of Ptr.
     * @param {*} model
     * @memberof Ptr
     */ constructor(model){
        super();
        this._constructorName = $4b25d2d7c823331f$export$96d7e0bc5363b2c6._constructorName;
        this.data = {
        };
        this._set(model);
    }
    /**
     * @param {SpinalLoadCallBack<T>} [callback]
     * @return {*}  {Promise<T>}
     * @memberof Ptr
     */ load(callback) {
        var _a, _b;
        if (this.data.model != null) {
            if (typeof callback === 'function') callback(this.data.model, false);
            else return Promise.resolve(this.data.model);
        } else {
            if (this.data.value === 0) console.error(`Ptr ${this._server_id} load with value 0.`);
            if (typeof callback === 'function') (_a = $kTWwb.FileSystem.get_inst()) === null || _a === void 0 || _a.load_ptr(this.data.value, callback);
            else return (_b = $kTWwb.FileSystem.get_inst()) === null || _b === void 0 ? void 0 : _b.load_ptr(this.data.value);
        }
    }
    /**
     * @param {IFsData} out
     * @memberof Ptr
     */ _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        if (this.data.model != null) {
            $kTWwb.FileSystem.set_server_id_if_necessary(out, this.data.model);
            out.mod += `C ${this._server_id} ${this.data.model._server_id} `;
            this.data.value = this.data.model._server_id;
            if (this.data.model._server_id & 3) $kTWwb.FileSystem._ptr_to_update[this.data.model._server_id] = this;
        } else out.mod += `C ${this._server_id} ${this.data.value} `;
    }
    _set(model) {
        if (typeof model === 'number') {
            const res = this.data.value !== model;
            this.data = {
                value: model
            };
            return res;
        }
        if (model instanceof $laC9O.Model) {
            const res = this.data.value !== model._server_id;
            this.data = {
                model: model,
                value: model._server_id
            };
            return res;
        }
        return false;
    }
    _get_state() {
        return this.data.toString();
    }
    _set_state(str, _map) {
        return this.set(str);
    }
}
$4b25d2d7c823331f$export$96d7e0bc5363b2c6._constructorName = 'Ptr';

});


parcelRequire.register("hWlaF", function(module, exports) {

$parcel$export(module.exports, "TiffFile", () => $d0f84692322e51fd$export$f26600b5cf417d1a);

var $1QqRJ = parcelRequire("1QqRJ");

var $6s0Bi = parcelRequire("6s0Bi");
class $d0f84692322e51fd$export$f26600b5cf417d1a extends $1QqRJ.File {
    constructor(name = '', ptr_or_model = 0, ptr_tiff = 0, info = {
    }){
        super(name, ptr_or_model, info);
        this._constructorName = $d0f84692322e51fd$export$f26600b5cf417d1a._constructorName;
        this.add_attr({
            _ptr_tiff: new $6s0Bi.Ptr(ptr_tiff),
            _has_been_converted: 0
        });
    }
    load_tiff(callback) {
        this._ptr_tiff.load(callback);
    }
}
$d0f84692322e51fd$export$f26600b5cf417d1a._constructorName = 'TiffFile';

});




var $kTWwb = parcelRequire("kTWwb");

var $bu6Xb = parcelRequire("bu6Xb");

var $1QqRJ = parcelRequire("1QqRJ");
var $e5db43feb804d144$exports = {};

$parcel$export($e5db43feb804d144$exports, "Path", () => $e5db43feb804d144$export$4b2950bdac9b6ee9);

var $laC9O = parcelRequire("laC9O");

var $kTWwb = parcelRequire("kTWwb");
class $e5db43feb804d144$export$4b2950bdac9b6ee9 extends $laC9O.Model {
    // @file is optionnal. Must be a javascript File object
    constructor(file){
        super();
        this._constructorName = $e5db43feb804d144$export$4b2950bdac9b6ee9._constructorName;
        this.file = file;
        const size = this.file != null ? this.file.fileSize != null ? this.file.fileSize : this.file.size : 0;
        this.add_attr({
            remaining: size,
            to_upload: size
        });
    }
    get_file_info(info) {
        info.remaining = this.remaining;
        info.to_upload = this.to_upload;
    }
    _get_fs_data(out) {
        super._get_fs_data(out);
        // permit to send the data after the server's answer
        if (this.file != null && this._server_id & 3) $kTWwb.FileSystem._files_to_upload[this._server_id] = this;
    }
}
$e5db43feb804d144$export$4b2950bdac9b6ee9._constructorName = 'Path';


var $67f9759f7ac53203$exports = {};

$parcel$export($67f9759f7ac53203$exports, "Pbr", () => $67f9759f7ac53203$export$598ea37cc1e20dfa);

var $6s0Bi = parcelRequire("6s0Bi");
class $67f9759f7ac53203$export$598ea37cc1e20dfa extends $6s0Bi.Ptr {
    constructor(model){
        super(model);
        this._constructorName = $67f9759f7ac53203$export$598ea37cc1e20dfa._constructorName;
    }
}
$67f9759f7ac53203$export$598ea37cc1e20dfa._constructorName = 'Pbr';



var $6s0Bi = parcelRequire("6s0Bi");
var $d3b662a97bc8deca$exports = {};

$parcel$export($d3b662a97bc8deca$exports, "RightSetList", () => $d3b662a97bc8deca$export$86422d9fcaac5a78);

var $bwucJ = parcelRequire("bwucJ");
class $d3b662a97bc8deca$export$86422d9fcaac5a78 extends $bwucJ.Lst {
    constructor(){
        super();
        this._constructorName = $d3b662a97bc8deca$export$86422d9fcaac5a78._constructorName;
    }
}
$d3b662a97bc8deca$export$86422d9fcaac5a78._constructorName = 'RightSetList';


var $a8326928a2d164b4$exports = {};

$parcel$export($a8326928a2d164b4$exports, "RightsItem", () => $a8326928a2d164b4$export$d4cfb3e939ea5c80);

var $bwucJ = parcelRequire("bwucJ");
class $a8326928a2d164b4$export$d4cfb3e939ea5c80 extends $bwucJ.Lst {
    constructor(){
        super();
        this._constructorName = $a8326928a2d164b4$export$d4cfb3e939ea5c80._constructorName;
    }
}
$a8326928a2d164b4$export$d4cfb3e939ea5c80._constructorName = 'RightsItem';


var $d232c5f860d1adcf$exports = {};

$parcel$export($d232c5f860d1adcf$exports, "SessionModel", () => $d232c5f860d1adcf$export$d0f738c06f5e6fee);

var $laC9O = parcelRequire("laC9O");
class $d232c5f860d1adcf$export$d0f738c06f5e6fee extends $laC9O.Model {
    constructor(){
        super();
        this._constructorName = $d232c5f860d1adcf$export$d0f738c06f5e6fee._constructorName;
    }
}
$d232c5f860d1adcf$export$d0f738c06f5e6fee._constructorName = 'SessionModel';



var $hWlaF = parcelRequire("hWlaF");
var $cc6c76347735cde9$exports = {};

$parcel$export($cc6c76347735cde9$exports, "User", () => $cc6c76347735cde9$export$1f44aaf2ec115b54);

var $laC9O = parcelRequire("laC9O");
class $cc6c76347735cde9$export$1f44aaf2ec115b54 extends $laC9O.Model {
    constructor(){
        super();
        this._constructorName = $cc6c76347735cde9$export$1f44aaf2ec115b54._constructorName;
    }
}
$cc6c76347735cde9$export$1f44aaf2ec115b54._constructorName = 'User';


var $eb5c792cb946b2e8$exports = {};

$parcel$export($eb5c792cb946b2e8$exports, "UserRight", () => $eb5c792cb946b2e8$export$56864abfbf86ef48);

var $laC9O = parcelRequire("laC9O");
class $eb5c792cb946b2e8$export$56864abfbf86ef48 extends $laC9O.Model {
    constructor(){
        super();
        this._constructorName = $eb5c792cb946b2e8$export$56864abfbf86ef48._constructorName;
    }
    set() {
        console.log('Set a UserRight is not allowed.');
        return false;
    }
}
$eb5c792cb946b2e8$export$56864abfbf86ef48._constructorName = 'UserRight';





var $kpG8j = parcelRequire("kpG8j");

var $wlgMR = parcelRequire("wlgMR");
var $caad248f843be890$exports = {};

$parcel$export($caad248f843be890$exports, "Choice", () => $caad248f843be890$export$32a7462f6a06cbd5);

var $laC9O = parcelRequire("laC9O");
class $caad248f843be890$export$32a7462f6a06cbd5 extends $laC9O.Model {
    constructor(InitIdx, stringChoises){
        super();
        this._constructorName = $caad248f843be890$export$32a7462f6a06cbd5._constructorName;
        // default
        this.add_attr({
            num: 0,
            lst: stringChoises
        });
        // init
        if (InitIdx != null) this.num.set(InitIdx);
    }
    filter() {
        return true;
    }
    item() {
        return this.lst[this.num.get()];
    }
    get() {
        var _a;
        return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.get();
    }
    toString() {
        var _a;
        return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.toString();
    }
    equals(a) {
        if (a instanceof $caad248f843be890$export$32a7462f6a06cbd5) return super.equals(a);
        else return this.item().equals(a);
    }
    _set(value) {
        for(let idx = 0; idx < this.lst.length; idx++){
            const itm = this.lst[idx];
            if (itm.equals(value)) return this.num.set(idx);
        }
        return this.num.set(value);
    }
}
$caad248f843be890$export$32a7462f6a06cbd5._constructorName = 'Choice';



var $bwucJ = parcelRequire("bwucJ");

var $laC9O = parcelRequire("laC9O");

var $jJj5z = parcelRequire("jJj5z");

var $9hnUG = parcelRequire("9hnUG");
var $2bc91f5cb135753f$exports = {};

$parcel$export($2bc91f5cb135753f$exports, "TypedArray_Float64", () => $2bc91f5cb135753f$export$83502047e761f50b);
var $0fda2cdca3861e28$exports = {};

$parcel$export($0fda2cdca3861e28$exports, "TypedArray", () => $0fda2cdca3861e28$export$914b3a8889b8a8a9);

var $kTWwb = parcelRequire("kTWwb");

var $laC9O = parcelRequire("laC9O");
class $0fda2cdca3861e28$export$914b3a8889b8a8a9 extends $laC9O.Model {
    /**
     * Creates an instance of TypedArray.
     * @param {(number | number[])} [size]
     * @param {T} [data]
     * @memberof TypedArray
     */ constructor(size, data){
        super();
        this._constructorName = $0fda2cdca3861e28$export$914b3a8889b8a8a9._constructorName;
        // size
        let tmpSize;
        if (size == null) tmpSize = [];
        if (typeof size === 'number') tmpSize = [
            size
        ];
        this._size = tmpSize;
        // data
        if (data == null) {
            const B = this.base_type();
            if (B) data = B.from(this.nb_items());
        }
        this._data = data;
    }
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */ dim() {
        return this._size.length;
    }
    /**
     * @param {number} [d]
     * @return {*}  {(number | number[])}
     * @memberof TypedArray
     */ size(d) {
        if (d != null) return this._size[d];
        else return this._size;
    }
    /**
     * @param {(number[] | number)} index
     * @param {*} value
     * @memberof TypedArray
     */ set_val(index, value) {
        const idx = this._get_index(index);
        if (this._data[idx] !== value) {
            this._data[idx] = value;
            this._signal_change();
        }
    }
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */ nb_items() {
        let total = this._size[0] || 0;
        for(let j = 1; j < this._size.length; j++)total *= this._size[j];
        return total;
    }
    /**
     * @return {*}  {string}
     * @memberof TypedArray
     */ toString() {
        let m = 1;
        let res = '';
        let l = this._size.map((s)=>{
            const o = m;
            m *= s;
            return o;
        });
        for(let i = 0; i < this._data.length; i++){
            const data = this._data[i];
            res += data;
            for(let j = l.length - 1; j >= 0; j++)if (i % l[j] == l[j] - 1) {
                res += [
                    ' ',
                    '\n',
                    '\n\n'
                ][j];
                break;
            }
        }
        return res;
    }
    /**
     * @param {(TypedArray<any> | any)} obj
     * @return {*}  {boolean}
     * @memberof TypedArray
     */ equals(obj) {
        if (!(obj instanceof $0fda2cdca3861e28$export$914b3a8889b8a8a9)) return this._data === obj;
        if (this._size.length !== obj._size.length) return false;
        let i = 0;
        let k = 0;
        for(; k < this._size.length; i = ++k){
            if (this._size[i] !== obj._size[i]) return false;
        }
        return this._data === obj._data;
    }
    /**
     * @param {number} [index]
     * @return {*}  {(number | T)}
     * @memberof TypedArray
     */ get(index) {
        if (typeof index !== 'undefined') return this._data[this._get_index(index)];
        return this._data;
    }
    /**
     * @param {number[]} new_size
     * @memberof TypedArray
     */ resize(new_size) {
        let total = 1;
        for(let i = 0; i < new_size.length; i++)total *= new_size[i];
        const BaseType = this.base_type();
        const instance = BaseType.from(total);
        instance.set(this._data);
        this._data = instance;
        this._size = new_size;
        this._signal_change();
    }
    /**
     * @protected
     * @param {*} str
     * @return {*}  {boolean}
     * @memberof TypedArray
     */ _set(str) {
        if (typeof str === 'string') {
            // TODO optimize
            this._set_state(str);
            return true;
        }
        if (this._data !== str || this._size.length !== 1 || this._size[0] !== str.length) {
            const baseType = this.base_type();
            // @ts-ignore
            this._data = baseType.from(str);
            this._size = [
                str.length
            ];
            return true;
        }
        return false;
    }
    /**
     * @private
     * @param {(number[] | number)} index
     * @return {*}  {number}
     * @memberof TypedArray
     */ _get_index(index) {
        if (Array.isArray(index)) {
            let o = 0;
            let m = 1;
            for(let i = 0; i < index.length; i++){
                o += m * index[i];
                m *= this._size[i];
            }
            return o;
        }
        return index;
    }
    /**
     * @param {IFsData} out
     * @memberof TypedArray
     */ _get_fs_data(out) {
        $kTWwb.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._get_state()} `;
    }
    /**
     * @return {*}  {string}
     * @memberof TypedArray
     */ _get_state() {
        let res = this._size.length.toString(10);
        for(let i = 0; i < this._size.length; i++)res += `, ${this._size[i]}`;
        for(let i1 = 0; i1 < this._data.length; i1++)res += `, ${this._data[i1]}`;
        return res;
    }
    /**
     * @param {string} str
     * @memberof TypedArray
     */ _set_state(str) {
        const l = str.split(',');
        let s = parseInt(l[0]);
        const size = [];
        for(let i = 0; i < s; i++)size.push(parseInt(l[i + 1]));
        this._size = size;
        const baseType = this.base_type();
        let nbItems = this.nb_items();
        // @ts-ignore
        this._data = baseType.from(nbItems);
        for(let i2 = 0; i2 < nbItems; i2++)this._data[i2] = parseFloat(l[s + 1 + i2]);
    }
}
$0fda2cdca3861e28$export$914b3a8889b8a8a9._constructorName = 'TypedArray';


class $2bc91f5cb135753f$export$83502047e761f50b extends $0fda2cdca3861e28$export$914b3a8889b8a8a9 {
    /**
     * Creates an instance of TypedArray_Float64.
     * @param {(number | number[])} [size]
     * @param {Float64Array} [data]
     * @memberof TypedArray_Float64
     */ constructor(size, data){
        super(size, data);
        this._constructorName = $2bc91f5cb135753f$export$83502047e761f50b._constructorName;
    }
    /**
     * @return {*}  {typeof TypedArray_Float64}
     * @memberof TypedArray_Float64
     */ base_type() {
        return $2bc91f5cb135753f$export$83502047e761f50b;
    }
    /**
     * @return {*}  {TypedArray_Float64}
     * @memberof TypedArray_Float64
     */ deep_copy() {
        return new $2bc91f5cb135753f$export$83502047e761f50b(this._size, this._data);
    }
}
$2bc91f5cb135753f$export$83502047e761f50b._constructorName = 'TypedArray_Float64';


var $245d5093d7014a9e$exports = {};

$parcel$export($245d5093d7014a9e$exports, "TypedArray_Int32", () => $245d5093d7014a9e$export$95edd4638367a48f);

class $245d5093d7014a9e$export$95edd4638367a48f extends $0fda2cdca3861e28$export$914b3a8889b8a8a9 {
    /**
     * Creates an instance of TypedArray_Int32.
     * @param {(number | number[])} [size]
     * @param {Int32Array} [data]
     * @memberof TypedArray_Int32
     */ constructor(size, data){
        super(size, data);
        this._constructorName = $245d5093d7014a9e$export$95edd4638367a48f._constructorName;
    }
    /**
     * @return {*}  {typeof TypedArray_Int32}
     * @memberof TypedArray_Int32
     */ base_type() {
        return $245d5093d7014a9e$export$95edd4638367a48f;
    }
    /**
     * @return {*}  {TypedArray_Int32}
     * @memberof TypedArray_Int32
     */ deep_copy() {
        return new $245d5093d7014a9e$export$95edd4638367a48f(this._size, this._data);
    }
}
$245d5093d7014a9e$export$95edd4638367a48f._constructorName = 'TypedArray_Int32';



var $7PsNg = parcelRequire("7PsNg");
var $cd99c65fa7414144$exports = {};

$parcel$export($cd99c65fa7414144$exports, "Vec", () => $cd99c65fa7414144$export$e947a0f742cf021e);

var $bwucJ = parcelRequire("bwucJ");

var $7PsNg = parcelRequire("7PsNg");
class $cd99c65fa7414144$export$e947a0f742cf021e extends $bwucJ.Lst {
    /**
     * Creates an instance of Vec.
     * @memberof Vec
     */ constructor(){
        super();
        this._constructorName = $cd99c65fa7414144$export$e947a0f742cf021e._constructorName;
    }
    /**
     * @return {*}  {typeof Val}
     * @memberof Vec
     */ base_type() {
        return $7PsNg.Val;
    }
    /**
     * @return {*}  {string}
     * @memberof Vec
     */ _underlying_fs_type() {
        return 'Lst';
    }
}
$cd99c65fa7414144$export$e947a0f742cf021e._constructorName = 'Vec';



var $iPDrE = parcelRequire("iPDrE");

var $jMVQf = parcelRequire("jMVQf");
var $2ab6e48b91659bf6$exports = {};

$parcel$export($2ab6e48b91659bf6$exports, "spinalCore", () => $2ab6e48b91659bf6$export$a34888876ba95657, (v) => $2ab6e48b91659bf6$export$a34888876ba95657 = v);

var $kTWwb = parcelRequire("kTWwb");

var $kpG8j = parcelRequire("kpG8j");
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
 */ var $2ab6e48b91659bf6$var$__awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $2ab6e48b91659bf6$export$a34888876ba95657;
(function($2ab6e48b91659bf6$export$a34888876ba95657) {
    $2ab6e48b91659bf6$export$a34888876ba95657._def = $kpG8j.ModelProcessManager._def;
    $2ab6e48b91659bf6$export$a34888876ba95657.version = "2.5.0";
    /**
     * @export
     * @param {(URL | string)} options
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     */ function connect(options, accessToken) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') parsedOpt.pathname += '/';
        const opt = {
            home_dir: parsedOpt.pathname,
            url: parsedOpt.hostname,
            port: parsedOpt.port,
            userid: parsedOpt.username,
            password: parsedOpt.password,
            accessToken: accessToken
        };
        return new $kTWwb.FileSystem(opt);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.connect = connect;
    /**
     * @export
     * @param {(URL | string)} options
     * @param {number} sessionId
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     */ function connectWithSessionId(options, sessionId, accessToken) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') parsedOpt.pathname += '/';
        const opt = {
            home_dir: parsedOpt.pathname,
            url: parsedOpt.hostname,
            port: parsedOpt.port,
            sessionId: sessionId,
            accessToken: accessToken
        };
        return new $kTWwb.FileSystem(opt);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.connectWithSessionId = connectWithSessionId;
    function connectAndLoadWithApi(options, username, password, organAccessToken) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') parsedOpt.pathname += '/';
        // do axios get
        // username,
        // password: string,
        const opt = {
            home_dir: parsedOpt.pathname,
            url: parsedOpt.hostname,
            port: parsedOpt.port,
            userid: username,
            password: password
        };
        return new $kTWwb.FileSystem(opt);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.connectAndLoadWithApi = connectAndLoadWithApi;
    function store(fs, model, path, optionOrCb, callback_error, fileOption = {
        model_type: 'Model'
    }) {
        return $2ab6e48b91659bf6$var$__awaiter(this, void 0, void 0, function*() {
            // Parse path
            const lst = path.split('/');
            const file_name = lst.pop();
            if (lst[0] === '') lst.splice(0, 1);
            path = lst.join('/'); // Absolute paths are not allowed
            const home_dir = $kTWwb.FileSystem.get_inst()._home_dir;
            try {
                const dir = yield fs.load_or_make_dir(home_dir + path);
                const file = dir.detect((x)=>x.name.get() === file_name
                );
                if (file != null) dir.remove(file);
                if (typeof optionOrCb === 'function') {
                    dir.add_file(file_name, model, fileOption);
                    optionOrCb();
                } else dir.add_file(file_name, model, optionOrCb ? optionOrCb : fileOption);
                return;
            } catch (error) {
                if (typeof optionOrCb === 'undefined') throw error;
                if (typeof callback_error === 'undefined') defaultCallbackError();
                else callback_error();
            }
        });
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.store = store;
    function register_models(modelList, name) {
        if (name) return $kpG8j.ModelProcessManager.register_models(modelList, name);
        return $kpG8j.ModelProcessManager.register_models(modelList);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.register_models = register_models;
    /**
     * @template T
     * @param {FileSystem} fs
     * @param {string} path
     * @return {*}  {Promise<T>}
     */ function loadPromise(fs, path) {
        return $2ab6e48b91659bf6$var$__awaiter(this, void 0, void 0, function*() {
            // Parse path
            const lst = path.split('/');
            const file_name = lst.pop();
            if (lst[0] === '') lst.splice(0, 1);
            path = lst.join('/'); // Absolute paths are not allowed
            const home_dir = $kTWwb.FileSystem.get_inst()._home_dir;
            const current_dir = yield fs.load_or_make_dir(`${home_dir}${path}`);
            const file = current_dir.detect((x)=>x.name.get() === file_name
            );
            if (file) return file.load();
            throw new Error('File not Found');
        });
    }
    function load(fs, path, callback_success, callback_error) {
        if (typeof callback_success === 'undefined') return loadPromise(fs, path);
        if (typeof callback_error === 'undefined') callback_error = defaultCallbackError;
        // Parse path
        const lst = path.split('/');
        const file_name = lst.pop();
        if (lst[0] === '') lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        const home_dir = $kTWwb.FileSystem.get_inst()._home_dir;
        fs.load_or_make_dir(`${home_dir}${path}`, (current_dir, err1)=>{
            if (err1) return callback_error();
            else {
                const file = current_dir.detect((x)=>x.name.get() === file_name
                );
                if (file != null) return file.load((data, err)=>{
                    if (err) return callback_error();
                    else return callback_success(data);
                });
                else return callback_error();
            }
        });
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.load = load;
    /**
     * loads all the models of a specific type
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     * @return {*}
     */ function load_type(fs, type, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = defaultCallbackError;
        return fs.load_type(type, (data, error)=>{
            if (!data || error) callback_error();
            else callback_success(data, error);
        });
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.load_type = load_type;
    function load_right(fs, ptr, callback_success, callback_error) {
        if (typeof callback_success === 'function') {
            if (typeof callback_error === 'undefined') callback_error = defaultCallbackError;
            fs.load_right(ptr, (data, err)=>{
                if (err) return callback_error();
                else return callback_success(data, err);
            });
        } else return fs.load_right(ptr);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.load_right = load_right;
    /**
     * @export
     * @param {FileSystem} fs
     * @param {number} ptr
     * @param {string} file_name
     * @param {number} right_flag
     * @param {string} targetName
     * @return {*}  {void}
     */ function share_model(fs, ptr, file_name, right_flag, targetName) {
        return fs.share_model(ptr, file_name, right_flag, targetName);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.share_model = share_model;
    $2ab6e48b91659bf6$export$a34888876ba95657.right_flag = {
        AD: 1,
        WR: 2,
        RD: 4
    };
    /**
     * "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
     * @deprecated
     * @export
     * @param {*} child
     * @param {*} parent
     * @return {*}  {*}
     */ function extend(child, parent) {
        return $kTWwb.FileSystem.extend(child, parent);
    }
    $2ab6e48b91659bf6$export$a34888876ba95657.extend = extend;
    /**
     * default callback function
     * @return {*}  {void}
     */ function defaultCallbackError() {
        return console.log('Model could not be loaded. You can pass a callback to handle this error.');
    }
})($2ab6e48b91659bf6$export$a34888876ba95657 || ($2ab6e48b91659bf6$export$a34888876ba95657 = {
}));


var $2807f303cd754282$exports = {};

$parcel$export($2807f303cd754282$exports, "spinalRegisterModel", () => $2807f303cd754282$export$322c967aeb5c06d6);
$parcel$export($2807f303cd754282$exports, "spinalRegister", () => $2807f303cd754282$export$a4e9f07232169aad);

var $kpG8j = parcelRequire("kpG8j");
function $2807f303cd754282$export$322c967aeb5c06d6(model, name = model._constructorName) {
    globalThis[name] = model;
    $kpG8j.ModelProcessManager.spinal[name] = model;
    $kpG8j.ModelProcessManager.register_models(model, name);
}
function $2807f303cd754282$export$a4e9f07232169aad(obj, name) {
    globalThis[name] = obj;
    $kpG8j.ModelProcessManager.spinal[name] = obj;
}



var $kTWwb = parcelRequire("kTWwb");

var $bu6Xb = parcelRequire("bu6Xb");

var $1QqRJ = parcelRequire("1QqRJ");



var $6s0Bi = parcelRequire("6s0Bi");




var $hWlaF = parcelRequire("hWlaF");


var $9a88a1e0868cd687$exports = {};


var $db0c2ebbf3e151db$exports = {};


var $7894be1d63791b05$exports = {};


var $9b312e45adc7eb5b$exports = {};


var $e5f73265868eaa6c$exports = {};


var $fc03d650fe6db64c$exports = {};


var $e6b84bd255caafd2$exports = {};


var $1fb4cd7f44b35ddf$exports = {};


var $f15e05185c821fae$exports = {};


var $c2e78bf8e3f38357$exports = {};


var $6a11172f099f5f52$exports = {};


var $1b7d35aa01ba2744$exports = {};


var $6f285959eb6fbbf3$exports = {};


var $6816f3f368405ec6$exports = {};



var $kpG8j = parcelRequire("kpG8j");

var $wlgMR = parcelRequire("wlgMR");


var $bwucJ = parcelRequire("bwucJ");

var $laC9O = parcelRequire("laC9O");

var $jJj5z = parcelRequire("jJj5z");

var $9hnUG = parcelRequire("9hnUG");




var $7PsNg = parcelRequire("7PsNg");


var $iPDrE = parcelRequire("iPDrE");
var $3cabc97f3882f2b5$exports = {};

$parcel$export($3cabc97f3882f2b5$exports, "bind", () => $3cabc97f3882f2b5$export$2385a24977818dd0);

var $laC9O = parcelRequire("laC9O");
function $3cabc97f3882f2b5$export$2385a24977818dd0(model, func, onchange_construction = true) {
    if (model instanceof $laC9O.Model) model.bind(func, onchange_construction);
    else {
        for (const m of model)return m.bind(func, onchange_construction);
    }
}
globalThis.bind = $3cabc97f3882f2b5$export$2385a24977818dd0;



var $jMVQf = parcelRequire("jMVQf");

var $c7e5c73f345fe400$exports = {};
var $193f33954433557e$exports = {};

$parcel$export($193f33954433557e$exports, "addClass", () => $193f33954433557e$export$d2cf6cd1dc7067d3);
function $193f33954433557e$export$d2cf6cd1dc7067d3(obj, src) {
    if (typeof src === 'string') return $193f33954433557e$export$d2cf6cd1dc7067d3(obj, src.split(' '));
    const old = (obj.className || '').split(' ');
    const p_1 = src.filter((x)=>old.indexOf(x) < 0
    );
    obj.className = old.concat(p_1).filter((x)=>x
    ).join(' ');
}
globalThis.add_class = $193f33954433557e$export$d2cf6cd1dc7067d3;
globalThis.addClass = $193f33954433557e$export$d2cf6cd1dc7067d3;


var $5daf3431c3d985d3$exports = {};

$parcel$export($5daf3431c3d985d3$exports, "getLeft", () => $5daf3431c3d985d3$export$da405662c16fca8e);
function $5daf3431c3d985d3$export$da405662c16fca8e(l) {
    if (l.offsetParent != null) return l.offsetLeft + $5daf3431c3d985d3$export$da405662c16fca8e(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_left = $5daf3431c3d985d3$export$da405662c16fca8e;
globalThis.getLeft = $5daf3431c3d985d3$export$da405662c16fca8e;


var $596e77d0de4ae05d$exports = {};

$parcel$export($596e77d0de4ae05d$exports, "getTop", () => $596e77d0de4ae05d$export$449115d164fc37c3);
function $596e77d0de4ae05d$export$449115d164fc37c3(l) {
    if (l.offsetParent != null) return l.offsetLeft + $596e77d0de4ae05d$export$449115d164fc37c3(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_top = $596e77d0de4ae05d$export$449115d164fc37c3;
globalThis.getTop = $596e77d0de4ae05d$export$449115d164fc37c3;



var $8ITXC = parcelRequire("8ITXC");
var $db68a3537413a9d2$exports = {};

$parcel$export($db68a3537413a9d2$exports, "remClass", () => $db68a3537413a9d2$export$bf01a0cff267368f);
function $db68a3537413a9d2$export$bf01a0cff267368f(obj, src) {
    if (typeof src === 'string') return $db68a3537413a9d2$export$bf01a0cff267368f(obj, src.split(' '));
    const old = (obj.className || '').split(' ');
    obj.className = old.filter((x)=>src.indexOf(x) < 0
    ).join(' ');
}
globalThis.rem_class = $db68a3537413a9d2$export$bf01a0cff267368f;
globalThis.remClass = $db68a3537413a9d2$export$bf01a0cff267368f;


var $ce7a46a803a62f13$exports = {};

$parcel$export($ce7a46a803a62f13$exports, "spinalNewPopup", () => $ce7a46a803a62f13$export$4401ffb216812b56);

var $8I4LJ = parcelRequire("8I4LJ");
let $ce7a46a803a62f13$var$_index_current_popup = 10000;
function $ce7a46a803a62f13$export$4401ffb216812b56(title, params = {
}) {
    let b;
    let extention = 'px', width, height;
    if (params.popup_closer == null) b = $8I4LJ.newDomElement({
        parentNode: document.body,
        id: 'popup_closer',
        onmousedown: function(_evt) {
            if (typeof params.onclose === 'function') params.onclose();
            document.body.removeChild(b);
            document.body.removeChild(w);
        },
        ondrop: function(evt) {
            if (!evt) evt = window.event;
            evt.cancelBubble = true;
            if (typeof evt.stopPropagation === 'function') evt.stopPropagation();
            if (typeof evt.preventDefault === 'function') evt.preventDefault();
            if (typeof evt.stopImmediatePropagation === 'function') evt.stopImmediatePropagation();
            return false;
        },
        style: {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: params.fixed_opacity || '#000',
            opacity: params.fixed_opacity || 0,
            zIndex: $ce7a46a803a62f13$var$_index_current_popup
        }
    });
    const clientX = params.event != null && params.event.clientX ? params.event.clientX : window.innerWidth / 2 - 10;
    const clientY = params.event != null && params.event.clientY ? params.event.clientY : window.innerHeight / 2 - 10;
    let top_x = params.top_x || -1000;
    let top_y = params.top_y || -1000;
    let old_x = 0;
    let old_y = 0;
    if (params.width != null) width = params.width;
    if (params.height != null) height = params.height;
    function repos() {
        top_x = clientX - w.clientWidth / 2;
        top_y = clientY - w.clientHeight / 2;
        if (top_x + w.clientWidth > window.innerWidth) top_x = window.innerWidth - w.clientWidth - 50;
        if (top_y + w.clientHeight > window.innerHeight) top_y = window.innerHeight - w.clientHeight + 50;
        if (top_x < 50) top_x = 50;
        if (top_y < 50) top_y = 50;
        w.style.left = top_x.toString(10);
        w.style.top = top_y.toString(10);
    }
    function _drag_evt_func(evt) {
        top_x += evt.clientX - old_x;
        top_y += evt.clientY - old_y;
        w.style.left = top_x.toString(10);
        w.style.top = top_y.toString(10);
        old_x = evt.clientX;
        old_y = evt.clientY;
        return typeof evt.preventDefault === 'function' ? evt.preventDefault() : void 0;
    }
    function _drag_end_func() {
        if (typeof document.detachEvent === 'function') {
            // for old browser
            document.detachEvent('onmousemove', _drag_evt_func);
            document.detachEvent('onmouseup', _drag_end_func);
        }
        if (typeof document.removeEventListener === 'function') {
            document.removeEventListener('mousemove', _drag_evt_func, true);
            document.removeEventListener('mouseup', _drag_end_func, true);
        }
    }
    if (!params.top_x) {
        setTimeout(repos, 5);
        extention = '%';
    }
    const w = $8I4LJ.newDomElement({
        parentNode: document.body,
        className: 'Popup',
        style: {
            position: 'absolute',
            left: top_x,
            top: top_y,
            width: width + extention,
            height: height + extention,
            zIndex: $ce7a46a803a62f13$var$_index_current_popup + 1,
            border: 'thin solid black',
            background: '#e5e5e5',
            resize: 'both',
            overflow: 'auto',
            paddingBottom: '8px'
        }
    });
    $ce7a46a803a62f13$var$_index_current_popup += 2;
    $8I4LJ.newDomElement({
        parentNode: w,
        className: 'PopupClose',
        txt: 'Close',
        style: {
            float: 'right',
            marginRight: '4px',
            marginTop: '4px',
            cursor: 'pointer'
        },
        onmousedown: function(evt) {
            if (typeof params.onclose === 'function') params.onclose();
            if (b != null) document.body.removeChild(b);
            document.body.removeChild(w);
        }
    });
    if (title) $8I4LJ.newDomElement({
        parentNode: w,
        className: 'PopupTitle',
        innerHTML: title,
        style: {
            background: '#262626',
            padding: '5 10 3 10',
            height: '22px',
            fontSize: '12px',
            borderBottom: 'thin solid black',
            cursor: 'pointer',
            color: 'white'
        },
        onmousedown: function(evt) {
            old_x = evt.clientX;
            old_y = evt.clientY;
            top_x = parseInt(w.style.left);
            top_y = parseInt(w.style.top);
            document.addEventListener('mousemove', _drag_evt_func, true);
            document.addEventListener('mouseup', _drag_end_func, true);
            return typeof evt.preventDefault === 'function' ? evt.preventDefault() : void 0;
        }
    });
    const res = $8I4LJ.newDomElement({
        parentNode: w,
        className: 'PopupWindow',
        style: {
            padding: '6px',
            height: '100%',
            color: '#262626'
        }
    });
    if (params.child != null) res.appendChild(params.child);
    return res;
}
globalThis.spinal_new_popup = $ce7a46a803a62f13$export$4401ffb216812b56;
globalThis.spinalNewPopup = $ce7a46a803a62f13$export$4401ffb216812b56;


$parcel$exportWildcard($c7e5c73f345fe400$exports, $193f33954433557e$exports);
$parcel$exportWildcard($c7e5c73f345fe400$exports, $5daf3431c3d985d3$exports);
$parcel$exportWildcard($c7e5c73f345fe400$exports, $596e77d0de4ae05d$exports);
$parcel$exportWildcard($c7e5c73f345fe400$exports, $8ITXC);
$parcel$exportWildcard($c7e5c73f345fe400$exports, $db68a3537413a9d2$exports);
$parcel$exportWildcard($c7e5c73f345fe400$exports, $ce7a46a803a62f13$exports);



var $bXDXC = parcelRequire("bXDXC");

var $2Cp37 = parcelRequire("2Cp37");

if (!('spinal' in globalThis)) globalThis.spinal = $kpG8j.ModelProcessManager.spinal;
$2807f303cd754282$export$a4e9f07232169aad($2ab6e48b91659bf6$exports.spinalCore, 'spinalCore');
$2807f303cd754282$export$a4e9f07232169aad($kTWwb.FileSystem, 'FileSystem');
$2807f303cd754282$export$a4e9f07232169aad($kpG8j.ModelProcessManager, 'ModelProcessManager');
$2807f303cd754282$export$a4e9f07232169aad($jMVQf.Process, 'Process');
$2807f303cd754282$export$a4e9f07232169aad($iPDrE.BindProcess, 'BindProcess');
$2807f303cd754282$export$322c967aeb5c06d6($laC9O.Model, 'Model');
$2807f303cd754282$export$322c967aeb5c06d6($jJj5z.Obj, 'Obj');
$2807f303cd754282$export$322c967aeb5c06d6($wlgMR.Bool, 'Bool');
$2807f303cd754282$export$322c967aeb5c06d6($7PsNg.Val, 'Val');
$2807f303cd754282$export$322c967aeb5c06d6($9hnUG.Str, 'Str');
$2807f303cd754282$export$322c967aeb5c06d6($bwucJ.Lst, 'Lst');
$2807f303cd754282$export$322c967aeb5c06d6($cd99c65fa7414144$export$e947a0f742cf021e, 'Vec');
$2807f303cd754282$export$322c967aeb5c06d6($caad248f843be890$export$32a7462f6a06cbd5, 'Choice');
$2807f303cd754282$export$322c967aeb5c06d6($245d5093d7014a9e$export$95edd4638367a48f, 'TypedArray_Int32');
$2807f303cd754282$export$322c967aeb5c06d6($2bc91f5cb135753f$export$83502047e761f50b, 'TypedArray_Float64');
$2807f303cd754282$export$322c967aeb5c06d6($bu6Xb.Directory, 'Directory');
$2807f303cd754282$export$322c967aeb5c06d6($1QqRJ.File, 'File');
$2807f303cd754282$export$322c967aeb5c06d6($hWlaF.TiffFile, 'TiffFile');
$2807f303cd754282$export$322c967aeb5c06d6($e5db43feb804d144$export$4b2950bdac9b6ee9, 'Path');
$2807f303cd754282$export$322c967aeb5c06d6($6s0Bi.Ptr, 'Ptr');
$2807f303cd754282$export$322c967aeb5c06d6($67f9759f7ac53203$export$598ea37cc1e20dfa, 'Pbr');
$2807f303cd754282$export$322c967aeb5c06d6($d232c5f860d1adcf$export$d0f738c06f5e6fee, 'SessionModel');
$2807f303cd754282$export$322c967aeb5c06d6($cc6c76347735cde9$export$1f44aaf2ec115b54, 'User');
$2807f303cd754282$export$322c967aeb5c06d6($eb5c792cb946b2e8$export$56864abfbf86ef48, 'UserRight');
$2807f303cd754282$export$322c967aeb5c06d6($d3b662a97bc8deca$export$86422d9fcaac5a78, 'RightSetList');
$2807f303cd754282$export$322c967aeb5c06d6($a8326928a2d164b4$export$d4cfb3e939ea5c80, 'RightsItem');
$parcel$exportWildcard(module.exports, $kTWwb);
$parcel$exportWildcard(module.exports, $bu6Xb);
$parcel$exportWildcard(module.exports, $1QqRJ);
$parcel$exportWildcard(module.exports, $e5db43feb804d144$exports);
$parcel$exportWildcard(module.exports, $67f9759f7ac53203$exports);
$parcel$exportWildcard(module.exports, $6s0Bi);
$parcel$exportWildcard(module.exports, $d3b662a97bc8deca$exports);
$parcel$exportWildcard(module.exports, $a8326928a2d164b4$exports);
$parcel$exportWildcard(module.exports, $d232c5f860d1adcf$exports);
$parcel$exportWildcard(module.exports, $hWlaF);
$parcel$exportWildcard(module.exports, $cc6c76347735cde9$exports);
$parcel$exportWildcard(module.exports, $eb5c792cb946b2e8$exports);
$parcel$exportWildcard(module.exports, $kpG8j);
$parcel$exportWildcard(module.exports, $wlgMR);
$parcel$exportWildcard(module.exports, $caad248f843be890$exports);
$parcel$exportWildcard(module.exports, $bwucJ);
$parcel$exportWildcard(module.exports, $laC9O);
$parcel$exportWildcard(module.exports, $jJj5z);
$parcel$exportWildcard(module.exports, $9hnUG);
$parcel$exportWildcard(module.exports, $2bc91f5cb135753f$exports);
$parcel$exportWildcard(module.exports, $245d5093d7014a9e$exports);
$parcel$exportWildcard(module.exports, $7PsNg);
$parcel$exportWildcard(module.exports, $cd99c65fa7414144$exports);
$parcel$exportWildcard(module.exports, $iPDrE);
$parcel$exportWildcard(module.exports, $jMVQf);
$parcel$exportWildcard(module.exports, $2ab6e48b91659bf6$exports);
$parcel$exportWildcard(module.exports, $2807f303cd754282$exports);
$parcel$exportWildcard(module.exports, $9a88a1e0868cd687$exports);
$parcel$exportWildcard(module.exports, $db0c2ebbf3e151db$exports);
$parcel$exportWildcard(module.exports, $7894be1d63791b05$exports);
$parcel$exportWildcard(module.exports, $9b312e45adc7eb5b$exports);
$parcel$exportWildcard(module.exports, $e5f73265868eaa6c$exports);
$parcel$exportWildcard(module.exports, $fc03d650fe6db64c$exports);
$parcel$exportWildcard(module.exports, $e6b84bd255caafd2$exports);
$parcel$exportWildcard(module.exports, $1fb4cd7f44b35ddf$exports);
$parcel$exportWildcard(module.exports, $f15e05185c821fae$exports);
$parcel$exportWildcard(module.exports, $c2e78bf8e3f38357$exports);
$parcel$exportWildcard(module.exports, $6a11172f099f5f52$exports);
$parcel$exportWildcard(module.exports, $1b7d35aa01ba2744$exports);
$parcel$exportWildcard(module.exports, $6f285959eb6fbbf3$exports);
$parcel$exportWildcard(module.exports, $6816f3f368405ec6$exports);
$parcel$exportWildcard(module.exports, $0fda2cdca3861e28$exports);
$parcel$exportWildcard(module.exports, $3cabc97f3882f2b5$exports);
$parcel$exportWildcard(module.exports, $c7e5c73f345fe400$exports);
$parcel$exportWildcard(module.exports, $bXDXC);
$parcel$exportWildcard(module.exports, $2Cp37);


//# sourceMappingURL=main.js.map
