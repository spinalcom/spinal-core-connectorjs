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
exports.Lst = void 0;
const FileSystem_1 = require("../FileSystem/FileSystem");
const ModelProcessManager_1 = require("../ModelProcessManager");
const Model_1 = require("./Model");
/**
 * Bese representation of an Array
 * @export
 * @class Lst
 * @extends {Model}
 * @template T
 */
class Lst extends Model_1.Model {
    /**
     * Creates an instance of Lst.
     * @param {*} [data]
     * @memberof Lst
     */
    constructor(data) {
        super();
        /**
         * @type {number}
         * @memberof Lst
         */
        this.length = 0;
        const s = this.static_length();
        if (s >= 0) {
            const d = this.default_value();
            for (let i = 0; i <= s; i++) {
                // @ts-ignore
                this.push(d, true);
            }
        }
        if (data)
            this._set(data);
    }
    /**
     * @return {*}  {number}
     * @memberof Lst
     */
    static_length() {
        return -1;
    }
    /**
     * @protected
     * @return {*}  {number}
     * @memberof Lst
     */
    default_value() {
        return 0;
    }
    /**
     * @protected
     * @return {*}  {*}
     * @memberof Lst
     */
    base_type() {
        return undefined;
    }
    /**
     * @return {*}  {ReturnType<T['get']>[]}
     * @memberof Lst
     */
    get() {
        const res = [];
        for (let i = 0; i < this.length; i++) {
            if (this[i])
                res.push(this[i].get());
        }
        return res;
    }
    /**
     * @return {*}  {[number]}
     * @memberof Lst
     */
    size() {
        return [this.length];
    }
    /**
     * @return {*}  {string}
     * @memberof Lst
     */
    toString() {
        let res = [];
        for (let i = 0; i < this.length; i++) {
            res.push(this[i].toString());
        }
        if (res.length > 0)
            return res.join();
        return '';
    }
    /**
     * @param {Lst<T>} lst
     * @return {*}  {boolean}
     * @memberof Lst
     */
    equals(lst) {
        if (lst.length !== this.length)
            return false;
        for (let i = 0; i < this.length; i++) {
            if (!this[i].equals(lst[i]))
                return false;
        }
        return true;
    }
    /**
     * @param {*} value
     * @param {boolean} [force=false]
     * @return {*}  {void}
     * @memberof Lst
     */
    push(value, force = false) {
        if (this._static_size_check(force))
            return;
        let b = this.base_type();
        if (b) {
            if (!(value instanceof b))
                value = new b(value);
        }
        else {
            value = ModelProcessManager_1.ModelProcessManager.conv(value);
        }
        if (value._parents.indexOf(this) === -1) {
            value._parents.push(this);
        }
        this[this.length++] = value;
        this._signal_change();
    }
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    pop() {
        if (this._static_size_check(false))
            return;
        if (this.length <= 0)
            return;
        const res = this[--this.length];
        this.rem_attr(this.length.toString(10));
        return res;
    }
    /**
     * @memberof Lst
     */
    clear() {
        while (this.length) {
            this.pop();
        }
    }
    /**
     * @param {*} value
     * @return {*}  {number}
     * @memberof Lst
     */
    unshift(value) {
        if (this._static_size_check(false)) {
            return;
        }
        const b = this.base_type();
        if (b != null) {
            if (!(value instanceof b))
                value = new b(value);
        }
        else
            value = ModelProcessManager_1.ModelProcessManager.conv(value);
        if (value._parents.indexOf(this) < 0)
            value._parents.push(this);
        if (this.length) {
            for (let i = this.length - 1; i >= 0; i--) {
                this[i + 1] = this[i];
            }
        }
        this[0] = value;
        this.length += 1;
        this._signal_change();
        return this.length;
    }
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    shift() {
        const res = this[0];
        this.slice(0, 1);
        return res;
    }
    /**
     * @param {T} item
     * @memberof Lst
     */
    remove(item) {
        const index = this.indexOf(item);
        if (index >= 0)
            this.splice(index, 1);
    }
    /**
     * @param {T} item
     * @memberof Lst
     */
    remove_ref(item) {
        const index = this.indexOf_ref(item);
        if (index >= 0)
            this.splice(index, 1);
    }
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {T[]}
     * @memberof Lst
     */
    filter(f) {
        const res = [];
        for (let i = 0; i < this.length; i++) {
            if (f(this[i]))
                res.push(this[i]);
        }
        return res;
    }
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {T}
     * @memberof Lst
     */
    detect(f) {
        for (let i = 0; i < this.length; i++) {
            if (f(this[i]))
                return this[i];
        }
        return undefined;
    }
    /**
     * @param {SpinalSortFunction<T>} sort
     * @return {*}  {Array<T>}
     * @memberof Lst
     */
    sorted(sort) {
        const res = [];
        for (let i = 0; i < this.length; i++) {
            res.push(this[i]);
        }
        return res.sort(sort);
    }
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {boolean}
     * @memberof Lst
     */
    has(f) {
        for (let i = 0; i < this.length; i++) {
            if (f(this[i]))
                return true;
        }
        return false;
    }
    /**
     * @param {T} value
     * @return {*}  {(number | -1)} -1 if not found
     * @memberof Lst
     */
    indexOf(value) {
        for (let i = 0; i < this.length; i++) {
            if (this[i].equals(value))
                return i;
        }
        return -1;
    }
    /**
     * @param {T} value
     * @return {*}  {number}
     * @memberof Lst
     */
    indexOf_ref(value) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == value)
                return i;
        }
        return -1;
    }
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    contains(value) {
        return this.indexOf(value) !== -1;
    }
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    contains_ref(value) {
        return this.indexOf_ref(value) !== -1;
    }
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    toggle(value) {
        const index = this.indexOf(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        }
        else {
            this.push(value);
            return true;
        }
    }
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    toggle_ref(value) {
        const index = this.indexOf_ref(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        }
        else {
            this.push(value);
            return true;
        }
    }
    /**
     * @param {number} begin
     * @param {number} [end=this.length]
     * @return {*}  {Lst<T>}
     * @memberof Lst
     */
    slice(begin, end = this.length) {
        const res = new Lst();
        if (begin < 0)
            begin = 0;
        if (end > this.length)
            end = this.length;
        for (let i = begin; i < end; i++) {
            res.push(this[i].get());
        }
        return res;
    }
    /**
     * @param {Lst<T>} new_tab
     * @param {boolean} [force=false]
     * @return {*}  {void}
     * @memberof Lst
     */
    concat(new_tab, force = false) {
        if (this._static_size_check(force))
            return;
        if (new_tab.length) {
            for (let i = 0; i < new_tab.length; i++) {
                this.push(new_tab[i]);
            }
        }
    }
    /**
     * @param {number} index
     * @param {number} [n=1]
     * @return {*}  {void}
     * @memberof Lst
     */
    splice(index, n = 1) {
        if (this._static_size_check(false))
            return;
        const end = Math.min(index + n, this.length);
        for (let i = index; i < end; i++)
            this.rem_attr(i.toString(10));
        for (let i = index; i < this.length - n; i++)
            this[i] = this[i + n];
        for (let i = this.length - n; i < this.length; i++)
            delete this[i];
        this.length -= n;
        this._signal_change();
    }
    /**
     * @param {number} index
     * @param {(Lst<T> | T[] | Lst<any> | any[])} lst
     * @memberof Lst
     */
    insert(index, lst) {
        const end = Math.max(this.length - index, 0);
        const res = [];
        for (let i = 0; i < end; i++) {
            res.push(this.pop());
        }
        res.reverse();
        for (let i = 0; i < lst.length; i++) {
            // @ts-ignore
            this.push(lst[i]);
        }
        for (let i = 0; i < res.length; i++) {
            this.push(res[i]);
        }
    }
    /**
     * @param {number} index
     * @param {T} val
     * @return {*}  {void}
     * @memberof Lst
     */
    set_or_push(index, val) {
        if (index < this.length) {
            // @ts-ignore
            return this.mod_attr(index, val);
        }
        if (index === this.length) {
            this.push(val);
        }
    }
    /**
     * @param {number} size
     * @memberof Lst
     */
    trim(size) {
        while (this.length > size)
            this.pop();
    }
    /**
     * @param {string} sep
     * @return {*}  {string}
     * @memberof Lst
     */
    join(sep) {
        return this.get().join(sep);
    }
    /**
     * @return {*}  {Lst<T>}
     * @memberof Lst
     */
    deep_copy() {
        const res = new Lst();
        for (let i = 0; i < this.length; i++)
            res.push(this[i].deep_copy());
        return res;
    }
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    back() {
        return this[this.length - 1];
    }
    /**
     * @return {*}  {boolean}
     * @memberof Lst
     */
    real_change() {
        if (this.has_been_directly_modified())
            return true;
        for (let i = 0; i < this.length; i++) {
            if (this[i].real_change())
                return true;
        }
        return false;
    }
    /**
     * @protected
     * @param {Lst<T>} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    _set(value) {
        let change = Number(this.length != value.length);
        const s = this.static_length();
        if (s >= 0 && change) {
            console.error(`resizing a static array (type ${ModelProcessManager_1.ModelProcessManager.get_object_class(this)}) is forbidden`);
        }
        for (let i = 0; i < value.length; i++) {
            // @ts-ignore
            if (i < this.length)
                change |= this[i].set(value[i]);
            else if (s < 0) {
                // @ts-ignore
                this.push(value[i]);
            }
        }
        if (s < 0) {
            while (this.length > value.length) {
                this.pop();
            }
            this.length = value.length;
        }
        return Boolean(change);
    }
    /**
     * @protected
     * @param {IFlatModelMap} map
     * @param {number} date
     * @return {*}  {IFlatModelMap}
     * @memberof Lst
     */
    _get_flat_model_map(map, date) {
        map[this.model_id] = this;
        for (let i = 0; i < this.length; i++) {
            if (!map.hasOwnProperty(this[i]))
                if (this[i]._date_last_modification > date)
                    this[i]._get_flat_model_map(map, date);
        }
        return map;
    }
    /**
     * @param {IFsData} out
     * @memberof Lst
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        const res = [];
        for (let i = 0; i < this.length; i++) {
            const obj = this[i];
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, obj);
            res.push(obj._server_id);
        }
        out.mod += `C ${this._server_id} ${res.join(',')} `;
    }
    /**
     * @protected
     * @return {*}  {string}
     * @memberof Lst
     */
    _get_state() {
        const res = [];
        for (let i = 0; i < this.length; i++) {
            res.push(this[i].model_id);
        }
        return res.join(',');
    }
    /**
     * @param {string} str
     * @param {IStateMap<T>} map
     * @memberof Lst
     */
    _set_state(str, map) {
        const l_id = str.split(',').filter((x) => {
            return x.length;
        });
        while (this.length > l_id.length)
            this.pop();
        for (let i = 0; i < this.length; i++) {
            const k_id = l_id[i];
            if (map[k_id].buff) {
                if (map[k_id].buff != this[i])
                    this.mod_attr(i.toString(10), map[k_id].buff);
            }
            else if (!this[i]._set_state_if_same_type(k_id, map)) {
                this.mod_attr(i.toString(10), ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
            }
        }
        for (let i = this.length; i < l_id.length; i++) {
            const k_id = l_id[i];
            if (map[k_id].hasOwnProperty('buff') && map[k_id].buff !== null)
                this.push(map[k_id].buff);
            else
                this.push(ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
        }
    }
    /**
     * @param {boolean} force
     * @return {*}  {boolean}
     * @memberof Lst
     */
    _static_size_check(force) {
        if (this.static_length() >= 0 && !force) {
            console.error(`resizing a static array (type ` +
                `${ModelProcessManager_1.ModelProcessManager.get_object_class(this)}) is forbidden`);
            return true;
        }
        return false;
    }
    /**
     * @return {*}  {Generator<T, void, unknown>}
     * @memberof Lst
     */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.length; i++) {
            yield this[i];
        }
    }
}
exports.Lst = Lst;
/**
 * @static
 * @type {string}
 * @memberof Lst
 */
Lst._constructorName = 'Lst';
//# sourceMappingURL=Lst.js.map