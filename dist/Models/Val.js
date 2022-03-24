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
exports.Val = void 0;
const Obj_1 = require("./Obj");
/**
 * representation of a number
 * @export
 * @class Val
 * @extends {Obj<number>}
 */
class Val extends Obj_1.Obj {
    /**
     * Creates an instance of Val.
     * @param {(number | Val)} [data=0]
     * @memberof Val
     */
    constructor(data = 0) {
        super();
        this._constructorName = Val._constructorName;
        this._set(data);
    }
    /**
     * toggle true / false ( 1 / 0 )
     * @return {*}  {boolean}
     * @memberof Val
     */
    toggle() {
        return this.set(!this._data);
    }
    /**
     * @return {*}  {boolean}
     * @memberof Val
     */
    toBoolean() {
        return Boolean(this._data);
    }
    /**
     * @return {*}  {Val}
     * @memberof Val
     */
    deep_copy() {
        return new Val(this._data);
    }
    /**
     * @param {number} v
     * @memberof Val
     */
    add(v) {
        if (v) {
            this._data += v;
            this._signal_change();
        }
    }
    /**
     * we do not take _set from Obj because we want a conversion if value is not a number
     * @protected
     * @param {(string | boolean | number | Val)} value
     * @return {*}  {boolean}
     * @memberof Val
     */
    _set(value) {
        let n;
        if (typeof value === 'string' || typeof value === 'boolean') {
            n = Number(value);
            if (isNaN(n))
                console.log(`Don't know how to transform ${value} to a Val`);
        }
        else if (value instanceof Val)
            n = value._data;
        else
            n = value;
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
}
exports.Val = Val;
Val._constructorName = 'Val';
//# sourceMappingURL=Val.js.map