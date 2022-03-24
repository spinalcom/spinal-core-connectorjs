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
exports.Path = void 0;
const Model_1 = require("../../Models/Model");
const FileSystem_1 = require("../FileSystem");
/**
 * representation of a file to upload
 * @export
 * @class Path
 * @extends {Model}
 */
class Path extends Model_1.Model {
    /**
     * Creates an instance of Path.
     * @param {(File | Buffer)} [file]
     * @memberof Path
     */
    constructor(file) {
        super();
        /**
         * @type {string}
         * @memberof Path
         */
        this._constructorName = Path._constructorName;
        this.file = file;
        const size = this.file != null
            ? // @ts-ignore
                this.file.fileSize != null
                    ? // @ts-ignore
                        this.file.fileSize
                    : // @ts-ignore
                        this.file.size
            : 0;
        this.add_attr({
            remaining: size,
            to_upload: size,
        });
    }
    /**
     * @param {{ remaining: Val; to_upload: Val }} info
     * @memberof Path
     */
    get_file_info(info) {
        info.remaining = this.remaining;
        info.to_upload = this.to_upload;
    }
    /**
     * @param {IFsData} out
     * @memberof Path
     */
    _get_fs_data(out) {
        super._get_fs_data(out);
        // permit to send the data after the server's answer
        if (this.file != null && this._server_id & 3) {
            FileSystem_1.FileSystem._files_to_upload[this._server_id] = this;
        }
    }
}
exports.Path = Path;
/**
 * @static
 * @type {string}
 * @memberof Path
 */
Path._constructorName = 'Path';
//# sourceMappingURL=Path.js.map