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

import type {
  ConnectionState,
  IConnectionStatus,
} from '../interfaces/IConnectionStatus';
import type { Model } from '../Models/Model';
import { getUrlPath } from '../Utils/getUrlPath';
import { waitTimeout } from '../Utils/waitTimeout';
import { FileSystem } from './FileSystem';

// values of FileSystem._session_num before the hub gave a session
const NO_SESSION = -2;
const OPENING_SESSION = -1;
// http errors in a row before the session is considered lost
const MAX_HTTP_ERRORS = 3;
// a long outage logs once every LOG_INTERVAL ms
const LOG_INTERVAL = 30000;

type LocalState =
  | { kind: 'value'; value: any }
  | { kind: 'items'; items: Model[] }
  | { kind: 'pointer'; value: number; model: Model | undefined }
  | { kind: 'attributes'; attributes: { [name: string]: Model } };

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
export class HubConnection {
  private state: ConnectionState = 'connecting';
  private since = Date.now();
  private disconnections = 0;
  private sessionsOpened = 0;
  private lastError: IConnectionStatus['lastError'] = null;
  private lastResync: IConnectionStatus['lastResync'] = null;

  private readonly hubUrl: string;

  // current wait between two attempts, 0 while the hub answers
  private retryDelay = 0;
  // no data is sent before this date
  private retryAt = 0;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;
  // first failure of the current outage, 0 when there is none
  private failingSince = 0;
  // when the program lost the hub, 0 while it has it
  private lostAt = 0;
  private lastFailureLog = 0;
  private sendHttpErrors = 0;
  private sessionWaiters: (() => void)[] = [];
  // bumped by every new session, it stops the resync of an older one
  private generation = 0;
  private reopening = false;
  private resyncing = false;
  private closed = false;
  private readonly inFlight = new Set<AbortController>();
  // last answer of the hub, and the last one of the session it dropped
  private answeredAt = 0;
  private droppedSessionAnsweredAt = 0;
  // the models changed locally, oldest first, with the date of their change
  private readonly recentChanges = new Map<Model, number>();
  // the models changed locally while resyncing, with the tick of their change
  private readonly localChanges = new Map<Model, number>();
  private tick = 0;
  // the loads of the resync : they end the next batch, after every change made
  // before it leaves, so that the state the hub answers with includes them
  private pendingLoads = '';
  // while the hub does not answer, the changed models stay in
  // FileSystem._objects_to_send (only their last state will be sent) and what
  // the program asks waits here, to be sent after them
  private deferring = false;
  private deferred = '';

  /**
   * @param {FileSystem} fs
   * @param {(string | number)} [userid] with password, opens the new sessions
   * @param {string} [password]
   */
  constructor(
    private readonly fs: FileSystem,
    private readonly userid?: string | number,
    private readonly password?: string
  ) {
    const url = getUrlPath(fs._protocol, fs._url, fs._port);
    this.hubUrl = url.slice(0, url.length - FileSystem.url_com.length);
    if (isOpenSession(fs._session_num)) {
      this.state = 'connected';
      this.sessionsOpened = 1;
    }
  }

  getStatus(): IConnectionStatus {
    return {
      state: this.state,
      since: this.since,
      hub: this.hubUrl,
      disconnections: this.disconnections,
      sessionsOpened: this.sessionsOpened,
      lastError: this.lastError,
      lastResync: this.lastResync,
    };
  }

  /** true while the hub does not answer : see defer */
  isDeferring(): boolean {
    return this.deferring;
  }

  /**
   * Keeps a command issued while the hub does not answer. It is sent after the
   * last state of the models changed meanwhile, so that a load answered by the
   * hub has the local changes made before it.
   */
  defer(data: string): void {
    this.deferred += data;
  }

  /** no request leaves anymore and the long poll never resolves */
  close(): void {
    if (this.closed) return;
    this.closed = true;
    if (this.retryTimer) clearTimeout(this.retryTimer);
    this.inFlight.forEach((controller) => controller.abort());
    this.setState('closed');
  }

