/**
 * - connecting   : the first session is not open yet
 * - connected    : the hub answers and knows the session
 * - disconnected : the hub does not answer, the session may still be valid
 * - reconnecting : the hub no longer knows the session (it restarted), a new
 *                  one is being opened
 * - resyncing    : the new session is open, the models in memory are being
 *                  loaded back so that the hub sends their changes again
 * - closed       : the connection gave up (see FileSystem.onConnectionError)
 *                  or was closed
 */
export declare type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'resyncing' | 'closed';
export interface IConnectionStatus {
    state: ConnectionState;
    /** when the connection entered this state (ms timestamp) */
    since: number;
    /** the url of the hub, without the credentials */
    hub: string;
    /** times the hub stopped answering or dropped the session */
    disconnections: number;
    /** sessions opened, the first one included */
    sessionsOpened: number;
    lastError: {
        at: number;
        message: string;
    } | null;
    lastResync: {
        at: number;
        durationMs: number;
        /** models loaded back, each with everything it holds */
        reloaded: number;
        /** models in memory the hub does not know anymore */
        missing: number;
    } | null;
}
