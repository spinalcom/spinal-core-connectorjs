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
exports.TypedArray = void 0;
const FileSystem_1 = require("../FileSystem/FileSystem");
const Model_1 = require("./Model");
class TypedArray extends Model_1.Model {
    /**
     * Creates an instance of TypedArray.
     * @param {(number | number[])} [size]
     * @param {T} [data]
     * @memberof TypedArray
     */
    constructor(size, data) {
        super();
        this._constructorName = TypedArray._constructorName;
        // size
        let tmpSize;
        if (size == null) {
            tmpSize = [];
        }
        if (typeof size === 'number') {
            tmpSize = [size];
        }
        this._size = tmpSize;
        // data
        if (data == null) {
            const B = this.base_type();
            if (B)
                data = B.from(this.nb_items());
        }
        this._data = data;
    }
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */
    dim() {
        return this._size.length;
    }
    /**
     * @param {number} [d]
     * @return {*}  {(number | number[])}
     * @memberof TypedArray
     */
    size(d) {
        if (d != null) {
            return this._size[d];
        }
        else {
            return this._size;
        }
    }
    /**
     * @param {(number[] | number)} index
     * @param {*} value
     * @memberof TypedArray
     */
    set_val(index, value) {
        const idx = this._get_index(index);
        if (this._data[idx] !== value) {
            this._data[idx] = value;
            this._signal_change();
        }
    }
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */
    nb_items() {
        let total = this._size[0] || 0;
        for (let j = 1; j < this._size.length; j++) {
            total *= this._size[j];
        }
        return total;
    }
    /**
     * @return {*}  {string}
     * @memberof TypedArray
     */
    toString() {
        let m = 1;
        let res = '';
        let l = this._size.map((s) => {
            const o = m;
            m *= s;
            return o;
        });
        for (let i = 0; i < this._data.length; i++) {
            const data = this._data[i];
            res += data;
            for (let j = l.length - 1; j >= 0; j++) {
                if (i % l[j] == l[j] - 1) {
                    res += [' ', '\n', '\n\n'][j];
                    break;
                }
            }
        }
        return res;
    }
    /**
     * @param {(TypedArray<any> | any)} obj
     * @return {*}  {boolean}
     * @memberof TypedArray
     */
    equals(obj) {
        if (!(obj instanceof TypedArray))
            return this._data === obj;
        if (this._size.length !== obj._size.length) {
            return false;
        }
        let i = 0;
        let k = 0;
        for (; k < this._size.length; i = ++k) {
            if (this._size[i] !== obj._size[i]) {
                return false;
            }
        }
        return this._data === obj._data;
    }
    /**
     * @param {number} [index]
     * @return {*}  {(number | T)}
     * @memberof TypedArray
     */
    get(index) {
        if (typeof index !== 'undefined')
            return this._data[this._get_index(index)];
        return this._data;
    }
    /**
     * @param {number[]} new_size
     * @memberof TypedArray
     */
    resize(new_size) {
        let total = 1;
        for (let i = 0; i < new_size.length; i++) {
            total *= new_size[i];
        }
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
     */
    _set(str) {
        if (typeof str === 'string') {
            // TODO optimize
            this._set_state(str);
            return true;
        }
        if (this._data !== str ||
            this._size.length !== 1 ||
            this._size[0] !== str.length) {
            const baseType = this.base_type();
            // @ts-ignore
            this._data = baseType.from(str);
            this._size = [str.length];
            return true;
        }
        return false;
    }
    /**
     * @private
     * @param {(number[] | number)} index
     * @return {*}  {number}
     * @memberof TypedArray
     */
    _get_index(index) {
        if (Array.isArray(index)) {
            let o = 0;
            let m = 1;
            for (let i = 0; i < index.length; i++) {
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
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        out.mod += `C ${this._server_id} ${this._get_state()} `;
    }
    /**
     * @protected
     * @return {*}  {string}
     * @memberof TypedArray
     */
    _get_state() {
        let res = this._size.length.toString(10);
        for (let i = 0; i < this._size.length; i++) {
            res += `, ${this._size[i]}`;
        }
        for (let i = 0; i < this._data.length; i++) {
            res += `, ${this._data[i]}`;
        }
        return res;
    }
    /**
     * @param {string} str
     * @memberof TypedArray
     */
    _set_state(str) {
        const l = str.split(',');
        let s = parseInt(l[0]);
        const size = [];
        for (let i = 0; i < s; i++) {
            size.push(parseInt(l[i + 1]));
        }
        this._size = size;
        const baseType = this.base_type();
        let nbItems = this.nb_items();
        // @ts-ignore
        this._data = baseType.from(nbItems);
        for (let i = 0; i < nbItems; i++) {
            this._data[i] = parseFloat(l[s + 1 + i]);
        }
    }
}
exports.TypedArray = TypedArray;
TypedArray._constructorName = 'TypedArray';
//# sourceMappingURL=TypedArray.js.map