  /**
   * Sends the queued commands, and keeps them when the hub does not take them.
   * @return {*}  {Promise<void>}
   * @memberof HubConnection
   */
  async sendQueuedData(): Promise<void> {
    const fs = this.fs;
    if (this.closed) return;
    if (fs._data_to_send.length === 0 && this.pendingLoads.length === 0) return;
    // a session is being opened, the data leaves with it
    if (fs._session_num === OPENING_SESSION) return;
    // the hub did not answer the last attempt, the data waits for the next one
    if (Date.now() < this.retryAt) return this.scheduleRetry();

    // while resyncing, the hub answers the loads with the state of the models
    // at the end of the batch : the changes made before it leaves go in it,
    // the ones made after are protected when the answer is applied
    if (this.resyncing) flushLocalChanges();
    const protectFrom = this.resyncing ? this.tick : undefined;
    FileSystem._sending_data = true;
    const batch = fs._data_to_send;
    fs._data_to_send = '';
    const session = fs._session_num;
    // the first batch starts with the "U user password S n" opening the session
    const opening = session === NO_SESSION;
    const loads = opening ? '' : this.pendingLoads;
    if (!opening) this.pendingLoads = '';
    const body = opening ? `${batch}E ` : `s ${session} ${batch}${loads}E `;
    if (opening) fs._session_num = OPENING_SESSION;
    if (FileSystem._disp) console.log('sent ->', body);

    let responseText: string;
    try {
      responseText = await this.request('post', '', body, FileSystem.send_timeout);
    } catch (error) {
      // the hub did not process the batch, or there is no way to know : it is
      // sent again. A load is answered again and a write carries the whole
      // state of its model, so a batch processed twice does no harm.
      fs._data_to_send = batch + fs._data_to_send;
      this.pendingLoads = loads + this.pendingLoads;
      if (opening) fs._session_num = NO_SESSION;
      this.onSendFailed(error, opening, session);
      return;
    }

    this.sendHttpErrors = 0;
    this.onHubAnswered();
    this.applyResponse(responseText, protectFrom);
    if (!opening) return;
    if (!isOpenSession(fs._session_num)) {
      fs._session_num = NO_SESSION;
      fs._data_to_send = batch + fs._data_to_send;
      this.noteFailure(new Error('no session in the answer'), 'cannot open a session with the hub');
      this.backOff();
      return;
    }
    if (this.lastError) {
      console.log(`[hub] connected to ${this.hubUrl}, ${seconds(Date.now() - this.since)} after the first attempt`);
    }
    this.sessionOpened();
    this.setState('connected');
  }

  /**
   * Resolves with the next push of the hub, retrying for as long as needed.
   * @return {*}  {Promise<string>}
   * @memberof HubConnection
   */
  async pollChannel(): Promise<string> {
    let httpErrors = 0;
    while (true) {
      await this.sessionOpen();
      const session = this.fs._session_num;
      try {
        const data = await this.request('get', `?s=${session}`, undefined, FileSystem.poll_timeout);
        this.onHubAnswered();
        return data;
      } catch (error) {
        // the session was replaced while waiting, poll with the new one
        if (session !== this.fs._session_num) continue;
        const kind = classify(error);
        if (kind === 'rejected' || (kind === 'http' && ++httpErrors >= MAX_HTTP_ERRORS)) {
          httpErrors = 0;
          this.onSessionRejected(session, error);
          continue;
        }
        this.onUnreachable(error);
        await waitTimeout(this.backOff());
      }
    }
  }

  /** called by FileSystem.signal_change for every local change */
  onLocalChange(model: Model): void {
    if (FileSystem.replay_window > 0) {
      // moved to the end : the map stays sorted by date
      this.recentChanges.delete(model);
      this.recentChanges.set(model, Date.now());
      // counted from the last answer of the hub : while it does not answer, the
      // changes made just before it stopped are kept for the replay
      const keepFrom = this.answeredAt - FileSystem.replay_window;
      for (const [oldest, at] of this.recentChanges) {
        if (at >= keepFrom) break;
        this.recentChanges.delete(oldest);
      }
    }
    if (this.resyncing) this.localChanges.set(model, ++this.tick);
  }

