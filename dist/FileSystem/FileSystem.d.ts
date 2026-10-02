import type { IConnectionStatus } from '../interfaces/IConnectionStatus';
import type { IFsData } from '../interfaces/IFsData';
import type { IOptionFileSystemWithSessionId, IOptionFileSystemWithUser } from '../interfaces/IOptionFilesystem';
import type { SpinalLoadCallBack } from '../interfaces/SpinalLoadCallBack';
import type { Model } from '../Models/Model';
import { Directory } from './Models/Directory';
import type { Path } from './Models/Path';
import type { RightsItem } from './Models/RightsItem';
import { HubConnection } from './HubConnection';
import { AxiosInstance } from 'axios';
/**
 * intance of the connection to an server
 * @export
 * @class FileSystem
 */
export declare class FileSystem {
    static _constructorName: string;
    /**
     *  set to true to get warning for creating unknown Model type
     * @static
     * @type {boolean}
     * @memberof FileSystem
     */
    static debug: boolean;
    /**
     * if true, print the IO with the server
     * @static
     * @type {boolean}
     * @memberof FileSystem
     */
    static _disp: boolean;
    /**
     * @private
     * @static
     * @type {NewAlertMsg}
     * @memberof FileSystem
     */
    private static popup;
    /**
     * @private
     * @static
     * @type {number}
     * @memberof FileSystem
     */
    private static _cur_tmp_server_id;
    /**
     * if true, eval server response.
     * @static
     * @type {boolean}
     * @memberof FileSystem
     */
    static _sig_server: boolean;
    /**
     * @deprecated
     * @readonly
     * @static
     * @type {(string | number)}
     * @memberof FileSystem
     */
    static readonly _userid: string | number;
    /**
     * with auto_reconnect off, ms without an answer of the hub before giving up
     * @static
     * @type {number}
     * @default 30000
     * @memberof FileSystem
     */
    static _timeout_reconnect: number;
    /**
     * when the hub restarts or stops answering, keep the connection : retry, and
     * open a new session when the hub forgot the previous one. When false, the
     * connection gives up (see onConnectionError) like before.
     * @static
     * @type {boolean}
     * @default true
     * @memberof FileSystem
     */
    static auto_reconnect: boolean;
    /**
     * ms a long poll may stay unanswered before the hub is considered
     * unreachable, the hub answers them every 30s
     * @static
     * @type {number}
     * @default 120000
     * @memberof FileSystem
     */
    static poll_timeout: number;
    /**
     * ms a request sending data may stay unanswered, 0 to wait forever
     * @static
     * @type {number}
     * @default 600000
     * @memberof FileSystem
     */
    static send_timeout: number;
    /**
     * longest wait, in ms, between two attempts to reach the hub
     * @static
     * @type {number}
     * @default 10000
     * @memberof FileSystem
     */
    static reconnect_max_delay: number;
    /**
     * number of models loaded back per request once a new session is open
     * @static
     * @type {number}
     * @default 1000
     * @memberof FileSystem
     */
    static resync_batch_size: number;
    /**
     * ms : the models a program changed during the last replay_window before the
     * hub restarted are sent again, a restarting hub drops the changes it
     * acknowledged during its last seconds. 0 disables it.
     * @static
     * @type {number}
     * @default 10000
     * @memberof FileSystem
     */
    static replay_window: number;
    /**
     * @static
     * @type {boolean}
     * @memberof FileSystem
     */
    static is_cordova: boolean;
    /**
     * data are sent after a timeout (and are concatened before)
     * @static
     * @type Map<number, Model>
     * @memberof FileSystem
     */
    static _objects_to_send: Map<number, Model>;
    /**
     * functions to be called after an answer
     * @static
     * @type {number}
     * @memberof FileSystem
     */
    static _nb_callbacks: number;
    /**
     * @static
     * @type {{ [id: number]: SpinalLoadCallBack<Model> }}
     * @memberof FileSystem
     */
    static _callbacks: {
        [id: number]: SpinalLoadCallBack<Model>;
    };
    /**
     * @static
     * @type {[string, SpinalLoadCallBack<Model>][]}
     * @memberof FileSystem
     */
    static _type_callbacks: [string, SpinalLoadCallBack<Model>][];
    /**
     * number of instances of FileSystem
     * @private
     * @static
     * @type {number}
     * @memberof FileSystem
     */
    private static _nb_insts;
    /**
     * @private
     * @static
     * @type {{ [idInstance: number]: FileSystem }}
     * @memberof FileSystem
     */
    private static _insts;
    /**
     * ref to Path waiting to be registered before sending data
     * @static
     * @type {{ [key: number]: Path }}
     * @memberof FileSystem
     */
    static _files_to_upload: {
        [key: number]: Path;
    };
    /**
     * Ptr objects that need an update, associated with FileSystem_tmp_objects
     * @static
     * @type {{ [key: number]: Model }}
     * @memberof FileSystem
     */
    static _ptr_to_update: {
        [key: number]: Model;
    };
    /**
     * objects waiting for a real _server_id
     * @static
     * @type {{ [key: number]: Model }}
     * @memberof FileSystem
     */
    static _tmp_objects: {
        [key: number]: Model;
    };
    /**
     * _server_id -> object
     * @static
     * @type {{ [key: number]: Model }}
     * @memberof FileSystem
     */
    static _objects: {
        [key: number]: Model;
    };
    /**
     * @private
     * @type {string}
     * @memberof FileSystem
     */
    _url: string;
    /**
     * @private
     * @type {(string | number)}
     * @memberof FileSystem
     */
    _port: string | number;
    /**
     * @type {string}
     * @memberof FileSystem
     */
    _home_dir: string;
    /**
     * @private
     * @type {string}
     * @memberof FileSystem
     */
    _accessToken: string;
    /**
     * @static
     * @type {string}
     * @memberof FileSystem
     */
    static url_com: string;
    /**
     * @static
     * @type {string}
     * @memberof FileSystem
     */
    static url_upload: string;
    /**
     * conector type : Browser or Node
     * @static
     * @type {('Node' | 'Browser')}
     * @memberof FileSystem
     */
    static CONNECTOR_TYPE: 'Node' | 'Browser';
    _protocol: string;
    _data_to_send: string;
    _session_num: number;
    _num_inst: number;
    static _in_mk_chan_eval: boolean;
    _axiosInst: AxiosInstance;
    /**
     * the connection to the hub : sending, long poll, reconnection
     * @type {HubConnection}
     * @memberof FileSystem
     */
    _hub: HubConnection;
    static _sending_data: boolean;
    static _XMLHttpRequest: any;
    /**
     * debounce from set
     * @static
     * @memberof FileSystem
     */
    static _have_model_changed_debounced: import("lodash").DebouncedFunc<typeof FileSystem._model_changed_func>;
    /**
     * debounce from send
     * @static
     * @memberof FileSystem
     */
    static _send_data_to_hub_debounced: import("lodash").DebouncedFunc<typeof FileSystem._send_data_to_hub_func>;
    static send_model_limit: number;
    /**
     * max time (ms) send_data_eval waits for a referenced server_id to
     * materialise before giving up, so a never-arriving object can neither leak
     * its polling timer nor hang the awaiting callback forever.
     * @static
     * @memberof FileSystem
     */
    static _callback_wait_timeout: number;
    /**
     * keep-alive agents (Node only) so the TCP connection to the hub is reused
     * across the debounced write POSTs and the long-poll GETs instead of paying
     * a new handshake each time.
     * @static
     */
    static _httpAgent: any;
    static _httpsAgent: any;
    /**
     * Creates an instance of FileSystem.
     * @param {IOptionFileSystemWithSessionId} {
     *     protocol,
     *     url,
     *     port,
     *     home_dir,
     *     sessionId,
     *     accessToken,
     *   }
     * @memberof FileSystem
     */
    constructor({ protocol, url, port, home_dir, sessionId, accessToken, }: IOptionFileSystemWithSessionId);
    /**
     * Creates an instance of FileSystem.
     * @param {IOptionFileSystemWithUser} {
     *     protocol,
     *     url,
     *     port,
     *     userid,
     *     password,
     *     home_dir,
     *     accessToken,
     *   }
     * @memberof FileSystem
     */
    constructor({ protocol, url, port, userid, password, home_dir, accessToken, }: IOptionFileSystemWithUser);
    /**
     * Build (once) the Node http/https keep-alive agents. In the browser axios
     * ignores these, so we return nothing there.
     * @private
     * @static
     * @return {{ httpAgent?: any; httpsAgent?: any }}
     * @memberof FileSystem
     */
    private static _get_keep_alive_agents;
    /**
     * the state of the connection to the hub
     * @return {*}  {IConnectionStatus}
     * @memberof FileSystem
     */
    getConnectionStatus(): IConnectionStatus;
    /**
     * stops the connection : no request leaves anymore
     * @memberof FileSystem
     */
    close(): void;
    /**
     * load object in $path and call $callback with the corresponding model ref
     * @param {string} path
     * @return {*}  {Promise<Directory>}
     * @memberof FileSystem
     */
    load(path: string): Promise<Directory>;
    /**
     * load object in $path and call $callback with the corresponding model ref
     * @template T
     * @param {string} path
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    load(path: string, callback: SpinalLoadCallBack<Directory>): void;
    /**
     * load all the objects of $type
     * @template T
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    load_type<T extends Model>(type: string, callback: SpinalLoadCallBack<T>): void;
    private load_or_make_dirProm;
    /**
     * make dir if not already present in the server. Call callback
     * as in the @load proc -- when done (i.e. when loaded or created)
     * @param {string} dir
     * @return {*}  {Promise<Directory>}
     * @memberof FileSystem
     */
    load_or_make_dir(dir: string): Promise<Directory>;
    /**
     * make dir if not already present in the server. Call callback
     * as in the @load proc -- when done (i.e. when loaded or created)
     * @param {string} dir
     * @param {SpinalLoadCallBack<Directory>} callback
     * @memberof FileSystem
     */
    load_or_make_dir(dir: string, callback: SpinalLoadCallBack<Directory>): void;
    /**
     * load an object using is pointer and call $callback with the corresponding ref
     * @template T
     * @param {number} ptr
     * @return {*}  {Promise<T>}
     * @memberof FileSystem
     */
    load_ptr<T extends Model>(ptr: number): Promise<T>;
    /**
     * load an object using is pointer and call $callback with the corresponding ref
     * @template T
     * @param {number} ptr
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    load_ptr<T extends Model>(ptr: number, callback: SpinalLoadCallBack<T>): void;
    load_right(ptr: number): Promise<RightsItem>;
    load_right(ptr: number, callback: SpinalLoadCallBack<RightsItem>): void;
    /**
     * @param {(Model | number)} ptr
     * @param {string} file_name
     * @param {number} share_type
     * @param {string} targetName
     * @memberof FileSystem
     */
    share_model(ptr: Model | number, file_name: string, share_type: number, targetName: string): void;
    /**
     * explicitly send a command
     * @private
     * @param {string} data
     * @memberof FileSystem
     */
    send(data: string): void;
    /**
     * debounced function to send data to the server
     * @private
     * @static
     * @return {*}
     * @memberof FileSystem
     */
    private static _send_data_to_hub_func;
    /**
     * send the data to the server
     * @private
     * @return {*}
     * @memberof FileSystem
     */
    private _send_data_to_hub_instance;
    /**
     * apply an answer of the hub to the models
     * @param {string} responseText
     * @param {() => void} [afterEval] called once the models are updated,
     * before the load callbacks run
     * @memberof FileSystem
     */
    send_data_eval(responseText: string, afterEval?: () => void): void;
    private make_channel_eval;
    /**
     * evaluate the javascript the hub answers with. A model the hub sends again,
     * to a new session after it restarted, keeps its instance : the graph, the
     * caches and the binds of the program reference it.
     * @private
     * @memberof FileSystem
     */
    private _eval_hub_answer;
    private static _is_instance_of;
    /** an error in a callback of the program must not stop the connection */
    private static _safely;
    private make_channel_loop;
    private _send_make_channel;
    static _model_changed_func(): Promise<void>;
    /**
     * send a request for a "push" channel.
     * Called in the server response
     * @private
     * @memberof FileSystem
     * @deprecated
     */
    private make_channel;
    /**
     * to be redefined to change the handling of a connection that gave up :
     * called only when the connection cannot be kept anymore (auto_reconnect off,
     * or no credentials to open a new session), the default handler exits the
     * process in Node. An outage the connection recovers from goes to
     * onConnectionStateChange.
     * @static
     * @memberof FileSystem
     */
    static onConnectionError: (error_code: number) => void;
    /**
     * to be redefined to follow the connection to the hub : called on every
     * change of state (connecting, connected, disconnected, reconnecting,
     * resyncing, closed). The default handler shows the popup in a browser and
     * does nothing in Node, the connection logs its events itself.
     * @static
     * @memberof FileSystem
     */
    static onConnectionStateChange: (status: IConnectionStatus, fs: FileSystem) => void;
    private static _onConnectionStateChange;
    /**
     * default callback on make_channel error after the timeout disconnected reached
     * This method can be surcharged.
     * error_code :
     * - 0 = Error resolved
     * - 1 = 1st disconnection
     * - 2 = disconnection timeout
     * - 3 = Server went down Reinit everything
     * - 4 = Server down on connection
     * @private
     * @static
     * @param {number} error_code
     * @memberof FileSystem
     */
    private static _onConnectionError;
    /**
     * get the first running inst
     * @static
     * @return {*}  {FileSystem}
     * @memberof FileSystem
     */
    static get_inst(): FileSystem;
    /**
     * @static
     * @param {IFsData} out
     * @param {Model} obj
     * @memberof FileSystem
     */
    static set_server_id_if_necessary(out: IFsData, obj: Model): void;
    /**
     * send changes of m to instances.
     * @static
     * @param {Model} m
     * @memberof FileSystem
     */
    static signal_change(m: Model): void;
    /**
     * @static
     * @param {number} tmp_id
     * @param {number} res
     * @return {*}  {void}
     * @memberof FileSystem
     */
    static _tmp_id_to_real(tmp_id: number, res: number): Promise<void>;
    private static _create_model_by_name;
    /**
     * @deprecated
     * @static
     * @param {*} _child
     * @param {*} _parent
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static extend(_child: any, _parent: any): any;
    /**
     * @private
     * @static
     * @return {*}  {number}
     * @memberof FileSystem
     */
    private static _get_new_tmp_server_id;
    /**
     * send changes
     * @private
     * @static
     * @memberof FileSystem
     */
    static _send_chan(): void;
    /**
     * get data of objects to send
     * @private
     * @static
     * @return {*}  {string}
     * @memberof FileSystem
     */
    private static _get_chan_data;
    /**
     * @private
     * @static
     * @memberof FileSystem
     * @deprecated
     * do not remove used in eval
     */
    private static _timeout_send_func;
    /**
     * @static
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static _my_xml_http_request(): any;
}
