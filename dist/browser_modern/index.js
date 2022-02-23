// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"34qru":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ var _fileSystem = require("./FileSystem/FileSystem");
var _directory = require("./FileSystem/Models/Directory");
var _file = require("./FileSystem/Models/File");
var _path = require("./FileSystem/Models/Path");
var _pbr = require("./FileSystem/Models/Pbr");
var _ptr = require("./FileSystem/Models/Ptr");
var _rightSetList = require("./FileSystem/Models/RightSetList");
var _rightsItem = require("./FileSystem/Models/RightsItem");
var _sessionModel = require("./FileSystem/Models/SessionModel");
var _tiffFile = require("./FileSystem/Models/TiffFile");
var _user = require("./FileSystem/Models/User");
var _userRight = require("./FileSystem/Models/UserRight");
var _globalsDef = require("./globalsDef");
var _modelProcessManager = require("./ModelProcessManager");
var _bool = require("./Models/Bool");
var _choice = require("./Models/Choice");
var _lst = require("./Models/Lst");
var _model = require("./Models/Model");
var _obj = require("./Models/Obj");
var _str = require("./Models/Str");
var _typedArrayFloat64 = require("./Models/TypedArray_Float64");
var _typedArrayInt32 = require("./Models/TypedArray_Int32");
var _val = require("./Models/Val");
var _vec = require("./Models/Vec");
var _bindProcess = require("./Processes/BindProcess");
var _process = require("./Processes/Process");
var _spinalcore = require("./Spinalcore");
var _spinalRegister = require("./Utils/spinalRegister");
parcelHelpers.exportAll(_fileSystem, exports);
parcelHelpers.exportAll(_directory, exports);
parcelHelpers.exportAll(_file, exports);
parcelHelpers.exportAll(_path, exports);
parcelHelpers.exportAll(_pbr, exports);
parcelHelpers.exportAll(_ptr, exports);
parcelHelpers.exportAll(_rightSetList, exports);
parcelHelpers.exportAll(_rightsItem, exports);
parcelHelpers.exportAll(_sessionModel, exports);
parcelHelpers.exportAll(_tiffFile, exports);
parcelHelpers.exportAll(_user, exports);
parcelHelpers.exportAll(_userRight, exports);
var _ifileInfo = require("./interfaces/IFileInfo");
parcelHelpers.exportAll(_ifileInfo, exports);
var _iflatModelMap = require("./interfaces/IFlatModelMap");
parcelHelpers.exportAll(_iflatModelMap, exports);
var _ifsData = require("./interfaces/IFsData");
parcelHelpers.exportAll(_ifsData, exports);
var _ispinalModels = require("./interfaces/ISpinalModels");
parcelHelpers.exportAll(_ispinalModels, exports);
var _istateMap = require("./interfaces/IStateMap");
parcelHelpers.exportAll(_istateMap, exports);
var _spinalCallBackError = require("./interfaces/SpinalCallBackError");
parcelHelpers.exportAll(_spinalCallBackError, exports);
var _spinalFilterFunction = require("./interfaces/SpinalFilterFunction");
parcelHelpers.exportAll(_spinalFilterFunction, exports);
var _spinalLoadCallBack = require("./interfaces/SpinalLoadCallBack");
parcelHelpers.exportAll(_spinalLoadCallBack, exports);
var _spinalLoadCallBackSucess = require("./interfaces/SpinalLoadCallBackSucess");
parcelHelpers.exportAll(_spinalLoadCallBackSucess, exports);
var _spinalOnChangeBindModel = require("./interfaces/SpinalOnChangeBindModel");
parcelHelpers.exportAll(_spinalOnChangeBindModel, exports);
var _spinalSortFunction = require("./interfaces/SpinalSortFunction");
parcelHelpers.exportAll(_spinalSortFunction, exports);
var _spinalStoreCallBackSucess = require("./interfaces/SpinalStoreCallBackSucess");
parcelHelpers.exportAll(_spinalStoreCallBackSucess, exports);
parcelHelpers.exportAll(_modelProcessManager, exports);
parcelHelpers.exportAll(_bool, exports);
parcelHelpers.exportAll(_choice, exports);
parcelHelpers.exportAll(_lst, exports);
parcelHelpers.exportAll(_model, exports);
parcelHelpers.exportAll(_obj, exports);
parcelHelpers.exportAll(_str, exports);
var _typedArray = require("./Models/TypedArray");
parcelHelpers.exportAll(_typedArray, exports);
parcelHelpers.exportAll(_typedArrayFloat64, exports);
parcelHelpers.exportAll(_typedArrayInt32, exports);
parcelHelpers.exportAll(_val, exports);
parcelHelpers.exportAll(_vec, exports);
parcelHelpers.exportAll(_bindProcess, exports);
var _globalBindFunction = require("./Processes/GlobalBindFunction");
parcelHelpers.exportAll(_globalBindFunction, exports);
parcelHelpers.exportAll(_process, exports);
parcelHelpers.exportAll(_spinalcore, exports);
var _domHelper = require("./Utils/DomHelper");
parcelHelpers.exportAll(_domHelper, exports);
var _getUrlPath = require("./Utils/getUrlPath");
parcelHelpers.exportAll(_getUrlPath, exports);
var _isIterable = require("./Utils/isIterable");
parcelHelpers.exportAll(_isIterable, exports);
parcelHelpers.exportAll(_spinalRegister, exports);
if (!('spinal' in globalThis)) globalThis.spinal = _modelProcessManager.ModelProcessManager.spinal;
_spinalRegister.spinalRegister(_spinalcore.spinalCore, 'spinalCore');
_spinalRegister.spinalRegister(_fileSystem.FileSystem, 'FileSystem');
_spinalRegister.spinalRegister(_modelProcessManager.ModelProcessManager, 'ModelProcessManager');
_spinalRegister.spinalRegister(_process.Process, 'Process');
_spinalRegister.spinalRegister(_bindProcess.BindProcess, 'BindProcess');
_spinalRegister.spinalRegisterModel(_model.Model, 'Model');
_spinalRegister.spinalRegisterModel(_obj.Obj, 'Obj');
_spinalRegister.spinalRegisterModel(_bool.Bool, 'Bool');
_spinalRegister.spinalRegisterModel(_val.Val, 'Val');
_spinalRegister.spinalRegisterModel(_str.Str, 'Str');
_spinalRegister.spinalRegisterModel(_lst.Lst, 'Lst');
_spinalRegister.spinalRegisterModel(_vec.Vec, 'Vec');
_spinalRegister.spinalRegisterModel(_choice.Choice, 'Choice');
_spinalRegister.spinalRegisterModel(_typedArrayInt32.TypedArray_Int32, 'TypedArray_Int32');
_spinalRegister.spinalRegisterModel(_typedArrayFloat64.TypedArray_Float64, 'TypedArray_Float64');
_spinalRegister.spinalRegisterModel(_directory.Directory, 'Directory');
_spinalRegister.spinalRegisterModel(_file.File, 'File');
_spinalRegister.spinalRegisterModel(_tiffFile.TiffFile, 'TiffFile');
_spinalRegister.spinalRegisterModel(_path.Path, 'Path');
_spinalRegister.spinalRegisterModel(_ptr.Ptr, 'Ptr');
_spinalRegister.spinalRegisterModel(_pbr.Pbr, 'Pbr');
_spinalRegister.spinalRegisterModel(_sessionModel.SessionModel, 'SessionModel');
_spinalRegister.spinalRegisterModel(_user.User, 'User');
_spinalRegister.spinalRegisterModel(_userRight.UserRight, 'UserRight');
_spinalRegister.spinalRegisterModel(_rightSetList.RightSetList, 'RightSetList');
_spinalRegister.spinalRegisterModel(_rightsItem.RightsItem, 'RightsItem');

},{"./FileSystem/FileSystem":"eYpcG","./FileSystem/Models/Directory":"9oJiN","./FileSystem/Models/File":"kxiHI","./FileSystem/Models/Path":"02Blu","./FileSystem/Models/Pbr":"2jJC6","./FileSystem/Models/Ptr":"bTe04","./FileSystem/Models/RightSetList":"5niy6","./FileSystem/Models/RightsItem":"1ASEo","./FileSystem/Models/SessionModel":"4OlYb","./FileSystem/Models/TiffFile":"eCGRl","./FileSystem/Models/User":"cYmiC","./FileSystem/Models/UserRight":"iNqdT","./globalsDef":"3xqio","./ModelProcessManager":"dOE4H","./Models/Bool":"cVqfI","./Models/Choice":"lrl2h","./Models/Lst":"fNg0Y","./Models/Model":"cHUcK","./Models/Obj":"dp6Uw","./Models/Str":"9Umkv","./Models/TypedArray_Float64":"iTKWh","./Models/TypedArray_Int32":"62fLc","./Models/Val":"iYqiF","./Models/Vec":"6ok7m","./Processes/BindProcess":"IcRzL","./Processes/Process":"e8weF","./Spinalcore":"6W7Pa","./Utils/spinalRegister":"ajsC1","./interfaces/IFileInfo":"cghV4","./interfaces/IFlatModelMap":"9Uy21","./interfaces/IFsData":"aeZ0J","./interfaces/ISpinalModels":"1QytI","./interfaces/IStateMap":"6lKRe","./interfaces/SpinalCallBackError":"fiAFh","./interfaces/SpinalFilterFunction":"aKPJS","./interfaces/SpinalLoadCallBack":"bV7fQ","./interfaces/SpinalLoadCallBackSucess":"5uh30","./interfaces/SpinalOnChangeBindModel":"3lN6j","./interfaces/SpinalSortFunction":"1jRCm","./interfaces/SpinalStoreCallBackSucess":"bbO0q","./Models/TypedArray":"gEyZC","./Processes/GlobalBindFunction":"46gSA","./Utils/DomHelper":"i0bui","./Utils/getUrlPath":"aK1gd","./Utils/isIterable":"h1aIi","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"eYpcG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FileSystem", ()=>FileSystem
);
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
 */ var _modelProcessManager = require("../ModelProcessManager");
