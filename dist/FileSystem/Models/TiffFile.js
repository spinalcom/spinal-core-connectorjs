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
exports.TiffFile = void 0;
const File_1 = require("./File");
const Ptr_1 = require("./Ptr");
/**
 * @export
 * @class TiffFile
 * @extends {File<T>}
 * @template T
 */
class TiffFile extends File_1.File {
    /**
     * Creates an instance of TiffFile.
     * @param {string} [name='']
     * @param {number} [ptr_or_model=0]
     * @param {number} [ptr_tiff=0]
     * @param {*} [info={}]
     * @memberof TiffFile
     */
    constructor(name = '', ptr_or_model = 0, ptr_tiff = 0, info = {}) {
        super(name, ptr_or_model, info);
        /**
         * @type {string}
         * @memberof TiffFile
         */
        this._constructorName = TiffFile._constructorName;
        this.add_attr({
            _ptr_tiff: new Ptr_1.Ptr(ptr_tiff),
            _has_been_converted: 0,
        });
    }
    load_tiff(callback) {
        this._ptr_tiff.load(callback);
    }
}
exports.TiffFile = TiffFile;
/**
 * @static
 * @type {string}
 * @memberof TiffFile
 */
TiffFile._constructorName = 'TiffFile';
//# sourceMappingURL=TiffFile.js.map