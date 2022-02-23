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

import type { SpinalLoadCallBack } from '../../interfaces/SpinalLoadCallBack';
import type { Model } from '../../Models/Model';
import { File } from './File';
import { Ptr } from './Ptr';

export class TiffFile<T extends Model = any> extends File<T> {
  static readonly _constructorName: string = 'TiffFile';
  readonly _constructorName: string = TiffFile._constructorName;
  _ptr_tiff: Ptr;
  _has_been_converted: number;

  constructor(name = '', ptr_or_model = 0, ptr_tiff = 0, info = {}) {
    super(name, ptr_or_model, info);

    this.add_attr({
      _ptr_tiff: new Ptr(ptr_tiff),
      _has_been_converted: 0,
    });
  }
  load_tiff(callback: SpinalLoadCallBack<T>) {
    this._ptr_tiff.load(callback);
  }
}
