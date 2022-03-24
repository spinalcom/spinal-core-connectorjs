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
exports.spinalCore = void 0;
const FileSystem_1 = require("./FileSystem/FileSystem");
const ModelProcessManager_1 = require("./ModelProcessManager");
const sendXhr_1 = require("./Utils/sendXhr");
class spinalCore {
    /**
     * @static
     * @param {(URL | string)} options
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     * @memberof spinalCore
     */
    static connect(options, accessToken) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') {
            parsedOpt.pathname += '/';
        }
        const opt = {
            home_dir: parsedOpt.pathname,
            url: parsedOpt.hostname,
            port: parsedOpt.port,
            userid: parsedOpt.username,
            password: parsedOpt.password,
            accessToken,
        };
        return new FileSystem_1.FileSystem(opt);
    }
    /**
     * @static
     * @param {(URL | string)} options
     * @param {number} sessionId
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     * @memberof spinalCore
     */
    static connectWithSessionId(options, sessionId, accessToken) {
        const parsedOpt = typeof options === 'string' ? new URL(options) : options;
        if (parsedOpt.pathname.slice(-1)[0] !== '/') {
            parsedOpt.pathname += '/';
        }
        const opt = {
            home_dir: parsedOpt.pathname,
            url: parsedOpt.hostname,
            port: parsedOpt.port,
            sessionId,
            accessToken,
        };
        return new FileSystem_1.FileSystem(opt);
    }
    /**
     * @static
     * @param {(URL | string)} options
     * @param {string} username
     * @param {string} password
     * @return {*}  {Promise<IAuthResponse>}
     * @memberof spinalCore
     */
    static auth(options, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, sendXhr_1.sendXhr)(options, '/auth', 'POST', {}, { login: username, password: password });
            return JSON.parse(res);
        });
    }
    /**
     * @static
     * @param {(URL | string)} options
     * @param {string} bosRegisterKey
     * @param {string} organName
     * @param {string} organType
     * @return {*}  {Promise<IAuthResponse>}
     * @memberof spinalCore
     */
    static authOrgan(options, bosRegisterKey, organName, organType) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, sendXhr_1.sendXhr)(options, '/authOrgan', 'POST', {}, { bosRegisterKey, organName, organType });
            return JSON.parse(res);
        });
    }
    /**
     * @static
     * @param {(URL | string)} options
     * @param {string} token
     * @return {*}  {Promise<ICreateSessionResponse>}
     * @memberof spinalCore
     */
    static createSession(options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, sendXhr_1.sendXhr)(options, '/createSession', 'GET', {
                authorization: token,
            });
            return JSON.parse(res);
        });
    }
    static store(fs, model, path, optionOrCb, callback_error, fileOption = {
        model_type: 'Model',
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            // Parse path
            const lst = path.split('/');
            const file_name = lst.pop();
            if (lst[0] === '')
                lst.splice(0, 1);
            path = lst.join('/'); // Absolute paths are not allowed
            const home_dir = FileSystem_1.FileSystem.get_inst()._home_dir;
            try {
                const dir = yield fs.load_or_make_dir(home_dir + path);
                const file = dir.detect((x) => x.name.get() === file_name);
                if (file != null)
                    dir.remove(file);
                if (typeof optionOrCb === 'function') {
                    dir.add_file(file_name, model, fileOption);
                    optionOrCb();
                }
                else {
                    dir.add_file(file_name, model, optionOrCb ? optionOrCb : fileOption);
                }
                return;
            }
            catch (error) {
                if (typeof optionOrCb === 'undefined')
                    throw error;
                if (typeof callback_error === 'undefined') {
                    spinalCore.defaultCallbackError();
                }
                else
                    callback_error();
            }
        });
    }
    static register_models(modelList, name) {
        if (name)
            return ModelProcessManager_1.ModelProcessManager.register_models(modelList, name);
        return ModelProcessManager_1.ModelProcessManager.register_models(modelList);
    }
    /**
     * @static
     * @template T
     * @param {FileSystem} fs
     * @param {string} path
     * @return {*}  {Promise<T>}
     * @memberof spinalCore
     */
    static loadPromise(fs, path) {
        return __awaiter(this, void 0, void 0, function* () {
            // Parse path
            const lst = path.split('/');
            const file_name = lst.pop();
            if (lst[0] === '')
                lst.splice(0, 1);
            path = lst.join('/'); // Absolute paths are not allowed
            const home_dir = FileSystem_1.FileSystem.get_inst()._home_dir;
            const current_dir = yield fs.load_or_make_dir(`${home_dir}${path}`);
            const file = current_dir.detect((x) => x.name.get() === file_name);
            if (file)
                return file.load();
            throw new Error('File not Found');
        });
    }
    static load(fs, path, callback_success, callback_error) {
        if (typeof callback_success === 'undefined')
            return spinalCore.loadPromise(fs, path);
        if (typeof callback_error === 'undefined')
            callback_error = spinalCore.defaultCallbackError;
        // Parse path
        const lst = path.split('/');
        const file_name = lst.pop();
        if (lst[0] === '')
            lst.splice(0, 1);
        path = lst.join('/'); // Absolute paths are not allowed
        const home_dir = FileSystem_1.FileSystem.get_inst()._home_dir;
        fs.load_or_make_dir(`${home_dir}${path}`, (current_dir, err) => {
            if (err) {
                return callback_error();
            }
            else {
                const file = current_dir.detect((x) => x.name.get() === file_name);
                if (file != null) {
                    return file.load((data, err) => {
                        if (err) {
                            return callback_error();
                        }
                        else {
                            return callback_success(data);
                        }
                    });
                }
                else {
                    return callback_error();
                }
            }
        });
    }
    /**
     * loads all the models of a specific type
     * @static
     * @template T
     * @param {FileSystem} fs
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     * @return {*}  {void}
     * @memberof spinalCore
     */
    static load_type(fs, type, callback_success, callback_error) {
        if (typeof callback_error === 'undefined') {
            callback_error = spinalCore.defaultCallbackError;
        }
        return fs.load_type(type, (data, error) => {
            if (!data || error)
                callback_error();
            else
                callback_success(data, error);
        });
    }
    static load_right(fs, ptr, callback_success, callback_error) {
        if (typeof callback_success === 'function') {
            if (typeof callback_error === 'undefined') {
                callback_error = spinalCore.defaultCallbackError;
            }
            fs.load_right(ptr, (data, err) => {
                if (err)
                    return callback_error();
                else
                    return callback_success(data, err);
            });
        }
        else {
            return fs.load_right(ptr);
        }
    }
    static load_directory(fs, path, callback) {
        if (typeof callback === 'function')
            return fs.load(path, callback);
        return fs.load(path);
    }
    static load_ptr(fs, ptr, callback) {
        if (typeof callback === 'function')
            return fs.load_ptr(ptr, callback);
        return fs.load_ptr(ptr);
    }
    /**
     * @static
     * @param {FileSystem} fs
     * @param {number} ptr
     * @param {string} file_name
     * @param {number} right_flag
     * @param {string} targetName
     * @return {*}  {void}
     * @memberof spinalCore
     */
    static share_model(fs, ptr, file_name, right_flag, targetName) {
        return fs.share_model(ptr, file_name, right_flag, targetName);
    }
    /**
     * "public static" method: extend one object as a class, using the same 'class' concept as coffeescript
     * @deprecated
     * @static
     * @param {*} child
     * @param {*} parent
     * @return {*}  {*}
     * @memberof spinalCore
     */
    static extend(child, parent) {
        return FileSystem_1.FileSystem.extend(child, parent);
    }
    /**
     * default callback function
     * @static
     * @return {*}  {void}
     * @memberof spinalCore
     */
    static defaultCallbackError() {
        return console.log('Model could not be loaded. You can pass a callback to handle this error.');
    }
}
exports.spinalCore = spinalCore;
spinalCore._def = ModelProcessManager_1.ModelProcessManager._def;
spinalCore.version = ModelProcessManager_1.ModelProcessManager.spinal.version;
spinalCore.right_flag = { AD: 1, WR: 2, RD: 4 };
//# sourceMappingURL=Spinalcore.js.map