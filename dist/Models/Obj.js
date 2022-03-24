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
exports.Obj = void 0;
const FileSystem_1 = require("../FileSystem/FileSystem");
const Model_1 = require("./Model");
/**
 * @export
 * @class Obj
 * @extends {Model}
 * @template T
 */
class Obj extends Model_1.Model {
    /**
     * Creates an instance of Obj.
     * @param {*} [data]
     * @memberof Obj
     */
    constructor(data) {
        super();
        this._constructorName = Obj._constructorName;
        if (data != null) {
            this._set(data);
        }
    }
    /**
     * @return {*}  {string}
     * @memberof Obj
     */
    toString() {
        var _a;
        return (_a = this._data) === null || _a === void 0 ? void 0 : _a.toString();
    }
    /**
     * @param {*} obj
     * @return {*}  {boolean}
     * @memberof Obj
     */
    equals(obj) {
        return obj instanceof Obj ? this._data === obj._data : this._data === obj;
    }
    /**
     * @return {*}  {*}
     * @memberof Obj
     */
    get() {
        return this._data;
    }
    /**
     * @param {IFsData} out
     * @memberof Obj
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this.toString()} `;
    }
    /**
     * @protected
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Obj
     */
    _set(value) {
        if (this._data !== value) {
            this._data = value;
            return true;
        }
        return false;
    }
    /**
     * @@protected
     * @return {*}  {string}
     * @memberof Obj
     */
    _get_state() {
        return this.toString();
    }
    /**
     * @param {string} str
     * @param {unknown} _map
     * @return {*}  {boolean}
     * @memberof Obj
     */
    _set_state(str, _map) {
        return this.set(str);
    }
}
exports.Obj = Obj;
Obj._constructorName = 'Obj';
//# sourceMappingURL=Obj.js.map