  private applyResponse(responseText: string, protectFrom?: number): void {
    // the models changed locally after the batch left : the answer brings
    // their state from before the change, they get their local state back
    const changed = protectFrom === undefined ? [] : this.changedSince(protectFrom);
    const states = changed.map(snapshot);
    this.fs.send_data_eval(responseText, (): void => {
      changed.forEach((model, i) =>
        safely(() => restoreState(model, states[i]), 'restoring a local change')
      );
    });
    // the hub had the changes made before the batch left when it answered
    if (protectFrom !== undefined) {
      for (const [model, tick] of this.localChanges) {
        if (tick <= protectFrom) this.localChanges.delete(model);
      }
    }
  }

  private changedSince(tick: number): Model[] {
    const changed: Model[] = [];
    for (const [model, at] of this.localChanges) if (at > tick) changed.push(model);
    return changed;
  }

  private onSendFailed(error: any, opening: boolean, session: unknown): void {
    const kind = classify(error);
    if (opening) {
      // typically the hub is not up yet
      this.noteFailure(
        error,
        kind === 'rejected'
          ? `the hub refused the credentials of user ${this.userid}`
          : 'cannot open a session with the hub'
      );
      if (this.waitedTooLong()) return this.giveUp(4);
      this.backOff();
      return;
    }
    if (session !== this.fs._session_num) {
      // the session of the batch was replaced, the batch leaves with the new one
      FileSystem._send_data_to_hub_debounced();
      return;
    }
    if (kind !== 'unreachable' && !FileSystem.auto_reconnect) return this.giveUp(4);
    if (kind === 'rejected' || (kind === 'http' && ++this.sendHttpErrors >= MAX_HTTP_ERRORS)) {
      this.sendHttpErrors = 0;
      this.onSessionRejected(session, error);
      return;
    }
    this.onUnreachable(error);
    this.backOff();
  }

  private onUnreachable(error: any): void {
    this.noteFailure(error, `cannot reach the hub at ${this.hubUrl}`);
    if (this.waitedTooLong()) return this.giveUp(2);
    if (this.state === 'connected' || this.state === 'resyncing') {
      this.disconnections++;
      this.lostAt = this.lostAt || this.failingSince;
      this.setState('disconnected');
    }
  }

  private onHubAnswered(): void {
    this.answeredAt = Date.now();
    this.retryDelay = 0;
    this.retryAt = 0;
    this.failingSince = 0;
    if (this.state === 'disconnected') {
      console.log(`[hub] the hub answers again, ${seconds(Date.now() - this.lostAt)} after it stopped answering, same session`);
      if (!this.resyncing) this.lostAt = 0;
      this.setState(this.resyncing ? 'resyncing' : 'connected');
    }
    // what was queued while the hub did not answer leaves now ; a new session
    // sends it once opened (sessionOpened)
    if (isOpenSession(this.fs._session_num)) this.undefer();
    if (this.fs._data_to_send.length > 0 || this.pendingLoads.length > 0) {
      FileSystem._send_data_to_hub_debounced();
    }
  }

  private onSessionRejected(session: unknown, error: any): void {
    if (this.closed || this.reopening || session !== this.fs._session_num) return;
    this.lastError = { at: Date.now(), message: `the hub rejected the session: ${describe(error)}` };
    // a connection opened with a session id has no credentials to open another
    if (!FileSystem.auto_reconnect || this.userid == null || this.userid === '') {
      console.error(`[hub] the hub no longer knows the session (${describe(error)})`);
      return this.giveUp(3);
    }
    console.warn(
      `[hub] the hub no longer knows the session (${describe(error)}), it probably restarted. Opening a new session, the program keeps running.`
    );
    if (this.state === 'connected' || this.state === 'resyncing') this.disconnections++;
    this.lostAt = this.lostAt || Date.now();
    this.droppedSessionAnsweredAt = this.answeredAt;
    this.deferring = true;
    // holds the requests until the new session is open, and drops the ones of
    // the old session that are still waiting : their data is sent again
    this.fs._session_num = OPENING_SESSION;
    this.inFlight.forEach((controller) => controller.abort());
    void this.reopenSession();
  }

