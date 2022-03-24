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
exports.Model = void 0;
const FileSystem_1 = require("../FileSystem/FileSystem");
const ModelProcessManager_1 = require("../ModelProcessManager");
const BindProcess_1 = require("../Processes/BindProcess");
const Process_1 = require("../Processes/Process");
/**
 * Bese representation of a Object
 * @export
 * @class Model
 */
class Model {
    /**
     * Creates an instance of Model.
     * @param {*} [attr]
     * @memberof Model
     */
    constructor(attr) {
        this._constructorName = Model._constructorName;
        /**
         * registered attribute names (in declaration order)
         * @type {string[]}
         * @memberof Model
         */
        this._attribute_names = [];
        /**
         * id of the model
         * @type {number}
         * @memberof Model
         */
        this.model_id = ModelProcessManager_1.ModelProcessManager._cur_mid++;
        /**
         * synchronized processes
         * @type {Process[]}
         * @memberof Model
         */
        this._processes = [];
        /**
         * parent models (depending on this)
         * @type {Model[]}
         * @memberof Model
         */
        this._parents = [];
        /**
         * "date" of previous change. We start at + 2 because
         * we consider that an initialisation is a modification.
         * @type {number}
         * @memberof Model
         */
        this._date_last_modification = ModelProcessManager_1.ModelProcessManager._counter + 2;
        if (attr != null) {
            this._set(attr);
        }
    }
    /**
     * Do nothing here, TBD in child if needed.
     * Called in rem_attr if have no more parent.
     * @memberof Model
     */
    destructor() { }
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @return {*}  {boolean}
     * @memberof Model
     */
    has_been_modified() {
        return (this._date_last_modification > ModelProcessManager_1.ModelProcessManager._counter - 2 ||
            ModelProcessManager_1.ModelProcessManager._force_m);
    }
    /**
     * return true if this has changed since previous synchronisation due
     * to a direct modification (not from a child one)
     * @return {*}  {boolean}
     * @memberof Model
     */
    has_been_directly_modified() {
        return (this._date_last_modification > ModelProcessManager_1.ModelProcessManager._counter - 1 ||
            ModelProcessManager_1.ModelProcessManager._force_m);
    }
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
     */
    bind(f, onchange_construction) {
        if (f instanceof Process_1.Process) {
            this._processes.push(f);
            f._models.push(this);
            if (onchange_construction) {
                ModelProcessManager_1.ModelProcessManager._n_processes.set(f.process_id, f);
                ModelProcessManager_1.ModelProcessManager._need_sync_processes();
                return f;
            }
        }
        else {
            return new BindProcess_1.BindProcess(this, onchange_construction, f);
        }
    }
    /**
     * @param {(Process | BindProcess | Function)} f recommanded to use Process | BindProcess, using Function can lead to error
     * @memberof Model
     */
    unbind(f) {
        if (f instanceof Process_1.Process) {
            this._processes.splice(this._processes.indexOf(f), 1);
            f._models.splice(f._models.indexOf(this), 1);
        }
        else {
            for (const process of this._processes) {
                if (process instanceof BindProcess_1.BindProcess && process.f === f)
                    this.unbind(process);
            }
        }
    }
    /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     * @return {*}  {*}
     * @memberof Model
     */
    get() {
        const res = {};
        for (const name of this._attribute_names) {
            Object.assign(res, { [name]: this[name].get() });
        }
        return res;
    }
    /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     *
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */
    set(value) {
        if (this._set(value)) {
            // change internal data
            this._signal_change();
            return true;
        }
        return false;
    }
    /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param {string} str
     * @memberof Model
     */
    set_state(str) {
        const map = {};
        const lst = str.split('\n');
        const mid = lst.shift();
        for (const l of lst) {
            if (!l.length) {
                continue;
            }
            const s = l.split(' ');
            map[s[0]] = {
                type: s[1],
                data: s[2],
                buff: void 0,
            };
        }
        // fill / update this with data in map[ mid ]
        map[mid].buff = this;
        this._set_state(map[mid].data, map);
    }
    /**
     * return a string which describes the changes in this and children since date
     * @param {number} [date=-1]
     * @return {*}  {string}
     * @memberof Model
     */
    get_state(date = -1) {
        // get sub models
        const fmm = {};
        this._get_flat_model_map(fmm, date);
        let res = this.model_id.toString();
        if (this._date_last_modification > date) {
            for (const id in fmm) {
                const obj = fmm[id];
                res += `\n${obj.model_id} ${ModelProcessManager_1.ModelProcessManager.get_object_class(obj)} ${obj._get_state()}`;
            }
        }
        return res;
    }
    /**
     * add attribute (p.values must contain models)
     * can be called with
     *  - name, instance of Model (two arguments)
     *  - { name_1: instance_1, name_2: instance_2, ... } (only one argument)
     * @param {(string | { [nameAttr: string]: any })} name
     * @param {*} [instanceOfModel]
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */
    add_attr(name, instanceOfModel, signal_change = true) {
        // name, model
        if (typeof name === 'string') {
            if (typeof instanceOfModel === 'function') {
                this[name] = instanceOfModel;
            }
            else {
                if (this[name] != null) {
                    console.error(`attribute ${name} already exists in ${ModelProcessManager_1.ModelProcessManager.get_object_class(this)}`);
                }
                const model = ModelProcessManager_1.ModelProcessManager.conv(instanceOfModel);
                if (model._parents.indexOf(this) < 0) {
                    model._parents.push(this);
                }
                this._attribute_names.push(name);
                this[name] = model;
                if (signal_change) {
                    this._signal_change();
                }
            }
        }
        else {
            // else, asuming { name_1: instance_1, name_2: instance_2, ... }
            for (const key in name) {
                if (Object.prototype.hasOwnProperty.call(name, key)) {
                    const val = name[key];
                    this.add_attr(key, val, signal_change);
                }
            }
        }
    }
    /**
     * remove attribute named name
     * @param {string} name
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */
    rem_attr(name, signal_change = true) {
        const item = this[name];
        if (item instanceof Model) {
            let i = item._parents.indexOf(this);
            if (i >= 0) {
                item._parents.splice(i, 1);
                if (item._parents.length === 0) {
                    item.destructor();
                }
            }
            delete this[name];
            i = this._attribute_names.indexOf(name);
            if (i >= 0) {
                this._attribute_names.splice(i, 1);
            }
            if (signal_change) {
                this._signal_change();
            }
        }
    }
    /**
     * change attribute named nname to instanceOfModel (use references for comparison)
     * @param {string} name
     * @param {*} instanceOfModel
     * @param {boolean} [signal_change=true]
     * @return {*}  {void}
     * @memberof Model
     */
    mod_attr(name, instanceOfModel, signal_change = true) {
        if (this[name] !== instanceOfModel) {
            this.rem_attr(name);
            return this.add_attr(name, instanceOfModel, signal_change);
        }
    }
    /**
     * add / mod / rem attr to get the same data than o
     *  (assumed to be something like { key: val, ... })
     * @param {{ [key: string]: any }} instanceOfModel
     * @memberof Model
     */
    set_attr(instanceOfModel) {
        // new ones / updates
        for (const k in instanceOfModel) {
            this.mod_attr(k, instanceOfModel[k]);
        }
        this._attribute_names
            .filter((attrName) => instanceOfModel[attrName] == null)
            .forEach((attrName) => this.rem_attr(attrName));
    }
    /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     *  [ nb_row, nb_cols ] for a matrix...
     * @param {number} [_for_display=0]
     * @return {*}  {(number | number[])}
     * @memberof Model
     */
    size(_for_display = 0) {
        return [];
    }
    /**
     * dimensionnality of the object -> 0 for a scalar, 1 for a vector, ...
     * @param {number} [_for_display=0]
     * @return {*}  {number}
     * @memberof Model
     */
    dim(_for_display = 0) {
        const size = this.size(_for_display);
        return Array.isArray(size) ? size.length : size;
    }
    /**
     * @param {Model} m
     * @return {*}  {boolean}
     * @memberof Model
     */
    equals(m) {
        if (this === m)
            return true;
        if (this._attribute_names.length !== m._attribute_names.length)
            return false;
        // check all own attrs exist in target
        for (const attrName of this._attribute_names) {
            if (!m._attribute_names.includes(attrName)) {
                return false;
            }
        }
        // check target attrs exist in own and is equal
        for (const attrName of m._attribute_names) {
            if (this[attrName] == null) {
                return false;
            }
            const attrModel = m[attrName];
            if (!this[attrName].equals(attrModel)) {
                return false;
            }
        }
        return true;
    }
    /**
     * get first parents that checks func_to_check
     * @param {(model: Model) => boolean} func_to_check
     * @return {*}  {Model[]}
     * @memberof Model
     */
    get_parents_that_check(func_to_check) {
        const res = [];
        const visited = {};
        this._get_parents_that_check_rec(res, visited, func_to_check);
        return res;
    }
    /**
     * @return {*}  {Model}
     * @memberof Model
     */
    deep_copy() {
        const tmp = {};
        for (const key of this._attribute_names) {
            tmp[key] = this[key].deep_copy();
        }
        const res = new ModelProcessManager_1.ModelProcessManager._def[ModelProcessManager_1.ModelProcessManager.get_object_class(this)]();
        res.set_attr(tmp);
        return res;
    }
    /**
     * returns true if change is not "cosmetic"
     * @return {*}  {boolean}
     * @memberof Model
     */
    real_change() {
        if (this.has_been_directly_modified() && !this._attribute_names.length) {
            return true;
        }
        for (const attrNames of this._attribute_names) {
            if (typeof this.cosmetic_attribute === 'function'
                ? this.cosmetic_attribute(attrNames)
                : null) {
                continue;
            }
            if (this[attrNames].real_change()) {
                return true;
            }
        }
        return false;
    }
    /**
     * To be redifined in children if needed
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof Model
     */
    cosmetic_attribute(name) {
        return false;
    }
    /**
     * may be redefined
     * @return {*}  {string}
     * @memberof Model
     */
    _get_state() {
        return this._attribute_names
            .map((attrName) => `${attrName}:${this[attrName].model_id}`)
            .join(',');
    }
    /**
     * send data to server
     * @param {IFsData} out
     * @return {*}  {string}
     * @memberof Model
     */
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        const data = this._attribute_names
            .map((attrName) => {
            const obj = this[attrName];
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, obj);
            return attrName + ':' + obj._server_id;
        })
            .join(',');
        out.mod += `C ${this._server_id} ${data} `;
    }
    /**
     * may be redefined.
     * by default, add attributes using keys and values (and remove old unused values)
     * must return true if data is changed
     * @protected
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */
    _set(value) {
        let change = 0;
        const used = {};
        // rem
        for (const attrName of ModelProcessManager_1.ModelProcessManager._get_attribute_names(value)) {
            used[attrName] = true;
        }
        for (const key of this._attribute_names) {
            if (!used[key]) {
                change = 1;
                this.rem_attr(key, false);
            }
        }
        // mod / add
        for (const key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const val = value[key];
                if (val != null) {
                    if (this[key] != null) {
                        if (this[key].constructor === val.constructor) {
                            change |= this[key].set(val);
                        }
                        else {
                            change = 1;
                            this.mod_attr(key, val, false);
                        }
                    }
                    else {
                        this.add_attr(key, val, false);
                    }
                }
            }
        }
        return !!change;
    }
    /**
     * called by set. change_level should not be defined by the user
     *  (it permits to != change from child of from this)
     * @protected
     * @param {number} [change_level=2]
     * @return {*}  {ReturnType<typeof setTimeout>}
     * @memberof Model
     */
    _signal_change(change_level = 2) {
        if (change_level === 2 && this._server_id != null) {
            FileSystem_1.FileSystem.signal_change(this);
        }
        // register this as a modified model
        ModelProcessManager_1.ModelProcessManager._modlist.set(this.model_id, this);
        // do the same thing for the parents
        if (this._date_last_modification <= ModelProcessManager_1.ModelProcessManager._counter) {
            this._date_last_modification =
                ModelProcessManager_1.ModelProcessManager._counter + change_level;
            for (const parent of this._parents) {
                parent._signal_change(1);
            }
        }
        // start if not done a timer
        return ModelProcessManager_1.ModelProcessManager._need_sync_processes();
    }
    /**
     * generic definition of _set_state. ( called by _use_state )
     * @param {string} str
     * @param {IStateMap} map
     * @memberof Model
     */
    _set_state(str, map) {
        const used = {}; // used attributes. Permits to know what to destroy
        if (str.length) {
            for (const spl of str.split(',')) {
                const [attr, k_id] = spl.split(':');
                used[attr] = true;
                const model = this[attr];
                if (map[k_id].buff != null) {
                    // if already defined in the map
                    if (model == null) {
                        this.add_attr(attr, map[k_id].buff);
                    }
                    else if (map[k_id].buff !== model) {
                        this.mod_attr(attr, map[k_id].buff);
                    }
                }
                else if (model == null) {
                    // else, if the attribute does not exist, we create if
                    this.add_attr(attr, ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
                }
                else if (!model._set_state_if_same_type(k_id, map)) {
                    // else, we already have an attribute and map has not been already explored
                    this.mod_attr(attr, ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
                }
            }
        }
        for (const attrName of this._attribute_names) {
            if (!used[attrName])
                this.rem_attr(attrName);
        }
    }
    /**
     * see get_parents_that_check
     * @private
     * @param {Model[]} res
     * @param {{ [attrName: string]: boolean }} visited
     * @param {(model: Model) => boolean} func_to_check
     * @memberof Model
     */
    _get_parents_that_check_rec(res, visited, func_to_check) {
        if (visited[this.model_id] == null) {
            visited[this.model_id] = true;
            if (func_to_check(this)) {
                res.push(this);
            }
            else {
                for (const parent of this._parents) {
                    parent._get_parents_that_check_rec(res, visited, func_to_check);
                }
            }
        }
    }
    /**
     * return true if info from map[ mid ] if compatible with this.
     * If it's the case, use this information to update data
     * @protected
     * @param {string} mid
     * @param {IStateMap<Model>} map
     * @return {*}  {boolean}
     * @memberof Model
     */
    _set_state_if_same_type(mid, map) {
        const dat = map[mid];
        if (ModelProcessManager_1.ModelProcessManager.get_object_class(this) === dat.type) {
            dat.buff = this;
            this._set_state(dat.data, map);
            return true;
        }
        return false;
    }
    /**
     * map[ id ] = obj for each objects starting from this recursively
     * @protected
     * @param {IFlatModelMap} map
     * @param {number} date
     * @return {*}  {IFlatModelMap}
     * @memberof Model
     */
    _get_flat_model_map(map, date) {
        map[this.model_id] = this;
        for (const name of this._attribute_names) {
            const obj = this[name];
            if (map[obj.model_id] == null) {
                if (obj._date_last_modification > date) {
                    obj._get_flat_model_map(map, date);
                }
            }
        }
        return map;
    }
}
exports.Model = Model;
Model._constructorName = 'Model';
//# sourceMappingURL=Model.js.map