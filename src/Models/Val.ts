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

import { Obj } from './Obj';

export class Val extends Obj<number> {
  static readonly _constructorName: string = 'Val';
  readonly _constructorName: string = Val._constructorName;

  constructor(data: number | Val = 0) {
    super();
    this._set(data);
  }

  // toggle true / false ( 1 / 0 )
  toggle(): boolean {
    return this.set(!this._data);
  }

  toBoolean(): boolean {
    return Boolean(this._data);
  }

  deep_copy(): Val {
    return new Val(this._data);
  }

  add(v: number): void {
    if (v) {
      this._data += v;
      this._signal_change();
    }
  }

  // we do not take _set from Obj because we want a conversion if value is not a number
  _set(value: string | boolean | number | Val) {
    let n: number;
    if (typeof value === 'string' || typeof value === 'boolean') {
      n = Number(value);
      if (isNaN(n))
        console.log(`Don't know how to transform ${value} to a Val`);
    } else if (value instanceof Val) n = value._data;
    else n = value;
    if (this._data !== n) {
      this._data = n;
      return true;
    }
    return false;
  }
}
