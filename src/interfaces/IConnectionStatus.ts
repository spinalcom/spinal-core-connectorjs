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
export type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
  | 'resyncing'
  | 'closed';

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
  lastError: { at: number; message: string } | null;
  lastResync: {
    at: number;
    durationMs: number;
    /** models loaded back, each with everything it holds */
    reloaded: number;
    /** models in memory the hub does not know anymore */
    missing: number;
  } | null;
}
