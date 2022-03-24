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
exports.Directory = void 0;
const Lst_1 = require("../../Models/Lst");
const File_1 = require("./File");
const TiffFile_1 = require("./TiffFile");
/**
 * representation of a virtual Directory
 * @export
 * @class Directory
 * @extends {(Lst<File | TiffFile>)}
 */
class Directory extends Lst_1.Lst {
    constructor() {
        super();
        /**
         * @type {string}
         * @memberof Directory
         */
        this._constructorName = Directory._constructorName;
    }
    /**
     * @return {*}  {*}
     * @memberof Directory
     */
    base_type() {
        return File_1.File;
    }
    /**
     * @param {string} name
     * @return {*}  {(File | TiffFile)}
     * @memberof Directory
     */
    find(name) {
        for (let i = 0; i < this.length; i++) {
            const file = this[i];
            if (file.hasOwnProperty('name') && file.name.equals(name))
                return file;
        }
        return undefined;
    }
    /**
     * @param {string} name
     * @param {SpinalLoadCallBack<any>} callback
     * @memberof Directory
     */
    load(name, callback) {
        let f = this.find(name);
        if (f)
            f.load(callback);
        else
            callback(undefined, 'file does not exist');
    }
    has(name) {
        if (typeof name === 'string') {
            for (let i = 0; i < this.length; i++) {
                const file = this[i];
                if (file.name.equals(name))
                    return true;
            }
            return false;
        }
        for (let i = 0; i < this.length; i++) {
            if (name(this[i]))
                return true;
        }
        return false;
    }
    /**
     * @param {string} name
     * @param {*} obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {File}
     * @memberof Directory
     */
    add_file(name, obj, params = {}) {
        const f = this.find(name);
        if (f)
            return f;
        let res = new File_1.File(name, obj, params);
        this.push(res);
        return res;
    }
    /**
     * @param {string} name
     * @param {*} obj
     * @param {*} tiff_obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {TiffFile}
     * @memberof Directory
     */
    add_tiff_file(name, obj, tiff_obj, params = {}) {
        const f = this.find(name);
        if (f)
            return f;
        const res = new TiffFile_1.TiffFile(name, obj, tiff_obj, params);
        this.push(res);
        return res;
    }
    /**
     * @param {string} name
     * @param {*} obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {File}
     * @memberof Directory
     */
    force_add_file(name, obj, params = {}) {
        let num = 0;
        let filename = name;
        let f = this.find(filename);
        while (f) {
            filename = name + '_' + num;
            f = this.find(filename);
            if (f)
                num++;
        }
        let res = new File_1.File(filename, obj, params);
        this.push(res);
        return res;
    }
    /**
     * @param {*} info
     * @return {*}  {string}
     * @memberof Directory
     */
    get_file_info(info) {
        return (info.icon = 'folder');
    }
}
exports.Directory = Directory;
/**
 * @static
 * @type {string}
 * @memberof Directory
 */
Directory._constructorName = 'Directory';
//# sourceMappingURL=Directory.js.map