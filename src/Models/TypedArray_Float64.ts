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

import { TypedArray } from './TypedArray';

export class TypedArray_Float64 extends TypedArray<Float64Array> {
  static readonly _constructorName: string = 'TypedArray_Float64';
  readonly _constructorName: string = TypedArray_Float64._constructorName;

  constructor(size?: number | number[], data?: Float64Array) {
    super(size, data);
  }

  base_type(): typeof TypedArray_Float64 {
    return TypedArray_Float64;
  }

  deep_copy(): TypedArray_Float64 {
    return new TypedArray_Float64(this._size, this._data);
  }
}
