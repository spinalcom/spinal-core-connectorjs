"use strict";
/*
 * Copyright 2026 SpinalCom - www.spinalcom.com
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.HubConnection = void 0;
var getUrlPath_1 = require("../Utils/getUrlPath");
var waitTimeout_1 = require("../Utils/waitTimeout");
var FileSystem_1 = require("./FileSystem");
// values of FileSystem._session_num before the hub gave a session
var NO_SESSION = -2;
var OPENING_SESSION = -1;
// http errors in a row before the session is considered lost
var MAX_HTTP_ERRORS = 3;
// a long outage logs once every LOG_INTERVAL ms
var LOG_INTERVAL = 30000;
/**
 * The life of the connection of a FileSystem to the hub : sending the queued
 * commands, the long poll of the changes, and what happens when the hub stops
 * answering or restarts.
 *
 * The hub keeps its sessions in memory : once restarted, it no longer knows
 * the session of the program. Instead of giving up, the connection then opens
 * a new session, sends what changed meanwhile, and loads back the models in
 * memory, keeping their instances, so that the hub sends their changes again.
 * While the hub does not answer, what could not be sent is kept and sent once
 * it answers again.
 *
 * Settings : FileSystem.auto_reconnect, poll_timeout, send_timeout,
 * reconnect_max_delay, resync_batch_size, replay_window.
 * @export
 * @class HubConnection
 */
