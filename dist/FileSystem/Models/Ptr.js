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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ptr = void 0;
const Model_1 = require("../../Models/Model");
const FileSystem_1 = require("../FileSystem");
/**
 * @export
 * @class Ptr
 * @extends {Model}
 * @template T
 */
class Ptr extends Model_1.Model {
    /**
     * Creates an instance of Ptr.
     * @param {*} model
     * @memberof Ptr
     */
    constructor(model) {
        super();
        /**
         * @type {string}
         * @memberof Ptr
         */
        this._constructorName = Ptr._constructorName;
        /**
         * @type {{ model?: T; value?: any }}
         * @memberof Ptr
         */
        this.data = {};
        this._set(model);
    }
    /**
     * @param {SpinalLoadCallBack<T>} [callback]
     * @return {*}  {Promise<T>}
     * @memberof Ptr
     */
    load(callback) {
        var _a, _b;
        if (this.data.model != null) {
            if (typeof callback === 'function') {
                callback(this.data.model, false);
            }
            else {
                return Promise.resolve(this.data.model);
            }
        }
        else {
            if (this.data.value === 0)
                console.error(`Ptr ${this._server_id} load with value 0.`);
            if (typeof callback === 'function') {
                (_a = FileSystem_1.FileSystem.get_inst()) === null || _a === void 0 ? void 0 : _a.load_ptr(this.data.value, callback);
            }
            else {
                return (_b = FileSystem_1.FileSystem.get_inst()) === null || _b === void 0 ? void 0 : _b.load_ptr(this.data.value);
            }
        }
    }
    /**
     * @param {IFsData} out
     * @memberof Ptr
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        if (this.data.model != null) {
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, this.data.model);
            out.mod += `C ${this._server_id} ${this.data.model._server_id} `;
            this.data.value = this.data.model._server_id;
            if (this.data.model._server_id & 3) {
                FileSystem_1.FileSystem._ptr_to_update[this.data.model._server_id] = this;
            }
        }
        else {
            out.mod += `C ${this._server_id} ${this.data.value} `;
        }
    }
    /**
     * @protected
     * @param {(number | T)} model
     * @return {*}  {boolean}
     * @memberof Ptr
     */
    _set(model) {
        if (typeof model === 'number') {
            const res = this.data.value !== model;
            this.data = {
                value: model,
            };
            return res;
        }
        if (model instanceof Model_1.Model) {
            const res = this.data.value !== model._server_id;
            this.data = {
                model: model,
                value: model._server_id,
            };
            return res;
        }
        return false;
    }
    /**
     * @protected
     * @return {*}
     * @memberof Ptr
     */
    _get_state() {
        return this.data.toString();
    }
    /**
     * @param {string} str
     * @param {unknown} _map
     * @return {*}  {boolean}
     * @memberof Ptr
     */
    _set_state(str, _map) {
        return this.set(str);
    }
}
exports.Ptr = Ptr;
/**
 * @static
 * @type {string}
 * @memberof Ptr
 */
Ptr._constructorName = 'Ptr';
//# sourceMappingURL=Ptr.js.map