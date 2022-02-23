(function () {
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
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
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
parcelRequire.register("49kUR", function(module, exports) {

$parcel$export(module.exports, "FileSystem", function () { return FileSystem; });

var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");
var $1uixu = parcelRequire("1uixu");

var $aFmUl = parcelRequire("aFmUl");

var $gH1uf = parcelRequire("gH1uf");

var $a0sFt = parcelRequire("a0sFt");

var $b1gn2 = parcelRequire("b1gn2");

var $lM80H = parcelRequire("lM80H");

var FileSystem = /*#__PURE__*/ function() {
    "use strict";
    function FileSystem(sessionId) {
        $6NUET.default(this, FileSystem);
        // public static _def: { [constructorName: string]: typeof Model } = {};
        // default values
        this._data_to_send = '';
        this._session_num = -2;
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        if (typeof $parcel$global !== 'undefined') {
            var XMLHttpRequest_node = (parcelRequire("kZOiM"));
            FileSystem._XMLHttpRequest = XMLHttpRequest_node;
        }
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        // register this in FileSystem instances
        FileSystem._insts[this._num_inst] = this;
        // first, we need a session id fom the server
        if (!sessionId) {
            if (FileSystem._userid != null) this.send("U ".concat(FileSystem._userid, " ").concat(FileSystem._password, " "));
            this.send("S ".concat(this._num_inst, " "));
        } else {
            FileSystem._insts[this._num_inst]._session_num = sessionId;
            FileSystem._insts[this._num_inst].make_channel();
        }
    }
    $ipX5G.default(FileSystem, [
        {
            /**
     * load object in $path and call $callback with the corresponding model ref
     *
     * @param {*} path
     * @param {*} callback
     * @memberof FileSystem
     */ key: "load",
            value: function load(path, callback) {
                FileSystem._send_chan();
                this.send("L ".concat(FileSystem._nb_callbacks, " ").concat(encodeURI(path), " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
                FileSystem._nb_callbacks++;
            }
        },
        {
            // load all the objects of $type
            key: "load_type",
            value: function load_type(type, callback) {
                FileSystem._send_chan();
                this.send("R 0 ".concat(type, " "));
                FileSystem._type_callbacks.push([
                    type,
                    callback
                ]);
            }
        },
        {
            // make dir if not already present in the server. Call callback
            // as in the @load proc -- when done (i.e. when loaded or created)
            key: "load_or_make_dir",
            value: function load_or_make_dir(dir, callback) {
                var _this = this;
                this.load(dir, function(res, err) {
                    if (err) {
                        if (dir === '/') return callback(null, err);
                        else {
                            var lst = dir.split('/').reduce(function(acc, v) {
                                if (v.length) acc.push(v);
                                return acc;
                            }, []);
                            var nir = lst.pop();
                            var oir = '/' + lst.join('/');
                            _this.load_or_make_dir(oir, function(n_res, n_err) {
                                if (n_err) return callback(null, n_err);
                                else {
                                    var n_dir = new $b1gn2.Directory();
                                    n_res.add_file(nir, n_dir);
                                    return callback(n_dir, n_err);
                                }
                            });
                        }
                    } else return callback(res, err);
                });
            }
        },
        {
            // load an object using is pointer and call $callback with the corresponding ref
            key: "load_ptr",
            value: function load_ptr(ptr, callback) {
                FileSystem._send_chan();
                this.send("l ".concat(FileSystem._nb_callbacks, " ").concat(ptr, " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
                FileSystem._nb_callbacks++;
            }
        },
        {
            key: "load_right",
            value: function load_right(ptr, callback) {
                FileSystem._send_chan();
                this.send("r ".concat(ptr, " ").concat(FileSystem._nb_callbacks, " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
                FileSystem._nb_callbacks++;
            }
        },
        {
            key: "share_model",
            value: function share_model(ptr, file_name, share_type, targetName) {
                FileSystem._send_chan();
                this.send("h ".concat(typeof ptr === 'number' ? ptr : ptr._server_id, " ").concat(share_type, " ").concat(encodeURI(targetName), " ").concat(encodeURI(file_name), " "));
            }
        },
        {
            // explicitly send a command
            key: "send",
            value: function send(data) {
                this._data_to_send += data;
                if (FileSystem._timer_send == null) FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
            }
        },
        {
            // send a request for a "push" channel
            key: "make_channel",
            value: function make_channel() {
                var path = $a0sFt.getUrlPath("?s=".concat(this._session_num));
                var xhr_object = FileSystem._my_xml_http_request();
                xhr_object.open('GET', path, true);
                xhr_object.onreadystatechange = function() {
                    if (this.readyState === 4 && this.status === 200) {
                        var _fs = FileSystem.get_inst();
                        if (_fs.make_channel_error_timer !== 0) _fs.onConnectionError(0);
                        _fs.make_channel_error_timer = 0;
                        if (FileSystem._disp) console.log('chan ->', this.responseText);
                        var created = [];
                        function _w(sid, obj) {
                            var _obj = FileSystem._create_model_by_name(obj);
                            if (sid != null && _obj != null) {
                                _obj._server_id = sid;
                                FileSystem._objects[sid] = _obj;
                                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                try {
                                    for(var _iterator = FileSystem._type_callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                        var _value = $1uixu.default(_step.value, 2), type = _value[0], cb = _value[1];
                                        // @ts-ignore
                                        var mod_R = $aFmUl.ModelProcessManager._def[type] || $aFmUl.ModelProcessManager.spinal[type];
                                        if (_obj instanceof mod_R) created.push({
                                            cb: cb,
                                            _obj: _obj
                                        });
                                    }
                                } catch (err) {
                                    _didIteratorError = true;
                                    _iteratorError = err;
                                } finally{
                                    try {
                                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                                            _iterator.return();
                                        }
                                    } finally{
                                        if (_didIteratorError) {
                                            throw _iteratorError;
                                        }
                                    }
                                }
                            }
                        }
                        FileSystem._sig_server = false;
                        eval(this.responseText);
                        FileSystem._sig_server = true;
                        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                        try {
                            for(var _iterator1 = created[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                                var _value1 = _step1.value, cb1 = _value1.cb, _obj1 = _value1._obj;
                                cb1(_obj1);
                            }
                        } catch (err) {
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                        } finally{
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                        }
                    } else if (this.readyState === 4 && this.status === 0) {
                        console.error("Disconnected from the server with request : ".concat(path, "."));
                        var _fs1 = FileSystem.get_inst();
                        if (_fs1.make_channel_error_timer === 0) {
                            //first disconnect
                            console.log('Trying to reconnect.');
                            _fs1.make_channel_error_timer = Date.now();
                            setTimeout(_fs1.make_channel.bind(_fs1), 1000);
                            return _fs1.onConnectionError(1);
                        } else if (Date.now() - _fs1.make_channel_error_timer < FileSystem._timeout_reconnect) // under timeout
                        setTimeout(_fs1.make_channel.bind(_fs1), 1000); // timeout reached
                        else return _fs1.onConnectionError(2);
                    } else if (this.readyState === 4 && this.status === 500) FileSystem.get_inst().onConnectionError(3);
                };
                xhr_object.send();
            }
        },
        {
            // default callback on make_channel error after the timeout disconnected reached
            // This method can be surcharged.
            // error_code :
            // 0 = Error resolved
            // 1 = 1st disconnection
            // 2 = disconnection timeout
            // 3 = Server went down Reinit everything
            // 4 = Server down on connection
            key: "onConnectionError",
            value: function onConnectionError(error_code) {
                var msg = '';
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
                        $lM80H.exit();
                    } else console.error('Disconnected from the server.');
                }
                if (msg !== '') {
                    if (typeof FileSystem.popup === 'undefined') FileSystem.popup = new $gH1uf.NewAlertMsg({
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
                                click: function click() {
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
        }
    ], [
        {
            key: "get_inst",
            value: // get the first running inst
            function get_inst() {
                for(var k in FileSystem._insts)return FileSystem._insts[k];
                return new FileSystem();
            }
        },
        {
            key: "set_server_id_if_necessary",
            value: function set_server_id_if_necessary(out, obj) {
                if (obj._server_id == null) {
                    // registering
                    obj._server_id = FileSystem._get_new_tmp_server_id();
                    FileSystem._tmp_objects[obj._server_id] = obj;
                    // new object
                    var ncl = $aFmUl.ModelProcessManager.get_object_class(obj);
                    if (obj._underlying_fs_type != null) {
                        out.mod += "T ".concat(obj._server_id, " ").concat(ncl, " ");
                        ncl = obj._underlying_fs_type();
                    }
                    out.cre += "N ".concat(obj._server_id, " ").concat(ncl, " ");
                    // data
                    obj._get_fs_data(out);
                }
            }
        },
        {
            key: "signal_change",
            value: // send changes of m to instances.
            function signal_change(m) {
                if (FileSystem._sig_server) {
                    FileSystem._objects_to_send[m.model_id] = m;
                    if (FileSystem._timer_chan != null) clearTimeout(FileSystem._timer_chan);
                    FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
                }
            }
        },
        {
            key: "_tmp_id_to_real",
            value: function _tmp_id_to_real(tmp_id, res) {
                var tmp = FileSystem._tmp_objects[tmp_id];
                if (tmp == null) console.log(tmp_id);
                FileSystem._objects[res] = tmp;
                tmp._server_id = res;
                delete FileSystem._tmp_objects[tmp_id];
                var ptr = FileSystem._ptr_to_update[tmp_id];
                if (ptr != null) {
                    delete FileSystem._ptr_to_update[tmp_id];
                    ptr.data.value = res;
                }
                if (FileSystem._files_to_upload[tmp_id] != null && tmp.file != null) {
                    delete FileSystem._files_to_upload[tmp_id];
                    // send the file
                    var fs = FileSystem.get_inst();
                    var path = $a0sFt.getUrlPath("?s=".concat(fs._session_num, "&p=").concat(tmp._server_id));
                    var xhr_object = FileSystem._my_xml_http_request();
                    xhr_object.open('PUT', path, true);
                    xhr_object.onreadystatechange = function() {
                        var _w;
                        if (this.readyState === 4 && this.status === 200) {
                            _w = function _w(sid, obj) {
                                var _obj = FileSystem._create_model_by_name(obj);
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
        },
        {
            key: "_create_model_by_name",
            value: function _create_model_by_name(name) {
                if (typeof name !== 'string') return name; // for old spinalcore version
                if (typeof $aFmUl.ModelProcessManager._def[name] !== 'undefined') return new $aFmUl.ModelProcessManager._def[name]();
                if (typeof $aFmUl.ModelProcessManager.spinal[name] === 'undefined') {
                    if (FileSystem.debug === true) console.warn("Got Model type \"".concat(name, "\" from hub but not registered."));
                    $aFmUl.ModelProcessManager._def[name] = new Function("return class ".concat(name, " extends ModelProcessManager._def[\"Model\"] {}"))();
                    return new $aFmUl.ModelProcessManager._def[name]();
                }
            }
        },
        {
            key: "extend",
            value: function extend(child, parent) {
                throw 'FileSystem.extend is a legacy function, do ont use';
            }
        },
        {
            key: "_get_new_tmp_server_id",
            value: function _get_new_tmp_server_id() {
                FileSystem._cur_tmp_server_id++;
                if (FileSystem._cur_tmp_server_id % 4 === 0) FileSystem._cur_tmp_server_id++;
                return FileSystem._cur_tmp_server_id;
            }
        },
        {
            key: "_send_chan",
            value: // send changes
            function _send_chan() {
                var out = FileSystem._get_chan_data();
                for(var f in FileSystem._insts)FileSystem._insts[f].send(out);
            }
        },
        {
            key: "_timeout_chan_func",
            value: // timeout for at least one changed object
            function _timeout_chan_func() {
                FileSystem._send_chan();
                delete FileSystem._timer_chan;
            }
        },
        {
            key: "_get_chan_data",
            value: // get data of objects to send
            function _get_chan_data() {
                var out = {
                    cre: '',
                    mod: ''
                };
                for(var n in FileSystem._objects_to_send)FileSystem._objects_to_send[n]._get_fs_data(out);
                FileSystem._objects_to_send = {
                };
                return out.cre + out.mod;
            }
        },
        {
            key: "_timeout_send_func",
            value: function _timeout_send_func() {
                // if some model have changed, we have to send the changes now
                var out = FileSystem._get_chan_data();
                for(var k in FileSystem._insts)FileSystem._insts[k]._data_to_send += out;
                // send data
                for(var k1 in FileSystem._insts){
                    var f = FileSystem._insts[k1];
                    if (!f._data_to_send.length) continue;
                    // if we are waiting for a session id, do not send the data
                    // (@responseText will contain another call to @_timeout_send with the session id)
                    if (f._session_num === -1) continue;
                    // for first call, do not add the session id (but say that we are waiting for one)
                    if (f._session_num === -2) f._session_num = -1;
                    else f._data_to_send = "s ".concat(f._session_num, " ") + f._data_to_send;
                    // request
                    var path = $a0sFt.getUrlPath();
                    var xhr_object = FileSystem._my_xml_http_request();
                    xhr_object.open('POST', path, true);
                    xhr_object.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status === 200) {
                            if (FileSystem._disp) console.log('resp ->', this.responseText);
                            var _c = []; // callbacks
                            var created = [];
                            function _w(sid, obj) {
                                var _obj = FileSystem._create_model_by_name(obj);
                                if (sid != null && _obj != null) {
                                    _obj._server_id = sid;
                                    FileSystem._objects[sid] = _obj;
                                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                                    try {
                                        for(var _iterator = FileSystem._type_callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                                            var _value = $1uixu.default(_step.value, 2), type = _value[0], cb = _value[1];
                                            var mod_R = $aFmUl.ModelProcessManager.spinal[type] || $aFmUl.ModelProcessManager._def[type];
                                            if (_obj instanceof mod_R) created.push({
                                                cb: cb,
                                                _obj: _obj
                                            });
                                        }
                                    } catch (err) {
                                        _didIteratorError = true;
                                        _iteratorError = err;
                                    } finally{
                                        try {
                                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                                _iterator.return();
                                            }
                                        } finally{
                                            if (_didIteratorError) {
                                                throw _iteratorError;
                                            }
                                        }
                                    }
                                }
                            }
                            FileSystem._sig_server = false;
                            eval(this.responseText);
                            FileSystem._sig_server = true;
                            var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
                            try {
                                for(var _iterator4 = created[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                                    var _value4 = _step4.value, cb3 = _value4.cb, _obj3 = _value4._obj;
                                    cb3(_obj3);
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                                        _iterator4.return();
                                    }
                                } finally{
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }
                            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                            try {
                                for(var _iterator3 = _c[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                                    var _value3 = $1uixu.default(_step3.value, 3), nbCb = _value3[0], servId = _value3[1], error = _value3[2];
                                    FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally{
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                                        _iterator3.return();
                                    }
                                } finally{
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }
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
        },
        {
            key: "_my_xml_http_request",
            value: function _my_xml_http_request() {
                if (FileSystem.CONNECTOR_TYPE === 'Browser') {
                    if (window.XMLHttpRequest) return new XMLHttpRequest();
                    if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
                    return alert('Your browser does not seem to support XMLHTTPRequest objects...');
                } else if (FileSystem.CONNECTOR_TYPE === 'Node') return new FileSystem._XMLHttpRequest();
                else console.error('you must define CONNECTOR_TYPE');
            }
        }
    ]);
    return FileSystem;
}();
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

});
parcelRequire.register("6NUET", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $4f4344e9275447aa$export$2e2bcd8739ae039; });
function $4f4344e9275447aa$export$2e2bcd8739ae039(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}

});

parcelRequire.register("ipX5G", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $d68865f5364bd2a3$export$2e2bcd8739ae039; });
function $d68865f5364bd2a3$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $d68865f5364bd2a3$export$2e2bcd8739ae039(Constructor, protoProps, staticProps) {
    if (protoProps) $d68865f5364bd2a3$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $d68865f5364bd2a3$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}

});

parcelRequire.register("hAmnT", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $ccd72981aafedafd$export$2e2bcd8739ae039; });
function $ccd72981aafedafd$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}

});

parcelRequire.register("3IVLz", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $2b624a53af2bc6c3$export$2e2bcd8739ae039; });

var $67L1a = parcelRequire("67L1a");
function $2b624a53af2bc6c3$var$get(target1, property1, receiver1) {
    if (typeof Reflect !== "undefined" && Reflect.get) $2b624a53af2bc6c3$var$get = Reflect.get;
    else $2b624a53af2bc6c3$var$get = function get(target, property, receiver) {
        var base = $67L1a.default(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) return desc.get.call(receiver || target);
        return desc.value;
    };
    return $2b624a53af2bc6c3$var$get(target1, property1, receiver1);
}
function $2b624a53af2bc6c3$export$2e2bcd8739ae039(target, property, reciever) {
    return $2b624a53af2bc6c3$var$get(target, property, reciever);
}

});
parcelRequire.register("67L1a", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $4757de4c31ff3156$export$2e2bcd8739ae039; });

var $2ttjm = parcelRequire("2ttjm");
function $4757de4c31ff3156$export$2e2bcd8739ae039(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = $2ttjm.default(object);
        if (object === null) break;
    }
    return object;
}

});
parcelRequire.register("2ttjm", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $1cd506cf0792d5e1$export$2e2bcd8739ae039; });
function $1cd506cf0792d5e1$var$getPrototypeOf(o1) {
    $1cd506cf0792d5e1$var$getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return $1cd506cf0792d5e1$var$getPrototypeOf(o1);
}
function $1cd506cf0792d5e1$export$2e2bcd8739ae039(o) {
    return $1cd506cf0792d5e1$var$getPrototypeOf(o);
}

});



