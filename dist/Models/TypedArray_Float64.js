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
exports.TypedArray_Float64 = void 0;
const TypedArray_1 = require("./TypedArray");
/**
 * @export
 * @class TypedArray_Float64
 * @extends {TypedArray<Float64Array>}
 */
class TypedArray_Float64 extends TypedArray_1.TypedArray {
    /**
     * Creates an instance of TypedArray_Float64.
     * @param {(number | number[])} [size]
     * @param {Float64Array} [data]
     * @memberof TypedArray_Float64
     */
    constructor(size, data) {
        super(size, data);
    }
    /**
     * @return {*}  {typeof TypedArray_Float64}
     * @memberof TypedArray_Float64
     */
    base_type() {
        return TypedArray_Float64;
    }
    /**
     * @return {*}  {TypedArray_Float64}
     * @memberof TypedArray_Float64
     */
    deep_copy() {
        return new TypedArray_Float64(this._size, this._data);
    }
}
exports.TypedArray_Float64 = TypedArray_Float64;
TypedArray_Float64._constructorName = 'TypedArray_Float64';
//# sourceMappingURL=TypedArray_Float64.js.map