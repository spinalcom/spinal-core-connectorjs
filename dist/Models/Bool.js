"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bool = void 0;
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
const FileSystem_1 = require("../FileSystem/FileSystem");
const Obj_1 = require("./Obj");
/**
 * Bese representation of a Boolean
 * @export
 * @class Bool
 * @extends {Obj<boolean>}
 */
class Bool extends Obj_1.Obj {
    /**
     * Creates an instance of Bool.
     * @param {(boolean | Bool)} [data=false]
     * @memberof Bool
     */
    constructor(data = false) {
        super();
        /**
         * @type {string}
         * @memberof Bool
         */
        this._constructorName = Bool._constructorName;
        this._set(data);
    }
    /**
     * toggle true / false ( 1 / 0 )
     * @return {*}  {boolean}
     * @memberof Bool
     */
    toggle() {
        return this.set(!this._data);
    }
    /**
     * @return {*}  {boolean}
     * @memberof Bool
     */
    toBoolean() {
        return this._data;
    }
    /**
     * @return {*}  {Bool}
     * @memberof Bool
     */
    deep_copy() {
        return new Bool(this._data);
    }
    /**
     * we do not take _set from Obj because we want a conversion if value is not a boolean
     * @protected
     * @param {(string | boolean | Bool)} value
     * @return {*}  {boolean}
     * @memberof Bool
     */
    _set(value) {
        let n;
        if (value === 'false')
            n = false;
        else if (value === 'true')
            n = true;
        else if (value instanceof Bool)
            n = value._data;
        else
            n = Boolean(value);
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    /**
     * @param {IFsData} out
     * @memberof Bool
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._data ? 1 : 0} `;
    }
}
exports.Bool = Bool;
/**
 * @static
 * @type {string}
 * @memberof Bool
 */
Bool._constructorName = 'Bool';
//# sourceMappingURL=Bool.js.map