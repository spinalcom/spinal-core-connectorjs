"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const ModelProcessManager_1 = require("../ModelProcessManager");
const NewAlertMsg_1 = require("../Utils/DomHelper/NewAlertMsg");
const getUrlPath_1 = require("../Utils/getUrlPath");
const Directory_1 = require("./Models/Directory");
/**
 * intance of the connection to an server
 * @export
 * @class FileSystem
 */
class FileSystem {
    constructor({ url, port, home_dir, userid, password, sessionId, accessToken, }) {
        /**
         * @private
         * @type {string}
         * @memberof FileSystem
         */
        this._url = '127.0.0.1';
        /**
         * @private
         * @type {(string | number)}
         * @memberof FileSystem
         */
        this._port = '8888';
        /**
         * @private
         * @type {string}
         * @memberof FileSystem
         */
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
            if (userid != null) {
                this.send(`U ${userid} ${password} `);
            }
            this.send(`S ${this._num_inst} `);
        }
        else {
            FileSystem._insts[this._num_inst]._session_num = sessionId;
            FileSystem._insts[this._num_inst].make_channel();
        }
    }
    /**
     * @deprecated
     * @readonly
     * @static
     * @type {(string | number)}
     * @memberof FileSystem
     */
    static get _userid() {
        console.warn('Using FileSystem._userid is deprecated.');
        return 644;
    }
    load(path, callback) {
        if (typeof callback === 'undefined') {
            return new Promise((resolve, reject) => {
                FileSystem._send_chan();
                this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
                FileSystem._callbacks[FileSystem._nb_callbacks] = (model, isError) => {
                    if (!model || isError)
                        reject(new Error('Error Load'));
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
    load_type(type, callback) {
        FileSystem._send_chan();
        this.send(`R 0 ${type} `);
        FileSystem._type_callbacks.push([type, callback]);
    }
    load_or_make_dirProm(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.load(dir);
                return res;
            }
            catch (error) {
                if (dir === '/')
                    throw error;
                const lst = dir
                    .split('/')
                    .reduce((acc, v) => {
                    if (v.length)
                        acc.push(v);
                    return acc;
                }, []);
                const nir = lst.pop();
                const oir = '/' + lst.join('/');
                try {
                    const n_res = yield this.load_or_make_dirProm(oir);
                    const n_dir = new Directory_1.Directory();
                    n_res.add_file(nir, n_dir);
                    return n_dir;
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
    load_or_make_dir(dir, callback) {
        if (typeof callback === 'undefined')
            return this.load_or_make_dirProm(dir);
        this.load(dir, (res, err) => {
            if (err) {
                if (dir === '/') {
                    return callback(null, err);
                }
                else {
                    const lst = dir
                        .split('/')
                        .reduce((acc, v) => {
                        if (v.length)
                            acc.push(v);
                        return acc;
                    }, []);
                    const nir = lst.pop();
                    const oir = '/' + lst.join('/');
                    this.load_or_make_dir(oir, (n_res, n_err) => {
                        if (n_err) {
                            return callback(null, n_err);
                        }
                        else {
                            const n_dir = new Directory_1.Directory();
                            n_res.add_file(nir, n_dir);
                            return callback(n_dir, n_err);
                        }
                    });
                }
            }
            else {
                return callback(res, err);
            }
        });
    }
    load_ptr(ptr, callback) {
        if (typeof callback === 'undefined') {
            if (!ptr)
                return Promise.reject('Error Load ptr');
            if (typeof FileSystem._objects[ptr] !== 'undefined') {
                return Promise.resolve(FileSystem._objects[ptr]);
            }
            return new Promise((resolve, reject) => {
                FileSystem._send_chan();
                this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
                FileSystem._callbacks[FileSystem._nb_callbacks] = (model, isError) => {
                    if (!model || isError)
                        reject(new Error('Error Load ptr'));
                    resolve(model);
                };
                FileSystem._nb_callbacks++;
            });
        }
        if (!ptr)
            setImmediate(() => callback(undefined));
        else if (typeof FileSystem._objects[ptr] !== 'undefined') {
            setImmediate(() => callback(FileSystem._objects[ptr]));
        }
        else {
            FileSystem._send_chan();
            this.send(`l ${FileSystem._nb_callbacks} ${ptr} `);
            FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
            FileSystem._nb_callbacks++;
        }
    }
    load_right(ptr, callback) {
        if (typeof callback === 'undefined') {
            return new Promise((resolve, reject) => {
                FileSystem._send_chan();
                this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
                FileSystem._callbacks[FileSystem._nb_callbacks] = (model) => {
                    if (!model)
                        reject(new Error('Error load_right'));
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
    share_model(ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        this.send(`h ${typeof ptr === 'number' ? ptr : ptr._server_id} ${share_type} ${encodeURI(targetName)} ${encodeURI(file_name)} `);
    }
    /**
     * explicitly send a command
     * @private
     * @param {string} data
     * @memberof FileSystem
     */
    send(data) {
        this._data_to_send += data;
        if (FileSystem._timer_send == null) {
            FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
        }
    }
    /**
     * send a request for a "push" channel
     * @private
     * @memberof FileSystem
     */
    make_channel() {
        const fs = FileSystem.get_inst();
        let path = (0, getUrlPath_1.getUrlPath)(fs._url, fs._port, `?s=${this._session_num}`);
        const xhr_object = FileSystem._my_xml_http_request();
        if (fs._accessToken)
            xhr_object.setRequestHeader('x-access-token', fs._accessToken);
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (fs.make_channel_error_timer !== 0) {
                    FileSystem.onConnectionError(0);
                }
                fs.make_channel_error_timer = 0;
                if (FileSystem._disp) {
                    console.log('chan ->', this.responseText);
                }
                const created = [];
                function _w(sid, obj) {
                    const _obj = FileSystem._create_model_by_name(obj);
                    if (sid != null && _obj != null) {
                        _obj._server_id = sid;
                        FileSystem._objects[sid] = _obj;
                        for (const [type, cb] of FileSystem._type_callbacks) {
                            // @ts-ignore
                            const mod_R = ModelProcessManager_1.ModelProcessManager._def[type] ||
                                ModelProcessManager_1.ModelProcessManager.spinal[type];
                            if (_obj instanceof mod_R) {
                                created.push({ cb, _obj });
                            }
                        }
                    }
                }
                FileSystem._sig_server = false;
                eval(this.responseText);
                FileSystem._sig_server = true;
                for (const { cb, _obj } of created)
                    cb(_obj);
            }
            else if (this.readyState === 4 && this.status === 0) {
                console.error(`Disconnected from the server with request : ${path}.`);
                if (fs.make_channel_error_timer === 0) {
                    //first disconnect
                    console.log('Trying to reconnect.');
                    fs.make_channel_error_timer = Date.now();
                    setTimeout(fs.make_channel.bind(fs), 1000);
                    return FileSystem.onConnectionError(1);
                }
                else if (Date.now() - fs.make_channel_error_timer <
                    FileSystem._timeout_reconnect) {
                    // under timeout
                    setTimeout(fs.make_channel.bind(fs), 1000); // timeout reached
                }
                else {
                    return FileSystem.onConnectionError(2);
                }
            }
            else if (this.readyState === 4 && this.status === 500) {
                FileSystem.onConnectionError(3);
            }
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
     */
    static _onConnectionError(error_code) {
        let msg = '';
        if (error_code === 0) {
            // Error resolved
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
                FileSystem.popup.hide();
            }
            else {
                console.log('Reconnected to the server.');
            }
        }
        else if (error_code === 1) {
            // 1st disconnection
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
                msg = 'Disconnected from the server, trying to reconnect...';
            }
            else {
                console.error('Disconnected from the server, trying to reconnect...');
            }
        }
        else if (error_code === 2 || error_code === 3 || error_code === 4) {
            if (FileSystem.CONNECTOR_TYPE === 'Browser' || FileSystem.is_cordova) {
                msg = 'Disconnected from the server, please refresh the window.';
            }
            else if (FileSystem.CONNECTOR_TYPE === 'Node') {
                console.error('Disconnected from the server.');
                process.exit();
            }
            else {
                console.error('Disconnected from the server.');
            }
        }
        if (msg !== '') {
            if (typeof FileSystem.popup === 'undefined') {
                FileSystem.popup = new NewAlertMsg_1.NewAlertMsg({
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
            }
            else {
                FileSystem.popup.show();
            }
            if (error_code === 2 || error_code === 3 || error_code === 4) {
                FileSystem.popup.show_btn();
            }
            else {
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
    static get_inst() {
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
    static set_server_id_if_necessary(out, obj) {
        if (obj._server_id == null) {
            // registering
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            // new object
            let ncl = ModelProcessManager_1.ModelProcessManager.get_object_class(obj);
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
    static signal_change(m) {
        if (FileSystem._sig_server) {
            FileSystem._objects_to_send[m.model_id] = m;
            if (FileSystem._timer_chan != null) {
                clearTimeout(FileSystem._timer_chan);
            }
            FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
        }
    }
    /**
     * @static
     * @param {number} tmp_id
     * @param {number} res
     * @return {*}  {void}
     * @memberof FileSystem
     */
    static _tmp_id_to_real(tmp_id, res) {
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
            let path = (0, getUrlPath_1.getUrlPath)(fs._url, fs._port, `?s=${fs._session_num}&p=${tmp._server_id}`);
            const xhr_object = FileSystem._my_xml_http_request();
            if (fs._accessToken)
                xhr_object.setRequestHeader('x-access-token', fs._accessToken);
            xhr_object.open('PUT', path, true);
            xhr_object.onreadystatechange = function () {
                let _w;
                if (this.readyState === 4 && this.status === 200) {
                    _w = function (sid, obj) {
                        const _obj = FileSystem._create_model_by_name(obj);
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
    static _create_model_by_name(name) {
        if (typeof name !== 'string') {
            return name; // for old spinalcore version
        }
        if (typeof ModelProcessManager_1.ModelProcessManager._def[name] !== 'undefined') {
            return new ModelProcessManager_1.ModelProcessManager._def[name]();
        }
        if (typeof ModelProcessManager_1.ModelProcessManager.spinal[name] === 'undefined') {
            if (FileSystem.debug === true) {
                console.warn(`Got Model type \"${name}\" from hub but not registered.`);
            }
            ModelProcessManager_1.ModelProcessManager._def[name] = new Function(`return class ${name} extends ModelProcessManager._def[\"Model\"] {}`)();
            return new ModelProcessManager_1.ModelProcessManager._def[name]();
        }
    }
    /**
     * @deprecated
     * @static
     * @param {*} _child
     * @param {*} _parent
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static extend(_child, _parent) {
        throw 'FileSystem.extend is a legacy function, do not use';
    }
    /**
     * @private
     * @static
     * @return {*}  {number}
     * @memberof FileSystem
     */
    static _get_new_tmp_server_id() {
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
    static _send_chan() {
        const out = FileSystem._get_chan_data();
        for (const f in FileSystem._insts) {
            FileSystem._insts[f].send(out);
        }
    }
    /**
     * timeout for at least one changed object
     * @private
     * @static
     * @memberof FileSystem
     */
    static _timeout_chan_func() {
        FileSystem._send_chan();
        delete FileSystem._timer_chan;
    }
    /**
     * get data of objects to send
     * @private
     * @static
     * @return {*}  {string}
     * @memberof FileSystem
     */
    static _get_chan_data() {
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
    /**
     * @private
     * @static
     * @memberof FileSystem
     */
    static _timeout_send_func() {
        // if some model have changed, we have to send the changes now
        const out = FileSystem._get_chan_data();
        for (const k in FileSystem._insts) {
            FileSystem._insts[k]._data_to_send += out;
        }
        // send data
        for (const k in FileSystem._insts) {
            const fs = FileSystem._insts[k];
            if (!fs._data_to_send.length || fs._session_num === -1)
                continue;
            // (@responseText will contain another call to @_timeout_send with the session id)
            // for first call, do not add the session id (but say that we are waiting for one)
            if (fs._session_num === -2) {
                fs._session_num = -1;
            }
            else {
                fs._data_to_send = `s ${fs._session_num} ${fs._data_to_send}`;
            }
            // request
            let path = (0, getUrlPath_1.getUrlPath)(fs._url, fs._port);
            const xhr_object = FileSystem._my_xml_http_request();
            if (fs._accessToken)
                xhr_object.setRequestHeader('x-access-token', fs._accessToken);
            xhr_object.open('POST', path, true);
            xhr_object.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    if (FileSystem._disp) {
                        console.log('resp ->', this.responseText);
                    }
                    const _c = []; // callbacks
                    const created = [];
                    function _w(sid, obj) {
                        const _obj = FileSystem._create_model_by_name(obj);
                        if (sid != null && _obj != null) {
                            _obj._server_id = sid;
                            FileSystem._objects[sid] = _obj;
                            for (const [type, cb] of FileSystem._type_callbacks) {
                                const mod_R = ModelProcessManager_1.ModelProcessManager.spinal[type] ||
                                    ModelProcessManager_1.ModelProcessManager._def[type];
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
                }
                else if (this.readyState === 4 &&
                    (this.status === 0 || this.status === 500)) {
                    return FileSystem.onConnectionError(4);
                }
            };
            if (FileSystem._disp) {
                console.log('sent ->', fs._data_to_send + 'E ');
            }
            xhr_object.setRequestHeader('Content-Type', 'text/plain');
            xhr_object.send(fs._data_to_send + 'E ');
            fs._data_to_send = '';
        }
        FileSystem._objects_to_send = {};
        delete FileSystem._timer_send;
    }
    /**
     * @static
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static _my_xml_http_request() {
        if (FileSystem.CONNECTOR_TYPE === 'Browser') {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            if (window.ActiveXObject) {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
            return alert('Your browser does not seem to support XMLHTTPRequest objects...');
        }
        else if (FileSystem.CONNECTOR_TYPE === 'Node') {
            return new FileSystem._XMLHttpRequest();
        }
        else {
            console.error('you must define CONNECTOR_TYPE');
        }
    }
}
exports.FileSystem = FileSystem;
FileSystem._constructorName = 'FileSystem';
// when object are saved, their _server_id is assigned to a tmp value
/**
 *  set to true to get warning for creating unknown Model type
 * @static
 * @type {boolean}
 * @memberof FileSystem
 */
FileSystem.debug = false;
/**
 * if true, print the IO with the server
 * @static
 * @type {boolean}
 * @memberof FileSystem
 */
FileSystem._disp = false;
/**
 * @private
 * @static
 * @type {NewAlertMsg}
 * @memberof FileSystem
 */
FileSystem.popup = undefined;
/**
 * @private
 * @static
 * @type {number}
 * @memberof FileSystem
 */
FileSystem._cur_tmp_server_id = 0;
/**
 * if true, eval server response.
 * @static
 * @type {boolean}
 * @memberof FileSystem
 */
FileSystem._sig_server = true; // if changes has to be sent
/**
 * @static
 * @type {number}
 * @memberof FileSystem
 */
FileSystem._timeout_reconnect = 30000;
/**
 * @static
 * @type {boolean}
 * @memberof FileSystem
 */
FileSystem.is_cordova = typeof document !== 'undefined'
    ? document.URL.indexOf('http://') == -1 &&
        document.URL.indexOf('https://') == -1
    : false;
/**
 * data are sent after a timeout (and are concatened before)
 * @static
 * @type {{ [serverId: number]: Model }}
 * @memberof FileSystem
 */
FileSystem._objects_to_send = {};
/**
 * @static
 * @type {ReturnType<typeof setTimeout>}
 * @memberof FileSystem
 */
FileSystem._timer_send = undefined;
/**
 * @static
 * @type {ReturnType<typeof setTimeout>}
 * @memberof FileSystem
 */
FileSystem._timer_chan = undefined;
/**
 * functions to be called after an answer
 * @static
 * @type {number}
 * @memberof FileSystem
 */
FileSystem._nb_callbacks = 0;
/**
 * @static
 * @type {{ [id: number]: SpinalLoadCallBack<Model> }}
 * @memberof FileSystem
 */
FileSystem._callbacks = {};
/**
 * @static
 * @type {[string, SpinalLoadCallBack<Model>][]}
 * @memberof FileSystem
 */
FileSystem._type_callbacks = []; // list of callbacks associated to a type: [ [ "type", function ], ... ]
/**
 * number of instances of FileSystem
 * @private
 * @static
 * @type {number}
 * @memberof FileSystem
 */
FileSystem._nb_insts = 0;
/**
 * @private
 * @static
 * @type {{ [idInstance: number]: FileSystem }}
 * @memberof FileSystem
 */
FileSystem._insts = {};
/**
 * ref to Path waiting to be registered before sending data
 * @static
 * @type {{ [key: number]: Path }}
 * @memberof FileSystem
 */
FileSystem._files_to_upload = {};
/**
 * Ptr objects that need an update, associated with FileSystem_tmp_objects
 * @static
 * @type {{ [key: number]: Model }}
 * @memberof FileSystem
 */
FileSystem._ptr_to_update = {};
/**
 * objects waiting for a real _server_id
 * @static
 * @type {{ [key: number]: Model }}
 * @memberof FileSystem
 */
FileSystem._tmp_objects = {};
/**
 * _server_id -> object
 * @static
 * @type {{ [key: number]: Model }}
 * @memberof FileSystem
 */
FileSystem._objects = {};
/**
 * @static
 * @type {string}
 * @memberof FileSystem
 */
FileSystem.url_com = '/sceen/_';
/**
 * @static
 * @type {string}
 * @memberof FileSystem
 */
FileSystem.url_upload = '/sceen/upload';
/**
 * conector type : Browser or Node
 * @static
 * @type {('Node' | 'Browser')}
 * @memberof FileSystem
 */
FileSystem.CONNECTOR_TYPE = typeof globalThis.global != 'undefined' ? 'Node' : 'Browser';
/**
 * to be refedifined to change the handleing for connections error
 * @static
 * @memberof FileSystem
 */
FileSystem.onConnectionError = FileSystem._onConnectionError;
//# sourceMappingURL=FileSystem.js.map