var _newAlertMsg = require("../Utils/DomHelper/NewAlertMsg");
var _getUrlPath = require("../Utils/getUrlPath");
var _directory = require("./Models/Directory");
var global = arguments[3];
var process = require("process");
class FileSystem {
    constructor(sessionId){
        // public static _def: { [constructorName: string]: typeof Model } = {};
        // default values
        this._data_to_send = '';
        this._session_num = -2;
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
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
            if (FileSystem._userid != null) this.send(`U ${FileSystem._userid} ${FileSystem._password} `);
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
     */ load(path, callback) {
        FileSystem._send_chan();
        this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    // load all the objects of $type
    load_type(type, callback) {
        FileSystem._send_chan();
        this.send(`R 0 ${type} `);
        FileSystem._type_callbacks.push([
            type,
            callback
        ]);
    }
    // make dir if not already present in the server. Call callback
    // as in the @load proc -- when done (i.e. when loaded or created)
    load_or_make_dir(dir, callback) {
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
                            const n_dir = new _directory.Directory();
                            n_res.add_file(nir, n_dir);
                            return callback(n_dir, n_err);
                        }
                    });
                }
            } else return callback(res, err);
        });
    }
    // load an object using is pointer and call $callback with the corresponding ref
    load_ptr(ptr, callback) {
        FileSystem._send_chan();
        this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    load_right(ptr, callback) {
        FileSystem._send_chan();
        this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    share_model(ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        this.send(`h ${typeof ptr === 'number' ? ptr : ptr._server_id} ${share_type} ${encodeURI(targetName)} ${encodeURI(file_name)} `);
    }
    // explicitly send a command
    send(data) {
        this._data_to_send += data;
        if (FileSystem._timer_send == null) FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
    }
    // send a request for a "push" channel
    make_channel() {
        let path = _getUrlPath.getUrlPath(`?s=${this._session_num}`);
        const xhr_object = FileSystem._my_xml_http_request();
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer !== 0) _fs.onConnectionError(0);
                _fs.make_channel_error_timer = 0;
                if (FileSystem._disp) console.log('chan ->', this.responseText);
                const created = [];
                function _w(sid, obj) {
                    const _obj = FileSystem._create_model_by_name(obj);
                    if (sid != null && _obj != null) {
                        _obj._server_id = sid;
                        FileSystem._objects[sid] = _obj;
                        for (const [type, cb] of FileSystem._type_callbacks){
                            // @ts-ignore
                            const mod_R = _modelProcessManager.ModelProcessManager._def[type] || _modelProcessManager.ModelProcessManager.spinal[type];
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
                const _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer === 0) {
                    //first disconnect
                    console.log('Trying to reconnect.');
                    _fs.make_channel_error_timer = Date.now();
                    setTimeout(_fs.make_channel.bind(_fs), 1000);
                    return _fs.onConnectionError(1);
                } else if (Date.now() - _fs.make_channel_error_timer < FileSystem._timeout_reconnect) // under timeout
                setTimeout(_fs.make_channel.bind(_fs), 1000); // timeout reached
                else return _fs.onConnectionError(2);
            } else if (this.readyState === 4 && this.status === 500) FileSystem.get_inst().onConnectionError(3);
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
    onConnectionError(error_code) {
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
                process.exit();
            } else console.error('Disconnected from the server.');
        }
        if (msg !== '') {
            if (typeof FileSystem.popup === 'undefined') FileSystem.popup = new _newAlertMsg.NewAlertMsg({
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
    // get the first running inst
    static get_inst() {
        for(const k in FileSystem._insts)return FileSystem._insts[k];
        return new FileSystem();
    }
    static set_server_id_if_necessary(out, obj) {
        if (obj._server_id == null) {
            // registering
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            // new object
            let ncl = _modelProcessManager.ModelProcessManager.get_object_class(obj);
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
    static signal_change(m) {
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
            let path = _getUrlPath.getUrlPath(`?s=${fs._session_num}&p=${tmp._server_id}`);
            const xhr_object = FileSystem._my_xml_http_request();
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
        if (typeof _modelProcessManager.ModelProcessManager._def[name] !== 'undefined') return new _modelProcessManager.ModelProcessManager._def[name]();
        if (typeof _modelProcessManager.ModelProcessManager.spinal[name] === 'undefined') {
            if (FileSystem.debug === true) console.warn(`Got Model type \"${name}\" from hub but not registered.`);
            _modelProcessManager.ModelProcessManager._def[name] = new Function(`return class ${name} extends ModelProcessManager._def[\"Model\"] {}`)();
            return new _modelProcessManager.ModelProcessManager._def[name]();
        }
    }
    static extend(child, parent) {
        throw 'FileSystem.extend is a legacy function, do ont use';
    }
    static _get_new_tmp_server_id() {
        FileSystem._cur_tmp_server_id++;
        if (FileSystem._cur_tmp_server_id % 4 === 0) FileSystem._cur_tmp_server_id++;
        return FileSystem._cur_tmp_server_id;
    }
    // send changes
    static _send_chan() {
        const out = FileSystem._get_chan_data();
        for(const f in FileSystem._insts)FileSystem._insts[f].send(out);
    }
    // timeout for at least one changed object
    static _timeout_chan_func() {
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
            const f = FileSystem._insts[k1];
            if (!f._data_to_send.length) continue;
            // if we are waiting for a session id, do not send the data
            // (@responseText will contain another call to @_timeout_send with the session id)
            if (f._session_num === -1) continue;
            // for first call, do not add the session id (but say that we are waiting for one)
            if (f._session_num === -2) f._session_num = -1;
            else f._data_to_send = `s ${f._session_num} ` + f._data_to_send;
            // request
            let path = _getUrlPath.getUrlPath();
            const xhr_object = FileSystem._my_xml_http_request();
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
                                const mod_R = _modelProcessManager.ModelProcessManager.spinal[type] || _modelProcessManager.ModelProcessManager._def[type];
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
                } else if (this.readyState === 4 && (this.status === 0 || this.status === 500)) return FileSystem.get_inst().onConnectionError(4);
            };
            if (FileSystem._disp) console.log('sent ->', f._data_to_send + 'E ');
            xhr_object.setRequestHeader('Content-Type', 'text/plain');
            xhr_object.send(f._data_to_send + 'E ');
            f._data_to_send = '';
        }
        FileSystem._objects_to_send = {
        };
        return delete FileSystem._timer_send;
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
FileSystem._userid = '644';
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
// url and port of the server
FileSystem._url = '127.0.0.1';
FileSystem._port = '8888';
FileSystem.url_com = '/sceen/_';
FileSystem.url_upload = '/sceen/upload';
// conector type : Browser or Node
FileSystem.CONNECTOR_TYPE = typeof globalThis.global != 'undefined' ? 'Node' : 'Browser';

},{"process":"lOGxP","../ModelProcessManager":"dOE4H","../Utils/DomHelper/NewAlertMsg":"cCghe","../Utils/getUrlPath":"aK1gd","./Models/Directory":"9oJiN","xhr2":"gGxxt","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"lOGxP":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {
};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function() {
    try {
        if (typeof setTimeout === 'function') cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e1) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {
};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {
};
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error('process.binding is not supported');
};
process.cwd = function() {
    return '/';
};
process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() {
    return 0;
};

},{}],"dOE4H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ModelProcessManager", ()=>ModelProcessManager
);
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
 */ var _bool = require("./Models/Bool");
var _lst = require("./Models/Lst");
var _model = require("./Models/Model");
var _str = require("./Models/Str");
var _val = require("./Models/Val");
var _isIterable = require("./Utils/isIterable");
var ModelProcessManager;
(function(ModelProcessManager1) {
    // nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
    ModelProcessManager1._counter = 0;
    // changed models (current round)
    ModelProcessManager1._modlist = new Map();
    // new processes (that will need a first onchange call in "force" mode)
    ModelProcessManager1._n_processes = new Map();
    // current model id (used to create new ids)
    ModelProcessManager1._cur_mid = 0;
    // current process id (used to create new ids)
    ModelProcessManager1._cur_process_id = 0;
    // timer used to create a new "round"
    ModelProcessManager1._timeout = undefined;
    // if _force_m == true, every has_been_modified function will return true
    ModelProcessManager1._force_m = false;
    ModelProcessManager1._def = {
    };
    function new_from_state() {
        throw 'function obsolete';
    }
    ModelProcessManager1.new_from_state = new_from_state;
    function load() {
        throw 'function obsolete';
    }
    ModelProcessManager1.load = load;
    function conv(v) {
        if (v instanceof _model.Model) return v;
        if (v instanceof Array) return new _lst.Lst(v);
        if (typeof v === 'string') return new _str.Str(v);
        if (typeof v === 'number') return new _val.Val(v);
        if (typeof v === 'boolean') return new _bool.Bool(v);
        return new _model.Model(v);
    }
    ModelProcessManager1.conv = conv;
    function get_object_class(obj) {
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
    ModelProcessManager1.get_object_class = get_object_class;
    function _get_attribute_names(m) {
        if (m instanceof _model.Model) return m._attribute_names;
        const res = [];
        for(const key in m)if (Object.prototype.hasOwnProperty.call(m, key)) res.push(key);
        return res;
    }
    ModelProcessManager1._get_attribute_names = _get_attribute_names;
    /**
     *  create a Model using a line of get_state(using.type, .data, ...)
     * @export
     * @template T
     * @param {string} mid
     * @param {IStateMap<T>} map
     * @return {*}  {T}
     */ function _new_model_from_state(mid, map) {
        var info = map[mid];
        info.buff = new ModelProcessManager1._def[info.type]();
        info.buff._set_state(info.data, map);
        return info.buff;
    }
    ModelProcessManager1._new_model_from_state = _new_model_from_state;
    /**
     * say that something will need a call
     * to ModelProcessManager._sync_processes during the next round
     * @export
     * @return {*}  {ReturnType<typeof setTimeout>}
     */ function _need_sync_processes() {
        if (ModelProcessManager1._timeout == null) {
            ModelProcessManager1._timeout = setTimeout(_sync_processes, 1);
            return ModelProcessManager1._timeout;
        }
    }
    ModelProcessManager1._need_sync_processes = _need_sync_processes;
    function register_models(modelList, name) {
        if (modelList) {
            // function
            if (modelList instanceof Function) ModelProcessManager1._register_models_check(modelList, name);
            else if (_isIterable.isIterable(modelList)) {
                // array
                const l = modelList;
                for (const m of l)ModelProcessManager1.register_models(m);
            } else {
                // obj
                const obj = modelList;
                for(const key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) ModelProcessManager1._register_models_check(obj[key], key);
            }
        }
    }
    ModelProcessManager1.register_models = register_models;
    function _register_models_check(func, name = func.name) {
        if (typeof ModelProcessManager1._def[name] !== 'undefined' && ModelProcessManager1._def[name] !== func) {
            console.error(`trying to register \"${name}\" Model but was already defined`);
            console.error('old =', ModelProcessManager1._def[name]);
            console.error('new =', func);
        } else ModelProcessManager1._def[name] = func;
        // @ts-ignore
        func._constructorName = name;
    }
    ModelProcessManager1._register_models_check = _register_models_check;
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @export
     */ function _sync_processes() {
        const processes = new Map();
        for (const [, model] of ModelProcessManager1._modlist)for (const process of model._processes)processes.set(process.process_id, {
            value: process,
            force: false
        });
        for (const [id, process1] of ModelProcessManager1._n_processes)processes.set(id, {
            value: process1,
            force: true
        });
        ModelProcessManager1._timeout = undefined;
        ModelProcessManager1._modlist.clear();
        ModelProcessManager1._n_processes.clear();
        ModelProcessManager1._counter += 2;
        for (const [, process2] of processes){
            ModelProcessManager1._force_m = process2.force;
            process2.value.onchange();
        }
        ModelProcessManager1._force_m = false;
    }
    ModelProcessManager1._sync_processes = _sync_processes;
    ModelProcessManager1.spinal = {
    };
})(ModelProcessManager || (ModelProcessManager = {
}));

},{"./Models/Bool":"cVqfI","./Models/Lst":"fNg0Y","./Models/Model":"cHUcK","./Models/Str":"9Umkv","./Models/Val":"iYqiF","./Utils/isIterable":"h1aIi","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"cVqfI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Bool", ()=>Bool
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _obj = require("./Obj");
class Bool extends _obj.Obj {
    constructor(data = false){
        super();
        this._constructorName = Bool._constructorName;
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
        return new Bool(this._data);
    }
    // we do not take _set from Obj because we want a conversion if value is not a boolean
    _set(value) {
        let n;
        if (value === 'false') n = false;
        else if (value === 'true') n = true;
        else if (value instanceof Bool) n = value._data;
        else n = Boolean(value);
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    _get_fs_data(out) {
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._data ? 1 : 0} `;
    }
}
Bool._constructorName = 'Bool';

},{"../FileSystem/FileSystem":"eYpcG","./Obj":"dp6Uw","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"dp6Uw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Obj", ()=>Obj
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _model = require("./Model");
class Obj extends _model.Model {
    constructor(data){
        super();
        this._constructorName = Obj._constructorName;
        if (data != null) this._set(data);
    }
    toString() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.toString();
    }
    equals(obj) {
        return obj instanceof Obj ? this._data === obj._data : this._data === obj;
    }
    get() {
        return this._data;
    }
    _get_fs_data(out) {
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
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
Obj._constructorName = 'Obj';

},{"../FileSystem/FileSystem":"eYpcG","./Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"cHUcK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Model", ()=>Model
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _modelProcessManager = require("../ModelProcessManager");
var _bindProcess = require("../Processes/BindProcess");
var _process = require("../Processes/Process");
class Model {
    constructor(attr){
        this._constructorName = Model._constructorName;
        this._attribute_names = [];
        this.model_id = _modelProcessManager.ModelProcessManager._cur_mid;
        _modelProcessManager.ModelProcessManager._cur_mid += 1;
        this._processes = [];
        this._parents = [];
        this._date_last_modification = _modelProcessManager.ModelProcessManager._counter + 2;
        if (attr != null) this._set(attr);
    }
    destructor() {
    }
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @return {*}  {boolean}
     * @memberof Model
     */ has_been_modified() {
        return this._date_last_modification > _modelProcessManager.ModelProcessManager._counter - 2 || _modelProcessManager.ModelProcessManager._force_m;
    }
    /**
     * return true if this has changed since previous synchronisation due
     * to a direct modification (not from a child one)
     * @return {*}  {boolean}
     * @memberof Model
     */ has_been_directly_modified() {
        return this._date_last_modification > _modelProcessManager.ModelProcessManager._counter - 1 || _modelProcessManager.ModelProcessManager._force_m;
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
        if (f instanceof _process.Process) {
            this._processes.push(f);
            f._models.push(this);
            if (onchange_construction) {
                _modelProcessManager.ModelProcessManager._n_processes.set(f.process_id, f);
                _modelProcessManager.ModelProcessManager._need_sync_processes();
                return f;
            }
        } else return new _bindProcess.BindProcess(this, onchange_construction, f);
    }
    //  ...
    unbind(f) {
        if (f instanceof _process.Process) {
            this._processes.splice(this._processes.indexOf(f), 1);
            f._models.splice(f._models.indexOf(this), 1);
        } else {
            for (const process of this._processes)if (process instanceof _bindProcess.BindProcess && process.f === f) this.unbind(process);
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
            res += `\n${obj.model_id} ${_modelProcessManager.ModelProcessManager.get_object_class(obj)} ${obj._get_state()}`;
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
                if (this[name] != null) console.error(`attribute ${name} already exists in ${_modelProcessManager.ModelProcessManager.get_object_class(this)}`);
                const model = _modelProcessManager.ModelProcessManager.conv(instanceOfModel);
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
        if (item instanceof Model) {
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
        const res = new _modelProcessManager.ModelProcessManager._def[_modelProcessManager.ModelProcessManager.get_object_class(this)]();
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
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        const data = this._attribute_names.map((attrName)=>{
            const obj = this[attrName];
            _fileSystem.FileSystem.set_server_id_if_necessary(out, obj);
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
        for (const attrName of _modelProcessManager.ModelProcessManager._get_attribute_names(value))used[attrName] = true;
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
        if (change_level === 2 && this._server_id != null) _fileSystem.FileSystem.signal_change(this);
        // register this as a modified model
        _modelProcessManager.ModelProcessManager._modlist.set(this.model_id, this);
        // do the same thing for the parents
        if (this._date_last_modification <= _modelProcessManager.ModelProcessManager._counter) {
            this._date_last_modification = _modelProcessManager.ModelProcessManager._counter + change_level;
            for (const parent of this._parents)parent._signal_change(1);
        }
        // start if not done a timer
        return _modelProcessManager.ModelProcessManager._need_sync_processes();
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
            this.add_attr(attr, _modelProcessManager.ModelProcessManager._new_model_from_state(k_id, map));
            else if (!model._set_state_if_same_type(k_id, map)) // else, we already have an attribute and map has not been already explored
            this.mod_attr(attr, _modelProcessManager.ModelProcessManager._new_model_from_state(k_id, map));
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
        if (_modelProcessManager.ModelProcessManager.get_object_class(this) === dat.type) {
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
Model._constructorName = 'Model';

},{"../FileSystem/FileSystem":"eYpcG","../ModelProcessManager":"dOE4H","../Processes/BindProcess":"IcRzL","../Processes/Process":"e8weF","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"IcRzL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BindProcess", ()=>BindProcess
);
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
 */ var _process = require("./Process");
class BindProcess extends _process.Process {
    constructor(model, onchange_construction, f){
        super(model, onchange_construction);
        this.f = f;
    }
    onchange() {
        return this.f();
    }
}
BindProcess._constructorName = 'BindProcess';

},{"./Process":"e8weF","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"e8weF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Process", ()=>Process
);
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
 */ var _modelProcessManager = require("../ModelProcessManager");
var _model = require("../Models/Model");
var _isIterable = require("../Utils/isIterable");
class Process {
    constructor(m, onchange_construction = true){
        this._models = []; // what this is observing
        this.process_id = _modelProcessManager.ModelProcessManager._cur_process_id;
        _modelProcessManager.ModelProcessManager._cur_process_id += 1;
        if (m instanceof _model.Model) m.bind(this, onchange_construction);
        else if (_isIterable.isIterable(m)) for (const model of m)model.bind(this, onchange_construction);
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
Process._constructorName = 'Process';

},{"../ModelProcessManager":"dOE4H","../Models/Model":"cHUcK","../Utils/isIterable":"h1aIi","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"h1aIi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */ parcelHelpers.export(exports, "isIterable", ()=>isIterable
);
function isIterable(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"8WDgx":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"fNg0Y":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Lst", ()=>Lst
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _modelProcessManager = require("../ModelProcessManager");
var _model = require("./Model");
class Lst extends _model.Model {
    constructor(data){
        super();
        this._constructorName = Lst._constructorName;
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
        value = _modelProcessManager.ModelProcessManager.conv(value);
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
        } else value = _modelProcessManager.ModelProcessManager.conv(value);
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
        const res = new Lst();
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
        const res = new Lst();
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
        if (s >= 0 && change) console.error(`resizing a static array (type ${_modelProcessManager.ModelProcessManager.get_object_class(this)}) is forbidden`);
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
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        const res = [];
        for(let i = 0; i < this.length; i++){
            const obj = this[i];
            _fileSystem.FileSystem.set_server_id_if_necessary(out, obj);
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
            } else if (!this[i]._set_state_if_same_type(k_id, map)) this.mod_attr(i.toString(10), _modelProcessManager.ModelProcessManager._new_model_from_state(k_id, map));
        }
        for(let i5 = this.length; i5 < l_id.length; i5++){
            const k_id = l_id[i5];
            if (map[k_id].hasOwnProperty('buff') && map[k_id].buff !== null) this.push(map[k_id].buff);
            else this.push(_modelProcessManager.ModelProcessManager._new_model_from_state(k_id, map));
        }
    }
    _static_size_check(force) {
        if (this.static_length() >= 0 && !force) {
            console.error(`resizing a static array (type ` + `${_modelProcessManager.ModelProcessManager.get_object_class(this)}) is forbidden`);
            return true;
        }
        return false;
    }
    *[Symbol.iterator]() {
        for (const key of this._attribute_names)yield this[key]; // yield [key, value] pair
    }
}
Lst._constructorName = 'Lst';

},{"../FileSystem/FileSystem":"eYpcG","../ModelProcessManager":"dOE4H","./Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"9Umkv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Str", ()=>Str
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _model = require("./Model");
var _obj = require("./Obj");
class Str extends _obj.Obj {
    constructor(data = ''){
        super();
        this._constructorName = Str._constructorName;
        this._data = data.toString();
    }
    get length() {
        return this._data.length;
    }
    // toggle presence of str in this
    toggle(str, space = ' ') {
        var i, l;
        l = this._data.split(space);
        i = l.indexOf(str);
        if (i < 0) l.push(str);
        else l.splice(i, 1);
        return this.set(l.join(' '));
    }
    // true if str is contained in this
    contains(str) {
        return this._data.indexOf(str) >= 0;
    }
    equals(str) {
        return str instanceof _model.Model ? this.toString() === str.toString() : this._data === str;
    }
    toString() {
        return this._data;
    }
    ends_with(str) {
        return this._data.endsWith(str);
    }
    deep_copy() {
        return new Str(this._data);
    }
    _get_fs_data(out) {
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${encodeURI(this._data)} `;
    }
    _set(value = '') {
        const n = value.toString();
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    _get_state() {
        return encodeURI(this._data);
    }
    _set_state(str, _map) {
        return this.set(decodeURIComponent(str));
    }
}
Str._constructorName = 'Str';

},{"../FileSystem/FileSystem":"eYpcG","./Model":"cHUcK","./Obj":"dp6Uw","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"iYqiF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Val", ()=>Val
);
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
 */ var _obj = require("./Obj");
class Val extends _obj.Obj {
    constructor(data = 0){
        super();
        this._constructorName = Val._constructorName;
        this._set(data);
    }
    // toggle true / false ( 1 / 0 )
    toggle() {
        return this.set(!this._data);
    }
    toBoolean() {
        return Boolean(this._data);
    }
    deep_copy() {
        return new Val(this._data);
    }
    add(v) {
        if (v) {
            this._data += v;
            this._signal_change();
        }
    }
    // we do not take _set from Obj because we want a conversion if value is not a number
    _set(value) {
        let n;
        if (typeof value === 'string' || typeof value === 'boolean') {
            n = Number(value);
            if (isNaN(n)) console.log(`Don't know how to transform ${value} to a Val`);
        } else if (value instanceof Val) n = value._data;
        else n = value;
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
}
Val._constructorName = 'Val';

},{"./Obj":"dp6Uw","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"cCghe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * make msg popup
 * @export
 * @class NewAlertMsg
 */ parcelHelpers.export(exports, "NewAlertMsg", ()=>NewAlertMsg
);
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
 */ var _loadingGif = require("./loadingGif");
var _newDomElement = require("./newDomElement");
class NewAlertMsg {
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
        this.background = _newDomElement.newDomElement({
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
        this.popup = _newDomElement.newDomElement({
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
        const content = _newDomElement.newDomElement({
            style: {
                width: '100%',
                color: '#000',
                position: 'relative',
                padding: '15px',
                fontSize: 'xx-large'
            }
        });
        this.popup.appendChild(content);
        this.img = _newDomElement.newDomElement({
            nodeName: 'img',
            src: _loadingGif.loadingGif,
            style: {
                height: '35px',
                marginRight: '20px'
            }
        });
        content.appendChild(this.img);
        this.msg = _newDomElement.newDomElement({
            nodeName: 'span'
        });
        content.appendChild(this.msg);
    }
    createFooter() {
        this.footer = _newDomElement.newDomElement({
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
            const d = _newDomElement.newDomElement({
                style: {
                    width: `${100 / this.params.btn.length}%`,
                    paddingRight: '5px',
                    paddingLeft: '5px',
                    float: 'left'
                }
            });
            const b = _newDomElement.newDomElement({
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
NewAlertMsg._constructorName = 'NewAlertMsg';
globalThis.NewAlertMsg = NewAlertMsg;
globalThis.new_alert_msg = NewAlertMsg;

},{"./loadingGif":"3GytO","./newDomElement":"bLIGa","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"3GytO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadingGif", ()=>loadingGif
);
const loadingGif = 'data:image/gif;base64,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';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"bLIGa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * create a new dom element
 * nodeName to specify kind (div by default)
 * parentNode to specify a parent
 * style { ... }
 * txt for a text node as a child
 * other paramers are used to set directly set attributes
 * @export
 * @param {INewDomElementParam} [params={}]
 * @param {string} [nodeName='div']
 * @return {*}  {HTMLElement}
 */ parcelHelpers.export(exports, "newDomElement", ()=>newDomElement
);
function newDomElement(params = {
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
globalThis.new_dom_element = newDomElement;
globalThis.newDomElement = newDomElement;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"aK1gd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getUrlPath", ()=>getUrlPath
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
function getUrlPath(searchQuery = '') {
    let path = '';
    if (_fileSystem.FileSystem.CONNECTOR_TYPE === 'Node' || _fileSystem.FileSystem.is_cordova) {
        path = `http://${_fileSystem.FileSystem._url}`;
        if (_fileSystem.FileSystem._port) path += `:${_fileSystem.FileSystem._port}`;
        path += `${_fileSystem.FileSystem.url_com}${searchQuery}`;
    } else if (_fileSystem.FileSystem.CONNECTOR_TYPE === 'Browser') path = `${_fileSystem.FileSystem.url_com}${searchQuery}`;
    return path;
}

},{"../FileSystem/FileSystem":"eYpcG","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"9oJiN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Directory", ()=>Directory
);
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
 */ var _lst = require("../../Models/Lst");
var _file = require("./File");
var _tiffFile = require("./TiffFile");
class Directory extends _lst.Lst {
    constructor(){
        super();
        this._constructorName = Directory._constructorName;
    }
    base_() {
        return _file.File;
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
        let res = new _file.File(name, obj, params);
        this.push(res);
        return res;
    }
    add_tiff_file(name, obj, tiff_obj, params = {
    }) {
        const f = this.find(name);
        if (f) return f;
        const res = new _tiffFile.TiffFile(name, obj, tiff_obj, params);
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
        let res = new _file.File(filename, obj, params);
        this.push(res);
        return res;
    }
    get_file_info(info) {
        return info.icon = 'folder';
    }
}
Directory._constructorName = 'Directory';

},{"../../Models/Lst":"fNg0Y","./File":"kxiHI","./TiffFile":"eCGRl","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"kxiHI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "File", ()=>File
);
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
 */ var _modelProcessManager = require("../../ModelProcessManager");
var _model = require("../../Models/Model");
var _ptr = require("./Ptr");
class File extends _model.Model {
    constructor(name = '', ptr_or_model = 0, info = {
    }){
        var _a;
        super();
        this._constructorName = File._constructorName;
        const cp_info = {
        };
        for(const key in info)cp_info[key] = info[key];
        if (ptr_or_model instanceof _model.Model) {
            if ('model_type' in cp_info) cp_info.model_type = _modelProcessManager.ModelProcessManager.get_object_class(ptr_or_model);
            (_a = ptr_or_model.get_file_info) === null || _a === void 0 || _a.call(ptr_or_model, cp_info);
        }
        this.add_attr({
            name: name,
            _created_at: Date.now(),
            _ptr: new _ptr.Ptr(ptr_or_model),
            _info: cp_info
        });
    }
    load(callback) {
        return this._ptr.load(callback);
    }
}
File._constructorName = 'File';

},{"../../ModelProcessManager":"dOE4H","../../Models/Model":"cHUcK","./Ptr":"bTe04","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"bTe04":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Ptr", ()=>Ptr
);
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
 */ var _model = require("../../Models/Model");
var _fileSystem = require("../FileSystem");
class Ptr extends _model.Model {
    // model may be a number (the pointer)
    constructor(model){
        super();
        this._constructorName = Ptr._constructorName;
        this.data = {
        };
        this._set(model);
    }
    load(callback) {
        var _a;
        var ref;
        if (this.data.model != null) callback(this.data.model, false);
        else (_a = _fileSystem.FileSystem.get_inst()) === null || _a === void 0 || _a.load_ptr(this.data.value, callback);
    }
    _get_fs_data(out) {
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        if (this.data.model != null) {
            _fileSystem.FileSystem.set_server_id_if_necessary(out, this.data.model);
            out.mod += `C ${this._server_id} ${this.data.model._server_id} `;
            this.data.value = this.data.model._server_id;
            if (this.data.model._server_id & 3) _fileSystem.FileSystem._ptr_to_update[this.data.model._server_id] = this;
        } else out.mod += `C ${this._server_id} ${this.data.value} `;
    }
    _set(model) {
        var res;
        if (typeof model === 'number') {
            res = this.data.value !== model;
            this.data = {
                value: model
            };
            return res;
        }
        if (model instanceof _model.Model) {
            res = this.data.value !== model._server_id;
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
Ptr._constructorName = 'Ptr';

},{"../../Models/Model":"cHUcK","../FileSystem":"eYpcG","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"eCGRl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TiffFile", ()=>TiffFile
);
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
 */ var _file = require("./File");
var _ptr = require("./Ptr");
class TiffFile extends _file.File {
    constructor(name = '', ptr_or_model = 0, ptr_tiff = 0, info = {
    }){
        super(name, ptr_or_model, info);
        this._constructorName = TiffFile._constructorName;
        this.add_attr({
            _ptr_tiff: new _ptr.Ptr(ptr_tiff),
            _has_been_converted: 0
        });
    }
    load_tiff(callback) {
        this._ptr_tiff.load(callback);
    }
}
TiffFile._constructorName = 'TiffFile';

},{"./File":"kxiHI","./Ptr":"bTe04","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"gGxxt":[function(require,module,exports) {
module.exports = XMLHttpRequest;

},{}],"02Blu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Path", ()=>Path
);
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
 */ var _model = require("../../Models/Model");
var _fileSystem = require("../FileSystem");
class Path extends _model.Model {
    // @file is optionnal. Must be a javascript File object
    constructor(file){
        super();
        this._constructorName = Path._constructorName;
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
        if (this.file != null && this._server_id & 3) _fileSystem.FileSystem._files_to_upload[this._server_id] = this;
    }
}
Path._constructorName = 'Path';

},{"../../Models/Model":"cHUcK","../FileSystem":"eYpcG","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"2jJC6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Pbr", ()=>Pbr
);
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
 */ var _ptr = require("./Ptr");
class Pbr extends _ptr.Ptr {
    constructor(model){
        super(model);
        this._constructorName = Pbr._constructorName;
    }
}
Pbr._constructorName = 'Pbr';

},{"./Ptr":"bTe04","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"5niy6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RightSetList", ()=>RightSetList
);
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
 */ var _lst = require("../../Models/Lst");
class RightSetList extends _lst.Lst {
    constructor(){
        super();
        this._constructorName = RightSetList._constructorName;
    }
}
RightSetList._constructorName = 'RightSetList';

},{"../../Models/Lst":"fNg0Y","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"1ASEo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RightsItem", ()=>RightsItem
);
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
 */ var _lst = require("../../Models/Lst");
class RightsItem extends _lst.Lst {
    constructor(){
        super();
        this._constructorName = RightsItem._constructorName;
    }
}
RightsItem._constructorName = 'RightsItem';

},{"../../Models/Lst":"fNg0Y","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"4OlYb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SessionModel", ()=>SessionModel
);
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
 */ var _model = require("../../Models/Model");
class SessionModel extends _model.Model {
    constructor(){
        super();
        this._constructorName = SessionModel._constructorName;
    }
}
SessionModel._constructorName = 'SessionModel';

},{"../../Models/Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"cYmiC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "User", ()=>User
);
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
 */ var _model = require("../../Models/Model");
class User extends _model.Model {
    constructor(){
        super();
        this._constructorName = User._constructorName;
    }
}
User._constructorName = 'User';

},{"../../Models/Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"iNqdT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "UserRight", ()=>UserRight
);
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
 */ var _model = require("../../Models/Model");
class UserRight extends _model.Model {
    constructor(){
        super();
        this._constructorName = UserRight._constructorName;
    }
    set() {
        console.log('Set a UserRight is not allowed.');
        return false;
    }
}
UserRight._constructorName = 'UserRight';

},{"../../Models/Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"3xqio":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"lrl2h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Choice", ()=>Choice
);
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
 */ var _model = require("./Model");
class Choice extends _model.Model {
    constructor(InitIdx, stringChoises){
        super();
        this._constructorName = Choice._constructorName;
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
        if (a instanceof Choice) return super.equals(a);
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
Choice._constructorName = 'Choice';

},{"./Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"iTKWh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TypedArray_Float64", ()=>TypedArray_Float64
);
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
 */ var _typedArray = require("./TypedArray");
class TypedArray_Float64 extends _typedArray.TypedArray {
    constructor(size, data){
        super(size, data);
        this._constructorName = TypedArray_Float64._constructorName;
    }
    base_type() {
        return TypedArray_Float64;
    }
    deep_copy() {
        return new TypedArray_Float64(this._size, this._data);
    }
}
TypedArray_Float64._constructorName = 'TypedArray_Float64';

},{"./TypedArray":"gEyZC","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"gEyZC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TypedArray", ()=>TypedArray
);
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
 */ var _fileSystem = require("../FileSystem/FileSystem");
var _model = require("./Model");
class TypedArray extends _model.Model {
    // size can be
    //  - a number
    //  - a list of number
    constructor(size, data){
        super();
        this._constructorName = TypedArray._constructorName;
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
            // @ts-ignore
            if (B) data = B.from(this.nb_items());
        }
        // @ts-ignore
        this._data = data;
    }
    base_type() {
        return;
    }
    // -> to be defined by children
    dim() {
        return this._size.length;
    }
    size(d) {
        if (d != null) return this._size[d];
        else return this._size;
    }
    set_val(index, value) {
        const idx = this._get_index(index);
        if (this._data[idx] !== value) {
            this._data[idx] = value;
            this._signal_change();
        }
    }
    nb_items() {
        let total = this._size[0] || 0;
        for(let j = 1; j < this._size.length; j++)total *= this._size[j];
        return total;
    }
    toString() {
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
    equals(obj) {
        if (!(obj instanceof TypedArray)) return this._data === obj;
        if (this._size.length !== obj._size.length) return false;
        let i = 0;
        let k = 0;
        for(; k < this._size.length; i = ++k){
            if (this._size[i] !== obj._size[i]) return false;
        }
        return this._data === obj._data;
    }
    get(index) {
        if (typeof index !== 'undefined') return this._data[this._get_index(index)];
        return this._data;
    }
    resize(new_size) {
        let total = 1;
        for(let i = 0; i < new_size.length; i++)total *= new_size[i];
        const BaseType = this.base_type();
        // @ts-ignore
        const instance = BaseType.from(total);
        instance.set(this._data);
        this._data = instance;
        this._size = new_size;
        this._signal_change();
    }
    _set(str) {
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
    _get_index(index) {
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
    _get_fs_data(out) {
        _fileSystem.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._get_state()} `;
    }
    _get_state() {
        let res = this._size.length.toString(10);
        for(let i = 0; i < this._size.length; i++)res += `, ${this._size[i]}`;
        for(let i1 = 0; i1 < this._data.length; i1++)res += `, ${this._data[i1]}`;
        return res;
    }
    _set_state(str) {
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
TypedArray._constructorName = 'TypedArray';

},{"../FileSystem/FileSystem":"eYpcG","./Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"62fLc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TypedArray_Int32", ()=>TypedArray_Int32
);
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
 */ var _typedArray = require("./TypedArray");
class TypedArray_Int32 extends _typedArray.TypedArray {
    constructor(size, data){
        super(size, data);
        this._constructorName = TypedArray_Int32._constructorName;
    }
    base_type() {
        return TypedArray_Int32;
    }
    deep_copy() {
        return new TypedArray_Int32(this._size, this._data);
    }
}
TypedArray_Int32._constructorName = 'TypedArray_Int32';

},{"./TypedArray":"gEyZC","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"6ok7m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vec", ()=>Vec
);
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
 */ var _lst = require("./Lst");
var _val = require("./Val");
class Vec extends _lst.Lst {
    constructor(){
        super();
        this._constructorName = Vec._constructorName;
    }
    base_type() {
        return _val.Val;
    }
    _underlying_fs_type() {
        return 'Lst';
    }
}
Vec._constructorName = 'Vec';

},{"./Lst":"fNg0Y","./Val":"iYqiF","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"6W7Pa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "spinalCore", ()=>spinalCore
);
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
 */ var _fileSystem = require("./FileSystem/FileSystem");
var _modelProcessManager = require("./ModelProcessManager");
var spinalCore;
(function(spinalCore1) {
    spinalCore1._def = _modelProcessManager.ModelProcessManager._def;
    spinalCore1.version = '2.5.0';
    function connect(options) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') parsedOpt.pathname += '/';
        _fileSystem.FileSystem._home_dir = parsedOpt.pathname;
        _fileSystem.FileSystem._url = parsedOpt.hostname;
        _fileSystem.FileSystem._port = parsedOpt.port;
        if (parsedOpt.username) {
            _fileSystem.FileSystem._userid = parsedOpt.username;
            if (parsedOpt.password) _fileSystem.FileSystem._password = parsedOpt.password;
        } else {
            // set default user id
            _fileSystem.FileSystem._userid = 644;
            _fileSystem.FileSystem._password = '';
        }
        return new _fileSystem.FileSystem();
    }
    spinalCore1.connect = connect;
    // stores a model in the file system
    function store(fs, model, path, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function() {
            return console.log('Model could not be stored. You can pass a callback to handle this error.');
        };
        // Parse path
        const lst = path.split('/');
        const file_name = lst.pop();
        if (lst[0] === '') lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        return fs.load_or_make_dir(_fileSystem.FileSystem._home_dir + path, function(dir, err) {
            if (err) callback_error();
            else {
                const file = dir.detect((x)=>x.name.get() === file_name
                );
                if (file != null) dir.remove(file);
                dir.add_file(file_name, model, {
                    model_type: 'Model'
                });
                callback_success();
            }
        });
    }
    spinalCore1.store = store;
    spinalCore1.register_models = _modelProcessManager.ModelProcessManager.register_models;
    // loads a model from the file system
    function load(fs, path, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function() {
            return console.log('Model could not be loaded. You can pass a callback to handle this error.');
        };
        // Parse path
        const lst = path.split('/');
        const file_name = lst.pop();
        if (lst[0] === '') lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        return fs.load_or_make_dir(`${_fileSystem.FileSystem._home_dir}${path}`, (current_dir, err1)=>{
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
    spinalCore1.load = load;
    // loads all the models of a specific type
    function load_type(fs, type, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function() {
            return console.log("Model of this type could not be loaded. You can pass a callback to handle this error.");
        };
        return fs.load_type(type, (data, error)=>{
            if (!data || error) callback_error();
            else callback_success(data, error);
        });
    }
    spinalCore1.load_type = load_type;
    function load_right(fs, ptr, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function() {
            return console.log("Model Right could not be loaded. You can pass a callback to handle this error.");
        };
        return fs.load_right(ptr, (data, err)=>{
            if (err) return callback_error();
            else return callback_success(data, err);
        });
    }
    spinalCore1.load_right = load_right;
    function share_model(fs, ptr, file_name, right_flag, targetName) {
        return fs.share_model(ptr, file_name, right_flag, targetName);
    }
    spinalCore1.share_model = share_model;
    spinalCore1.right_flag = {
        AD: 1,
        WR: 2,
        RD: 4
    };
    // "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
    function extend(child, parent) {
        return _fileSystem.FileSystem.extend(child, parent);
    }
    spinalCore1.extend = extend;
})(spinalCore || (spinalCore = {
}));

},{"./FileSystem/FileSystem":"eYpcG","./ModelProcessManager":"dOE4H","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"ajsC1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "spinalRegisterModel", ()=>spinalRegisterModel
);
parcelHelpers.export(exports, "spinalRegister", ()=>spinalRegister
);
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
 */ var _modelProcessManager = require("../ModelProcessManager");
function spinalRegisterModel(model, name = model._constructorName) {
    globalThis[name] = model;
    _modelProcessManager.ModelProcessManager.spinal[name] = model;
    _modelProcessManager.ModelProcessManager.register_models(model, name);
}
function spinalRegister(obj, name) {
    globalThis[name] = obj;
    _modelProcessManager.ModelProcessManager.spinal[name] = obj;
}

},{"../ModelProcessManager":"dOE4H","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"cghV4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"9Uy21":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"aeZ0J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"1QytI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"6lKRe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"fiAFh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"aKPJS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"bV7fQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"5uh30":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"3lN6j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"1jRCm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"bbO0q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"46gSA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bind", ()=>bind
);
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
 */ var _model = require("../Models/Model");
function bind(model, func, onchange_construction = true) {
    if (model instanceof _model.Model) model.bind(func, onchange_construction);
    else {
        for (const m of model)return m.bind(func, onchange_construction);
    }
}
globalThis.bind = bind;

},{"../Models/Model":"cHUcK","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"i0bui":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ var _addClass = require("./addClass");
parcelHelpers.exportAll(_addClass, exports);
var _getLeft = require("./getLeft");
parcelHelpers.exportAll(_getLeft, exports);
var _getTop = require("./getTop");
parcelHelpers.exportAll(_getTop, exports);
var _newAlertMsg = require("./NewAlertMsg");
parcelHelpers.exportAll(_newAlertMsg, exports);
var _remClass = require("./remClass");
parcelHelpers.exportAll(_remClass, exports);
var _spinalNewPopup = require("./spinalNewPopup");
parcelHelpers.exportAll(_spinalNewPopup, exports);

},{"./addClass":"lPHK3","./getLeft":"ffBLV","./getTop":"jg3cA","./NewAlertMsg":"cCghe","./remClass":"5yzO4","./spinalNewPopup":"ky0i8","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"lPHK3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * obj is a DOM object. src is a string or an array of
 * string containing one or several classNames separated with spaces
 * @export
 * @param {HTMLElement} obj
 * @param {(string | string[])} src
 * @return {*}  {void}
 */ parcelHelpers.export(exports, "addClass", ()=>addClass
);
function addClass(obj, src) {
    if (typeof src === 'string') return addClass(obj, src.split(' '));
    const old = (obj.className || '').split(' ');
    const p_1 = src.filter((x)=>old.indexOf(x) < 0
    );
    obj.className = old.concat(p_1).filter((x)=>x
    ).join(' ');
}
globalThis.add_class = addClass;
globalThis.addClass = addClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"ffBLV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * real position of an object
 * @export
 * @param {HTMLElement} l
 * @return {*}  {number}
 */ parcelHelpers.export(exports, "getLeft", ()=>getLeft
);
function getLeft(l) {
    if (l.offsetParent != null) return l.offsetLeft + getLeft(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_left = getLeft;
globalThis.getLeft = getLeft;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"jg3cA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * real position of an object
 * @export
 * @param {HTMLElement} l
 * @return {*}  {number}
 */ parcelHelpers.export(exports, "getTop", ()=>getTop
);
function getTop(l) {
    if (l.offsetParent != null) return l.offsetLeft + getTop(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_top = getTop;
globalThis.getTop = getTop;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"5yzO4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
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
 */ /**
 * obj is a DOM object. src is a string or an array of string
 * containing one or several classNames separated with spaces
 * @export
 * @param {HTMLElement} obj
 * @param {(string | string[])} src
 * @return {*}  {void}
 */ parcelHelpers.export(exports, "remClass", ()=>remClass
);
function remClass(obj, src) {
    if (typeof src === 'string') return remClass(obj, src.split(' '));
    const old = (obj.className || '').split(' ');
    obj.className = old.filter((x)=>src.indexOf(x) < 0
    ).join(' ');
}
globalThis.rem_class = remClass;
globalThis.remClass = remClass;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}],"ky0i8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * make a popup window.
 * returns the creted "inside" div
 * clicking outside closes the window.
 * drag title permits to move he window
 * @export
 * @param {string} title
 * @param {ISpinalNewPopupParam} [params={}]
 * @return {*}  {HTMLElement}
 */ parcelHelpers.export(exports, "spinalNewPopup", ()=>spinalNewPopup
);
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
 */ var _newDomElement = require("./newDomElement");
let _index_current_popup = 10000;
function spinalNewPopup(title, params = {
}) {
    let b;
    let extention = 'px', width, height;
    if (params.popup_closer == null) b = _newDomElement.newDomElement({
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
            zIndex: _index_current_popup
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
    const w = _newDomElement.newDomElement({
        parentNode: document.body,
        className: 'Popup',
        style: {
            position: 'absolute',
            left: top_x,
            top: top_y,
            width: width + extention,
            height: height + extention,
            zIndex: _index_current_popup + 1,
            border: 'thin solid black',
            background: '#e5e5e5',
            resize: 'both',
            overflow: 'auto',
            paddingBottom: '8px'
        }
    });
    _index_current_popup += 2;
    _newDomElement.newDomElement({
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
    if (title) _newDomElement.newDomElement({
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
    const res = _newDomElement.newDomElement({
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
globalThis.spinal_new_popup = spinalNewPopup;
globalThis.spinalNewPopup = spinalNewPopup;

},{"./newDomElement":"bLIGa","@parcel/transformer-js/src/esmodule-helpers.js":"8WDgx"}]},["34qru"], "34qru", "parcelRequire9708")

//# sourceMappingURL=index.js.map
