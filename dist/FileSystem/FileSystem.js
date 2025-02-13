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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.FileSystem = void 0;
var ModelProcessManager_1 = require("../ModelProcessManager");
var NewAlertMsg_1 = require("../Utils/DomHelper/NewAlertMsg");
var getUrlPath_1 = require("../Utils/getUrlPath");
var waitTimeout_1 = require("../Utils/waitTimeout");
var Directory_1 = require("./Models/Directory");
var axios_1 = require("axios");
var SpinalEventEmitter_1 = require("../Utils/SpinalEventEmitter");
var debounce = require("lodash.debounce");
var EventConnectorJS;
(function (EventConnectorJS) {
    EventConnectorJS["SEND_RESPONSE_END"] = "spinalhub:send:response:end";
    EventConnectorJS["SUBCRIBE_RESPONSE_END"] = "spinalhub:subscribe:response:end";
})(EventConnectorJS || (EventConnectorJS = {}));
/**
 * intance of the connection to an server
 * @export
 * @class FileSystem
 */
var FileSystem = /** @class */ (function () {
    function FileSystem(_a) {
        var protocol = _a.protocol, url = _a.url, port = _a.port, home_dir = _a.home_dir, userid = _a.userid, password = _a.password, sessionId = _a.sessionId, accessToken = _a.accessToken;
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
        this._protocol = protocol ? protocol : 'http:';
        this._url = url;
        this._port = port;
        this._home_dir = home_dir;
        if (typeof accessToken === 'string') {
            var _accessToken = accessToken.startsWith('Bearer ')
                ? accessToken
                : "Bearer ".concat(accessToken);
            this._accessToken = _accessToken;
        }
        this._num_inst = FileSystem._nb_insts++;
        // register this in FileSystem instances
        FileSystem._insts[this._num_inst] = this;
        // first, we need a session id fom the server
        if (!sessionId) {
            if (userid != null) {
                this.send("U ".concat(userid, " ").concat(password, " "));
            }
            this.send("S ".concat(this._num_inst, " "));
        }
        else {
            FileSystem._insts[this._num_inst]._session_num = sessionId;
        }
        this._axiosInst = axios_1["default"].create({
            headers: {
                authorization: this._accessToken
            }
        });
        this.make_channel_loop();
    }
    FileSystem.prototype.load = function (path, callback) {
        var _this = this;
        if (typeof callback === 'undefined') {
            return new Promise(function (resolve, reject) {
                FileSystem._send_chan();
                _this.send("L ".concat(FileSystem._nb_callbacks, " ").concat(encodeURI(path), " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = function (model, isError) {
                    if (!model || isError)
                        reject(new Error('Error Load'));
                    resolve(model);
                };
                FileSystem._nb_callbacks++;
            });
        }
        FileSystem._send_chan();
        this.send("L ".concat(FileSystem._nb_callbacks, " ").concat(encodeURI(path), " "));
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    };
    /**
     * load all the objects of $type
     * @template T
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    FileSystem.prototype.load_type = function (type, callback) {
        FileSystem._send_chan();
        this.send("R 0 ".concat(type, " "));
        FileSystem._type_callbacks.push([type, callback]);
    };
    FileSystem.prototype.load_or_make_dirProm = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1, lst, nir, oir, n_res, n_dir, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 7]);
                        return [4 /*yield*/, this.load(dir)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_1 = _a.sent();
                        if (dir === '/')
                            throw error_1;
                        lst = dir
                            .split('/')
                            .reduce(function (acc, v) {
                            if (v.length)
                                acc.push(v);
                            return acc;
                        }, []);
                        nir = lst.pop();
                        oir = '/' + lst.join('/');
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.load_or_make_dirProm(oir)];
                    case 4:
                        n_res = _a.sent();
                        n_dir = new Directory_1.Directory();
                        n_res.add_file(nir, n_dir);
                        return [2 /*return*/, n_dir];
                    case 5:
                        error_2 = _a.sent();
                        throw error_2;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem.prototype.load_or_make_dir = function (dir, callback) {
        var _this = this;
        if (typeof callback === 'undefined')
            return this.load_or_make_dirProm(dir);
        this.load(dir, function (res, err) {
            if (err) {
                if (dir === '/') {
                    return callback(null, err);
                }
                else {
                    var lst = dir
                        .split('/')
                        .reduce(function (acc, v) {
                        if (v.length)
                            acc.push(v);
                        return acc;
                    }, []);
                    var nir_1 = lst.pop();
                    var oir = '/' + lst.join('/');
                    _this.load_or_make_dir(oir, function (n_res, n_err) {
                        if (n_err) {
                            return callback(null, n_err);
                        }
                        else {
                            var n_dir = new Directory_1.Directory();
                            n_res.add_file(nir_1, n_dir);
                            return callback(n_dir, n_err);
                        }
                    });
                }
            }
            else {
                return callback(res, err);
            }
        });
    };
    FileSystem.prototype.load_ptr = function (ptr, callback) {
        var _this = this;
        if (typeof callback === 'undefined') {
            if (!ptr)
                return Promise.reject('Error Load ptr');
            if (typeof FileSystem._objects[ptr] !== 'undefined') {
                return Promise.resolve(FileSystem._objects[ptr]);
            }
            return new Promise(function (resolve, reject) {
                FileSystem._send_chan();
                _this.send("l ".concat(FileSystem._nb_callbacks, " ").concat(ptr, " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = function (model, isError) {
                    if (!model || isError)
                        reject(new Error('Error Load ptr'));
                    resolve(model);
                };
                FileSystem._nb_callbacks++;
            });
        }
        if (!ptr)
            setImmediate(function () { return callback(undefined); });
        else if (typeof FileSystem._objects[ptr] !== 'undefined') {
            setImmediate(function () { return callback(FileSystem._objects[ptr]); });
        }
        else {
            FileSystem._send_chan();
            this.send("l ".concat(FileSystem._nb_callbacks, " ").concat(ptr, " "));
            FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
            FileSystem._nb_callbacks++;
        }
    };
    FileSystem.prototype.load_right = function (ptr, callback) {
        var _this = this;
        if (typeof callback === 'undefined') {
            return new Promise(function (resolve, reject) {
                FileSystem._send_chan();
                _this.send("r ".concat(ptr, " ").concat(FileSystem._nb_callbacks, " "));
                FileSystem._callbacks[FileSystem._nb_callbacks] = function (model) {
                    if (!model)
                        reject(new Error('Error load_right'));
                    resolve(model);
                };
                FileSystem._nb_callbacks++;
            });
        }
        FileSystem._send_chan();
        this.send("r ".concat(ptr, " ").concat(FileSystem._nb_callbacks, " "));
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    };
    /**
     * @param {(Model | number)} ptr
     * @param {string} file_name
     * @param {number} share_type
     * @param {string} targetName
     * @memberof FileSystem
     */
    FileSystem.prototype.share_model = function (ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        this.send("h ".concat(typeof ptr === 'number' ? ptr : ptr._server_id, " ").concat(share_type, " ").concat(encodeURI(targetName), " ").concat(encodeURI(file_name), " "));
    };
    /**
     * explicitly send a command
     * @private
     * @param {string} data
     * @memberof FileSystem
     */
    FileSystem.prototype.send = function (data) {
        this._data_to_send += data;
        FileSystem._send_data_to_hub_debounced();
    };
    /**
     * debounced function to send data to the server
     * @private
     * @static
     * @return {*}
     * @memberof FileSystem
     */
    FileSystem._send_data_to_hub_func = function () {
        return __awaiter(this, void 0, void 0, function () {
            var map_prom, k, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (FileSystem._sending_data === true) {
                            FileSystem._send_data_to_hub_debounced();
                            return [2 /*return*/];
                        }
                        map_prom = [];
                        for (k in FileSystem._insts) {
                            map_prom.push(FileSystem._insts[k]._send_data_to_hub_instance());
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all(map_prom)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, FileSystem.onConnectionError(4)];
                    case 4:
                        FileSystem._sending_data = false;
                        if (FileSystem._objects_to_send.size !== 0) {
                            this._send_chan();
                        }
                        else {
                            SpinalEventEmitter_1.SpinalEventEmitter.getInstance().emit(EventConnectorJS.SEND_RESPONSE_END);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * send the data to the server
     * @private
     * @return {*}
     * @memberof FileSystem
     */
    FileSystem.prototype._send_data_to_hub_instance = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var tmp_data, path, response, error_4;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this._data_to_send.length === 0 || this._session_num === -1)
                            return [2 /*return*/];
                        FileSystem._sending_data = true;
                        if (this._session_num === -2) {
                            this._session_num = -1;
                        }
                        else {
                            this._data_to_send = "s ".concat(this._session_num, " ").concat(this._data_to_send);
                        }
                        tmp_data = this._data_to_send + 'E ';
                        this._data_to_send = '';
                        path = (0, getUrlPath_1.getUrlPath)(this._protocol, this._url, this._port);
                        if (FileSystem._disp)
                            console.log('sent ->', tmp_data);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._axiosInst.post(path, tmp_data, {
                                headers: {
                                    'Content-Type': 'text/plain',
                                    authorization: this._accessToken
                                }
                            })];
                    case 2:
                        response = _d.sent();
                        this.send_data_eval(response.data);
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _d.sent();
                        if (error_4.response &&
                            (error_4.response.status === 0 ||
                                (error_4.response.status >= 400 && error_4.response.status < 600))) {
                            console.error('Error sending data to the server, status=', (_a = error_4.response) === null || _a === void 0 ? void 0 : _a.status, 'data=', (_b = error_4.response) === null || _b === void 0 ? void 0 : _b.data);
                            FileSystem.onConnectionError(4);
                        }
                        else {
                            console.error('Error sending data to the server', error_4);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem.prototype.send_data_eval = function (responseText) {
        var e_1, _a, e_2, _b;
        if (FileSystem._disp)
            console.log('resp ->', responseText);
        var _c = []; // callbacks
        var created = [];
        var _w = function (sid, className) {
            var e_3, _a;
            var _obj = FileSystem._create_model_by_name(className);
            if (sid != null && _obj != null) {
                _obj._server_id = sid;
                FileSystem._objects[sid] = _obj;
                try {
                    for (var _b = __values(FileSystem._type_callbacks), _d = _b.next(); !_d.done; _d = _b.next()) {
                        var _e = __read(_d.value, 2), type = _e[0], cb = _e[1];
                        var mod_R = ModelProcessManager_1.ModelProcessManager.spinal[type] || ModelProcessManager_1.ModelProcessManager._def[type];
                        if (_obj instanceof mod_R) {
                            created.push({ cb: cb, _obj: _obj });
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        FileSystem._sig_server = false;
        eval(responseText);
        FileSystem._sig_server = true;
        try {
            for (var created_1 = __values(created), created_1_1 = created_1.next(); !created_1_1.done; created_1_1 = created_1.next()) {
                var _d = created_1_1.value, cb = _d.cb, _obj = _d._obj;
                cb(_obj);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (created_1_1 && !created_1_1.done && (_a = created_1["return"])) _a.call(created_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var _loop_1 = function (nbCb, servId, error) {
            if (servId != 0 && typeof FileSystem._objects[servId] === 'undefined') {
                var interval_1 = setInterval(function () {
                    if (typeof FileSystem._objects[servId] !== 'undefined') {
                        clearInterval(interval_1);
                        FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
                    }
                }, 200);
            }
            else
                FileSystem._callbacks[nbCb](FileSystem._objects[servId], error);
        };
        try {
            for (var _c_1 = __values(_c), _c_1_1 = _c_1.next(); !_c_1_1.done; _c_1_1 = _c_1.next()) {
                var _e = __read(_c_1_1.value, 3), nbCb = _e[0], servId = _e[1], error = _e[2];
                _loop_1(nbCb, servId, error);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c_1_1 && !_c_1_1.done && (_b = _c_1["return"])) _b.call(_c_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    FileSystem.prototype.make_channel_eval = function (responseText) {
        var e_4, _a;
        if (FileSystem._disp) {
            console.log('chan ->', responseText);
        }
        var created = [];
        var _w = function (sid, obj) {
            var e_5, _a;
            var _obj = FileSystem._create_model_by_name(obj);
            if (sid != null && _obj != null) {
                _obj._server_id = sid;
                FileSystem._objects[sid] = _obj;
                try {
                    for (var _b = __values(FileSystem._type_callbacks), _d = _b.next(); !_d.done; _d = _b.next()) {
                        var _e = __read(_d.value, 2), type = _e[0], cb = _e[1];
                        // @ts-ignore
                        var mod_R = ModelProcessManager_1.ModelProcessManager._def[type] || ModelProcessManager_1.ModelProcessManager.spinal[type];
                        if (_obj instanceof mod_R) {
                            created.push({ cb: cb, _obj: _obj });
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        FileSystem._sig_server = false;
        eval(responseText);
        FileSystem._sig_server = true;
        try {
            for (var created_2 = __values(created), created_2_1 = created_2.next(); !created_2_1.done; created_2_1 = created_2.next()) {
                var _b = created_2_1.value, cb = _b.cb, _obj = _b._obj;
                cb(_obj);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (created_2_1 && !created_2_1.done && (_a = created_2["return"])) _a.call(created_2);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    FileSystem.prototype.make_channel_loop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._session_num <= 0)) return [3 /*break*/, 2];
                        // wait for the end of the 1st response from the server
                        return [4 /*yield*/, SpinalEventEmitter_1.SpinalEventEmitter.getInstance().waitEvt(EventConnectorJS.SEND_RESPONSE_END)];
                    case 1:
                        // wait for the end of the 1st response from the server
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._send_make_channel()];
                    case 3:
                        data = _a.sent();
                        FileSystem._in_mk_chan_eval = true;
                        if (!(FileSystem._sending_data === true)) return [3 /*break*/, 5];
                        return [4 /*yield*/, SpinalEventEmitter_1.SpinalEventEmitter.getInstance().waitEvt(EventConnectorJS.SEND_RESPONSE_END)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.make_channel_eval(data);
                        FileSystem._in_mk_chan_eval = false;
                        SpinalEventEmitter_1.SpinalEventEmitter.getInstance().emit(EventConnectorJS.SUBCRIBE_RESPONSE_END);
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem.prototype._send_make_channel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, res, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startDate = Date.now();
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 7];
                        if (Date.now() - startDate > FileSystem._timeout_reconnect) {
                            FileSystem.onConnectionError(2);
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this._axiosInst.get((0, getUrlPath_1.getUrlPath)(this._protocol, this._url, this._port, '?s=' + this._session_num))];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                    case 4:
                        error_5 = _a.sent();
                        if (!error_5.response)
                            console.error('Error sending data to the server', error_5);
                        else if (error_5.response.status === 401 ||
                            (error_5.response.status >= 500 && error_5.response.status < 600))
                            throw FileSystem.onConnectionError(3);
                        console.log('Trying to reconnect.');
                        FileSystem.onConnectionError(1);
                        return [4 /*yield*/, (0, waitTimeout_1.waitTimeout)(1000)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem._model_changed_func = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(FileSystem._in_mk_chan_eval === true)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SpinalEventEmitter_1.SpinalEventEmitter.getInstance().waitEvt(EventConnectorJS.SUBCRIBE_RESPONSE_END)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        FileSystem._send_chan();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * send a request for a "push" channel.
     * Called in the server response
     * @private
     * @memberof FileSystem
     * @deprecated
     */
    FileSystem.prototype.make_channel = function () {
        // Called in the server response
        // leave empty
    };
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
    FileSystem._onConnectionError = function (error_code) {
        var msg = '';
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
                            backgroundColor: '#ff5b57'
                        },
                        {
                            txt: 'close',
                            backgroundColor: '#348fe2',
                            click: function () {
                                return FileSystem.popup.hide();
                            }
                        },
                    ]
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
    };
    /**
     * get the first running inst
     * @static
     * @return {*}  {FileSystem}
     * @memberof FileSystem
     */
    FileSystem.get_inst = function () {
        for (var k in FileSystem._insts) {
            return FileSystem._insts[k];
        }
    };
    /**
     * @static
     * @param {IFsData} out
     * @param {Model} obj
     * @memberof FileSystem
     */
    FileSystem.set_server_id_if_necessary = function (out, obj) {
        if (obj._server_id == null) {
            // registering
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            // new object
            var ncl = ModelProcessManager_1.ModelProcessManager.get_object_class(obj);
            if (obj._underlying_fs_type != null) {
                out.mod += "T ".concat(obj._server_id, " ").concat(ncl, " ");
                ncl = obj._underlying_fs_type();
            }
            out.cre += "N ".concat(obj._server_id, " ").concat(ncl, " ");
            // data
            obj._get_fs_data(out);
        }
    };
    /**
     * send changes of m to instances.
     * @static
     * @param {Model} m
     * @memberof FileSystem
     */
    FileSystem.signal_change = function (m) {
        if (FileSystem._sig_server) {
            FileSystem._objects_to_send.set(m.model_id, m);
            this._have_model_changed_debounced();
        }
    };
    /**
     * @static
     * @param {number} tmp_id
     * @param {number} res
     * @return {*}  {void}
     * @memberof FileSystem
     */
    FileSystem._tmp_id_to_real = function (tmp_id, res) {
        return __awaiter(this, void 0, void 0, function () {
            var tmp, ptr, fs, path, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tmp = FileSystem._tmp_objects[tmp_id];
                        FileSystem._objects[res] = tmp;
                        tmp._server_id = res;
                        delete FileSystem._tmp_objects[tmp_id];
                        ptr = FileSystem._ptr_to_update[tmp_id];
                        if (ptr != null) {
                            delete FileSystem._ptr_to_update[tmp_id];
                            ptr.data.value = res;
                        }
                        FileSystem.signal_change(FileSystem._objects[res]);
                        if (!(FileSystem._files_to_upload[tmp_id] != null && tmp.file != null)) return [3 /*break*/, 4];
                        delete FileSystem._files_to_upload[tmp_id];
                        fs = FileSystem.get_inst();
                        path = (0, getUrlPath_1.getUrlPath)(fs._protocol, fs._url, fs._port, "?s=".concat(fs._session_num, "&p=").concat(tmp._server_id));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fs._axiosInst.put(path, tmp.file)];
                    case 2:
                        _a.sent();
                        delete tmp.file;
                        tmp.remaining.set(0);
                        return [3 /*break*/, 4];
                    case 3:
                        error_6 = _a.sent();
                        console.error('Error sending file', error_6.response);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileSystem._create_model_by_name = function (name) {
        if (typeof name !== 'string') {
            return name; // for old spinalcore version
        }
        if (typeof ModelProcessManager_1.ModelProcessManager._def[name] !== 'undefined') {
            return new ModelProcessManager_1.ModelProcessManager._def[name]();
        }
        if (typeof ModelProcessManager_1.ModelProcessManager.spinal[name] === 'undefined') {
            if (FileSystem.debug === true) {
                console.warn("Got Model type \"".concat(name, "\" from hub but not registered."));
            }
            ModelProcessManager_1.ModelProcessManager.spinal[name] = new Function("return class ".concat(name, " extends ModelProcessManager._def[\"Model\"] {}"))();
            return new ModelProcessManager_1.ModelProcessManager.spinal[name]();
        }
        return new ModelProcessManager_1.ModelProcessManager.spinal[name]();
    };
    /**
     * @deprecated
     * @static
     * @param {*} _child
     * @param {*} _parent
     * @return {*}  {*}
     * @memberof FileSystem
     */
    FileSystem.extend = function (_child, _parent) {
        throw 'FileSystem.extend is a legacy function, do not use';
    };
    /**
     * @private
     * @static
     * @return {*}  {number}
     * @memberof FileSystem
     */
    FileSystem._get_new_tmp_server_id = function () {
        FileSystem._cur_tmp_server_id++;
        if (FileSystem._cur_tmp_server_id % 4 === 0) {
            FileSystem._cur_tmp_server_id++;
        }
        return FileSystem._cur_tmp_server_id;
    };
    /**
     * send changes
     * @private
     * @static
     * @memberof FileSystem
     */
    FileSystem._send_chan = function () {
        var out = FileSystem._get_chan_data();
        for (var f in FileSystem._insts) {
            FileSystem._insts[f].send(out);
        }
    };
    /**
     * get data of objects to send
     * @private
     * @static
     * @return {*}  {string}
     * @memberof FileSystem
     */
    FileSystem._get_chan_data = function () {
        var e_6, _a;
        var out = {
            cre: '',
            mod: ''
        };
        var nb_model = 0;
        try {
            for (var _b = __values(FileSystem._objects_to_send), _d = _b.next(); !_d.done; _d = _b.next()) {
                var _e = __read(_d.value, 2), id = _e[0], model = _e[1];
                nb_model++;
                if (nb_model > FileSystem.send_model_limit)
                    break;
                model._get_fs_data(out);
                FileSystem._objects_to_send["delete"](id);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return out.cre + out.mod;
    };
    /**
     * @private
     * @static
     * @memberof FileSystem
     * @deprecated
     * do not remove used in eval
     */
    FileSystem._timeout_send_func = function () { };
    /**
     * @static
     * @return {*}  {*}
     * @memberof FileSystem
     */
    FileSystem._my_xml_http_request = function () {
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
            if (!FileSystem._XMLHttpRequest) {
                var XMLHttpRequest_node = require('xhr2');
                FileSystem._XMLHttpRequest = XMLHttpRequest_node;
            }
            return new FileSystem._XMLHttpRequest();
        }
        else {
            console.error('you must define CONNECTOR_TYPE');
        }
    };
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
     * @deprecated
     * @readonly
     * @static
     * @type {(string | number)}
     * @memberof FileSystem
     */
    FileSystem._userid = 644;
    /**
     * @static
     * @type {number}
     * @default 30000
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
     * @type Map<number, Model>
     * @memberof FileSystem
     */
    FileSystem._objects_to_send = new Map();
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
    FileSystem._in_mk_chan_eval = false;
    FileSystem._sending_data = false;
    /**
     * debounce from set
     * @static
     * @memberof FileSystem
     */
    FileSystem._have_model_changed_debounced = debounce(FileSystem._model_changed_func, 250, { leading: false });
    /**
     * debounce from send
     * @static
     * @memberof FileSystem
     */
    FileSystem._send_data_to_hub_debounced = debounce(FileSystem._send_data_to_hub_func, 20, { leading: false });
    FileSystem.send_model_limit = 250;
    /**
     * to be refedifined to change the handleing for connections error
     * @static
     * @memberof FileSystem
     */
    FileSystem.onConnectionError = FileSystem._onConnectionError;
    return FileSystem;
}());
exports.FileSystem = FileSystem;
//# sourceMappingURL=FileSystem.js.map