  private async reopenSession(): Promise<void> {
    this.reopening = true;
    const generation = ++this.generation;
    this.setState('reconnecting');
    while (!this.closed) {
      try {
        const answer = await this.request(
          'post',
          '',
          `U ${this.userid} ${this.password} S ${this.fs._num_inst} E `,
          FileSystem.send_timeout
        );
        this.onHubAnswered();
        this.fs.send_data_eval(answer);
        if (isOpenSession(this.fs._session_num)) break;
        this.fs._session_num = OPENING_SESSION;
        this.noteFailure(new Error('no session in the answer'), 'cannot open a new session');
      } catch (error) {
        this.noteFailure(
          error,
          classify(error) === 'rejected'
            ? `the hub refused the credentials of user ${this.userid}`
            : 'cannot open a new session with the hub'
        );
      }
      await waitTimeout(this.backOff());
    }
    this.reopening = false;
    if (this.closed) return;
    console.log(`[hub] new session opened, ${seconds(Date.now() - this.lostAt)} after losing the hub`);
    const changedMeanwhile = FileSystem._objects_to_send.size;
    this.replayRecentChanges();
    this.sessionOpened(changedMeanwhile);
    await this.resync(generation);
  }

  /**
   * A restarting hub drops the changes it received during its last seconds,
   * although it acknowledged them. Sends again the state of the models this
   * program changed shortly before the hub stopped answering : a write carries
   * the whole state of its model, and the memory has the changes the other
   * programs made until then. Only the changes of this program : sending again
   * a state it got from the hub could undo a change made since the restart.
   */
  private replayRecentChanges(): void {
    if (FileSystem.replay_window <= 0) return;
    // from the last answer of the dropped session, however long the outage was
    const since = (this.droppedSessionAnsweredAt || Date.now()) - FileSystem.replay_window;
    let replayed = 0;
    for (const [model, at] of this.recentChanges) {
      if (at < since) continue;
      FileSystem._objects_to_send.set(model.model_id, model);
      replayed++;
    }
    if (replayed > 0) {
      console.log(`[hub] sending again ${replayed} models changed shortly before the hub restarted`);
    }
  }

  /**
   * A new session knows none of the models in memory, the hub sends their
   * changes only to the sessions that loaded them. Loads them back : the hub
   * answers with their current state, applied to the instances already in
   * memory, and sends their changes again from then on.
   */
  private async resync(generation: number): Promise<void> {
    const startedAt = Date.now();
    this.resyncing = true;
    this.setState('resyncing');
    const roots = collectRoots();
    console.log(`[hub] loading back ${roots.length} models to follow their changes again...`);

    const missing: number[] = [];
    let loggedAt = startedAt;
    for (let i = 0; i < roots.length; i += FileSystem.resync_batch_size) {
      // a newer session replaced this one, it runs its own resync
      if (generation !== this.generation || this.closed) return;
      const batch = roots.slice(i, i + FileSystem.resync_batch_size);
      const found = await this.loadBack(batch);
      found.forEach((ok, k) => ok || missing.push(batch[k]));
      if (Date.now() - loggedAt > 10000) {
        loggedAt = Date.now();
        console.log(`[hub] loaded back ${i + batch.length}/${roots.length} models`);
      }
    }
    if (generation !== this.generation || this.closed) return;

    // the subscriptions to every model of a type belong to the session too
    const types: { [type: string]: boolean } = {};
    for (const [type] of FileSystem._type_callbacks) types[type] = true;
    for (const type in types) this.pendingLoads += `R 0 ${type} `;
    if (this.pendingLoads.length > 0) FileSystem._send_data_to_hub_debounced();

    this.resyncing = false;
    this.localChanges.clear();
    this.lastResync = {
      at: Date.now(),
      durationMs: Date.now() - startedAt,
      reloaded: roots.length,
      missing: missing.length,
    };
    if (this.state === 'resyncing') this.setState('connected');
    const gone = missing.length
      ? `, ${missing.length} no longer exist on the hub (${missing.slice(0, 5).join(', ')}${missing.length > 5 ? ', ...' : ''})`
      : '';
    console.log(
      `[hub] back in sync, ${seconds(Date.now() - this.lostAt)} after losing the hub: ${roots.length} models loaded back in ${seconds(Date.now() - startedAt)}${gone}`
    );
    this.lostAt = 0;
  }

