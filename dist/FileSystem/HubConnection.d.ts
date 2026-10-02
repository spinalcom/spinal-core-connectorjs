import type { IConnectionStatus } from '../interfaces/IConnectionStatus';
import type { Model } from '../Models/Model';
import { FileSystem } from './FileSystem';
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
export declare class HubConnection {
    private readonly fs;
    private readonly userid?;
    private readonly password?;
    private state;
    private since;
    private disconnections;
    private sessionsOpened;
    private lastError;
    private lastResync;
    private readonly hubUrl;
    private retryDelay;
    private retryAt;
    private retryTimer;
    private failingSince;
    private lostAt;
    private lastFailureLog;
    private sendHttpErrors;
    private sessionWaiters;
    private generation;
    private reopening;
    private resyncing;
    private closed;
    private readonly inFlight;
    private answeredAt;
    private droppedSessionAnsweredAt;
    private readonly recentChanges;
    private readonly localChanges;
    private tick;
    private pendingLoads;
    /**
     * @param {FileSystem} fs
     * @param {(string | number)} [userid] with password, opens the new sessions
     * @param {string} [password]
     */
    constructor(fs: FileSystem, userid?: string | number, password?: string);
    getStatus(): IConnectionStatus;
    /** no request leaves anymore and the long poll never resolves */
    close(): void;
    /**
     * Sends the queued commands, and keeps them when the hub does not take them.
     * @return {*}  {Promise<void>}
     * @memberof HubConnection
     */
    sendQueuedData(): Promise<void>;
    /**
     * Resolves with the next push of the hub, retrying for as long as needed.
     * @return {*}  {Promise<string>}
     * @memberof HubConnection
     */
    pollChannel(): Promise<string>;
    /** called by FileSystem.signal_change for every local change */
    onLocalChange(model: Model): void;
    private applyResponse;
    private changedSince;
    private onSendFailed;
    private onUnreachable;
    private onHubAnswered;
    private onSessionRejected;
    private reopenSession;
    /**
     * A restarting hub drops the changes it received during its last seconds,
     * although it acknowledged them. Sends again the state of the models this
     * program changed shortly before the hub stopped answering : a write carries
     * the whole state of its model, and the memory has the changes the other
     * programs made until then. Only the changes of this program : sending again
     * a state it got from the hub could undo a change made since the restart.
     */
    private replayRecentChanges;
    /**
     * A new session knows none of the models in memory, the hub sends their
     * changes only to the sessions that loaded them. Loads them back : the hub
     * answers with their current state, applied to the instances already in
     * memory, and sends their changes again from then on.
     */
    private resync;
    /** resolves, for each id, with false when the hub does not know it anymore */
    private loadBack;
    private sessionOpen;
    private sessionOpened;
    /** with auto_reconnect off, the connection gives up after _timeout_reconnect */
    private waitedTooLong;
    /**
     * The behaviour without reconnection : FileSystem.onConnectionError, whose
     * default handler exits the process in Node and asks to reload the page in
     * a browser.
     */
    private giveUp;
    /** grows the wait before the next attempt, returns it */
    private backOff;
    private scheduleRetry;
    /** records a failure, logs the first one of an outage then every LOG_INTERVAL */
    private noteFailure;
    private setState;
    private request;
}
