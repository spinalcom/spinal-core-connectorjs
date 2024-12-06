"use strict";
/*
 * Copyright 2024 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Software license Agreement ("Agreement")
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
exports.__esModule = true;
exports.SpinalEventEmitter = void 0;
/**
 * SpinalEventEmitter is a singleton class that allows to emit and listen to events
 * @export
 * @class SpinalEventEmitter
 */
var SpinalEventEmitter = /** @class */ (function () {
    function SpinalEventEmitter() {
        this.emitter = mitt();
        this.on = this.emitter.on;
        this.off = this.emitter.off;
        this.emit = this.emitter.emit;
    }
    SpinalEventEmitter.getInstance = function () {
        if (!SpinalEventEmitter.instance)
            SpinalEventEmitter.instance = new SpinalEventEmitter();
        return SpinalEventEmitter.instance;
    };
    SpinalEventEmitter.prototype.waitEvt = function (evt) {
        var _this = this;
        var ev = this.emitter;
        return new Promise(function (resolve) {
            function listener() {
                ev.off(evt, listener);
                resolve(arguments);
            }
            _this.emitter.on(evt, listener);
        });
    };
    return SpinalEventEmitter;
}());
exports.SpinalEventEmitter = SpinalEventEmitter;
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
function mitt(all) {
    all = all || new Map();
    return {
        /**
         * A Map of event names to registered handler functions.
         */
        all: all,
        /**
         * Register an event handler for the given type.
         * @param {string|symbol} type Type of event to listen for, or `'*'` for all events
         * @param {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on: function (type, handler) {
            var handlers = all.get(type);
            if (handlers) {
                handlers.push(handler);
            }
            else {
                all.set(type, [handler]);
            }
        },
        /**
         * Remove an event handler for the given type.
         * If `handler` is omitted, all handlers of the given type are removed.
         * @param {string|symbol} type Type of event to unregister `handler` from (`'*'` to remove a wildcard handler)
         * @param {Function} [handler] Handler function to remove
         * @memberOf mitt
         */
        off: function (type, handler) {
            var handlers = all.get(type);
            if (handlers) {
                if (handler) {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                }
                else {
                    all.set(type, []);
                }
            }
        },
        /**
         * Invoke all handlers for the given type.
         * If present, `'*'` handlers are invoked after type-matched handlers.
         *
         * Note: Manually firing '*' handlers is not supported.
         *
         * @param {string|symbol} type The event type to invoke
         * @param {Any} [evt] Any value (object is recommended and powerful), passed to each handler
         * @memberOf mitt
         */
        emit: function (type, evt) {
            var handlers = all.get(type);
            if (handlers) {
                handlers
                    .slice()
                    .map(function (handler) {
                    handler(evt);
                });
            }
            handlers = all.get('*');
            if (handlers) {
                handlers
                    .slice()
                    .map(function (handler) {
                    handler(type, evt);
                });
            }
        }
    };
}
//# sourceMappingURL=SpinalEventEmitter.js.map