parcelRequire.register("kY4Jr", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $f43d14e5f144ff38$export$2e2bcd8739ae039; });

var $4Xzvr = parcelRequire("4Xzvr");
function $f43d14e5f144ff38$export$2e2bcd8739ae039(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $4Xzvr.default(subClass, superClass);
}

});
parcelRequire.register("4Xzvr", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $39c836e7de4cf057$export$2e2bcd8739ae039; });
function $39c836e7de4cf057$var$setPrototypeOf(o1, p1) {
    $39c836e7de4cf057$var$setPrototypeOf = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $39c836e7de4cf057$var$setPrototypeOf(o1, p1);
}
function $39c836e7de4cf057$export$2e2bcd8739ae039(o, p) {
    return $39c836e7de4cf057$var$setPrototypeOf(o, p);
}

});


parcelRequire.register("1uixu", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $1156f94a82362102$export$2e2bcd8739ae039; });

var $3jGLS = parcelRequire("3jGLS");

var $4y4EQ = parcelRequire("4y4EQ");

var $k1WGy = parcelRequire("k1WGy");
function $1156f94a82362102$export$2e2bcd8739ae039(arr, i) {
    return $3jGLS.default(arr) || $4y4EQ.default(arr, i) || $k1WGy.default();
}

});
parcelRequire.register("3jGLS", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $26a452f010249323$export$2e2bcd8739ae039; });
function $26a452f010249323$export$2e2bcd8739ae039(arr) {
    if (Array.isArray(arr)) return arr;
}

});

parcelRequire.register("4y4EQ", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $34fdf35afa6ca9f4$export$2e2bcd8739ae039; });
function $34fdf35afa6ca9f4$export$2e2bcd8739ae039(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

});

parcelRequire.register("k1WGy", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $e9516c5bbed03753$export$2e2bcd8739ae039; });
function $e9516c5bbed03753$export$2e2bcd8739ae039() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

});


parcelRequire.register("bEpRD", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $87b77e31761dea86$export$2e2bcd8739ae039; });

var $abnDw = parcelRequire("abnDw");

var $jCQXu = parcelRequire("jCQXu");

var $2ttjm = parcelRequire("2ttjm");

var $4Xzvr = parcelRequire("4Xzvr");
function $87b77e31761dea86$var$wrapNativeSuper(Class1) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    $87b77e31761dea86$var$wrapNativeSuper = function wrapNativeSuper(Class) {
        if (Class === null || !$jCQXu.default(Class)) return Class;
        if (typeof Class !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return $abnDw.default(Class, arguments, $2ttjm.default(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return $4Xzvr.default(Wrapper, Class);
    };
    return $87b77e31761dea86$var$wrapNativeSuper(Class1);
}
function $87b77e31761dea86$export$2e2bcd8739ae039(Class) {
    return $87b77e31761dea86$var$wrapNativeSuper(Class);
}

});
parcelRequire.register("abnDw", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $769d442efd2b246c$export$2e2bcd8739ae039; });
function $769d442efd2b246c$var$isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function $769d442efd2b246c$var$construct(Parent1, args1, Class1) {
    if ($769d442efd2b246c$var$isNativeReflectConstruct()) $769d442efd2b246c$var$construct = Reflect.construct;
    else $769d442efd2b246c$var$construct = function construct(Parent, args, Class) {
        var a = [
            null
        ];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
    };
    return $769d442efd2b246c$var$construct.apply(null, arguments);
}
function $769d442efd2b246c$export$2e2bcd8739ae039(Parent, args, Class) {
    return $769d442efd2b246c$var$construct.apply(null, arguments);
}

});

parcelRequire.register("jCQXu", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $e49aa561e642bbc9$export$2e2bcd8739ae039; });
function $e49aa561e642bbc9$export$2e2bcd8739ae039(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

});


parcelRequire.register("6hgBC", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $4921362aa31874c9$export$2e2bcd8739ae039; });

var $0kv6W = parcelRequire("0kv6W");

var $2ttjm = parcelRequire("2ttjm");

var $gmqc3 = parcelRequire("gmqc3");
function $4921362aa31874c9$export$2e2bcd8739ae039(Derived) {
    var hasNativeReflectConstruct = $0kv6W.default();
    return function _createSuperInternal() {
        var Super = $2ttjm.default(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $2ttjm.default(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $gmqc3.default(this, result);
    };
}

});
parcelRequire.register("0kv6W", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $000fe73b6337051f$export$2e2bcd8739ae039; });
function $000fe73b6337051f$export$2e2bcd8739ae039() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}

});

parcelRequire.register("gmqc3", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $be9304e6018e41f2$export$2e2bcd8739ae039; });

var $F7mid = parcelRequire("F7mid");

var $fD8Ma = parcelRequire("fD8Ma");
function $be9304e6018e41f2$export$2e2bcd8739ae039(self, call) {
    if (call && ($fD8Ma.default(call) === "object" || typeof call === "function")) return call;
    return $F7mid.default(self);
}

});
parcelRequire.register("F7mid", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $07b989b51253e5d6$export$2e2bcd8739ae039; });
function $07b989b51253e5d6$export$2e2bcd8739ae039(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}

});

parcelRequire.register("fD8Ma", function(module, exports) {

$parcel$export(module.exports, "default", function () { return $b6114e387d8b13b2$export$2e2bcd8739ae039; });
function $b6114e387d8b13b2$export$2e2bcd8739ae039(obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
}

});