  /** resolves, for each id, with false when the hub does not know it anymore */
  private loadBack(ids: number[]): Promise<boolean[]> {
    let commands = '';
    const loaded = ids.map(
      (id) =>
        new Promise<boolean>((resolve) => {
          const nb = FileSystem._nb_callbacks++;
          FileSystem._callbacks[nb] = (model: Model, isError?: boolean | string): void => {
            delete FileSystem._callbacks[nb];
            resolve(!isError && model != null);
          };
          commands += `l ${nb} ${id} `;
        })
    );
    this.pendingLoads += commands;
    FileSystem._send_data_to_hub_debounced();
    return Promise.all(loaded);
  }

  private sessionOpen(): Promise<void> {
    // parks the long poll for good
    if (this.closed) return new Promise((): void => undefined);
    if (isOpenSession(this.fs._session_num)) return Promise.resolve();
    return new Promise((resolve) => this.sessionWaiters.push(resolve));
  }

  private sessionOpened(changedMeanwhile?: number): void {
    this.sessionsOpened++;
    const waiters = this.sessionWaiters;
    this.sessionWaiters = [];
    waiters.forEach((resolve) => resolve());
    // what was queued while no session was open leaves with this one
    this.undefer(changedMeanwhile);
    FileSystem._send_data_to_hub_debounced();
  }

  /**
   * The hub answers again : queues the last state of the models changed
   * meanwhile, then what the program asked meanwhile.
   */
  private undefer(changed: number = FileSystem._objects_to_send.size): void {
    if (!this.deferring) return;
    this.deferring = false;
    if (changed > 0) {
      console.log(`[hub] sending the last state of ${changed} models changed while the hub did not answer`);
    }
    flushLocalChanges();
    this.fs._data_to_send += this.deferred;
    this.deferred = '';
    FileSystem._send_data_to_hub_debounced();
  }

  /** with auto_reconnect off, the connection gives up after _timeout_reconnect */
  private waitedTooLong(): boolean {
    return (
      !FileSystem.auto_reconnect &&
      this.failingSince > 0 &&
      Date.now() - this.failingSince > FileSystem._timeout_reconnect
    );
  }

  /**
   * The behaviour without reconnection : FileSystem.onConnectionError, whose
   * default handler exits the process in Node and asks to reload the page in
   * a browser.
   */
  private giveUp(code: number): void {
    this.close();
    FileSystem.onConnectionError(code);
  }

  /** grows the wait before the next attempt, returns it */
  private backOff(): number {
    this.retryDelay = Math.min(
      Math.max(500, FileSystem.reconnect_max_delay),
      this.retryDelay ? this.retryDelay * 2 : 500
    );
    // spread the attempts of the programs reconnecting to the same hub
    const delay = this.retryDelay * (0.8 + Math.random() * 0.4);
    this.retryAt = Date.now() + delay;
    this.scheduleRetry();
    return delay;
  }

  private scheduleRetry(): void {
    if (this.retryTimer || this.closed) return;
    this.retryTimer = setTimeout((): void => {
      this.retryTimer = null;
      FileSystem._send_data_to_hub_debounced();
    }, Math.max(0, this.retryAt - Date.now()));
  }

  /** records a failure, logs the first one of an outage then every LOG_INTERVAL */
  private noteFailure(error: any, what: string): void {
    // the requests close() aborts are no failure
    if (this.closed) return;
    this.deferring = true;
    const now = Date.now();
    this.lastError = { at: now, message: `${what}: ${describe(error)}` };
    const first = this.failingSince === 0;
    if (first) this.failingSince = now;
    if (!first && now - this.lastFailureLog < LOG_INTERVAL) return;
    this.lastFailureLog = now;
    const since = first ? '' : ` for ${seconds(now - this.failingSince)}`;
    const next = FileSystem.auto_reconnect ? ', retrying. The program keeps running with what it has in memory.' : '';
    console.error(`[hub] ${what} (${describe(error)})${since}${next}`);
  }

  private setState(state: ConnectionState): void {
    if (this.state === state) return;
    this.state = state;
    this.since = Date.now();
    const status = this.getStatus();
    safely(() => FileSystem.onConnectionStateChange(status, this.fs), 'FileSystem.onConnectionStateChange');
  }