var HubConnection = /** @class */ (function () {
    /**
     * @param {FileSystem} fs
     * @param {(string | number)} [userid] with password, opens the new sessions
     * @param {string} [password]
     */
    function HubConnection(fs, userid, password) {
        this.fs = fs;
        this.userid = userid;
        this.password = password;
        this.state = 'connecting';
        this.since = Date.now();
        this.disconnections = 0;
        this.sessionsOpened = 0;
        this.lastError = null;
        this.lastResync = null;
        // current wait between two attempts, 0 while the hub answers
        this.retryDelay = 0;
        // no data is sent before this date
        this.retryAt = 0;
        this.retryTimer = null;
        // first failure of the current outage, 0 when there is none
        this.failingSince = 0;
        // when the program lost the hub, 0 while it has it
        this.lostAt = 0;
        this.lastFailureLog = 0;
        this.sendHttpErrors = 0;
        this.sessionWaiters = [];
        // bumped by every new session, it stops the resync of an older one
        this.generation = 0;
        this.reopening = false;
        this.resyncing = false;
        this.closed = false;
        this.inFlight = new Set();
        // last answer of the hub, and the last one of the session it dropped
        this.answeredAt = 0;
        this.droppedSessionAnsweredAt = 0;
        // the models changed locally, oldest first, with the date of their change
        this.recentChanges = new Map();
        // the models changed locally while resyncing, with the tick of their change
        this.localChanges = new Map();
        this.tick = 0;
        // the loads of the resync : they end the next batch, after every change made
        // before it leaves, so that the state the hub answers with includes them
        this.pendingLoads = '';
        // while the hub does not answer, the changed models stay in
        // FileSystem._objects_to_send (only their last state will be sent) and what
        // the program asks waits here, to be sent after them
        this.deferring = false;
        this.deferred = '';
        var url = (0, getUrlPath_1.getUrlPath)(fs._protocol, fs._url, fs._port);
        this.hubUrl = url.slice(0, url.length - FileSystem_1.FileSystem.url_com.length);
        if (isOpenSession(fs._session_num)) {
            this.state = 'connected';
            this.sessionsOpened = 1;
        }
    }
    HubConnection.prototype.getStatus = function () {
        return {
            state: this.state,
            since: this.since,
            hub: this.hubUrl,
            disconnections: this.disconnections,
            sessionsOpened: this.sessionsOpened,
            lastError: this.lastError,
            lastResync: this.lastResync
        };
    };
    /** true while the hub does not answer : see defer */
    HubConnection.prototype.isDeferring = function () {
        return this.deferring;
    };
    /**
     * Keeps a command issued while the hub does not answer. It is sent after the
     * last state of the models changed meanwhile, so that a load answered by the
     * hub has the local changes made before it.
     */
    HubConnection.prototype.defer = function (data) {
        this.deferred += data;
    };
    /** no request leaves anymore and the long poll never resolves */
    HubConnection.prototype.close = function () {
        if (this.closed)
            return;
        this.closed = true;
        if (this.retryTimer)
            clearTimeout(this.retryTimer);
        this.inFlight.forEach(function (controller) { return controller.abort(); });
        this.setState('closed');
    };
    /**
     * Sends the queued commands, and keeps them when the hub does not take them.
     * @return {*}  {Promise<void>}
     * @memberof HubConnection
     */
    HubConnection.prototype.sendQueuedData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fs, protectFrom, batch, session, opening, loads, body, responseText, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fs = this.fs;
                        if (this.closed)
                            return [2 /*return*/];
                        if (fs._data_to_send.length === 0 && this.pendingLoads.length === 0)
                            return [2 /*return*/];
                        // a session is being opened, the data leaves with it
                        if (fs._session_num === OPENING_SESSION)
                            return [2 /*return*/];
                        // the hub did not answer the last attempt, the data waits for the next one
                        if (Date.now() < this.retryAt)
                            return [2 /*return*/, this.scheduleRetry()];
                        // while resyncing, the hub answers the loads with the state of the models
                        // at the end of the batch : the changes made before it leaves go in it,
                        // the ones made after are protected when the answer is applied
                        if (this.resyncing)
                            flushLocalChanges();
                        protectFrom = this.resyncing ? this.tick : undefined;
                        FileSystem_1.FileSystem._sending_data = true;
                        batch = fs._data_to_send;
                        fs._data_to_send = '';
                        session = fs._session_num;
                        opening = session === NO_SESSION;
                        loads = opening ? '' : this.pendingLoads;
                        if (!opening)
                            this.pendingLoads = '';
                        body = opening ? "".concat(batch, "E ") : "s ".concat(session, " ").concat(batch).concat(loads, "E ");
                        if (opening)
                            fs._session_num = OPENING_SESSION;
                        if (FileSystem_1.FileSystem._disp)
                            console.log('sent ->', body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.request('post', '', body, FileSystem_1.FileSystem.send_timeout)];
                    case 2:
                        responseText = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        // the hub did not process the batch, or there is no way to know : it is
                        // sent again. A load is answered again and a write carries the whole
                        // state of its model, so a batch processed twice does no harm.
                        fs._data_to_send = batch + fs._data_to_send;
                        this.pendingLoads = loads + this.pendingLoads;
                        if (opening)
                            fs._session_num = NO_SESSION;
                        this.onSendFailed(error_1, opening, session);
                        return [2 /*return*/];
                    case 4:
                        this.sendHttpErrors = 0;
                        this.onHubAnswered();
                        this.applyResponse(responseText, protectFrom);
                        if (!opening)
                            return [2 /*return*/];
                        if (!isOpenSession(fs._session_num)) {
                            fs._session_num = NO_SESSION;
                            fs._data_to_send = batch + fs._data_to_send;
                            this.noteFailure(new Error('no session in the answer'), 'cannot open a session with the hub');
                            this.backOff();
                            return [2 /*return*/];
                        }
                        if (this.lastError) {
                            console.log("[hub] connected to ".concat(this.hubUrl, ", ").concat(seconds(Date.now() - this.since), " after the first attempt"));
                        }
                        this.sessionOpened();
                        this.setState('connected');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Resolves with the next push of the hub, retrying for as long as needed.
     * @return {*}  {Promise<string>}
     * @memberof HubConnection
     */
    HubConnection.prototype.pollChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var httpErrors, session, data, error_2, kind;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        httpErrors = 0;
                        _a.label = 1;
                    case 1:
                        if (!true) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.sessionOpen()];
                    case 2:
                        _a.sent();
                        session = this.fs._session_num;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 7]);
                        return [4 /*yield*/, this.request('get', "?s=".concat(session), undefined, FileSystem_1.FileSystem.poll_timeout)];
                    case 4:
                        data = _a.sent();
                        this.onHubAnswered();
                        return [2 /*return*/, data];
                    case 5:
                        error_2 = _a.sent();
                        // the session was replaced while waiting, poll with the new one
                        if (session !== this.fs._session_num)
                            return [3 /*break*/, 1];
                        kind = classify(error_2);
                        if (kind === 'rejected' || (kind === 'http' && ++httpErrors >= MAX_HTTP_ERRORS)) {
                            httpErrors = 0;
                            this.onSessionRejected(session, error_2);
                            return [3 /*break*/, 1];
                        }
                        this.onUnreachable(error_2);
                        return [4 /*yield*/, (0, waitTimeout_1.waitTimeout)(this.backOff())];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /** called by FileSystem.signal_change for every local change */
    HubConnection.prototype.onLocalChange = function (model) {
        var e_1, _a;
        if (FileSystem_1.FileSystem.replay_window > 0) {
            // moved to the end : the map stays sorted by date
            this.recentChanges["delete"](model);
            this.recentChanges.set(model, Date.now());
            // counted from the last answer of the hub : while it does not answer, the
            // changes made just before it stopped are kept for the replay
            var keepFrom = this.answeredAt - FileSystem_1.FileSystem.replay_window;
            try {
                for (var _b = __values(this.recentChanges), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), oldest = _d[0], at = _d[1];
                    if (at >= keepFrom)
                        break;
                    this.recentChanges["delete"](oldest);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (this.resyncing)
            this.localChanges.set(model, ++this.tick);
    };
    HubConnection.prototype.applyResponse = function (responseText, protectFrom) {
        var e_2, _a;
        // the models changed locally after the batch left : the answer brings
        // their state from before the change, they get their local state back
        var changed = protectFrom === undefined ? [] : this.changedSince(protectFrom);
        var states = changed.map(snapshot);
        this.fs.send_data_eval(responseText, function () {
            changed.forEach(function (model, i) {
                return safely(function () { return restoreState(model, states[i]); }, 'restoring a local change');
            });
        });
        // the hub had the changes made before the batch left when it answered
        if (protectFrom !== undefined) {
            try {
                for (var _b = __values(this.localChanges), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), model = _d[0], tick = _d[1];
                    if (tick <= protectFrom)
                        this.localChanges["delete"](model);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    HubConnection.prototype.changedSince = function (tick) {
        var e_3, _a;
        var changed = [];
        try {
            for (var _b = __values(this.localChanges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), model = _d[0], at = _d[1];
                if (at > tick)
                    changed.push(model);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return changed;
    };
    HubConnection.prototype.onSendFailed = function (error, opening, session) {
        var kind = classify(error);
        if (opening) {
            // typically the hub is not up yet
            this.noteFailure(error, kind === 'rejected'
                ? "the hub refused the credentials of user ".concat(this.userid)
                : 'cannot open a session with the hub');
            if (this.waitedTooLong())
                return this.giveUp(4);
            this.backOff();
            return;
        }
        if (session !== this.fs._session_num) {
            // the session of the batch was replaced, the batch leaves with the new one
            FileSystem_1.FileSystem._send_data_to_hub_debounced();
            return;
        }
        if (kind !== 'unreachable' && !FileSystem_1.FileSystem.auto_reconnect)
            return this.giveUp(4);
        if (kind === 'rejected' || (kind === 'http' && ++this.sendHttpErrors >= MAX_HTTP_ERRORS)) {
            this.sendHttpErrors = 0;
            this.onSessionRejected(session, error);
            return;
        }
        this.onUnreachable(error);
        this.backOff();
    };
    HubConnection.prototype.onUnreachable = function (error) {
        this.noteFailure(error, "cannot reach the hub at ".concat(this.hubUrl));
        if (this.waitedTooLong())
            return this.giveUp(2);
        if (this.state === 'connected' || this.state === 'resyncing') {
            this.disconnections++;
            this.lostAt = this.lostAt || this.failingSince;
            this.setState('disconnected');
        }
    };
    HubConnection.prototype.onHubAnswered = function () {
        this.answeredAt = Date.now();
        this.retryDelay = 0;
        this.retryAt = 0;
        this.failingSince = 0;
        if (this.state === 'disconnected') {
            console.log("[hub] the hub answers again, ".concat(seconds(Date.now() - this.lostAt), " after it stopped answering, same session"));
            if (!this.resyncing)
                this.lostAt = 0;
            this.setState(this.resyncing ? 'resyncing' : 'connected');
        }
        // what was queued while the hub did not answer leaves now ; a new session
        // sends it once opened (sessionOpened)
        if (isOpenSession(this.fs._session_num))
            this.undefer();
        if (this.fs._data_to_send.length > 0 || this.pendingLoads.length > 0) {
            FileSystem_1.FileSystem._send_data_to_hub_debounced();
        }
    };
    HubConnection.prototype.onSessionRejected = function (session, error) {
        if (this.closed || this.reopening || session !== this.fs._session_num)
            return;
        this.lastError = { at: Date.now(), message: "the hub rejected the session: ".concat(describe(error)) };
        // a connection opened with a session id has no credentials to open another
        if (!FileSystem_1.FileSystem.auto_reconnect || this.userid == null || this.userid === '') {
            console.error("[hub] the hub no longer knows the session (".concat(describe(error), ")"));
            return this.giveUp(3);
        }
        console.warn("[hub] the hub no longer knows the session (".concat(describe(error), "), it probably restarted. Opening a new session, the program keeps running."));
        if (this.state === 'connected' || this.state === 'resyncing')
            this.disconnections++;
        this.lostAt = this.lostAt || Date.now();
        this.droppedSessionAnsweredAt = this.answeredAt;
        this.deferring = true;
        // holds the requests until the new session is open, and drops the ones of
        // the old session that are still waiting : their data is sent again
        this.fs._session_num = OPENING_SESSION;
        this.inFlight.forEach(function (controller) { return controller.abort(); });
        void this.reopenSession();
    };
    HubConnection.prototype.reopenSession = function () {
        return __awaiter(this, void 0, void 0, function () {
            var generation, answer, error_3, changedMeanwhile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.reopening = true;
                        generation = ++this.generation;
                        this.setState('reconnecting');
                        _a.label = 1;
                    case 1:
                        if (!!this.closed) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.request('post', '', "U ".concat(this.userid, " ").concat(this.password, " S ").concat(this.fs._num_inst, " E "), FileSystem_1.FileSystem.send_timeout)];
                    case 3:
                        answer = _a.sent();
                        this.onHubAnswered();
                        this.fs.send_data_eval(answer);
                        if (isOpenSession(this.fs._session_num))
                            return [3 /*break*/, 7];
                        this.fs._session_num = OPENING_SESSION;
                        this.noteFailure(new Error('no session in the answer'), 'cannot open a new session');
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        this.noteFailure(error_3, classify(error_3) === 'rejected'
                            ? "the hub refused the credentials of user ".concat(this.userid)
                            : 'cannot open a new session with the hub');
                        return [3 /*break*/, 5];
                    case 5: return [4 /*yield*/, (0, waitTimeout_1.waitTimeout)(this.backOff())];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 7:
                        this.reopening = false;
                        if (this.closed)
                            return [2 /*return*/];
                        console.log("[hub] new session opened, ".concat(seconds(Date.now() - this.lostAt), " after losing the hub"));
                        changedMeanwhile = FileSystem_1.FileSystem._objects_to_send.size;
                        this.replayRecentChanges();
                        this.sessionOpened(changedMeanwhile);
                        return [4 /*yield*/, this.resync(generation)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A restarting hub drops the changes it received during its last seconds,
     * although it acknowledged them. Sends again the state of the models this
     * program changed shortly before the hub stopped answering : a write carries
     * the whole state of its model, and the memory has the changes the other
     * programs made until then. Only the changes of this program : sending again
     * a state it got from the hub could undo a change made since the restart.
     */
    HubConnection.prototype.replayRecentChanges = function () {
        var e_4, _a;
        if (FileSystem_1.FileSystem.replay_window <= 0)
            return;
        // from the last answer of the dropped session, however long the outage was
        var since = (this.droppedSessionAnsweredAt || Date.now()) - FileSystem_1.FileSystem.replay_window;
        var replayed = 0;
        try {
            for (var _b = __values(this.recentChanges), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), model = _d[0], at = _d[1];
                if (at < since)
                    continue;
                FileSystem_1.FileSystem._objects_to_send.set(model.model_id, model);
                replayed++;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        if (replayed > 0) {
            console.log("[hub] sending again ".concat(replayed, " models changed shortly before the hub restarted"));
        }
    };
    /**
     * A new session knows none of the models in memory, the hub sends their
     * changes only to the sessions that loaded them. Loads them back : the hub
     * answers with their current state, applied to the instances already in
     * memory, and sends their changes again from then on.
     */
    HubConnection.prototype.resync = function (generation) {
        return __awaiter(this, void 0, void 0, function () {
            var startedAt, roots, missing, loggedAt, _loop_1, this_1, i, state_1, types, _a, _b, _c, type, type, gone;
            var e_5, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        startedAt = Date.now();
                        this.resyncing = true;
                        this.setState('resyncing');
                        roots = collectRoots();
                        console.log("[hub] loading back ".concat(roots.length, " models to follow their changes again..."));
                        missing = [];
                        loggedAt = startedAt;
                        _loop_1 = function (i) {
                            var batch, found;
                            return __generator(this, function (_f) {
                                switch (_f.label) {
                                    case 0:
                                        // a newer session replaced this one, it runs its own resync
                                        if (generation !== this_1.generation || this_1.closed)
                                            return [2 /*return*/, { value: void 0 }];
                                        batch = roots.slice(i, i + FileSystem_1.FileSystem.resync_batch_size);
                                        return [4 /*yield*/, this_1.loadBack(batch)];
                                    case 1:
                                        found = _f.sent();
                                        found.forEach(function (ok, k) { return ok || missing.push(batch[k]); });
                                        if (Date.now() - loggedAt > 10000) {
                                            loggedAt = Date.now();
                                            console.log("[hub] loaded back ".concat(i + batch.length, "/").concat(roots.length, " models"));
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(i < roots.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        state_1 = _e.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        _e.label = 3;
                    case 3:
                        i += FileSystem_1.FileSystem.resync_batch_size;
                        return [3 /*break*/, 1];
                    case 4:
                        if (generation !== this.generation || this.closed)
                            return [2 /*return*/];
                        types = {};
                        try {
                            for (_a = __values(FileSystem_1.FileSystem._type_callbacks), _b = _a.next(); !_b.done; _b = _a.next()) {
                                _c = __read(_b.value, 1), type = _c[0];
                                types[type] = true;
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        for (type in types)
                            this.pendingLoads += "R 0 ".concat(type, " ");
                        if (this.pendingLoads.length > 0)
                            FileSystem_1.FileSystem._send_data_to_hub_debounced();
                        this.resyncing = false;
                        this.localChanges.clear();
                        this.lastResync = {
                            at: Date.now(),
                            durationMs: Date.now() - startedAt,
                            reloaded: roots.length,
                            missing: missing.length
                        };
                        if (this.state === 'resyncing')
                            this.setState('connected');
                        gone = missing.length
                            ? ", ".concat(missing.length, " no longer exist on the hub (").concat(missing.slice(0, 5).join(', ')).concat(missing.length > 5 ? ', ...' : '', ")")
                            : '';
                        console.log("[hub] back in sync, ".concat(seconds(Date.now() - this.lostAt), " after losing the hub: ").concat(roots.length, " models loaded back in ").concat(seconds(Date.now() - startedAt)).concat(gone));
                        this.lostAt = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    /** resolves, for each id, with false when the hub does not know it anymore */
    HubConnection.prototype.loadBack = function (ids) {
        var commands = '';
        var loaded = ids.map(function (id) {
            return new Promise(function (resolve) {
                var nb = FileSystem_1.FileSystem._nb_callbacks++;
                FileSystem_1.FileSystem._callbacks[nb] = function (model, isError) {
                    delete FileSystem_1.FileSystem._callbacks[nb];
                    resolve(!isError && model != null);
                };
                commands += "l ".concat(nb, " ").concat(id, " ");
            });
        });
        this.pendingLoads += commands;
        FileSystem_1.FileSystem._send_data_to_hub_debounced();
        return Promise.all(loaded);
    };
    HubConnection.prototype.sessionOpen = function () {
        var _this = this;
        // parks the long poll for good
        if (this.closed)
            return new Promise(function () { return undefined; });
        if (isOpenSession(this.fs._session_num))
            return Promise.resolve();
        return new Promise(function (resolve) { return _this.sessionWaiters.push(resolve); });
    };
    HubConnection.prototype.sessionOpened = function (changedMeanwhile) {
        this.sessionsOpened++;
        var waiters = this.sessionWaiters;
        this.sessionWaiters = [];
        waiters.forEach(function (resolve) { return resolve(); });
        // what was queued while no session was open leaves with this one
        this.undefer(changedMeanwhile);
        FileSystem_1.FileSystem._send_data_to_hub_debounced();
    };
    /**
     * The hub answers again : queues the last state of the models changed
     * meanwhile, then what the program asked meanwhile.
     */
    HubConnection.prototype.undefer = function (changed) {
        if (changed === void 0) { changed = FileSystem_1.FileSystem._objects_to_send.size; }
        if (!this.deferring)
            return;
        this.deferring = false;
        if (changed > 0) {
            console.log("[hub] sending the last state of ".concat(changed, " models changed while the hub did not answer"));
        }
        flushLocalChanges();
        this.fs._data_to_send += this.deferred;
        this.deferred = '';
        FileSystem_1.FileSystem._send_data_to_hub_debounced();
    };
    /** with auto_reconnect off, the connection gives up after _timeout_reconnect */
    HubConnection.prototype.waitedTooLong = function () {
        return (!FileSystem_1.FileSystem.auto_reconnect &&
            this.failingSince > 0 &&
            Date.now() - this.failingSince > FileSystem_1.FileSystem._timeout_reconnect);
    };
    /**
     * The behaviour without reconnection : FileSystem.onConnectionError, whose
     * default handler exits the process in Node and asks to reload the page in
     * a browser.
     */
    HubConnection.prototype.giveUp = function (code) {
        this.close();
        FileSystem_1.FileSystem.onConnectionError(code);
    };
    /** grows the wait before the next attempt, returns it */
    HubConnection.prototype.backOff = function () {
        this.retryDelay = Math.min(Math.max(500, FileSystem_1.FileSystem.reconnect_max_delay), this.retryDelay ? this.retryDelay * 2 : 500);
        // spread the attempts of the programs reconnecting to the same hub
        var delay = this.retryDelay * (0.8 + Math.random() * 0.4);
        this.retryAt = Date.now() + delay;
        this.scheduleRetry();
        return delay;
    };
    HubConnection.prototype.scheduleRetry = function () {
        var _this = this;
        if (this.retryTimer || this.closed)
            return;
        this.retryTimer = setTimeout(function () {
            _this.retryTimer = null;
            FileSystem_1.FileSystem._send_data_to_hub_debounced();
        }, Math.max(0, this.retryAt - Date.now()));
    };
    /** records a failure, logs the first one of an outage then every LOG_INTERVAL */
    HubConnection.prototype.noteFailure = function (error, what) {
        // the requests close() aborts are no failure
        if (this.closed)
            return;
        this.deferring = true;
        var now = Date.now();
        this.lastError = { at: now, message: "".concat(what, ": ").concat(describe(error)) };
        var first = this.failingSince === 0;
        if (first)
            this.failingSince = now;
        if (!first && now - this.lastFailureLog < LOG_INTERVAL)
            return;
        this.lastFailureLog = now;
        var since = first ? '' : " for ".concat(seconds(now - this.failingSince));
        var next = FileSystem_1.FileSystem.auto_reconnect ? ', retrying. The program keeps running with what it has in memory.' : '';
        console.error("[hub] ".concat(what, " (").concat(describe(error), ")").concat(since).concat(next));
    };
    HubConnection.prototype.setState = function (state) {
        var _this = this;
        if (this.state === state)
            return;
        this.state = state;
        this.since = Date.now();
        var status = this.getStatus();
        safely(function () { return FileSystem_1.FileSystem.onConnectionStateChange(status, _this.fs); }, 'FileSystem.onConnectionStateChange');
    };
    HubConnection.prototype.request = function (method, query, body, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var fs, controller, url, config, response, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fs = this.fs;
                        controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
                        if (controller)
                            this.inFlight.add(controller);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, , 6, 7]);
                        url = (0, getUrlPath_1.getUrlPath)(fs._protocol, fs._url, fs._port, query);
                        config = {
                            timeout: timeout,
                            signal: controller === null || controller === void 0 ? void 0 : controller.signal,
                            // the hub answers with javascript, never parse it as json
                            responseType: 'text'
                        };
                        if (!(method === 'post')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs._axiosInst.post(url, body, __assign(__assign({}, config), { headers: { 'Content-Type': 'text/plain', authorization: fs._accessToken } }))];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fs._axiosInst.get(url, config)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        response = _a;
                        return [2 /*return*/, typeof response.data === 'string' ? response.data : ''];
                    case 6:
                        if (controller)
                            this.inFlight["delete"](controller);
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return HubConnection;
}());
exports.HubConnection = HubConnection;
/** queues the local changes not sent yet, the connector waits 250ms otherwise */
function flushLocalChanges() {
    var left = FileSystem_1.FileSystem._objects_to_send.size;
    while (left > 0) {
        FileSystem_1.FileSystem._send_chan();
        // nothing queued : the hub does not answer, the changes wait
        if (FileSystem_1.FileSystem._objects_to_send.size >= left)
            return;
        left = FileSystem_1.FileSystem._objects_to_send.size;
    }
}
/** the local state of a model, holding its sub models by reference */
function snapshot(model) {
    var e_6, _a;
    // Val, Str, Bool and the typed arrays
    if ('_data' in model) {
        var value = model.get();
        return { kind: 'value', value: ArrayBuffer.isView(value) ? value.slice() : value };
    }
    if (typeof model.set_or_push === 'function') {
        var items = [];
        for (var i = 0; i < model.length; i++)
            items.push(model[i]);
        return { kind: 'items', items: items };
    }
    if (model.data && 'value' in model.data) {
        return { kind: 'pointer', value: model.data.value, model: model.data.model };
    }
    var attributes = {};
    try {
        for (var _b = __values(model._attribute_names), _c = _b.next(); !_c.done; _c = _b.next()) {
            var name_1 = _c.value;
            attributes[name_1] = model[name_1];
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return { kind: 'attributes', attributes: attributes };
}
/**
 * Puts a local state back, with the sub models it held. Done with the changes
 * signaled, so that it is sent to the hub again.
 */
function restoreState(model, state) {
    switch (state.kind) {
        case 'value':
            model.set(state.value);
            break;
        case 'items':
            state.items.forEach(function (item, i) { return model.set_or_push(i, item); });
            model.trim(state.items.length);
            break;
        case 'pointer':
            model.set(state.model != null ? state.model : state.value);
            break;
        case 'attributes':
            model.set_attr(state.attributes);
            break;
    }
}
/**
 * The models in memory no other model of the hub holds : the ones loaded by a
 * pointer or by a path. Loading them back sends everything they hold.
 */
function collectRoots() {
    var objects = FileSystem_1.FileSystem._objects;
    var roots = [];
    for (var key in objects) {
        var model = objects[key];
        if (model == null)
            continue;
        var sid = model._server_id;
        if (typeof sid !== 'number' || objects[sid] !== model)
            continue;
        if (!hasParentOnHub(model))
            roots.push(sid);
    }
    return roots;
}
function hasParentOnHub(model) {
    var e_7, _a;
    var objects = FileSystem_1.FileSystem._objects;
    try {
        for (var _b = __values(model._parents || []), _c = _b.next(); !_c.done; _c = _b.next()) {
            var parent_1 = _c.value;
            if (parent_1 && typeof parent_1._server_id === 'number' && objects[parent_1._server_id] === parent_1) {
                return true;
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return false;
}
function isOpenSession(session) {
    return session != null && session !== NO_SESSION && session !== OPENING_SESSION;
}
/**
 * - unreachable : no answer (refused, reset, timeout...)
 * - rejected    : the hub does not know the session or the credentials
 * - http        : any other error status
 */
function classify(error) {
    var _a;
    var status = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
    if (!status)
        return 'unreachable';
    if (status === 401 || status === 403)
        return 'rejected';
    // the hub answers the long poll of an unknown session with a 500 wrapping a 401
    if (/401 Unauthorized/.test(String(error.response.data)))
        return 'rejected';
    return 'http';
}
function describe(error) {
    var _a;
    if ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status)
        return "HTTP ".concat(error.response.status);
    if ((error === null || error === void 0 ? void 0 : error.code) === 'ECONNABORTED')
        return 'timeout';
    return (error === null || error === void 0 ? void 0 : error.code) || (error === null || error === void 0 ? void 0 : error.message) || String(error);
}
function safely(fn, what) {
    try {
        fn();
    }
    catch (error) {
        console.error("[hub] error in ".concat(what), error);
    }
}
function seconds(ms) {
    return "".concat((ms / 1000).toFixed(1), "s");
}
//# sourceMappingURL=HubConnection.js.map