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
exports.ModelProcessManager = void 0;
const Bool_1 = require("./Models/Bool");
const Lst_1 = require("./Models/Lst");
const Model_1 = require("./Models/Model");
const Str_1 = require("./Models/Str");
const Val_1 = require("./Models/Val");
const isIterable_1 = require("./Utils/isIterable");
class ModelProcessManager {
    static new_from_state() {
        throw 'function obsolete';
    }
    static load() {
        throw 'function obsolete';
    }
    static conv(v) {
        if (v instanceof Model_1.Model)
            return v;
        if (v instanceof Array)
            return new Lst_1.Lst(v);
        if (typeof v === 'string')
            return new Str_1.Str(v);
        if (typeof v === 'number')
            return new Val_1.Val(v);
        if (typeof v === 'boolean')
            return new Bool_1.Bool(v);
        return new Model_1.Model(v);
    }
    /**
     * @public
     * @param {Model} obj
     * @return {*}  {string}
     */
    static get_object_class(obj) {
        if (obj === null || obj === void 0 ? void 0 : obj.constructor) {
            if ('_constructorName' in obj.constructor)
                // @ts-ignore
                return obj.constructor._constructorName;
            if ('name' in obj.constructor)
                return obj.constructor.name;
            if ('toString' in obj.constructor) {
                let arr = obj.constructor.toString().match(/class\s*(\w+)/);
                if (!arr) {
                    arr = obj.constructor.toString().match(/function\s*(\w+)/);
                }
                if ((arr === null || arr === void 0 ? void 0 : arr.length) === 2) {
                    return arr[1];
                }
            }
        }
    }
    /**
     * @public
     * @param {(Model | object)} m
     * @return {*}  {string[]}
     */
    static _get_attribute_names(m) {
        if (m instanceof Model_1.Model) {
            return m._attribute_names;
        }
        const res = [];
        for (const key in m) {
            if (Object.prototype.hasOwnProperty.call(m, key)) {
                res.push(key);
            }
        }
        return res;
    }
    /**
     * create a Model using a line of get_state(using.type, .data, ...)
     * @public
     * @template T
     * @param {string} mid
     * @param {IStateMap<T>} map
     * @return {*}  {T}
     */
    static _new_model_from_state(mid, map) {
        var info = map[mid];
        info.buff = new ModelProcessManager._def[info.type]();
        info.buff._set_state(info.data, map);
        return info.buff;
    }
    /**
     * say that something will need a call
     * to ModelProcessManager._sync_processes during the next round
     * @public
     * @return {*}  {ReturnType<typeof setTimeout>}
     */
    static _need_sync_processes() {
        if (ModelProcessManager._timeout == null) {
            ModelProcessManager._timeout = setTimeout(ModelProcessManager._sync_processes, 1);
            return ModelProcessManager._timeout;
        }
    }
    static register_models(modelList, name) {
        if (modelList) {
            // function
            if (modelList instanceof Function) {
                ModelProcessManager._register_models_check(modelList, name);
            }
            else if ((0, isIterable_1.isIterable)(modelList)) {
                // array
                const l = modelList;
                for (const m of l) {
                    ModelProcessManager.register_models(m);
                }
            }
            else {
                // obj
                const obj = modelList;
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        ModelProcessManager._register_models_check(obj[key], key);
                    }
                }
            }
        }
    }
    /**
     * @public
     * @param {typeof Model} func
     * @param {string} [name]
     */
    static _register_models_check(func, name) {
        if (!name)
            name =
                typeof ModelProcessManager._def[name] !== 'undefined'
                    ? func._constructorName
                    : func.name;
        if (typeof ModelProcessManager._def[name] !== 'undefined' &&
            ModelProcessManager._def[name] !== func) {
            console.error(`trying to register \"${name}\" Model but was already defined`);
            console.error('old =', ModelProcessManager._def[name]);
            console.error('new =', func);
        }
        else
            ModelProcessManager._def[name] = func;
        // @ts-ignore
        func._constructorName = name;
    }
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @public
     */
    static _sync_processes() {
        const processes = new Map();
        for (const [, model] of ModelProcessManager._modlist) {
            for (const process of model._processes) {
                processes.set(process.process_id, {
                    value: process,
                    force: false,
                });
            }
        }
        for (const [id, process] of ModelProcessManager._n_processes) {
            processes.set(id, {
                value: process,
                force: true,
            });
        }
        ModelProcessManager._timeout = undefined;
        ModelProcessManager._modlist.clear();
        ModelProcessManager._n_processes.clear();
        ModelProcessManager._counter += 2;
        for (const [, process] of processes) {
            ModelProcessManager._force_m = process.force;
            process.value.onchange();
        }
        ModelProcessManager._force_m = false;
    }
}
exports.ModelProcessManager = ModelProcessManager;
// nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
ModelProcessManager._counter = 0;
// changed models (current round)
ModelProcessManager._modlist = new Map();
// new processes (that will need a first onchange call in "force" mode)
ModelProcessManager._n_processes = new Map();
// current model id (used to create new ids)
ModelProcessManager._cur_mid = 0;
// current process id (used to create new ids)
ModelProcessManager._cur_process_id = 0;
// timer used to create a new "round"
ModelProcessManager._timeout = undefined;
// if _force_m == true, every has_been_modified function will return true
ModelProcessManager._force_m = false;
ModelProcessManager._def = {};
ModelProcessManager.spinal = {
    version: '2.5.8',
};
//# sourceMappingURL=ModelProcessManager.js.map