  private async request(
    method: 'get' | 'post',
    query: string,
    body: string | undefined,
    timeout: number
  ): Promise<string> {
    const fs = this.fs;
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
    if (controller) this.inFlight.add(controller);
    try {
      const url = getUrlPath(fs._protocol, fs._url, fs._port, query);
      const config = {
        timeout,
        signal: controller?.signal,
        // the hub answers with javascript, never parse it as json
        responseType: 'text' as const,
      };
      const response =
        method === 'post'
          ? await fs._axiosInst.post<string>(url, body, {
              ...config,
              headers: { 'Content-Type': 'text/plain', authorization: fs._accessToken },
            })
          : await fs._axiosInst.get<string>(url, config);
      return typeof response.data === 'string' ? response.data : '';
    } finally {
      if (controller) this.inFlight.delete(controller);
    }
  }
}

/** queues the local changes not sent yet, the connector waits 250ms otherwise */
function flushLocalChanges(): void {
  let left = FileSystem._objects_to_send.size;
  while (left > 0) {
    FileSystem._send_chan();
    // nothing queued : the hub does not answer, the changes wait
    if (FileSystem._objects_to_send.size >= left) return;
    left = FileSystem._objects_to_send.size;
  }
}

/** the local state of a model, holding its sub models by reference */
function snapshot(model: any): LocalState {
  // Val, Str, Bool and the typed arrays
  if ('_data' in model) {
    const value = model.get();
    return { kind: 'value', value: ArrayBuffer.isView(value) ? (value as any).slice() : value };
  }
  if (typeof model.set_or_push === 'function') {
    const items: Model[] = [];
    for (let i = 0; i < model.length; i++) items.push(model[i]);
    return { kind: 'items', items };
  }
  if (model.data && 'value' in model.data) {
    return { kind: 'pointer', value: model.data.value, model: model.data.model };
  }
  const attributes: { [name: string]: Model } = {};
  for (const name of model._attribute_names) attributes[name] = model[name];
  return { kind: 'attributes', attributes };
}

/**
 * Puts a local state back, with the sub models it held. Done with the changes
 * signaled, so that it is sent to the hub again.
 */
function restoreState(model: any, state: LocalState): void {
  switch (state.kind) {
    case 'value':
      model.set(state.value);
      break;
    case 'items':
      state.items.forEach((item, i) => model.set_or_push(i, item));
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
function collectRoots(): number[] {
  const objects = FileSystem._objects;
  const roots: number[] = [];
  for (const key in objects) {
    const model = objects[key];
    if (model == null) continue;
    const sid = model._server_id;
    if (typeof sid !== 'number' || objects[sid] !== model) continue;
    if (!hasParentOnHub(model)) roots.push(sid);
  }
  return roots;
}

function hasParentOnHub(model: Model): boolean {
  const objects = FileSystem._objects;
  for (const parent of model._parents || []) {
    if (parent && typeof parent._server_id === 'number' && objects[parent._server_id] === parent) {
      return true;
    }
  }
  return false;
}

function isOpenSession(session: unknown): boolean {
  return session != null && session !== NO_SESSION && session !== OPENING_SESSION;
}

/**
 * - unreachable : no answer (refused, reset, timeout...)
 * - rejected    : the hub does not know the session or the credentials
 * - http        : any other error status
 */
function classify(error: any): 'unreachable' | 'rejected' | 'http' {
  const status = error?.response?.status;
  if (!status) return 'unreachable';
  if (status === 401 || status === 403) return 'rejected';
  // the hub answers the long poll of an unknown session with a 500 wrapping a 401
  if (/401 Unauthorized/.test(String(error.response.data))) return 'rejected';
  return 'http';
}

function describe(error: any): string {
  if (error?.response?.status) return `HTTP ${error.response.status}`;
  if (error?.code === 'ECONNABORTED') return 'timeout';
  return error?.code || error?.message || String(error);
}

function safely(fn: () => void, what: string): void {
  try {
    fn();
  } catch (error) {
    console.error(`[hub] error in ${what}`, error);
  }
}

function seconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}
