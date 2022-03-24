"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Str = void 0;
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
const Model_1 = require("./Model");
const Obj_1 = require("./Obj");
/**
 * representation of a string
 * @export
 * @class Str
 * @extends {Obj<string>}
 */
class Str extends Obj_1.Obj {
    /**
     * Creates an instance of Str.
     * @param {(string | Str)} [data='']
     * @memberof Str
     */
    constructor(data = '') {
        super();
        this._constructorName = Str._constructorName;
        this._data = data.toString();
    }
    /**
     * @readonly
     * @type {number}
     * @memberof Str
     */
    get length() {
        return this._data.length;
    }
    /**
     * toggle presence of str in this
     * @param {string} str
     * @param {string} [space=' ']
     * @return {*}  {boolean}
     * @memberof Str
     */
    toggle(str, space = ' ') {
        var i, l;
        l = this._data.split(space);
        i = l.indexOf(str);
        if (i < 0) {
            l.push(str);
        }
        else {
            l.splice(i, 1);
        }
        return this.set(l.join(' '));
    }
    /**
     * true if str is contained in this
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    contains(str) {
        return this._data.indexOf(str) >= 0;
    }
    /**
     * @param {(string | Model)} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    equals(str) {
        return str instanceof Model_1.Model
            ? this.toString() === str.toString()
            : this._data === str;
    }
    /**
     * @return {*}  {string}
     * @memberof Str
     */
    toString() {
        return this._data;
    }
    /**
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    ends_with(str) {
        return this._data.endsWith(str);
    }
    /**
     * @return {*}  {Str}
     * @memberof Str
     */
    deep_copy() {
        return new Str(this._data);
    }
    /**
     * @param {IFsData} out
     * @memberof Str
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${encodeURI(this._data)} `;
    }
    /**
     * @protected
     * @param {(Str | string)} [value='']
     * @return {*}  {boolean}
     * @memberof Str
     */
    _set(value = '') {
        const n = value.toString();
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    /**
     * @protected
     * @return {*}  {string}
     * @memberof Str
     */
    _get_state() {
        return encodeURI(this._data);
    }
    _set_state(str, _map) {
        return this.set(decodeURIComponent(str));
    }
}
exports.Str = Str;
Str._constructorName = 'Str';
//# sourceMappingURL=Str.js.map