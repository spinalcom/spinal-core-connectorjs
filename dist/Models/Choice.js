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
exports.Choice = void 0;
const Model_1 = require("./Model");
/**
 * @export
 * @class Choice
 * @extends {Model}
 */
class Choice extends Model_1.Model {
    /**
     * Creates an instance of Choice.
     * @param {(Val | number)} [InitIdx]
     * @param {((string | Str)[])} [stringChoises]
     * @memberof Choice
     */
    constructor(InitIdx, stringChoises) {
        super();
        /**
         * @type {string}
         * @memberof Choice
         */
        this._constructorName = Choice._constructorName;
        // default
        this.add_attr({
            num: 0,
            lst: stringChoises,
        });
        // init
        if (InitIdx != null) {
            this.num.set(InitIdx);
        }
    }
    /**
     * @return {*}  {boolean}
     * @memberof Choice
     */
    filter() {
        return true;
    }
    /**
     * @return {*}  {Str} the seleected value
     * @memberof Choice
     */
    item() {
        return this.lst[this.num.get()];
    }
    /**
     * @return {*}  {string} the seleected value
     * @memberof Choice
     */
    get() {
        var _a;
        return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.get();
    }
    /**
     * @return {*}  {string}
     * @memberof Choice
     */
    toString() {
        var _a;
        return (_a = this.item()) === null || _a === void 0 ? void 0 : _a.toString();
    }
    /**
     * @param {(Choice | Str)} a
     * @return {*}  {boolean}
     * @memberof Choice
     */
    equals(a) {
        if (a instanceof Choice) {
            return super.equals(a);
        }
        else {
            return this.item().equals(a);
        }
    }
    /**
     * @protected
     * @param {(string | number)} value
     * @return {*}  {boolean}
     * @memberof Choice
     */
    _set(value) {
        for (let idx = 0; idx < this.lst.length; idx++) {
            const itm = this.lst[idx];
            if (itm.equals(value)) {
                return this.num.set(idx);
            }
        }
        return this.num.set(value);
    }
}
exports.Choice = Choice;
/**
 * @static
 * @type {string}
 * @memberof Choice
 */
Choice._constructorName = 'Choice';
//# sourceMappingURL=Choice.js.map