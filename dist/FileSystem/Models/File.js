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
exports.File = void 0;
const ModelProcessManager_1 = require("../../ModelProcessManager");
const Model_1 = require("../../Models/Model");
const Ptr_1 = require("./Ptr");
/**
 * representation of a virtual File
 * @export
 * @class File
 * @extends {Model}
 * @template T
 */
class File extends Model_1.Model {
    /**
     * Creates an instance of File.
     * @param {string} [name='']
     * @param {(number | T)} [ptr_or_model=0]
     * @param {*} [info={}]
     * @memberof File
     */
    constructor(name = '', ptr_or_model = 0, info = {}) {
        var _a;
        super();
        /**
         * @type {string}
         * @memberof File
         */
        this._constructorName = File._constructorName;
        const cp_info = {};
        for (const key in info) {
            cp_info[key] = info[key];
        }
        if (ptr_or_model instanceof Model_1.Model) {
            if ('model_type' in cp_info) {
                cp_info.model_type = ModelProcessManager_1.ModelProcessManager.get_object_class(ptr_or_model);
            }
            (_a = ptr_or_model.get_file_info) === null || _a === void 0 ? void 0 : _a.call(ptr_or_model, cp_info);
        }
        this.add_attr({
            name: name,
            _created_at: Date.now(),
            _ptr: new Ptr_1.Ptr(ptr_or_model),
            _info: cp_info,
        });
    }
    load(callback) {
        if (typeof callback === 'function')
            this._ptr.load(callback);
        else
            return this._ptr.load();
    }
}
exports.File = File;
/**
 * @static
 * @type {string}
 * @memberof File
 */
File._constructorName = 'File';
//# sourceMappingURL=File.js.map