parcelRequire.register("aFmUl", function(module, exports) {

$parcel$export(module.exports, "ModelProcessManager", function () { return $7c3f80bfe6bb0408$export$30855ecba71b29fd; });

var $1uixu = parcelRequire("1uixu");

var $hV6WK = parcelRequire("hV6WK");

var $bCMyP = parcelRequire("bCMyP");

var $ewXA2 = parcelRequire("ewXA2");

var $8Luon = parcelRequire("8Luon");

var $5tGv8 = parcelRequire("5tGv8");

var $cz7V3 = parcelRequire("cz7V3");
var $7c3f80bfe6bb0408$export$30855ecba71b29fd;
(function($7c3f80bfe6bb0408$export$30855ecba71b29fd) {
    // nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._counter = 0;
    // changed models (current round)
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._modlist = new Map();
    // new processes (that will need a first onchange call in "force" mode)
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._n_processes = new Map();
    // current model id (used to create new ids)
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._cur_mid = 0;
    // current process id (used to create new ids)
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._cur_process_id = 0;
    // timer used to create a new "round"
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._timeout = undefined;
    // if _force_m == true, every has_been_modified function will return true
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._force_m = false;
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._def = {
    };
    function new_from_state() {
        throw 'function obsolete';
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.new_from_state = new_from_state;
    function load() {
        throw 'function obsolete';
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.load = load;
    function conv(v) {
        if (v instanceof $ewXA2.Model) return v;
        if (v instanceof Array) return new $bCMyP.Lst(v);
        if (typeof v === 'string') return new $8Luon.Str(v);
        if (typeof v === 'number') return new $5tGv8.Val(v);
        if (typeof v === 'boolean') return new $hV6WK.Bool(v);
        return new $ewXA2.Model(v);
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.conv = conv;
    function get_object_class(obj) {
        if (obj === null || obj === void 0 ? void 0 : obj.constructor) {
            if ('_constructorName' in obj) return obj._constructorName;
            if ('name' in obj.constructor) return obj.constructor.name;
            if ('toString' in obj.constructor) {
                var arr = obj.constructor.toString().match(/class\s*(\w+)/);
                if (!arr) arr = obj.constructor.toString().match(/function\s*(\w+)/);
                if ((arr === null || arr === void 0 ? void 0 : arr.length) === 2) return arr[1];
            }
        }
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.get_object_class = get_object_class;
    function _get_attribute_names(m) {
        if (m instanceof $ewXA2.Model) return m._attribute_names;
        var res = [];
        for(var key in m)if (Object.prototype.hasOwnProperty.call(m, key)) res.push(key);
        return res;
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._get_attribute_names = _get_attribute_names;
    /**
     *  create a Model using a line of get_state(using.type, .data, ...)
     * @export
     * @template T
     * @param {string} mid
     * @param {IStateMap<T>} map
     * @return {*}  {T}
     */ function _new_model_from_state(mid, map) {
        var info = map[mid];
        info.buff = new $7c3f80bfe6bb0408$export$30855ecba71b29fd._def[info.type]();
        info.buff._set_state(info.data, map);
        return info.buff;
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._new_model_from_state = _new_model_from_state;
    /**
     * say that something will need a call
     * to ModelProcessManager._sync_processes during the next round
     * @export
     * @return {*}  {ReturnType<typeof setTimeout>}
     */ function _need_sync_processes() {
        if ($7c3f80bfe6bb0408$export$30855ecba71b29fd._timeout == null) {
            $7c3f80bfe6bb0408$export$30855ecba71b29fd._timeout = setTimeout(_sync_processes, 1);
            return $7c3f80bfe6bb0408$export$30855ecba71b29fd._timeout;
        }
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._need_sync_processes = _need_sync_processes;
    function register_models(modelList, name) {
        if (modelList) {
            // function
            if (modelList instanceof Function) $7c3f80bfe6bb0408$export$30855ecba71b29fd._register_models_check(modelList, name);
            else if ($cz7V3.isIterable(modelList)) {
                // array
                var l = modelList;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = l[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var m = _step.value;
                        $7c3f80bfe6bb0408$export$30855ecba71b29fd.register_models(m);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else {
                // obj
                var obj = modelList;
                for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) $7c3f80bfe6bb0408$export$30855ecba71b29fd._register_models_check(obj[key], key);
            }
        }
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.register_models = register_models;
    function _register_models_check(func) {
        var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : func.name;
        if (typeof $7c3f80bfe6bb0408$export$30855ecba71b29fd._def[name] !== 'undefined' && $7c3f80bfe6bb0408$export$30855ecba71b29fd._def[name] !== func) {
            console.error("trying to register \"".concat(name, "\" Model but was already defined"));
            console.error('old =', $7c3f80bfe6bb0408$export$30855ecba71b29fd._def[name]);
            console.error('new =', func);
        } else $7c3f80bfe6bb0408$export$30855ecba71b29fd._def[name] = func;
        // @ts-ignore
        func._constructorName = name;
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._register_models_check = _register_models_check;
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @export
     */ function _sync_processes() {
        var processes = new Map();
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined, _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator = $7c3f80bfe6bb0408$export$30855ecba71b29fd._modlist[Symbol.iterator](), _step; !(_iteratorNormalCompletion1 = (_step = _iterator.next()).done); _iteratorNormalCompletion1 = true){
                var _value = $1uixu.default(_step.value, 2), model = _value[1];
                try {
                    for(var _iterator1 = model._processes[Symbol.iterator](), _step1; !(_iteratorNormalCompletion = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion = true){
                        var process = _step1.value;
                        processes.set(process.process_id, {
                            value: process,
                            force: false
                        });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
        try {
            for(var _iterator2 = $7c3f80bfe6bb0408$export$30855ecba71b29fd._n_processes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                var _value1 = $1uixu.default(_step2.value, 2), id = _value1[0], process1 = _value1[1];
                processes.set(id, {
                    value: process1,
                    force: true
                });
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                }
            } finally{
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
        $7c3f80bfe6bb0408$export$30855ecba71b29fd._timeout = undefined;
        $7c3f80bfe6bb0408$export$30855ecba71b29fd._modlist.clear();
        $7c3f80bfe6bb0408$export$30855ecba71b29fd._n_processes.clear();
        $7c3f80bfe6bb0408$export$30855ecba71b29fd._counter += 2;
        var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
        try {
            for(var _iterator3 = processes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                var _value2 = $1uixu.default(_step3.value, 2), process2 = _value2[1];
                $7c3f80bfe6bb0408$export$30855ecba71b29fd._force_m = process2.force;
                process2.value.onchange();
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                }
            } finally{
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
        $7c3f80bfe6bb0408$export$30855ecba71b29fd._force_m = false;
    }
    $7c3f80bfe6bb0408$export$30855ecba71b29fd._sync_processes = _sync_processes;
    $7c3f80bfe6bb0408$export$30855ecba71b29fd.spinal = {
    };
})($7c3f80bfe6bb0408$export$30855ecba71b29fd || ($7c3f80bfe6bb0408$export$30855ecba71b29fd = {
}));

});
parcelRequire.register("hV6WK", function(module, exports) {

$parcel$export(module.exports, "Bool", function () { return $d0bd25fc89823ac0$export$6e6298e1abe0d5b; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $49kUR = parcelRequire("49kUR");

var $aWMae = parcelRequire("aWMae");
var $d0bd25fc89823ac0$export$6e6298e1abe0d5b = /*#__PURE__*/ function(Obj) {
    "use strict";
    $kY4Jr.default($d0bd25fc89823ac0$export$6e6298e1abe0d5b, Obj);
    var _super = $6hgBC.default($d0bd25fc89823ac0$export$6e6298e1abe0d5b);
    function $d0bd25fc89823ac0$export$6e6298e1abe0d5b() {
        var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        $6NUET.default(this, $d0bd25fc89823ac0$export$6e6298e1abe0d5b);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $d0bd25fc89823ac0$export$6e6298e1abe0d5b._constructorName;
        _this._set(data);
        return _this;
    }
    $ipX5G.default($d0bd25fc89823ac0$export$6e6298e1abe0d5b, [
        {
            // toggle true / false ( 1 / 0 )
            key: "toggle",
            value: function toggle() {
                return this.set(!this._data);
            }
        },
        {
            key: "toBoolean",
            value: function toBoolean() {
                return this._data;
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                return new $d0bd25fc89823ac0$export$6e6298e1abe0d5b(this._data);
            }
        },
        {
            // we do not take _set from Obj because we want a conversion if value is not a boolean
            key: "_set",
            value: function _set(value) {
                var n;
                if (value === 'false') n = false;
                else if (value === 'true') n = true;
                else if (value instanceof $d0bd25fc89823ac0$export$6e6298e1abe0d5b) n = value._data;
                else n = Boolean(value);
                if (this._data !== n) {
                    this._data = n;
                    return true;
                }
                return false;
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                out.mod += "C ".concat(this._server_id, " ").concat(this._data ? 1 : 0, " ");
            }
        }
    ]);
    return $d0bd25fc89823ac0$export$6e6298e1abe0d5b;
}($aWMae.Obj);
$d0bd25fc89823ac0$export$6e6298e1abe0d5b._constructorName = 'Bool';

});
parcelRequire.register("aWMae", function(module, exports) {

$parcel$export(module.exports, "Obj", function () { return $7f84ae8ec57c817b$export$6738a6d9146a0cdc; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $49kUR = parcelRequire("49kUR");

var $ewXA2 = parcelRequire("ewXA2");
var $7f84ae8ec57c817b$export$6738a6d9146a0cdc = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($7f84ae8ec57c817b$export$6738a6d9146a0cdc, Model);
    var _super = $6hgBC.default($7f84ae8ec57c817b$export$6738a6d9146a0cdc);
    function $7f84ae8ec57c817b$export$6738a6d9146a0cdc(data) {
        $6NUET.default(this, $7f84ae8ec57c817b$export$6738a6d9146a0cdc);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $7f84ae8ec57c817b$export$6738a6d9146a0cdc._constructorName;
        if (data != null) _this._set(data);
        return _this;
    }
    $ipX5G.default($7f84ae8ec57c817b$export$6738a6d9146a0cdc, [
        {
            key: "toString",
            value: function toString() {
                var _a;
                return (_a = this._data) === null || _a === void 0 ? void 0 : _a.toString();
            }
        },
        {
            key: "equals",
            value: function equals(obj) {
                return obj instanceof $7f84ae8ec57c817b$export$6738a6d9146a0cdc ? this._data === obj._data : this._data === obj;
            }
        },
        {
            key: "get",
            value: function get() {
                return this._data;
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                out.mod += "C ".concat(this._server_id, " ").concat(this.toString(), " ");
            }
        },
        {
            key: "_set",
            value: function _set(value) {
                if (this._data !== value) {
                    this._data = value;
                    return true;
                }
                return false;
            }
        },
        {
            key: "_get_state",
            value: function _get_state() {
                return this.toString();
            }
        },
        {
            key: "_set_state",
            value: function _set_state(str, _map) {
                return this.set(str);
            }
        }
    ]);
    return $7f84ae8ec57c817b$export$6738a6d9146a0cdc;
}($ewXA2.Model);
$7f84ae8ec57c817b$export$6738a6d9146a0cdc._constructorName = 'Obj';

});
parcelRequire.register("ewXA2", function(module, exports) {

$parcel$export(module.exports, "Model", function () { return $a9424539e0c26d9c$export$a1edc412be3e1841; });

var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");
var $hAmnT = parcelRequire("hAmnT");
var $1uixu = parcelRequire("1uixu");

var $49kUR = parcelRequire("49kUR");

var $aFmUl = parcelRequire("aFmUl");

var $YWt7p = parcelRequire("YWt7p");

var $7E5bO = parcelRequire("7E5bO");
var $a9424539e0c26d9c$export$a1edc412be3e1841 = /*#__PURE__*/ function() {
    "use strict";
    function $a9424539e0c26d9c$export$a1edc412be3e1841(attr) {
        $6NUET.default(this, $a9424539e0c26d9c$export$a1edc412be3e1841);
        this._constructorName = $a9424539e0c26d9c$export$a1edc412be3e1841._constructorName;
        this._attribute_names = [];
        this.model_id = $aFmUl.ModelProcessManager._cur_mid;
        $aFmUl.ModelProcessManager._cur_mid += 1;
        this._processes = [];
        this._parents = [];
        this._date_last_modification = $aFmUl.ModelProcessManager._counter + 2;
        if (attr != null) this._set(attr);
    }
    $ipX5G.default($a9424539e0c26d9c$export$a1edc412be3e1841, [
        {
            key: "destructor",
            value: function destructor() {
            }
        },
        {
            /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "has_been_modified",
            value: function has_been_modified() {
                return this._date_last_modification > $aFmUl.ModelProcessManager._counter - 2 || $aFmUl.ModelProcessManager._force_m;
            }
        },
        {
            /**
     * return true if this has changed since previous synchronisation due
     * to a direct modification (not from a child one)
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "has_been_directly_modified",
            value: function has_been_directly_modified() {
                return this._date_last_modification > $aFmUl.ModelProcessManager._counter - 1 || $aFmUl.ModelProcessManager._force_m;
            }
        },
        {
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
     */ key: "bind",
            value: function bind(f, onchange_construction) {
                if (f instanceof $7E5bO.Process) {
                    this._processes.push(f);
                    f._models.push(this);
                    if (onchange_construction) {
                        $aFmUl.ModelProcessManager._n_processes.set(f.process_id, f);
                        $aFmUl.ModelProcessManager._need_sync_processes();
                        return f;
                    }
                } else return new $YWt7p.BindProcess(this, onchange_construction, f);
            }
        },
        {
            //  ...
            key: "unbind",
            value: function unbind(f) {
                if (f instanceof $7E5bO.Process) {
                    this._processes.splice(this._processes.indexOf(f), 1);
                    f._models.splice(f._models.indexOf(this), 1);
                } else {
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._processes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var process = _step.value;
                            if (process instanceof $YWt7p.BindProcess && process.f === f) this.unbind(process);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        },
        {
            /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     * @return {*}  {*}
     * @memberof Model
     */ key: "get",
            value: function get() {
                var res = {
                };
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._attribute_names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var name = _step.value;
                        Object.assign(res, $hAmnT.default({
                        }, name, this[name].get()));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return res;
            }
        },
        {
            /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     *
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "set",
            value: function set(value) {
                if (this._set(value)) {
                    // change internal data
                    this._signal_change();
                    return true;
                }
                return false;
            }
        },
        {
            /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param {string} str
     * @memberof Model
     */ key: "set_state",
            value: function set_state(str) {
                var map = {
                };
                var lst = str.split('\n');
                var mid = lst.shift();
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = lst[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var l = _step.value;
                        if (!l.length) continue;
                        var s = l.split(' ');
                        map[s[0]] = {
                            type: s[1],
                            data: s[2],
                            buff: void 0
                        };
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                // fill / update this with data in map[ mid ]
                map[mid].buff = this;
                this._set_state(map[mid].data, map);
            }
        },
        {
            // return a string which describes the changes in this and children since date
            key: "get_state",
            value: function get_state() {
                var date = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
                // get sub models
                var fmm = {
                };
                this._get_flat_model_map(fmm, date);
                var res = this.model_id.toString();
                if (this._date_last_modification > date) for(var id in fmm){
                    var obj = fmm[id];
                    res += "\n".concat(obj.model_id, " ").concat($aFmUl.ModelProcessManager.get_object_class(obj), " ").concat(obj._get_state());
                }
                return res;
            }
        },
        {
            /**
     * add attribute (p.values must contain models)
     * can be called with
     *  - name, instance of Model (two arguments)
     *  - { name_1: instance_1, name_2: instance_2, ... } (only one argument)
     * @param {(string | { [nameAttr: string]: any })} name
     * @param {*} [instanceOfModel]
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */ key: "add_attr",
            value: function add_attr(name, instanceOfModel) {
                var signal_change = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                // name, model
                if (typeof name === 'string') {
                    if (typeof instanceOfModel === 'function') this[name] = instanceOfModel;
                    else {
                        if (this[name] != null) console.error("attribute ".concat(name, " already exists in ").concat($aFmUl.ModelProcessManager.get_object_class(this)));
                        var model = $aFmUl.ModelProcessManager.conv(instanceOfModel);
                        if (model._parents.indexOf(this) < 0) model._parents.push(this);
                        this._attribute_names.push(name);
                        this[name] = model;
                        if (signal_change) this._signal_change();
                    }
                } else {
                    // else, asuming { name_1: instance_1, name_2: instance_2, ... }
                    for(var key in name)if (Object.prototype.hasOwnProperty.call(name, key)) {
                        var val = name[key];
                        this.add_attr(key, val, signal_change);
                    }
                }
            }
        },
        {
            /**
     * remove attribute named name
     * @param {string} name
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */ key: "rem_attr",
            value: function rem_attr(name) {
                var signal_change = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
                var item = this[name];
                if (item instanceof $a9424539e0c26d9c$export$a1edc412be3e1841) {
                    var i = item._parents.indexOf(this);
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
        },
        {
            /**
     * change attribute named nname to instanceOfModel (use references for comparison)
     * @param {string} name
     * @param {*} instanceOfModel
     * @param {boolean} [signal_change=true]
     * @return {*}  {void}
     * @memberof Model
     */ key: "mod_attr",
            value: function mod_attr(name, instanceOfModel) {
                var signal_change = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
                if (this[name] !== instanceOfModel) {
                    this.rem_attr(name);
                    return this.add_attr(name, instanceOfModel, signal_change);
                }
            }
        },
        {
            /**
     * add / mod / rem attr to get the same data than o
     *  (assumed to be something like { key: val, ... })
     * @param {object} instanceOfModel
     * @memberof Model
     */ key: "set_attr",
            value: function set_attr(instanceOfModel) {
                var _this = this;
                // new ones / updates
                for(var k in instanceOfModel)this.mod_attr(k, instanceOfModel[k]);
                this._attribute_names.filter(function(attrName) {
                    return instanceOfModel[attrName] == null;
                }).forEach(function(attrName) {
                    return _this.rem_attr(attrName);
                });
            }
        },
        {
            /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     *  [ nb_row, nb_cols ] for a matrix...
     * @param {number} [_for_display=0]
     * @return {*}  {(number | number[])}
     * @memberof Model
     */ key: "size",
            value: function size() {
                var _for_display = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                return [];
            }
        },
        {
            /**
     * dimensionnality of the object -> 0 for a scalar, 1 for a vector, ...
     * @param {boolean} [_for_display]
     * @return {*} {number}
     * @memberof Model
     */ key: "dim",
            value: function dim() {
                var _for_display = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                var size = this.size(_for_display);
                return Array.isArray(size) ? size.length : size;
            }
        },
        {
            /**
     * @param {Model} m
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "equals",
            value: function equals(m) {
                if (this === m) return true;
                if (this._attribute_names.length !== m._attribute_names.length) return false;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // check all own attrs exist in target
                    for(var _iterator = this._attribute_names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var attrName = _step.value;
                        if (!m._attribute_names.includes(attrName)) return false;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                try {
                    // check target attrs exist in own and is equal
                    for(var _iterator1 = m._attribute_names[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                        var attrName1 = _step1.value;
                        if (this[attrName1] == null) return false;
                        var attrModel = m[attrName1];
                        if (!this[attrName1].equals(attrModel)) return false;
                    }
                } catch (err) {
                    _didIteratorError1 = true;
                    _iteratorError1 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                            _iterator1.return();
                        }
                    } finally{
                        if (_didIteratorError1) {
                            throw _iteratorError1;
                        }
                    }
                }
                return true;
            }
        },
        {
            /**
     * get first parents that checks func_to_check
     * @param {(model: Model) => boolean} func_to_check
     * @return {*}  {Model[]}
     * @memberof Model
     */ key: "get_parents_that_check",
            value: function get_parents_that_check(func_to_check) {
                var res = [];
                var visited = {
                };
                this._get_parents_that_check_rec(res, visited, func_to_check);
                return res;
            }
        },
        {
            /**
     * @return {*}  {Model}
     * @memberof Model
     */ key: "deep_copy",
            value: function deep_copy() {
                var tmp = {
                };
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._attribute_names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var key = _step.value;
                        tmp[key] = this[key].deep_copy();
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var res = new $aFmUl.ModelProcessManager._def[$aFmUl.ModelProcessManager.get_object_class(this)]();
                res.set_attr(tmp);
                return res;
            }
        },
        {
            /**
     * returns true if change is not "cosmetic"
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "real_change",
            value: function real_change() {
                if (this.has_been_directly_modified() && !this._attribute_names.length) return true;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._attribute_names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var attrNames = _step.value;
                        if (typeof this.cosmetic_attribute === 'function' ? this.cosmetic_attribute(attrNames) : null) continue;
                        if (this[attrNames].real_change()) return true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return false;
            }
        },
        {
            /**
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "cosmetic_attribute",
            value: function cosmetic_attribute(name) {
                return false;
            }
        },
        {
            /**
     * may be redefined
     * @return {*}  {string}
     * @memberof Model
     */ key: "_get_state",
            value: function _get_state() {
                var _this = this;
                return this._attribute_names.map(function(attrName) {
                    return "".concat(attrName, ":").concat(_this[attrName].model_id);
                }).join(',');
            }
        },
        {
            /**
     * send data to server
     * @param {IFsData} out
     * @return {*}  {string}
     * @memberof Model
     */ key: "_get_fs_data",
            value: function _get_fs_data(out) {
                var _this = this;
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                var data = this._attribute_names.map(function(attrName) {
                    var obj = _this[attrName];
                    $49kUR.FileSystem.set_server_id_if_necessary(out, obj);
                    return attrName + ':' + obj._server_id;
                }).join(',');
                out.mod += "C ".concat(this._server_id, " ").concat(data, " ");
            }
        },
        {
            /**
     * may be redefined.
     * by default, add attributes using keys and values (and remove old unused values)
     * must return true if data is changed
     * @param {(Model | object)} value
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "_set",
            value: function _set(value) {
                var change = 0;
                var used = {
                };
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    // rem
                    for(var _iterator = $aFmUl.ModelProcessManager._get_attribute_names(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var attrName = _step.value;
                        used[attrName] = true;
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
                try {
                    for(var _iterator2 = this._attribute_names[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                        var key = _step2.value;
                        if (!used[key]) {
                            change = 1;
                            this.rem_attr(key, false);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                            _iterator2.return();
                        }
                    } finally{
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
                // mod / add
                for(var key1 in value)if (Object.prototype.hasOwnProperty.call(value, key1)) {
                    var val = value[key1];
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
        },
        {
            /**
     * called by set. change_level should not be defined by the user
     *  (it permits to != change from child of from this)
     * @param {number} [change_level=2]
     * @return {*}  {ReturnType<typeof setTimeout>}
     * @memberof Model
     */ key: "_signal_change",
            value: function _signal_change() {
                var change_level = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
                if (change_level === 2 && this._server_id != null) $49kUR.FileSystem.signal_change(this);
                // register this as a modified model
                $aFmUl.ModelProcessManager._modlist.set(this.model_id, this);
                // do the same thing for the parents
                if (this._date_last_modification <= $aFmUl.ModelProcessManager._counter) {
                    this._date_last_modification = $aFmUl.ModelProcessManager._counter + change_level;
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = this._parents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var parent = _step.value;
                            parent._signal_change(1);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
                // start if not done a timer
                return $aFmUl.ModelProcessManager._need_sync_processes();
            }
        },
        {
            /**
     * generic definition of _set_state. ( called by _use_state )
     * @param {string} str
     * @param {IStateMap} map
     * @memberof Model
     */ key: "_set_state",
            value: function _set_state(str, map) {
                var used = {
                }; // used attributes. Permits to know what to destroy
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                if (str.length) try {
                    for(var _iterator = str.split(',')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var spl = _step.value;
                        var ref = $1uixu.default(spl.split(':'), 2), attr = ref[0], k_id = ref[1];
                        used[attr] = true;
                        var model = this[attr];
                        if (map[k_id].buff != null) {
                            // if already defined in the map
                            if (model == null) this.add_attr(attr, map[k_id].buff);
                            else if (map[k_id].buff !== model) this.mod_attr(attr, map[k_id].buff);
                        } else if (model == null) // else, if the attribute does not exist, we create if
                        this.add_attr(attr, $aFmUl.ModelProcessManager._new_model_from_state(k_id, map));
                        else if (!model._set_state_if_same_type(k_id, map)) // else, we already have an attribute and map has not been already explored
                        this.mod_attr(attr, $aFmUl.ModelProcessManager._new_model_from_state(k_id, map));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
                try {
                    for(var _iterator3 = this._attribute_names[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                        var attrName = _step3.value;
                        if (!used[attrName]) this.rem_attr(attrName);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                            _iterator3.return();
                        }
                    } finally{
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        },
        {
            /**
     * see get_parents_that_check
     * @param {Model[]} res
     * @param {{ [attrName: string]: boolean }} visited
     * @param {(model: Model) => boolean} func_to_check
     * @memberof Model
     */ key: "_get_parents_that_check_rec",
            value: function _get_parents_that_check_rec(res, visited, func_to_check) {
                if (visited[this.model_id] == null) {
                    visited[this.model_id] = true;
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    if (func_to_check(this)) res.push(this);
                    else try {
                        for(var _iterator = this._parents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var parent = _step.value;
                            parent._get_parents_that_check_rec(res, visited, func_to_check);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally{
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        } finally{
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }
            }
        },
        {
            /**
     * return true if info from map[ mid ] if compatible with this.
     * If it's the case, use this information to update data
     * @param {string} mid
     * @param {IStateMap} map
     * @return {*}  {boolean}
     * @memberof Model
     */ key: "_set_state_if_same_type",
            value: function _set_state_if_same_type(mid, map) {
                var dat;
                dat = map[mid];
                if ($aFmUl.ModelProcessManager.get_object_class(this) === dat.type) {
                    dat.buff = this;
                    this._set_state(dat.data, map);
                    return true;
                }
                return false;
            }
        },
        {
            /**
     * map[ id ] = obj for each objects starting from this recursively
     * @param {{ [id: number]: Model }} map
     * @param {number} date
     * @memberof Model
     */ key: "_get_flat_model_map",
            value: function _get_flat_model_map(map, date) {
                map[this.model_id] = this;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._attribute_names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var name = _step.value;
                        var obj = this[name];
                        if (map[obj.model_id] == null) {
                            if (obj._date_last_modification > date) obj._get_flat_model_map(map, date);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                return map;
            }
        }
    ]);
    return $a9424539e0c26d9c$export$a1edc412be3e1841;
}();
$a9424539e0c26d9c$export$a1edc412be3e1841._constructorName = 'Model';

});
parcelRequire.register("YWt7p", function(module, exports) {

$parcel$export(module.exports, "BindProcess", function () { return $0b72f55e2713b87a$export$3f2ba963eed9fec6; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $7E5bO = parcelRequire("7E5bO");
var $0b72f55e2713b87a$export$3f2ba963eed9fec6 = /*#__PURE__*/ function(Process) {
    "use strict";
    $kY4Jr.default($0b72f55e2713b87a$export$3f2ba963eed9fec6, Process);
    var _super = $6hgBC.default($0b72f55e2713b87a$export$3f2ba963eed9fec6);
    function $0b72f55e2713b87a$export$3f2ba963eed9fec6(model, onchange_construction, f) {
        $6NUET.default(this, $0b72f55e2713b87a$export$3f2ba963eed9fec6);
        var _this;
        _this = _super.call(this, model, onchange_construction);
        _this.f = f;
        return _this;
    }
    $ipX5G.default($0b72f55e2713b87a$export$3f2ba963eed9fec6, [
        {
            key: "onchange",
            value: function onchange() {
                return this.f();
            }
        }
    ]);
    return $0b72f55e2713b87a$export$3f2ba963eed9fec6;
}($7E5bO.Process);
$0b72f55e2713b87a$export$3f2ba963eed9fec6._constructorName = 'BindProcess';

});
parcelRequire.register("7E5bO", function(module, exports) {

$parcel$export(module.exports, "Process", function () { return $59104b626bf0cf4e$export$ddab65ae98aaa487; });

var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $aFmUl = parcelRequire("aFmUl");

var $ewXA2 = parcelRequire("ewXA2");

var $cz7V3 = parcelRequire("cz7V3");
var $59104b626bf0cf4e$export$ddab65ae98aaa487 = /*#__PURE__*/ function() {
    "use strict";
    function $59104b626bf0cf4e$export$ddab65ae98aaa487(m) {
        var onchange_construction = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        $6NUET.default(this, $59104b626bf0cf4e$export$ddab65ae98aaa487);
        this._models = []; // what this is observing
        this.process_id = $aFmUl.ModelProcessManager._cur_process_id;
        $aFmUl.ModelProcessManager._cur_process_id += 1;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        if (m instanceof $ewXA2.Model) m.bind(this, onchange_construction);
        else if ($cz7V3.isIterable(m)) try {
            for(var _iterator = m[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var model = _step.value;
                model.bind(this, onchange_construction);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        else if (m != null) console.error("Process constructor doesn't know what to do with", m);
    }
    $ipX5G.default($59104b626bf0cf4e$export$ddab65ae98aaa487, [
        {
            key: "destructor",
            value: function destructor() {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this._models[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var model = _step.value;
                        var idx = model._processes.indexOf(this);
                        if (idx >= 0) model._processes.splice(idx, 1);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        },
        {
            /**
     * called if at least one of the corresponding models has changed
     * in the previous round
     * @memberof Process
     */ key: "onchange",
            value: function onchange() {
            }
        }
    ]);
    return $59104b626bf0cf4e$export$ddab65ae98aaa487;
}();
$59104b626bf0cf4e$export$ddab65ae98aaa487._constructorName = 'Process';

});
parcelRequire.register("cz7V3", function(module, exports) {

$parcel$export(module.exports, "isIterable", function () { return $925ee584def4f7d9$export$9652023d9040757; });
function $925ee584def4f7d9$export$9652023d9040757(obj) {
    return obj != null && typeof obj[Symbol.iterator] === 'function';
}

});






parcelRequire.register("bCMyP", function(module, exports) {

$parcel$export(module.exports, "Lst", function () { return $8768e97eec330fd4$export$774a0e74f4f3f461; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $byLkN = parcelRequire("byLkN");

var $49kUR = parcelRequire("49kUR");

var $aFmUl = parcelRequire("aFmUl");

var $ewXA2 = parcelRequire("ewXA2");
var tmp = Symbol.iterator;
var $8768e97eec330fd4$export$774a0e74f4f3f461 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($8768e97eec330fd4$export$774a0e74f4f3f461, Model);
    var _super = $6hgBC.default($8768e97eec330fd4$export$774a0e74f4f3f461);
    function $8768e97eec330fd4$export$774a0e74f4f3f461(data) {
        $6NUET.default(this, $8768e97eec330fd4$export$774a0e74f4f3f461);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $8768e97eec330fd4$export$774a0e74f4f3f461._constructorName;
        _this.length = 0;
        var s = _this.static_length();
        if (s >= 0) {
            var d = _this.default_value();
            for(var i = 0; i <= s; i++)// @ts-ignore
            _this.push(d, true);
        }
        if (data) _this._set(data);
        return _this;
    }
    $ipX5G.default($8768e97eec330fd4$export$774a0e74f4f3f461, [
        {
            key: "static_length",
            value: function static_length() {
                return -1;
            }
        },
        {
            key: "default_value",
            value: function default_value() {
                return 0;
            }
        },
        {
            key: "base_type",
            value: function base_type() {
                return undefined;
            }
        },
        {
            key: "get",
            value: function get() {
                var res = [];
                for(var i = 0; i < this.length; i++)if (this[i]) res.push(this[i].get());
                return res;
            }
        },
        {
            key: "size",
            value: function size() {
                return [
                    this.length
                ];
            }
        },
        {
            key: "toString",
            value: function toString() {
                var res = [];
                for(var i = 0; i < this.length; i++)res.push(this[i].toString());
                if (res.length > 0) return res.join();
                return '';
            }
        },
        {
            key: "equals",
            value: function equals(lst) {
                if (lst.length !== this.length) return false;
                for(var i = 0; i < this.length; i++){
                    if (!this[i].equals(lst[i])) return false;
                }
                return true;
            }
        },
        {
            key: "push",
            value: function push(value) {
                var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                if (this._static_size_check(force)) return;
                var b = this.base_type();
                if (b) {
                    if (!(value instanceof b)) value = new b(value);
                } else // @ts-ignore
                value = $aFmUl.ModelProcessManager.conv(value);
                if (value._parents.indexOf(this) === -1) value._parents.push(this);
                this[this.length++] = value;
                this._signal_change();
            }
        },
        {
            key: "pop",
            value: function pop() {
                if (this._static_size_check(false)) return;
                if (this.length <= 0) return;
                var res = this[--this.length];
                this.rem_attr(this.length.toString(10));
                return res;
            }
        },
        {
            key: "clear",
            value: function clear() {
                while(this.length)this.pop();
            }
        },
        {
            key: "unshift",
            value: function unshift(value) {
                if (this._static_size_check(false)) return;
                var b = this.base_type();
                if (b != null) {
                    if (!(value instanceof b)) value = new b(value);
                } else value = $aFmUl.ModelProcessManager.conv(value);
                if (value._parents.indexOf(this) < 0) value._parents.push(this);
                if (this.length) {
                    var i, j, ref;
                    for(i = j = ref = this.length - 1; ref <= 0 ? j <= 0 : j >= 0; i = ref <= 0 ? ++j : --j)this[i + 1] = this[i];
                }
                this[0] = value;
                this.length += 1;
                this._signal_change();
                return this.length;
            }
        },
        {
            key: "shift",
            value: function shift() {
                var res = this[0];
                this.slice(0, 1);
                return res;
            }
        },
        {
            key: "remove",
            value: function remove(item) {
                var index = this.indexOf(item);
                if (index >= 0) this.slice(index, 1);
            }
        },
        {
            key: "remove_ref",
            value: function remove_ref(item) {
                var index = this.indexOf_ref(item);
                if (index >= 0) this.slice(index, 1);
            }
        },
        {
            key: "filter",
            value: function filter(f) {
                var res = [];
                for(var i = 0; i < this.length; i++)if (f(this[i])) res.push(this[i]);
                return res;
            }
        },
        {
            key: "detect",
            value: function detect(f) {
                for(var i = 0; i < this.length; i++){
                    if (f(this[i])) return this[i];
                }
                return undefined;
            }
        },
        {
            key: "sorted",
            value: function sorted(sort) {
                var res = [];
                for(var i = 0; i < this.length; i++)res.push(this[i]);
                return res.sort(sort);
            }
        },
        {
            key: "has",
            value: function has(f) {
                for(var i = 0; i < this.length; i++){
                    if (f(this[i])) return true;
                }
                return false;
            }
        },
        {
            key: "indexOf",
            value: function indexOf(value) {
                for(var i = 0; i < this.length; i++){
                    if (this[i].equals(value)) return 1;
                }
                return -1;
            }
        },
        {
            key: "indexOf_ref",
            value: function indexOf_ref(value) {
                for(var i = 0; i < this.length; i++){
                    if (this[i] == value) return i;
                }
                return -1;
            }
        },
        {
            key: "contains",
            value: function contains(value) {
                return this.indexOf(value) !== -1;
            }
        },
        {
            key: "contains_ref",
            value: function contains_ref(value) {
                return this.indexOf_ref(value) !== -1;
            }
        },
        {
            key: "toggle",
            value: function toggle(value) {
                var index = this.indexOf(value);
                if (index !== -1) {
                    this.splice(index);
                    return false;
                } else {
                    this.push(value);
                    return true;
                }
            }
        },
        {
            key: "toggle_ref",
            value: function toggle_ref(value) {
                var index = this.indexOf_ref(value);
                if (index !== -1) {
                    this.splice(index);
                    return false;
                } else {
                    this.push(value);
                    return true;
                }
            }
        },
        {
            key: "slice",
            value: function slice(begin) {
                var end = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.length;
                var res = new $8768e97eec330fd4$export$774a0e74f4f3f461();
                if (begin < 0) begin = 0;
                if (end > this.length) end = this.length;
                for(var i = begin; i < end; i++)res.push(this[i].get());
                return res;
            }
        },
        {
            key: "concat",
            value: function concat(new_tab) {
                var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
                if (this._static_size_check(force)) return;
                if (new_tab.length) for(var i = 0; i < new_tab.length; i++)this.push(new_tab[i]);
            }
        },
        {
            key: "splice",
            value: function splice(index) {
                var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
                if (this._static_size_check(false)) return;
                var end = Math.min(index + n, this.length);
                for(var i = index; i < end; i++)this.rem_attr(i.toString(0));
                for(var i1 = index; i1 < this.length - n; i1++)this[i1] = this[i1 + n];
                for(var i2 = this.length - n; i2 < this.length; i2++)delete this[i2];
                this.length -= n;
                this._signal_change();
            }
        },
        {
            key: "insert",
            value: function insert(index, lst) {
                var end = Math.max(this.length - index, 0);
                var res = [];
                for(var i = 0; i < end; i++)res.push(this.pop());
                res.reverse();
                for(var i3 = 0; i3 < lst.length; i3++)this.push(lst[i3]);
                for(var i4 = 0; i4 < res.length; i4++)this.push(res[i4]);
            }
        },
        {
            key: "set_or_push",
            value: function set_or_push(index, val) {
                if (index < this.length) // @ts-ignore
                return this.mod_attr(index, val);
                if (index === this.length) this.push(val);
            }
        },
        {
            key: "trim",
            value: function trim(size) {
                while(this.length > size)this.pop();
            }
        },
        {
            key: "join",
            value: function join(sep) {
                return this.get().join(sep);
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                var res = new $8768e97eec330fd4$export$774a0e74f4f3f461();
                for(var i = 0; i < this.length; i++)res.push(this[i].deep_copy());
                return res;
            }
        },
        {
            key: "back",
            value: function back() {
                return this[this.length - 1];
            }
        },
        {
            key: "real_change",
            value: function real_change() {
                if (this.has_been_directly_modified()) return true;
                for(var i = 0; i < this.length; i++){
                    if (this[i].real_change()) return true;
                }
                return false;
            }
        },
        {
            key: "_set",
            value: function _set(value) {
                var change = Number(this.length != value.length);
                var s = this.static_length();
                if (s >= 0 && change) console.error("resizing a static array (type ".concat($aFmUl.ModelProcessManager.get_object_class(this), ") is forbidden"));
                for(var i = 0; i < value.length; i++){
                    if (i < this.length) change |= this[i].set(value[i]);
                    else if (s < 0) this.push(value[i]);
                }
                if (s < 0) {
                    while(this.length > value.length)this.pop();
                    this.length = value.length;
                }
                return Boolean(change);
            }
        },
        {
            key: "_get_flat_model_map",
            value: function _get_flat_model_map(map, date) {
                map[this.model_id] = this;
                for(var i = 0; i < this.length; i++){
                    if (!map.hasOwnProperty(this[i])) {
                        if (this[i]._date_last_modification > date) this[i]._get_flat_model_map(map, date);
                    }
                }
                return map;
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                var res = [];
                for(var i = 0; i < this.length; i++){
                    var obj = this[i];
                    $49kUR.FileSystem.set_server_id_if_necessary(out, obj);
                    res.push(obj._server_id);
                }
                out.mod += "C ".concat(this._server_id, " ").concat(res.join(','), " ");
            }
        },
        {
            key: "_get_state",
            value: function _get_state() {
                var res = [];
                for(var i = 0; i < this.length; i++)res.push(this[i].model_id);
                return res.join(',');
            }
        },
        {
            key: "_set_state",
            value: function _set_state(str, map) {
                var l_id = str.split(',').filter(function(x) {
                    return x.length;
                });
                while(this.length > l_id.length)this.pop();
                for(var i = 0; i < this.length; i++){
                    var k_id = l_id[i];
                    if (map[k_id].buff) {
                        if (map[k_id].buff != this[i]) this.mod_attr(i.toString(10), map[k_id].buff);
                    } else if (!this[i]._set_state_if_same_type(k_id, map)) this.mod_attr(i.toString(10), $aFmUl.ModelProcessManager._new_model_from_state(k_id, map));
                }
                for(var i5 = this.length; i5 < l_id.length; i5++){
                    var k_id1 = l_id[i5];
                    if (map[k_id1].hasOwnProperty('buff') && map[k_id1].buff !== null) this.push(map[k_id1].buff);
                    else this.push($aFmUl.ModelProcessManager._new_model_from_state(k_id1, map));
                }
            }
        },
        {
            key: "_static_size_check",
            value: function _static_size_check(force) {
                if (this.static_length() >= 0 && !force) {
                    console.error("resizing a static array (type " + "".concat($aFmUl.ModelProcessManager.get_object_class(this), ") is forbidden"));
                    return true;
                }
                return false;
            }
        },
        {
            key: tmp,
            value: (/*@__PURE__*/$parcel$interopDefault($byLkN)).mark(function value() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, key;
                return (/*@__PURE__*/$parcel$interopDefault($byLkN)).wrap(function value$(_ctx) {
                    while(1)switch(_ctx.prev = _ctx.next){
                        case 0:
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _ctx.prev = 1;
                            _iterator = this._attribute_names[Symbol.iterator]();
                        case 3:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _ctx.next = 10;
                                break;
                            }
                            key = _step.value;
                            _ctx.next = 7;
                            return this[key];
                        case 7:
                            _iteratorNormalCompletion = true;
                            _ctx.next = 3;
                            break;
                        case 10:
                            _ctx.next = 16;
                            break;
                        case 12:
                            _ctx.prev = 12;
                            _ctx.t0 = _ctx["catch"](1);
                            _didIteratorError = true;
                            _iteratorError = _ctx.t0;
                        case 16:
                            _ctx.prev = 16;
                            _ctx.prev = 17;
                            if (!_iteratorNormalCompletion && _iterator.return != null) {
                                _iterator.return();
                            }
                        case 19:
                            _ctx.prev = 19;
                            if (!_didIteratorError) {
                                _ctx.next = 22;
                                break;
                            }
                            throw _iteratorError;
                        case 22:
                            return _ctx.finish(19);
                        case 23:
                            return _ctx.finish(16);
                        case 24:
                        case "end":
                            return _ctx.stop();
                    }
                }, value, this, [
                    [
                        1,
                        12,
                        16,
                        24
                    ],
                    [
                        17,
                        ,
                        19,
                        23
                    ]
                ]);
            })
        }
    ]);
    return $8768e97eec330fd4$export$774a0e74f4f3f461;
}($ewXA2.Model);
$8768e97eec330fd4$export$774a0e74f4f3f461._constructorName = 'Lst';

});
parcelRequire.register("byLkN", function(module, exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $86a79651cc295bac$var$runtime = function(exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {
    };
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({
        }, "");
    } catch (err1) {
        define = function define(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {
    };
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {
    };
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value1 = result.value;
                if (value1 && typeof value1 === "object" && hasOwn.call(value1, "__await")) return PromiseImpl.resolve(value1.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value1).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        this._invoke = enqueue;
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method always terminates the yield* loop.
            context.delegate = null;
            if (context.method === "throw") {
                // Note: ["return"] must be used for ES3 parsing compatibility.
                if (delegate.iterator["return"]) {
                    // If the delegate iterator has a return method, give it a
                    // chance to clean up.
                    context.method = "return";
                    context.arg = undefined;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                    // "return" to "throw", let that override the TypeError below.
                    return ContinueSentinel;
                }
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {
        };
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(object) {
        var keys = [];
        for(var key1 in object)keys.push(key1);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next1 = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next1.next = next1;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function stop() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function dispatchException(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function abrupt(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {
            };
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
"object" === "object" ? module.exports : {
});
try {
    regeneratorRuntime = $86a79651cc295bac$var$runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = $86a79651cc295bac$var$runtime;
    else Function("r", "regeneratorRuntime = r")($86a79651cc295bac$var$runtime);
}

});


parcelRequire.register("8Luon", function(module, exports) {

$parcel$export(module.exports, "Str", function () { return $661a49c576000ef1$export$ed61451db706e904; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $49kUR = parcelRequire("49kUR");

var $ewXA2 = parcelRequire("ewXA2");

var $aWMae = parcelRequire("aWMae");
var $661a49c576000ef1$export$ed61451db706e904 = /*#__PURE__*/ function(Obj) {
    "use strict";
    $kY4Jr.default($661a49c576000ef1$export$ed61451db706e904, Obj);
    var _super = $6hgBC.default($661a49c576000ef1$export$ed61451db706e904);
    function $661a49c576000ef1$export$ed61451db706e904() {
        var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
        $6NUET.default(this, $661a49c576000ef1$export$ed61451db706e904);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $661a49c576000ef1$export$ed61451db706e904._constructorName;
        _this._data = data.toString();
        return _this;
    }
    $ipX5G.default($661a49c576000ef1$export$ed61451db706e904, [
        {
            key: "length",
            get: function get() {
                return this._data.length;
            }
        },
        {
            // toggle presence of str in this
            key: "toggle",
            value: function toggle(str) {
                var space = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ' ';
                var i, l;
                l = this._data.split(space);
                i = l.indexOf(str);
                if (i < 0) l.push(str);
                else l.splice(i, 1);
                return this.set(l.join(' '));
            }
        },
        {
            // true if str is contained in this
            key: "contains",
            value: function contains(str) {
                return this._data.indexOf(str) >= 0;
            }
        },
        {
            key: "equals",
            value: function equals(str) {
                return str instanceof $ewXA2.Model ? this.toString() === str.toString() : this._data === str;
            }
        },
        {
            key: "toString",
            value: function toString() {
                return this._data;
            }
        },
        {
            key: "ends_with",
            value: function ends_with(str) {
                return this._data.endsWith(str);
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                return new $661a49c576000ef1$export$ed61451db706e904(this._data);
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                out.mod += "C ".concat(this._server_id, " ").concat(encodeURI(this._data), " ");
            }
        },
        {
            key: "_set",
            value: function _set() {
                var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
                var n = value.toString();
                if (this._data !== n) {
                    this._data = n;
                    return true;
                }
                return false;
            }
        },
        {
            key: "_get_state",
            value: function _get_state() {
                return encodeURI(this._data);
            }
        },
        {
            key: "_set_state",
            value: function _set_state(str, _map) {
                return this.set(decodeURIComponent(str));
            }
        }
    ]);
    return $661a49c576000ef1$export$ed61451db706e904;
}($aWMae.Obj);
$661a49c576000ef1$export$ed61451db706e904._constructorName = 'Str';

});

parcelRequire.register("5tGv8", function(module, exports) {

$parcel$export(module.exports, "Val", function () { return $3fd0a10d6e7e373b$export$38dfac6a73b2b45e; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $aWMae = parcelRequire("aWMae");
var $3fd0a10d6e7e373b$export$38dfac6a73b2b45e = /*#__PURE__*/ function(Obj) {
    "use strict";
    $kY4Jr.default($3fd0a10d6e7e373b$export$38dfac6a73b2b45e, Obj);
    var _super = $6hgBC.default($3fd0a10d6e7e373b$export$38dfac6a73b2b45e);
    function $3fd0a10d6e7e373b$export$38dfac6a73b2b45e() {
        var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        $6NUET.default(this, $3fd0a10d6e7e373b$export$38dfac6a73b2b45e);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $3fd0a10d6e7e373b$export$38dfac6a73b2b45e._constructorName;
        _this._set(data);
        return _this;
    }
    $ipX5G.default($3fd0a10d6e7e373b$export$38dfac6a73b2b45e, [
        {
            // toggle true / false ( 1 / 0 )
            key: "toggle",
            value: function toggle() {
                return this.set(!this._data);
            }
        },
        {
            key: "toBoolean",
            value: function toBoolean() {
                return Boolean(this._data);
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                return new $3fd0a10d6e7e373b$export$38dfac6a73b2b45e(this._data);
            }
        },
        {
            key: "add",
            value: function add(v) {
                if (v) {
                    this._data += v;
                    this._signal_change();
                }
            }
        },
        {
            // we do not take _set from Obj because we want a conversion if value is not a number
            key: "_set",
            value: function _set(value) {
                var n;
                if (typeof value === 'string' || typeof value === 'boolean') {
                    n = Number(value);
                    if (isNaN(n)) console.log("Don't know how to transform ".concat(value, " to a Val"));
                } else if (value instanceof $3fd0a10d6e7e373b$export$38dfac6a73b2b45e) n = value._data;
                else n = value;
                if (this._data !== n) {
                    this._data = n;
                    return true;
                }
                return false;
            }
        }
    ]);
    return $3fd0a10d6e7e373b$export$38dfac6a73b2b45e;
}($aWMae.Obj);
$3fd0a10d6e7e373b$export$38dfac6a73b2b45e._constructorName = 'Val';

});


parcelRequire.register("gH1uf", function(module, exports) {

$parcel$export(module.exports, "NewAlertMsg", function () { return $c271d0c4f53c5c1f$export$e6de3ff0fa45a019; });

var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $eUJNq = parcelRequire("eUJNq");

var $87r3g = parcelRequire("87r3g");
var $c271d0c4f53c5c1f$export$e6de3ff0fa45a019 = /*#__PURE__*/ function() {
    "use strict";
    function $c271d0c4f53c5c1f$export$e6de3ff0fa45a019() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        };
        $6NUET.default(this, $c271d0c4f53c5c1f$export$e6de3ff0fa45a019);
        this.params = params;
        this.hideBtn = this.hide_btn.bind(this);
        this.showBtn = this.show_btn.bind(this);
        this.createBackground();
        this.createPopup();
        this.createContent();
        this.createFooter();
    }
    $ipX5G.default($c271d0c4f53c5c1f$export$e6de3ff0fa45a019, [
        {
            key: "hide_btn",
            value: function hide_btn() {
                this.footer.style.display = 'none';
                this.img.style.display = 'inline';
            }
        },
        {
            key: "show_btn",
            value: function show_btn() {
                this.footer.style.display = 'block';
                this.img.style.display = 'none';
            }
        },
        {
            key: "hide",
            value: function hide() {
                this.background.style.display = 'none';
            }
        },
        {
            key: "show",
            value: function show() {
                this.background.style.display = 'block';
            }
        },
        {
            key: "setMsg",
            value: function setMsg(msg) {
                this.msg.innerHTML = msg;
            }
        },
        {
            key: "createBackground",
            value: function createBackground() {
                var _this = this;
                this.background = $87r3g.newDomElement({
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
                    onclick: function(evt) {
                        if (evt.target != _this.background) return;
                        if (evt.target !== _this.background) return;
                        if (typeof _this.params.onclose === 'function') _this.params.onclose();
                        // this.hide();
                        if (typeof evt.stopPropagation === 'function') evt.stopPropagation();
                        if (typeof evt.preventDefault === 'function') evt.preventDefault();
                        if (typeof evt.stopImmediatePropagation === 'function') evt.stopImmediatePropagation();
                        return false;
                    }
                });
                if (this.params.parent != null) this.params.parent.appendChild(this.background);
            }
        },
        {
            key: "createPopup",
            value: function createPopup() {
                this.popup = $87r3g.newDomElement({
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
        },
        {
            key: "createContent",
            value: function createContent() {
                var content = $87r3g.newDomElement({
                    style: {
                        width: '100%',
                        color: '#000',
                        position: 'relative',
                        padding: '15px',
                        fontSize: 'xx-large'
                    }
                });
                this.popup.appendChild(content);
                this.img = $87r3g.newDomElement({
                    nodeName: 'img',
                    src: $eUJNq.loadingGif,
                    style: {
                        height: '35px',
                        marginRight: '20px'
                    }
                });
                content.appendChild(this.img);
                this.msg = $87r3g.newDomElement({
                    nodeName: 'span'
                });
                content.appendChild(this.msg);
            }
        },
        {
            key: "createFooter",
            value: function createFooter() {
                this.footer = $87r3g.newDomElement({
                    style: {
                        width: '100%',
                        color: '#000',
                        position: 'relative',
                        padding: '15px',
                        height: '100px'
                    }
                });
                this.popup.appendChild(this.footer);
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = this.params.btn[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var btn = _step.value;
                        var d = $87r3g.newDomElement({
                            style: {
                                width: "".concat(100 / this.params.btn.length, "%"),
                                paddingRight: '5px',
                                paddingLeft: '5px',
                                float: 'left'
                            }
                        });
                        var b = $87r3g.newDomElement({
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
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally{
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    ]);
    return $c271d0c4f53c5c1f$export$e6de3ff0fa45a019;
}();
$c271d0c4f53c5c1f$export$e6de3ff0fa45a019._constructorName = 'NewAlertMsg';
globalThis.NewAlertMsg = $c271d0c4f53c5c1f$export$e6de3ff0fa45a019;
globalThis.new_alert_msg = $c271d0c4f53c5c1f$export$e6de3ff0fa45a019;

});
parcelRequire.register("eUJNq", function(module, exports) {

$parcel$export(module.exports, "loadingGif", function () { return $adb9d1d3d1113e33$export$8175ce17077f5db7; });
var $adb9d1d3d1113e33$export$8175ce17077f5db7 = 'data:image/gif;base64,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';

});

parcelRequire.register("87r3g", function(module, exports) {

$parcel$export(module.exports, "newDomElement", function () { return $5e93f610626b0bbd$export$a1b2c8d27e3b1729; });
function $5e93f610626b0bbd$export$a1b2c8d27e3b1729() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
    }, nodeName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 'div';
    var n = document.createElement(params.nodeName || nodeName);
    for(var name in params){
        var val = params[name];
        switch(name){
            case 'parentNode':
                val.appendChild(n);
                break;
            case 'nodeName':
                break;
            case 'style':
                for(var k in val)// @ts-ignore
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
globalThis.new_dom_element = $5e93f610626b0bbd$export$a1b2c8d27e3b1729;
globalThis.newDomElement = $5e93f610626b0bbd$export$a1b2c8d27e3b1729;

});


parcelRequire.register("a0sFt", function(module, exports) {

$parcel$export(module.exports, "getUrlPath", function () { return $7490245263b5ae5e$export$e947614430708c91; });

var $49kUR = parcelRequire("49kUR");
function $7490245263b5ae5e$export$e947614430708c91() {
    var searchQuery = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '';
    var path = '';
    if ($49kUR.FileSystem.CONNECTOR_TYPE === 'Node' || $49kUR.FileSystem.is_cordova) {
        path = "http://".concat($49kUR.FileSystem._url);
        if ($49kUR.FileSystem._port) path += ":".concat($49kUR.FileSystem._port);
        path += "".concat($49kUR.FileSystem.url_com).concat(searchQuery);
    } else if ($49kUR.FileSystem.CONNECTOR_TYPE === 'Browser') path = "".concat($49kUR.FileSystem.url_com).concat(searchQuery);
    return path;
}

});

parcelRequire.register("b1gn2", function(module, exports) {

$parcel$export(module.exports, "Directory", function () { return $805c7c92308e82c8$export$1dbf9926a0d54d98; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $bCMyP = parcelRequire("bCMyP");

var $1Tbu6 = parcelRequire("1Tbu6");

var $7hUTI = parcelRequire("7hUTI");
var $805c7c92308e82c8$export$1dbf9926a0d54d98 = /*#__PURE__*/ function(Lst) {
    "use strict";
    $kY4Jr.default($805c7c92308e82c8$export$1dbf9926a0d54d98, Lst);
    var _super = $6hgBC.default($805c7c92308e82c8$export$1dbf9926a0d54d98);
    function $805c7c92308e82c8$export$1dbf9926a0d54d98() {
        $6NUET.default(this, $805c7c92308e82c8$export$1dbf9926a0d54d98);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $805c7c92308e82c8$export$1dbf9926a0d54d98._constructorName;
        return _this;
    }
    $ipX5G.default($805c7c92308e82c8$export$1dbf9926a0d54d98, [
        {
            key: "base_",
            value: function base_() {
                return $1Tbu6.File;
            }
        },
        {
            key: "find",
            value: function find(name) {
                for(var i = 0; i < this.length; i++){
                    var file = this[i];
                    if (file.hasOwnProperty('name') && file.name.equals(name)) return file;
                }
                return undefined;
            }
        },
        {
            key: "load",
            value: function load(name, callback) {
                var f = this.find(name);
                if (f) f.load(callback);
                else callback(undefined, 'file does not exist');
            }
        },
        {
            key: "has",
            value: function has(name) {
                if (typeof name === 'string') {
                    for(var i = 0; i < this.length; i++){
                        var file = this[i];
                        if (file.name.equals(name)) return true;
                    }
                    return false;
                }
                for(var i1 = 0; i1 < this.length; i1++){
                    if (name(this[i1])) return true;
                }
                return false;
            }
        },
        {
            key: "add_file",
            value: function add_file(name, obj) {
                var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                };
                var f = this.find(name);
                if (f) return f;
                var res = new $1Tbu6.File(name, obj, params);
                this.push(res);
                return res;
            }
        },
        {
            key: "add_tiff_file",
            value: function add_tiff_file(name, obj, tiff_obj) {
                var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
                };
                var f = this.find(name);
                if (f) return f;
                var res = new $7hUTI.TiffFile(name, obj, tiff_obj, params);
                this.push(res);
                return res;
            }
        },
        {
            key: "force_add_file",
            value: function force_add_file(name, obj) {
                var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                };
                var num = 0;
                var filename = name;
                var f = this.find(filename);
                while(f){
                    filename = name + '_' + num;
                    f = this.find(filename);
                    if (f) num++;
                }
                var res = new $1Tbu6.File(filename, obj, params);
                this.push(res);
                return res;
            }
        },
        {
            key: "get_file_info",
            value: function get_file_info(info) {
                return info.icon = 'folder';
            }
        }
    ]);
    return $805c7c92308e82c8$export$1dbf9926a0d54d98;
}($bCMyP.Lst);
$805c7c92308e82c8$export$1dbf9926a0d54d98._constructorName = 'Directory';

});
parcelRequire.register("1Tbu6", function(module, exports) {

$parcel$export(module.exports, "File", function () { return $1603d61002a3dd7d$export$b6afa8811b7e644e; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $aFmUl = parcelRequire("aFmUl");

var $ewXA2 = parcelRequire("ewXA2");

var $jBejz = parcelRequire("jBejz");
var $1603d61002a3dd7d$export$b6afa8811b7e644e = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($1603d61002a3dd7d$export$b6afa8811b7e644e, Model);
    var _super = $6hgBC.default($1603d61002a3dd7d$export$b6afa8811b7e644e);
    function $1603d61002a3dd7d$export$b6afa8811b7e644e() {
        var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '', ptr_or_model = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, info = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        };
        $6NUET.default(this, $1603d61002a3dd7d$export$b6afa8811b7e644e);
        var _this;
        var _a;
        _this = _super.call(this);
        _this._constructorName = $1603d61002a3dd7d$export$b6afa8811b7e644e._constructorName;
        var cp_info = {
        };
        for(var key in info)cp_info[key] = info[key];
        if (ptr_or_model instanceof $ewXA2.Model) {
            if ('model_type' in cp_info) cp_info.model_type = $aFmUl.ModelProcessManager.get_object_class(ptr_or_model);
            (_a = ptr_or_model.get_file_info) === null || _a === void 0 || _a.call(ptr_or_model, cp_info);
        }
        _this.add_attr({
            name: name,
            _created_at: Date.now(),
            _ptr: new $jBejz.Ptr(ptr_or_model),
            _info: cp_info
        });
        return _this;
    }
    $ipX5G.default($1603d61002a3dd7d$export$b6afa8811b7e644e, [
        {
            key: "load",
            value: function load(callback) {
                return this._ptr.load(callback);
            }
        }
    ]);
    return $1603d61002a3dd7d$export$b6afa8811b7e644e;
}($ewXA2.Model);
$1603d61002a3dd7d$export$b6afa8811b7e644e._constructorName = 'File';

});
parcelRequire.register("jBejz", function(module, exports) {

$parcel$export(module.exports, "Ptr", function () { return $e44c939adbf83264$export$96d7e0bc5363b2c6; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $ewXA2 = parcelRequire("ewXA2");

var $49kUR = parcelRequire("49kUR");
var $e44c939adbf83264$export$96d7e0bc5363b2c6 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($e44c939adbf83264$export$96d7e0bc5363b2c6, Model);
    var _super = $6hgBC.default($e44c939adbf83264$export$96d7e0bc5363b2c6);
    function $e44c939adbf83264$export$96d7e0bc5363b2c6(model) {
        $6NUET.default(this, $e44c939adbf83264$export$96d7e0bc5363b2c6);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $e44c939adbf83264$export$96d7e0bc5363b2c6._constructorName;
        _this.data = {
        };
        _this._set(model);
        return _this;
    }
    $ipX5G.default($e44c939adbf83264$export$96d7e0bc5363b2c6, [
        {
            key: "load",
            value: function load(callback) {
                var _a;
                var ref;
                if (this.data.model != null) callback(this.data.model, false);
                else (_a = $49kUR.FileSystem.get_inst()) === null || _a === void 0 || _a.load_ptr(this.data.value, callback);
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                if (this.data.model != null) {
                    $49kUR.FileSystem.set_server_id_if_necessary(out, this.data.model);
                    out.mod += "C ".concat(this._server_id, " ").concat(this.data.model._server_id, " ");
                    this.data.value = this.data.model._server_id;
                    if (this.data.model._server_id & 3) $49kUR.FileSystem._ptr_to_update[this.data.model._server_id] = this;
                } else out.mod += "C ".concat(this._server_id, " ").concat(this.data.value, " ");
            }
        },
        {
            key: "_set",
            value: function _set(model) {
                var res;
                if (typeof model === 'number') {
                    res = this.data.value !== model;
                    this.data = {
                        value: model
                    };
                    return res;
                }
                if (model instanceof $ewXA2.Model) {
                    res = this.data.value !== model._server_id;
                    this.data = {
                        model: model,
                        value: model._server_id
                    };
                    return res;
                }
                return false;
            }
        },
        {
            key: "_get_state",
            value: function _get_state() {
                return this.data.toString();
            }
        },
        {
            key: "_set_state",
            value: function _set_state(str, _map) {
                return this.set(str);
            }
        }
    ]);
    return $e44c939adbf83264$export$96d7e0bc5363b2c6;
}($ewXA2.Model);
$e44c939adbf83264$export$96d7e0bc5363b2c6._constructorName = 'Ptr';

});


parcelRequire.register("7hUTI", function(module, exports) {

$parcel$export(module.exports, "TiffFile", function () { return $54e6419cedf8ae90$export$f26600b5cf417d1a; });

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");
var $bEpRD = parcelRequire("bEpRD");

var $1Tbu6 = parcelRequire("1Tbu6");

var $jBejz = parcelRequire("jBejz");
var $54e6419cedf8ae90$export$f26600b5cf417d1a = /*#__PURE__*/ function(File) {
    "use strict";
    $kY4Jr.default($54e6419cedf8ae90$export$f26600b5cf417d1a, File);
    var _super = $6hgBC.default($54e6419cedf8ae90$export$f26600b5cf417d1a);
    function $54e6419cedf8ae90$export$f26600b5cf417d1a() {
        var name = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : '', ptr_or_model = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, ptr_tiff = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, info = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
        };
        $6NUET.default(this, $54e6419cedf8ae90$export$f26600b5cf417d1a);
        var _this;
        _this = _super.call(this, name, ptr_or_model, info);
        _this._constructorName = $54e6419cedf8ae90$export$f26600b5cf417d1a._constructorName;
        _this.add_attr({
            _ptr_tiff: new $jBejz.Ptr(ptr_tiff),
            _has_been_converted: 0
        });
        return _this;
    }
    $ipX5G.default($54e6419cedf8ae90$export$f26600b5cf417d1a, [
        {
            key: "load_tiff",
            value: function load_tiff(callback) {
                this._ptr_tiff.load(callback);
            }
        }
    ]);
    return $54e6419cedf8ae90$export$f26600b5cf417d1a;
}($bEpRD.default($1Tbu6.File));
$54e6419cedf8ae90$export$f26600b5cf417d1a._constructorName = 'TiffFile';

});


parcelRequire.register("lM80H", function(module, exports) {
// shim for using process in browser
var $fda44b525f7c9b6d$var$process = module.exports = {
};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $fda44b525f7c9b6d$var$cachedSetTimeout;
var $fda44b525f7c9b6d$var$cachedClearTimeout;
function $fda44b525f7c9b6d$var$defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function $fda44b525f7c9b6d$var$defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function() {
    try {
        if (typeof setTimeout === 'function') $fda44b525f7c9b6d$var$cachedSetTimeout = setTimeout;
        else $fda44b525f7c9b6d$var$cachedSetTimeout = $fda44b525f7c9b6d$var$defaultSetTimout;
    } catch (e) {
        $fda44b525f7c9b6d$var$cachedSetTimeout = $fda44b525f7c9b6d$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') $fda44b525f7c9b6d$var$cachedClearTimeout = clearTimeout;
        else $fda44b525f7c9b6d$var$cachedClearTimeout = $fda44b525f7c9b6d$var$defaultClearTimeout;
    } catch (e1) {
        $fda44b525f7c9b6d$var$cachedClearTimeout = $fda44b525f7c9b6d$var$defaultClearTimeout;
    }
})();
function $fda44b525f7c9b6d$var$runTimeout(fun) {
    if ($fda44b525f7c9b6d$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($fda44b525f7c9b6d$var$cachedSetTimeout === $fda44b525f7c9b6d$var$defaultSetTimout || !$fda44b525f7c9b6d$var$cachedSetTimeout) && setTimeout) {
        $fda44b525f7c9b6d$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $fda44b525f7c9b6d$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $fda44b525f7c9b6d$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $fda44b525f7c9b6d$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $fda44b525f7c9b6d$var$runClearTimeout(marker) {
    if ($fda44b525f7c9b6d$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($fda44b525f7c9b6d$var$cachedClearTimeout === $fda44b525f7c9b6d$var$defaultClearTimeout || !$fda44b525f7c9b6d$var$cachedClearTimeout) && clearTimeout) {
        $fda44b525f7c9b6d$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $fda44b525f7c9b6d$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $fda44b525f7c9b6d$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $fda44b525f7c9b6d$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $fda44b525f7c9b6d$var$queue = [];
var $fda44b525f7c9b6d$var$draining = false;
var $fda44b525f7c9b6d$var$currentQueue;
var $fda44b525f7c9b6d$var$queueIndex = -1;
function $fda44b525f7c9b6d$var$cleanUpNextTick() {
    if (!$fda44b525f7c9b6d$var$draining || !$fda44b525f7c9b6d$var$currentQueue) return;
    $fda44b525f7c9b6d$var$draining = false;
    if ($fda44b525f7c9b6d$var$currentQueue.length) $fda44b525f7c9b6d$var$queue = $fda44b525f7c9b6d$var$currentQueue.concat($fda44b525f7c9b6d$var$queue);
    else $fda44b525f7c9b6d$var$queueIndex = -1;
    if ($fda44b525f7c9b6d$var$queue.length) $fda44b525f7c9b6d$var$drainQueue();
}
function $fda44b525f7c9b6d$var$drainQueue() {
    if ($fda44b525f7c9b6d$var$draining) return;
    var timeout = $fda44b525f7c9b6d$var$runTimeout($fda44b525f7c9b6d$var$cleanUpNextTick);
    $fda44b525f7c9b6d$var$draining = true;
    var len = $fda44b525f7c9b6d$var$queue.length;
    while(len){
        $fda44b525f7c9b6d$var$currentQueue = $fda44b525f7c9b6d$var$queue;
        $fda44b525f7c9b6d$var$queue = [];
        while(++$fda44b525f7c9b6d$var$queueIndex < len)if ($fda44b525f7c9b6d$var$currentQueue) $fda44b525f7c9b6d$var$currentQueue[$fda44b525f7c9b6d$var$queueIndex].run();
        $fda44b525f7c9b6d$var$queueIndex = -1;
        len = $fda44b525f7c9b6d$var$queue.length;
    }
    $fda44b525f7c9b6d$var$currentQueue = null;
    $fda44b525f7c9b6d$var$draining = false;
    $fda44b525f7c9b6d$var$runClearTimeout(timeout);
}
$fda44b525f7c9b6d$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $fda44b525f7c9b6d$var$queue.push(new $fda44b525f7c9b6d$var$Item(fun, args));
    if ($fda44b525f7c9b6d$var$queue.length === 1 && !$fda44b525f7c9b6d$var$draining) $fda44b525f7c9b6d$var$runTimeout($fda44b525f7c9b6d$var$drainQueue);
};
// v8 likes predictible objects
function $fda44b525f7c9b6d$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$fda44b525f7c9b6d$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$fda44b525f7c9b6d$var$process.title = 'browser';
$fda44b525f7c9b6d$var$process.browser = true;
$fda44b525f7c9b6d$var$process.env = {
};
$fda44b525f7c9b6d$var$process.argv = [];
$fda44b525f7c9b6d$var$process.version = ''; // empty string to avoid regexp issues
$fda44b525f7c9b6d$var$process.versions = {
};
function $fda44b525f7c9b6d$var$noop() {
}
$fda44b525f7c9b6d$var$process.on = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.addListener = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.once = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.off = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.removeListener = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.removeAllListeners = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.emit = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.prependListener = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.prependOnceListener = $fda44b525f7c9b6d$var$noop;
$fda44b525f7c9b6d$var$process.listeners = function(name) {
    return [];
};
$fda44b525f7c9b6d$var$process.binding = function(name) {
    throw new Error('process.binding is not supported');
};
$fda44b525f7c9b6d$var$process.cwd = function() {
    return '/';
};
$fda44b525f7c9b6d$var$process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
};
$fda44b525f7c9b6d$var$process.umask = function() {
    return 0;
};

});

parcelRequire.register("kZOiM", function(module, exports) {
module.exports = XMLHttpRequest;

});



var $49kUR = parcelRequire("49kUR");

var $b1gn2 = parcelRequire("b1gn2");

var $1Tbu6 = parcelRequire("1Tbu6");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");
var $3IVLz = parcelRequire("3IVLz");
var $2ttjm = parcelRequire("2ttjm");

var $ewXA2 = parcelRequire("ewXA2");

var $49kUR = parcelRequire("49kUR");
var $1d525ce230f54876$export$4b2950bdac9b6ee9 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($1d525ce230f54876$export$4b2950bdac9b6ee9, Model);
    var _super = $6hgBC.default($1d525ce230f54876$export$4b2950bdac9b6ee9);
    function $1d525ce230f54876$export$4b2950bdac9b6ee9(file) {
        $6NUET.default(this, $1d525ce230f54876$export$4b2950bdac9b6ee9);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $1d525ce230f54876$export$4b2950bdac9b6ee9._constructorName;
        _this.file = file;
        var size = _this.file != null ? _this.file.fileSize != null ? _this.file.fileSize : _this.file.size : 0;
        _this.add_attr({
            remaining: size,
            to_upload: size
        });
        return _this;
    }
    $ipX5G.default($1d525ce230f54876$export$4b2950bdac9b6ee9, [
        {
            key: "get_file_info",
            value: function get_file_info(info) {
                info.remaining = this.remaining;
                info.to_upload = this.to_upload;
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $3IVLz.default($2ttjm.default($1d525ce230f54876$export$4b2950bdac9b6ee9.prototype), "_get_fs_data", this).call(this, out);
                // permit to send the data after the server's answer
                if (this.file != null && this._server_id & 3) $49kUR.FileSystem._files_to_upload[this._server_id] = this;
            }
        }
    ]);
    return $1d525ce230f54876$export$4b2950bdac9b6ee9;
}($ewXA2.Model);
$1d525ce230f54876$export$4b2950bdac9b6ee9._constructorName = 'Path';



var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");

var $jBejz = parcelRequire("jBejz");
var $163cf69da2f2ac70$export$598ea37cc1e20dfa = /*#__PURE__*/ function(Ptr) {
    "use strict";
    $kY4Jr.default($163cf69da2f2ac70$export$598ea37cc1e20dfa, Ptr);
    var _super = $6hgBC.default($163cf69da2f2ac70$export$598ea37cc1e20dfa);
    function $163cf69da2f2ac70$export$598ea37cc1e20dfa(model) {
        $6NUET.default(this, $163cf69da2f2ac70$export$598ea37cc1e20dfa);
        var _this;
        _this = _super.call(this, model);
        _this._constructorName = $163cf69da2f2ac70$export$598ea37cc1e20dfa._constructorName;
        return _this;
    }
    return $163cf69da2f2ac70$export$598ea37cc1e20dfa;
}($jBejz.Ptr);
$163cf69da2f2ac70$export$598ea37cc1e20dfa._constructorName = 'Pbr';



var $jBejz = parcelRequire("jBejz");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");

var $bCMyP = parcelRequire("bCMyP");
var $1cdbfda5d2c13a79$export$86422d9fcaac5a78 = /*#__PURE__*/ function(Lst) {
    "use strict";
    $kY4Jr.default($1cdbfda5d2c13a79$export$86422d9fcaac5a78, Lst);
    var _super = $6hgBC.default($1cdbfda5d2c13a79$export$86422d9fcaac5a78);
    function $1cdbfda5d2c13a79$export$86422d9fcaac5a78() {
        $6NUET.default(this, $1cdbfda5d2c13a79$export$86422d9fcaac5a78);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $1cdbfda5d2c13a79$export$86422d9fcaac5a78._constructorName;
        return _this;
    }
    return $1cdbfda5d2c13a79$export$86422d9fcaac5a78;
}($bCMyP.Lst);
$1cdbfda5d2c13a79$export$86422d9fcaac5a78._constructorName = 'RightSetList';



var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");

var $bCMyP = parcelRequire("bCMyP");
var $6cf03572bf591c78$export$d4cfb3e939ea5c80 = /*#__PURE__*/ function(Lst) {
    "use strict";
    $kY4Jr.default($6cf03572bf591c78$export$d4cfb3e939ea5c80, Lst);
    var _super = $6hgBC.default($6cf03572bf591c78$export$d4cfb3e939ea5c80);
    function $6cf03572bf591c78$export$d4cfb3e939ea5c80() {
        $6NUET.default(this, $6cf03572bf591c78$export$d4cfb3e939ea5c80);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $6cf03572bf591c78$export$d4cfb3e939ea5c80._constructorName;
        return _this;
    }
    return $6cf03572bf591c78$export$d4cfb3e939ea5c80;
}($bCMyP.Lst);
$6cf03572bf591c78$export$d4cfb3e939ea5c80._constructorName = 'RightsItem';



var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");

var $ewXA2 = parcelRequire("ewXA2");
var $07828123262f4d07$export$d0f738c06f5e6fee = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($07828123262f4d07$export$d0f738c06f5e6fee, Model);
    var _super = $6hgBC.default($07828123262f4d07$export$d0f738c06f5e6fee);
    function $07828123262f4d07$export$d0f738c06f5e6fee() {
        $6NUET.default(this, $07828123262f4d07$export$d0f738c06f5e6fee);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $07828123262f4d07$export$d0f738c06f5e6fee._constructorName;
        return _this;
    }
    return $07828123262f4d07$export$d0f738c06f5e6fee;
}($ewXA2.Model);
$07828123262f4d07$export$d0f738c06f5e6fee._constructorName = 'SessionModel';



var $7hUTI = parcelRequire("7hUTI");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");

var $ewXA2 = parcelRequire("ewXA2");
var $39dbcd1ae426b88c$export$1f44aaf2ec115b54 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($39dbcd1ae426b88c$export$1f44aaf2ec115b54, Model);
    var _super = $6hgBC.default($39dbcd1ae426b88c$export$1f44aaf2ec115b54);
    function $39dbcd1ae426b88c$export$1f44aaf2ec115b54() {
        $6NUET.default(this, $39dbcd1ae426b88c$export$1f44aaf2ec115b54);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $39dbcd1ae426b88c$export$1f44aaf2ec115b54._constructorName;
        return _this;
    }
    return $39dbcd1ae426b88c$export$1f44aaf2ec115b54;
}($ewXA2.Model);
$39dbcd1ae426b88c$export$1f44aaf2ec115b54._constructorName = 'User';



var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $ewXA2 = parcelRequire("ewXA2");
var $d63a830741ddd5da$export$56864abfbf86ef48 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($d63a830741ddd5da$export$56864abfbf86ef48, Model);
    var _super = $6hgBC.default($d63a830741ddd5da$export$56864abfbf86ef48);
    function $d63a830741ddd5da$export$56864abfbf86ef48() {
        $6NUET.default(this, $d63a830741ddd5da$export$56864abfbf86ef48);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $d63a830741ddd5da$export$56864abfbf86ef48._constructorName;
        return _this;
    }
    $ipX5G.default($d63a830741ddd5da$export$56864abfbf86ef48, [
        {
            key: "set",
            value: function set() {
                console.log('Set a UserRight is not allowed.');
                return false;
            }
        }
    ]);
    return $d63a830741ddd5da$export$56864abfbf86ef48;
}($ewXA2.Model);
$d63a830741ddd5da$export$56864abfbf86ef48._constructorName = 'UserRight';





var $aFmUl = parcelRequire("aFmUl");

var $hV6WK = parcelRequire("hV6WK");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");
var $3IVLz = parcelRequire("3IVLz");
var $2ttjm = parcelRequire("2ttjm");

var $ewXA2 = parcelRequire("ewXA2");
var $184d0d116dbe2129$export$32a7462f6a06cbd5 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($184d0d116dbe2129$export$32a7462f6a06cbd5, Model);
    var _super = $6hgBC.default($184d0d116dbe2129$export$32a7462f6a06cbd5);
    function $184d0d116dbe2129$export$32a7462f6a06cbd5(InitIdx, stringChoises) {
        $6NUET.default(this, $184d0d116dbe2129$export$32a7462f6a06cbd5);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $184d0d116dbe2129$export$32a7462f6a06cbd5._constructorName;
        // default
        _this.add_attr({
            num: 0,
            lst: stringChoises
        });
        // init
        if (InitIdx != null) _this.num.set(InitIdx);
        return _this;
    }
    $ipX5G.default($184d0d116dbe2129$export$32a7462f6a06cbd5, [
        {
            key: "filter",
            value: function filter() {
                return true;
            }
        },
        {
            key: "item",
            value: function item() {
                return this.lst[this.num.get()];
            }
        },
        {
            key: "get",
            value: function get() {
                var _a;
                return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.get();
            }
        },
        {
            key: "toString",
            value: function toString() {
                var _a;
                return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.toString();
            }
        },
        {
            key: "equals",
            value: function equals(a) {
                if (a instanceof $184d0d116dbe2129$export$32a7462f6a06cbd5) return $3IVLz.default($2ttjm.default($184d0d116dbe2129$export$32a7462f6a06cbd5.prototype), "equals", this).call(this, a);
                else return this.item().equals(a);
            }
        },
        {
            key: "_set",
            value: function _set(value) {
                for(var idx = 0; idx < this.lst.length; idx++){
                    var itm = this.lst[idx];
                    if (itm.equals(value)) return this.num.set(idx);
                }
                return this.num.set(value);
            }
        }
    ]);
    return $184d0d116dbe2129$export$32a7462f6a06cbd5;
}($ewXA2.Model);
$184d0d116dbe2129$export$32a7462f6a06cbd5._constructorName = 'Choice';



var $bCMyP = parcelRequire("bCMyP");

var $ewXA2 = parcelRequire("ewXA2");

var $aWMae = parcelRequire("aWMae");

var $8Luon = parcelRequire("8Luon");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $49kUR = parcelRequire("49kUR");

var $ewXA2 = parcelRequire("ewXA2");
var $1e31d89422fc990d$export$914b3a8889b8a8a9 = /*#__PURE__*/ function(Model) {
    "use strict";
    $kY4Jr.default($1e31d89422fc990d$export$914b3a8889b8a8a9, Model);
    var _super = $6hgBC.default($1e31d89422fc990d$export$914b3a8889b8a8a9);
    function $1e31d89422fc990d$export$914b3a8889b8a8a9(size, data) {
        $6NUET.default(this, $1e31d89422fc990d$export$914b3a8889b8a8a9);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $1e31d89422fc990d$export$914b3a8889b8a8a9._constructorName;
        // size
        var tmpSize;
        if (size == null) tmpSize = [];
        if (typeof size === 'number') tmpSize = [
            size
        ];
        _this._size = tmpSize;
        // data
        if (data == null) {
            var B = _this.base_type();
            // @ts-ignore
            if (B) data = B.from(_this.nb_items());
        }
        // @ts-ignore
        _this._data = data;
        return _this;
    }
    $ipX5G.default($1e31d89422fc990d$export$914b3a8889b8a8a9, [
        {
            key: "base_type",
            value: function base_type() {
                return;
            }
        },
        {
            // -> to be defined by children
            key: "dim",
            value: function dim() {
                return this._size.length;
            }
        },
        {
            key: "size",
            value: function size(d) {
                if (d != null) return this._size[d];
                else return this._size;
            }
        },
        {
            key: "set_val",
            value: function set_val(index, value) {
                var idx = this._get_index(index);
                if (this._data[idx] !== value) {
                    this._data[idx] = value;
                    this._signal_change();
                }
            }
        },
        {
            key: "nb_items",
            value: function nb_items() {
                var total = this._size[0] || 0;
                for(var j = 1; j < this._size.length; j++)total *= this._size[j];
                return total;
            }
        },
        {
            key: "toString",
            value: function toString() {
                var m = 1;
                var res = '';
                var l = this._size.map(function(s) {
                    var o = m;
                    m *= s;
                    return o;
                });
                for(var i = 0; i < this._data.length; i++){
                    var data = this._data[i];
                    res += data;
                    for(var j = l.length - 1; j >= 0; j++)if (i % l[j] == l[j] - 1) {
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
        },
        {
            key: "equals",
            value: function equals(obj) {
                if (!(obj instanceof $1e31d89422fc990d$export$914b3a8889b8a8a9)) return this._data === obj;
                if (this._size.length !== obj._size.length) return false;
                var i = 0;
                var k = 0;
                for(; k < this._size.length; i = ++k){
                    if (this._size[i] !== obj._size[i]) return false;
                }
                return this._data === obj._data;
            }
        },
        {
            key: "get",
            value: function get(index) {
                if (typeof index !== 'undefined') return this._data[this._get_index(index)];
                return this._data;
            }
        },
        {
            key: "resize",
            value: function resize(new_size) {
                var total = 1;
                for(var i = 0; i < new_size.length; i++)total *= new_size[i];
                var BaseType = this.base_type();
                // @ts-ignore
                var instance = BaseType.from(total);
                instance.set(this._data);
                this._data = instance;
                this._size = new_size;
                this._signal_change();
            }
        },
        {
            key: "_set",
            value: function _set(str) {
                if (typeof str === 'string') {
                    // TODO optimize
                    this._set_state(str);
                    return true;
                }
                if (this._data !== str || this._size.length !== 1 || this._size[0] !== str.length) {
                    var baseType = this.base_type();
                    // @ts-ignore
                    this._data = baseType.from(str);
                    this._size = [
                        str.length
                    ];
                    return true;
                }
                return false;
            }
        },
        {
            key: "_get_index",
            value: function _get_index(index) {
                if (Array.isArray(index)) {
                    var o = 0;
                    var m = 1;
                    for(var i = 0; i < index.length; i++){
                        o += m * index[i];
                        m *= this._size[i];
                    }
                    return o;
                }
                return index;
            }
        },
        {
            key: "_get_fs_data",
            value: function _get_fs_data(out) {
                $49kUR.FileSystem.set_server_id_if_necessary(out, this);
                out.mod += "C ".concat(this._server_id, " ").concat(this._get_state(), " ");
            }
        },
        {
            key: "_get_state",
            value: function _get_state() {
                var res = this._size.length.toString(10);
                for(var i = 0; i < this._size.length; i++)res += ", ".concat(this._size[i]);
                for(var i1 = 0; i1 < this._data.length; i1++)res += ", ".concat(this._data[i1]);
                return res;
            }
        },
        {
            key: "_set_state",
            value: function _set_state(str) {
                var l = str.split(',');
                var s = parseInt(l[0]);
                var size = [];
                for(var i = 0; i < s; i++)size.push(parseInt(l[i + 1]));
                this._size = size;
                var baseType = this.base_type();
                var nbItems = this.nb_items();
                // @ts-ignore
                this._data = baseType.from(nbItems);
                for(var i2 = 0; i2 < nbItems; i2++)this._data[i2] = parseFloat(l[s + 1 + i2]);
            }
        }
    ]);
    return $1e31d89422fc990d$export$914b3a8889b8a8a9;
}($ewXA2.Model);
$1e31d89422fc990d$export$914b3a8889b8a8a9._constructorName = 'TypedArray';


var $e785f6a88eb23962$export$83502047e761f50b = /*#__PURE__*/ function(TypedArray) {
    "use strict";
    $kY4Jr.default($e785f6a88eb23962$export$83502047e761f50b, TypedArray);
    var _super = $6hgBC.default($e785f6a88eb23962$export$83502047e761f50b);
    function $e785f6a88eb23962$export$83502047e761f50b(size, data) {
        $6NUET.default(this, $e785f6a88eb23962$export$83502047e761f50b);
        var _this;
        _this = _super.call(this, size, data);
        _this._constructorName = $e785f6a88eb23962$export$83502047e761f50b._constructorName;
        return _this;
    }
    $ipX5G.default($e785f6a88eb23962$export$83502047e761f50b, [
        {
            key: "base_type",
            value: function base_type() {
                return $e785f6a88eb23962$export$83502047e761f50b;
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                return new $e785f6a88eb23962$export$83502047e761f50b(this._size, this._data);
            }
        }
    ]);
    return $e785f6a88eb23962$export$83502047e761f50b;
}($1e31d89422fc990d$export$914b3a8889b8a8a9);
$e785f6a88eb23962$export$83502047e761f50b._constructorName = 'TypedArray_Float64';



var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $976b86a262fac3aa$export$95edd4638367a48f = /*#__PURE__*/ function(TypedArray) {
    "use strict";
    $kY4Jr.default($976b86a262fac3aa$export$95edd4638367a48f, TypedArray);
    var _super = $6hgBC.default($976b86a262fac3aa$export$95edd4638367a48f);
    function $976b86a262fac3aa$export$95edd4638367a48f(size, data) {
        $6NUET.default(this, $976b86a262fac3aa$export$95edd4638367a48f);
        var _this;
        _this = _super.call(this, size, data);
        _this._constructorName = $976b86a262fac3aa$export$95edd4638367a48f._constructorName;
        return _this;
    }
    $ipX5G.default($976b86a262fac3aa$export$95edd4638367a48f, [
        {
            key: "base_type",
            value: function base_type() {
                return $976b86a262fac3aa$export$95edd4638367a48f;
            }
        },
        {
            key: "deep_copy",
            value: function deep_copy() {
                return new $976b86a262fac3aa$export$95edd4638367a48f(this._size, this._data);
            }
        }
    ]);
    return $976b86a262fac3aa$export$95edd4638367a48f;
}($1e31d89422fc990d$export$914b3a8889b8a8a9);
$976b86a262fac3aa$export$95edd4638367a48f._constructorName = 'TypedArray_Int32';



var $5tGv8 = parcelRequire("5tGv8");

var $kY4Jr = parcelRequire("kY4Jr");
var $6hgBC = parcelRequire("6hgBC");
var $6NUET = parcelRequire("6NUET");
var $ipX5G = parcelRequire("ipX5G");

var $bCMyP = parcelRequire("bCMyP");

var $5tGv8 = parcelRequire("5tGv8");
var $f4d2b94866a59f73$export$e947a0f742cf021e = /*#__PURE__*/ function(Lst) {
    "use strict";
    $kY4Jr.default($f4d2b94866a59f73$export$e947a0f742cf021e, Lst);
    var _super = $6hgBC.default($f4d2b94866a59f73$export$e947a0f742cf021e);
    function $f4d2b94866a59f73$export$e947a0f742cf021e() {
        $6NUET.default(this, $f4d2b94866a59f73$export$e947a0f742cf021e);
        var _this;
        _this = _super.call(this);
        _this._constructorName = $f4d2b94866a59f73$export$e947a0f742cf021e._constructorName;
        return _this;
    }
    $ipX5G.default($f4d2b94866a59f73$export$e947a0f742cf021e, [
        {
            key: "base_type",
            value: function base_type() {
                return $5tGv8.Val;
            }
        },
        {
            key: "_underlying_fs_type",
            value: function _underlying_fs_type() {
                return 'Lst';
            }
        }
    ]);
    return $f4d2b94866a59f73$export$e947a0f742cf021e;
}($bCMyP.Lst);
$f4d2b94866a59f73$export$e947a0f742cf021e._constructorName = 'Vec';



var $YWt7p = parcelRequire("YWt7p");

var $7E5bO = parcelRequire("7E5bO");

var $49kUR = parcelRequire("49kUR");

var $aFmUl = parcelRequire("aFmUl");
var $afa3dee2d685b29f$export$a34888876ba95657;
(function($afa3dee2d685b29f$export$a34888876ba95657) {
    $afa3dee2d685b29f$export$a34888876ba95657._def = $aFmUl.ModelProcessManager._def;
    $afa3dee2d685b29f$export$a34888876ba95657.version = '2.5.0';
    function connect(options) {
        var parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') parsedOpt.pathname += '/';
        $49kUR.FileSystem._home_dir = parsedOpt.pathname;
        $49kUR.FileSystem._url = parsedOpt.hostname;
        $49kUR.FileSystem._port = parsedOpt.port;
        if (parsedOpt.username) {
            $49kUR.FileSystem._userid = parsedOpt.username;
            if (parsedOpt.password) $49kUR.FileSystem._password = parsedOpt.password;
        } else {
            // set default user id
            $49kUR.FileSystem._userid = 644;
            $49kUR.FileSystem._password = '';
        }
        return new $49kUR.FileSystem();
    }
    $afa3dee2d685b29f$export$a34888876ba95657.connect = connect;
    // stores a model in the file system
    function store(fs, model, path, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function callback_error() {
            return console.log('Model could not be stored. You can pass a callback to handle this error.');
        };
        // Parse path
        var lst = path.split('/');
        var file_name = lst.pop();
        if (lst[0] === '') lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        return fs.load_or_make_dir($49kUR.FileSystem._home_dir + path, function(dir, err) {
            if (err) callback_error();
            else {
                var file = dir.detect(function(x) {
                    return x.name.get() === file_name;
                });
                if (file != null) dir.remove(file);
                dir.add_file(file_name, model, {
                    model_type: 'Model'
                });
                callback_success();
            }
        });
    }
    $afa3dee2d685b29f$export$a34888876ba95657.store = store;
    $afa3dee2d685b29f$export$a34888876ba95657.register_models = $aFmUl.ModelProcessManager.register_models;
    // loads a model from the file system
    function load(fs, path, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function callback_error() {
            return console.log('Model could not be loaded. You can pass a callback to handle this error.');
        };
        // Parse path
        var lst = path.split('/');
        var file_name = lst.pop();
        if (lst[0] === '') lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        return fs.load_or_make_dir("".concat($49kUR.FileSystem._home_dir).concat(path), function(current_dir, err1) {
            if (err1) return callback_error();
            else {
                var file = current_dir.detect(function(x) {
                    return x.name.get() === file_name;
                });
                if (file != null) return file.load(function(data, err) {
                    if (err) return callback_error();
                    else return callback_success(data);
                });
                else return callback_error();
            }
        });
    }
    $afa3dee2d685b29f$export$a34888876ba95657.load = load;
    // loads all the models of a specific type
    function load_type(fs, type, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function callback_error() {
            return console.log("Model of this type could not be loaded. You can pass a callback to handle this error.");
        };
        return fs.load_type(type, function(data, error) {
            if (!data || error) callback_error();
            else callback_success(data, error);
        });
    }
    $afa3dee2d685b29f$export$a34888876ba95657.load_type = load_type;
    function load_right(fs, ptr, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') callback_error = function callback_error() {
            return console.log("Model Right could not be loaded. You can pass a callback to handle this error.");
        };
        return fs.load_right(ptr, function(data, err) {
            if (err) return callback_error();
            else return callback_success(data, err);
        });
    }
    $afa3dee2d685b29f$export$a34888876ba95657.load_right = load_right;
    function share_model(fs, ptr, file_name, right_flag, targetName) {
        return fs.share_model(ptr, file_name, right_flag, targetName);
    }
    $afa3dee2d685b29f$export$a34888876ba95657.share_model = share_model;
    $afa3dee2d685b29f$export$a34888876ba95657.right_flag = {
        AD: 1,
        WR: 2,
        RD: 4
    };
    // "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
    function extend(child, parent) {
        return $49kUR.FileSystem.extend(child, parent);
    }
    $afa3dee2d685b29f$export$a34888876ba95657.extend = extend;
})($afa3dee2d685b29f$export$a34888876ba95657 || ($afa3dee2d685b29f$export$a34888876ba95657 = {
}));



var $aFmUl = parcelRequire("aFmUl");
function $b7a534087da39891$export$322c967aeb5c06d6(model) {
    var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : model._constructorName;
    globalThis[name] = model;
    $aFmUl.ModelProcessManager.spinal[name] = model;
    $aFmUl.ModelProcessManager.register_models(model, name);
}
function $b7a534087da39891$export$a4e9f07232169aad(obj, name) {
    globalThis[name] = obj;
    $aFmUl.ModelProcessManager.spinal[name] = obj;
}



var $49kUR = parcelRequire("49kUR");

var $b1gn2 = parcelRequire("b1gn2");

var $1Tbu6 = parcelRequire("1Tbu6");



var $jBejz = parcelRequire("jBejz");




var $7hUTI = parcelRequire("7hUTI");



























var $aFmUl = parcelRequire("aFmUl");

var $hV6WK = parcelRequire("hV6WK");


var $bCMyP = parcelRequire("bCMyP");

var $ewXA2 = parcelRequire("ewXA2");

var $aWMae = parcelRequire("aWMae");

var $8Luon = parcelRequire("8Luon");




var $5tGv8 = parcelRequire("5tGv8");


var $YWt7p = parcelRequire("YWt7p");

var $ewXA2 = parcelRequire("ewXA2");
function $9d80767f69d2c50d$export$2385a24977818dd0(model, func) {
    var onchange_construction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (model instanceof $ewXA2.Model) model.bind(func, onchange_construction);
    else {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = model[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var m = _step.value;
                return m.bind(func, onchange_construction);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
globalThis.bind = $9d80767f69d2c50d$export$2385a24977818dd0;



var $7E5bO = parcelRequire("7E5bO");

function $47fbf60805bd8d46$export$d2cf6cd1dc7067d3(obj, src) {
    if (typeof src === 'string') return $47fbf60805bd8d46$export$d2cf6cd1dc7067d3(obj, src.split(' '));
    var old = (obj.className || '').split(' ');
    var p_1 = src.filter(function(x) {
        return old.indexOf(x) < 0;
    });
    obj.className = old.concat(p_1).filter(function(x) {
        return x;
    }).join(' ');
}
globalThis.add_class = $47fbf60805bd8d46$export$d2cf6cd1dc7067d3;
globalThis.addClass = $47fbf60805bd8d46$export$d2cf6cd1dc7067d3;


function $eccaf773affd000d$export$da405662c16fca8e(l) {
    if (l.offsetParent != null) return l.offsetLeft + $eccaf773affd000d$export$da405662c16fca8e(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_left = $eccaf773affd000d$export$da405662c16fca8e;
globalThis.getLeft = $eccaf773affd000d$export$da405662c16fca8e;


function $d4d5a285636b69e7$export$449115d164fc37c3(l) {
    if (l.offsetParent != null) return l.offsetLeft + $d4d5a285636b69e7$export$449115d164fc37c3(l.offsetParent);
    else return l.offsetLeft;
}
globalThis.get_top = $d4d5a285636b69e7$export$449115d164fc37c3;
globalThis.getTop = $d4d5a285636b69e7$export$449115d164fc37c3;


parcelRequire("gH1uf");
function $bbc76ea59be36f6a$export$bf01a0cff267368f(obj, src) {
    if (typeof src === 'string') return $bbc76ea59be36f6a$export$bf01a0cff267368f(obj, src.split(' '));
    var old = (obj.className || '').split(' ');
    obj.className = old.filter(function(x) {
        return src.indexOf(x) < 0;
    }).join(' ');
}
globalThis.rem_class = $bbc76ea59be36f6a$export$bf01a0cff267368f;
globalThis.remClass = $bbc76ea59be36f6a$export$bf01a0cff267368f;



var $87r3g = parcelRequire("87r3g");
var $7e42ed1cc1677a3a$var$_index_current_popup = 10000;
function $7e42ed1cc1677a3a$export$4401ffb216812b56(title) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    };
    var b;
    var extention = 'px', width, height;
    if (params.popup_closer == null) b = $87r3g.newDomElement({
        parentNode: document.body,
        id: 'popup_closer',
        onmousedown: function onmousedown(_evt) {
            if (typeof params.onclose === 'function') params.onclose();
            document.body.removeChild(b);
            document.body.removeChild(w);
        },
        ondrop: function ondrop(evt) {
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
            zIndex: $7e42ed1cc1677a3a$var$_index_current_popup
        }
    });
    var clientX = params.event != null && params.event.clientX ? params.event.clientX : window.innerWidth / 2 - 10;
    var clientY = params.event != null && params.event.clientY ? params.event.clientY : window.innerHeight / 2 - 10;
    var top_x = params.top_x || -1000;
    var top_y = params.top_y || -1000;
    var old_x = 0;
    var old_y = 0;
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
    var w = $87r3g.newDomElement({
        parentNode: document.body,
        className: 'Popup',
        style: {
            position: 'absolute',
            left: top_x,
            top: top_y,
            width: width + extention,
            height: height + extention,
            zIndex: $7e42ed1cc1677a3a$var$_index_current_popup + 1,
            border: 'thin solid black',
            background: '#e5e5e5',
            resize: 'both',
            overflow: 'auto',
            paddingBottom: '8px'
        }
    });
    $7e42ed1cc1677a3a$var$_index_current_popup += 2;
    $87r3g.newDomElement({
        parentNode: w,
        className: 'PopupClose',
        txt: 'Close',
        style: {
            float: 'right',
            marginRight: '4px',
            marginTop: '4px',
            cursor: 'pointer'
        },
        onmousedown: function onmousedown(evt) {
            if (typeof params.onclose === 'function') params.onclose();
            if (b != null) document.body.removeChild(b);
            document.body.removeChild(w);
        }
    });
    if (title) $87r3g.newDomElement({
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
        onmousedown: function onmousedown(evt) {
            old_x = evt.clientX;
            old_y = evt.clientY;
            top_x = parseInt(w.style.left);
            top_y = parseInt(w.style.top);
            document.addEventListener('mousemove', _drag_evt_func, true);
            document.addEventListener('mouseup', _drag_end_func, true);
            return typeof evt.preventDefault === 'function' ? evt.preventDefault() : void 0;
        }
    });
    var res = $87r3g.newDomElement({
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
globalThis.spinal_new_popup = $7e42ed1cc1677a3a$export$4401ffb216812b56;
globalThis.spinalNewPopup = $7e42ed1cc1677a3a$export$4401ffb216812b56;




parcelRequire("a0sFt");
parcelRequire("cz7V3");

if (!('spinal' in globalThis)) globalThis.spinal = $aFmUl.ModelProcessManager.spinal;
$b7a534087da39891$export$a4e9f07232169aad($afa3dee2d685b29f$export$a34888876ba95657, 'spinalCore');
$b7a534087da39891$export$a4e9f07232169aad($49kUR.FileSystem, 'FileSystem');
$b7a534087da39891$export$a4e9f07232169aad($aFmUl.ModelProcessManager, 'ModelProcessManager');
$b7a534087da39891$export$a4e9f07232169aad($7E5bO.Process, 'Process');
$b7a534087da39891$export$a4e9f07232169aad($YWt7p.BindProcess, 'BindProcess');
$b7a534087da39891$export$322c967aeb5c06d6($ewXA2.Model, 'Model');
$b7a534087da39891$export$322c967aeb5c06d6($aWMae.Obj, 'Obj');
$b7a534087da39891$export$322c967aeb5c06d6($hV6WK.Bool, 'Bool');
$b7a534087da39891$export$322c967aeb5c06d6($5tGv8.Val, 'Val');
$b7a534087da39891$export$322c967aeb5c06d6($8Luon.Str, 'Str');
$b7a534087da39891$export$322c967aeb5c06d6($bCMyP.Lst, 'Lst');
$b7a534087da39891$export$322c967aeb5c06d6($f4d2b94866a59f73$export$e947a0f742cf021e, 'Vec');
$b7a534087da39891$export$322c967aeb5c06d6($184d0d116dbe2129$export$32a7462f6a06cbd5, 'Choice');
$b7a534087da39891$export$322c967aeb5c06d6($976b86a262fac3aa$export$95edd4638367a48f, 'TypedArray_Int32');
$b7a534087da39891$export$322c967aeb5c06d6($e785f6a88eb23962$export$83502047e761f50b, 'TypedArray_Float64');
$b7a534087da39891$export$322c967aeb5c06d6($b1gn2.Directory, 'Directory');
$b7a534087da39891$export$322c967aeb5c06d6($1Tbu6.File, 'File');
$b7a534087da39891$export$322c967aeb5c06d6($7hUTI.TiffFile, 'TiffFile');
$b7a534087da39891$export$322c967aeb5c06d6($1d525ce230f54876$export$4b2950bdac9b6ee9, 'Path');
$b7a534087da39891$export$322c967aeb5c06d6($jBejz.Ptr, 'Ptr');
$b7a534087da39891$export$322c967aeb5c06d6($163cf69da2f2ac70$export$598ea37cc1e20dfa, 'Pbr');
$b7a534087da39891$export$322c967aeb5c06d6($07828123262f4d07$export$d0f738c06f5e6fee, 'SessionModel');
$b7a534087da39891$export$322c967aeb5c06d6($39dbcd1ae426b88c$export$1f44aaf2ec115b54, 'User');
$b7a534087da39891$export$322c967aeb5c06d6($d63a830741ddd5da$export$56864abfbf86ef48, 'UserRight');
$b7a534087da39891$export$322c967aeb5c06d6($1cdbfda5d2c13a79$export$86422d9fcaac5a78, 'RightSetList');
$b7a534087da39891$export$322c967aeb5c06d6($6cf03572bf591c78$export$d4cfb3e939ea5c80, 'RightsItem');

})();
//# sourceMappingURL=index.js.map
