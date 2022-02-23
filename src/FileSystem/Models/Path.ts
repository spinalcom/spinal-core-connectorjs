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

import type { IFsData } from '../../interfaces/IFsData';
import { Model } from '../../Models/Model';
import type { Val } from '../../Models/Val';
import { FileSystem } from '../FileSystem';

export class Path extends Model {
  static readonly _constructorName: string = 'Path';
  readonly _constructorName: string = Path._constructorName;

  file?: File | Buffer;
  remaining: Val;
  to_upload: Val;

  // @file is optionnal. Must be a javascript File object
  constructor(file?: File | Buffer) {
    super();
    this.file = file;
    const size: number =
      this.file != null
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

  get_file_info(info: { remaining: Val; to_upload: Val }): void {
    info.remaining = this.remaining;
    info.to_upload = this.to_upload;
  }

  _get_fs_data(out: IFsData): void {
    super._get_fs_data(out);
    // permit to send the data after the server's answer
    if (this.file != null && this._server_id & 3) {
      FileSystem._files_to_upload[this._server_id] = this;
    }
  }
}
