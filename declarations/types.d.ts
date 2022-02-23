export interface IFsData {
    cre: string;
    mod: string;
}
export interface IFlatModelMap {
    [id: number]: Model;
}
export interface IStateMap<T extends Model> {
    [key: string]: {
        type: string;
        data: string;
        buff: T;
    };
}
export type SpinalOnChangeBindModel = () => void;
export type SpinalFilterFunction<T extends Model> = (item: T) => boolean;
export type SpinalSortFunction<T extends Model> = (item1: T, item2: T) => number;
export class Lst<T extends Model = any> extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    length: number;
    constructor(data?: any);
    static_length(): number;
    default_value(): number;
    base_type(): any;
    get(): Array<T>;
    size(): any;
    toString(): string;
    equals(lst: Lst<T>): boolean;
    push(value: T, force?: boolean): void;
    pop(): T;
    clear(): void;
    unshift(value: any): number;
    shift(): T;
    remove(item: T): void;
    remove_ref(item: T): void;
    filter(f: SpinalFilterFunction<T>): T[];
    detect(f: SpinalFilterFunction<T>): T;
    sorted(sort: SpinalSortFunction<T>): Array<T>;
    has(f: SpinalFilterFunction<T>): boolean;
    indexOf(value: T): 1 | -1;
    indexOf_ref(value: T): number;
    contains(value: T): boolean;
    contains_ref(value: T): boolean;
    toggle(value: T): boolean;
    toggle_ref(value: T): boolean;
    slice(begin: number, end?: number): Lst<T>;
    concat(new_tab: Lst<T>, force?: boolean): void;
    splice(index: number, n?: number): void;
    insert(index: number, lst: Lst<T>): void;
    set_or_push(index: number, val: T): void;
    trim(size: number): void;
    join(sep: string): string;
    deep_copy(): any;
    back(): any;
    real_change(): boolean;
    _set(value: Lst<T>): boolean;
    _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap;
    _get_fs_data(out: IFsData): void;
    _get_state(): string;
    _set_state(str: string, map: IStateMap<T>): void;
    _static_size_check(force: boolean): boolean;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
export class Obj<T = string | number | boolean> extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    _data: T;
    constructor(data?: any);
    toString(): string;
    equals(obj: any): boolean;
    get(): any;
    _get_fs_data(out: IFsData): void;
    _set(value: T): boolean;
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
export class Str extends Obj<string> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    _data: string;
    get length(): number;
    constructor(data?: string);
    constructor(data?: Str);
    toggle(str: string, space?: string): boolean;
    contains(str: string): boolean;
    equals(str: string): boolean;
    equals(str: Model): boolean;
    toString(): string;
    ends_with(str: string): boolean;
    deep_copy(): Str;
    _get_fs_data(out: IFsData): void;
    _set(value: Str): boolean;
    _set(value: string): boolean;
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
export interface IFileInfo extends Model {
    model_type?: Str;
    [key: string]: any;
}
export class Ptr<T extends Model = any> extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    data: {
        model?: T;
        value?: any;
    };
    constructor(model: any);
    load(callback: SpinalLoadCallBack<T>): void;
    _get_fs_data(out: IFsData): void;
    _set(model: number | T): boolean;
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
export class File<T extends Model = any> extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    name: Str;
    _created_at: Str;
    _ptr: Ptr;
    _info: IFileInfo;
    constructor(name?: string, ptr_or_model?: number | T, info?: any);
    load(callback: SpinalLoadCallBack<T>): void;
}
export class TiffFile<T extends Model = any> extends File<T> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    _ptr_tiff: Ptr;
    _has_been_converted: number;
    constructor(name?: string, ptr_or_model?: number, ptr_tiff?: number, info?: {});
    load_tiff(callback: SpinalLoadCallBack<T>): void;
}
export class Directory extends Lst<File | TiffFile> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
    base_(): any;
    find(name: string): File | TiffFile;
    load(name: string, callback: SpinalLoadCallBack<any>): void;
    has(f: SpinalFilterFunction<File>): boolean;
    has(name: string): boolean;
    add_file(name: string, obj: any, params?: {}): File;
    add_tiff_file(name: string, obj: any, tiff_obj: any, params?: {}): TiffFile;
    force_add_file(name: string, obj: any, params?: {}): File;
    get_file_info(info: any): string;
}
export class Val extends Obj<number> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor(data?: number | Val);
    toggle(): boolean;
    toBoolean(): boolean;
    deep_copy(): Val;
    add(v: number): void;
    _set(value: string | boolean | number | Val): boolean;
}
export class Path extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    file?: File | Buffer;
    remaining: Val;
    to_upload: Val;
    constructor(file?: File | Buffer);
    get_file_info(info: {
        remaining: Val;
        to_upload: Val;
    }): void;
    _get_fs_data(out: IFsData): void;
}
export class Pbr<T extends Model = any> extends Ptr<T> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor(model: any);
}
export class RightSetList<T extends Model = any> extends Lst<T> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
}
export class RightsItem<T extends Model = any> extends Lst<T> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
}
export class SessionModel extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
}
export class User extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
}
export class UserRight extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
    set(): boolean;
}
export interface ISpinalModel {
    [key: string]: any;
}
export class Bool extends Obj<boolean> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor(data?: boolean | Bool);
    toggle(): boolean;
    toBoolean(): boolean;
    deep_copy(): Bool;
    _set(value: string | boolean | Bool): boolean;
    _get_fs_data(out: IFsData): void;
}
export class Choice extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    num: Val;
    lst: Lst<Str>;
    constructor(InitIdx?: Val | number, stringChoises?: (string | Str)[]);
    filter(): boolean;
    item(): Str;
    get(): string;
    toString(): string;
    equals(a: Choice | Str): boolean;
    _set(value: string | number): boolean;
}
export abstract class TypedArray<T extends Int32Array | Float64Array> extends Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    _size: number[];
    _data: T;
    constructor(size?: number | number[], data?: T);
    base_type(): any;
    dim(): number;
    size(d?: number): number | number[];
    set_val(index: number[] | number, value: any): void;
    nb_items(): number;
    toString(): string;
    equals(obj: TypedArray<any> | any): boolean;
    get(index?: number): number | T;
    resize(new_size: number[]): void;
    _set(str: any): boolean;
    _get_index(index: number[] | number): number;
    _get_fs_data(out: IFsData): void;
    _get_state(): string;
    _set_state(str: string): void;
}
export class TypedArray_Float64 extends TypedArray<Float64Array> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor(size?: number | number[], data?: Float64Array);
    base_type(): typeof TypedArray_Float64;
    deep_copy(): TypedArray_Float64;
}
export class TypedArray_Int32 extends TypedArray<Int32Array> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor(size?: number | number[], data?: Int32Array);
    base_type(): typeof TypedArray_Int32;
    deep_copy(): TypedArray_Int32;
}
export class Vec extends Lst<Val> {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    constructor();
    base_type(): typeof Val;
    _underlying_fs_type(): string;
}
/**
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isIterable(obj: any): boolean;
export class Process {
    static readonly _constructorName: string;
    process_id: number;
    _models: Model[];
    constructor(m: Model | Model[], onchange_construction?: boolean);
    destructor(): void;
    /**
     * called if at least one of the corresponding models has changed
     * in the previous round
     * @memberof Process
     */
    onchange(): void;
}
export class BindProcess extends Process {
    static readonly _constructorName: string;
    f: () => void;
    constructor(model: Model | Model[], onchange_construction: boolean, f: () => void);
    onchange(): void;
}
export type SpinalCallBackError = () => void;
export type SpinalLoadCallBackSucess = (model: Model) => void;
export type SpinalStoreCallBackSucess = () => void;
declare export namespace spinalCore {
    const _def: ISpinalModel;
    const version = "2.5.0";
    function connect(options: URL | string): FileSystem;
    function store(fs: FileSystem, model: Model, path: string, callback_success: SpinalStoreCallBackSucess, callback_error?: SpinalCallBackError): void;
    const register_models: typeof ModelProcessManager.register_models;
    function load(fs: FileSystem, path: string, callback_success: SpinalLoadCallBackSucess, callback_error?: SpinalCallBackError): void;
    function load_type<T extends Model>(fs: FileSystem, type: string, callback_success: SpinalLoadCallBack<T>, callback_error?: SpinalCallBackError): void;
    function load_right<T extends Model>(fs: FileSystem, ptr: number, callback_success: SpinalLoadCallBack<T>, callback_error?: SpinalCallBackError): void;
    function share_model(fs: FileSystem, ptr: number, file_name: string, right_flag: number, targetName: string): void;
    const right_flag: {
        AD: number;
        WR: number;
        RD: number;
    };
    function extend(child: any, parent: any): any;
}
declare export namespace ModelProcessManager {
    let _counter: number;
    const _modlist: Map<number, Model>;
    const _n_processes: Map<number, Process>;
    let _cur_mid: number;
    let _cur_process_id: number;
    let _timeout: ReturnType<typeof setTimeout>;
    let _force_m: boolean;
    const _def: ISpinalModel;
    function new_from_state(): void;
    function load(): void;
    /**
     * translate a normal javascript to their spinal model connter part
     * @export
     * @param {*} v
     * @return {*}  {Model}
     */
    function conv(v: Model): Model;
    function conv(v: any[]): Lst;
    function conv(v: string): Str;
    function conv(v: number): Val;
    function conv(v: boolean): Bool;
    function conv(v: any): Model;
    function get_object_class(obj: Model): string;
    function _get_attribute_names(m: Model | object): string[];
    /**
     *  create a Model using a line of get_state(using.type, .data, ...)
     * @export
     * @template T
     * @param {string} mid
     * @param {IStateMap<T>} map
     * @return {*}  {T}
     */
    function _new_model_from_state<T extends Model>(mid: string, map: IStateMap<T>): T;
    /**
     * say that something will need a call
     * to ModelProcessManager._sync_processes during the next round
     * @export
     * @return {*}  {ReturnType<typeof setTimeout>}
     */
    function _need_sync_processes(): ReturnType<typeof setTimeout>;
    function register_models(model: typeof Model, name?: string): void;
    function register_models(modelList: typeof Model[]): void;
    function register_models(modelObj: {
        [key: string]: typeof Model;
    }): void;
    function _register_models_check(func: typeof Model, name?: string): void;
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @export
     */
    function _sync_processes(): void;
    const spinal: Partial<{
        spinalCore: typeof spinalCore;
        FileSystem: typeof FileSystem;
        ModelProcessManager: typeof ModelProcessManager;
        Process: typeof Process;
        BindProcess: typeof BindProcess;
        Model: typeof Model;
        Obj: typeof Obj;
        Bool: typeof Bool;
        Val: typeof Val;
        Str: typeof Str;
        Lst: typeof Lst;
        Vec: typeof Vec;
        Choice: typeof Choice;
        TypedArray: typeof TypedArray;
        TypedArray_Int32: typeof TypedArray_Int32;
        TypedArray_Float64: typeof TypedArray_Float64;
        Directory: typeof Directory;
        File: typeof File;
        TiffFile: typeof TiffFile;
        Path: typeof Path;
        Ptr: typeof Ptr;
        Pbr: typeof Pbr;
        SessionModel: typeof SessionModel;
        User: typeof User;
        UserRight: typeof UserRight;
        RightSetList: typeof RightSetList;
        RightsItem: typeof RightsItem;
        [key: string]: any;
    }>;
}
export class Model {
    static readonly _constructorName: string;
    readonly _constructorName: string;
    _attribute_names: string[];
    model_id: number;
    _processes: Process[];
    _parents: Model[];
    _date_last_modification: number;
    _server_id: number;
    [nameAttr: string]: any;
    constructor(attr?: any);
    destructor(): void;
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @return {*}  {boolean}
     * @memberof Model
     */
    has_been_modified(): boolean;
    /**
     * return true if this has changed since previous synchronisation due
     * to a direct modification (not from a child one)
     * @return {*}  {boolean}
     * @memberof Model
     */
    has_been_directly_modified(): boolean;
    /**
     * if this has been modified during the preceding round, f will be called
     * If f is a process:
     *  process.onchange will be called each time this (or a child of this) will be modified.
     *  process.destructor will be called if this is destroyed.
     *  ...
     *  can be seen as a bind with an object
     * @param {(Process | (() => void))} f
     * @param {boolean} [onchange_construction=true]  true means that onchange will be automatically called after the bind
     * @return {*}  {Process}
     * @memberof Model
     */
    bind(f: Process | BindProcess | SpinalOnChangeBindModel, onchange_construction?: boolean): Process;
    unbind(f: Process | BindProcess): void;
    /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     * @return {*}  {*}
     * @memberof Model
     */
    get(): any;
    /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     *
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */
    set(value: any): boolean;
    /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param {string} str
     * @memberof Model
     */
    set_state(str: string): void;
    get_state(date?: number): string;
    /**
     * @param {{ [nameAttr: string]: any }} object
     * @memberof Model
     */
    add_attr(object: {
        [nameAttr: string]: any;
    }): void;
    /**
     * @param {string} name
     * @param {*} [instanceOfModel]
     * @param {boolean} [signal_change]
     * @memberof Model
     */
    add_attr(name: string, instanceOfModel?: any, signal_change?: boolean): void;
    /**
     * remove attribute named name
     * @param {string} name
     * @param {boolean} [signal_change=true]
     * @memberof Model
     */
    rem_attr(name: string, signal_change?: boolean): void;
    /**
     * change attribute named nname to instanceOfModel (use references for comparison)
     * @param {string} name
     * @param {*} instanceOfModel
     * @param {boolean} [signal_change=true]
     * @return {*}  {void}
     * @memberof Model
     */
    mod_attr(name: string, instanceOfModel: any, signal_change?: boolean): void;
    /**
     * add / mod / rem attr to get the same data than o
     *  (assumed to be something like { key: val, ... })
     * @param {object} instanceOfModel
     * @memberof Model
     */
    set_attr(instanceOfModel: {
        [key: string]: any;
    }): void;
    /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     *  [ nb_row, nb_cols ] for a matrix...
     * @param {number} [_for_display=0]
     * @return {*}  {(number | number[])}
     * @memberof Model
     */
    size(_for_display?: number): number | number[];
    /**
     * dimensionnality of the object -> 0 for a scalar, 1 for a vector, ...
     * @param {boolean} [_for_display]
     * @return {*} {number}
     * @memberof Model
     */
    dim(_for_display?: number): number;
    /**
     * @param {Model} m
     * @return {*}  {boolean}
     * @memberof Model
     */
    equals(m: Model): boolean;
    /**
     * get first parents that checks func_to_check
     * @param {(model: Model) => boolean} func_to_check
     * @return {*}  {Model[]}
     * @memberof Model
     */
    get_parents_that_check(func_to_check: (model: Model) => boolean): Model[];
    /**
     * @return {*}  {Model}
     * @memberof Model
     */
    deep_copy(): Model;
    /**
     * returns true if change is not "cosmetic"
     * @return {*}  {boolean}
     * @memberof Model
     */
    real_change(): boolean;
    /**
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof Model
     */
    cosmetic_attribute(name: string): boolean;
    /**
     * may be redefined
     * @return {*}  {string}
     * @memberof Model
     */
    _get_state(): string;
    /**
     * send data to server
     * @param {IFsData} out
     * @return {*}  {string}
     * @memberof Model
     */
    _get_fs_data(out: IFsData): void;
    /**
     * may be redefined.
     * by default, add attributes using keys and values (and remove old unused values)
     * must return true if data is changed
     * @param {(Model | object)} value
     * @return {*}  {boolean}
     * @memberof Model
     */
    _set(value: any): boolean;
    /**
     * called by set. change_level should not be defined by the user
     *  (it permits to != change from child of from this)
     * @param {number} [change_level=2]
     * @return {*}  {ReturnType<typeof setTimeout>}
     * @memberof Model
     */
    _signal_change(change_level?: number): ReturnType<typeof setTimeout>;
    /**
     * generic definition of _set_state. ( called by _use_state )
     * @param {string} str
     * @param {IStateMap} map
     * @memberof Model
     */
    _set_state(str: string, map: IStateMap<Model>): void;
    /**
     * see get_parents_that_check
     * @param {Model[]} res
     * @param {{ [attrName: string]: boolean }} visited
     * @param {(model: Model) => boolean} func_to_check
     * @memberof Model
     */
    _get_parents_that_check_rec(res: Model[], visited: {
        [attrName: string]: boolean;
    }, func_to_check: (model: Model) => boolean): void;
    /**
     * return true if info from map[ mid ] if compatible with this.
     * If it's the case, use this information to update data
     * @param {string} mid
     * @param {IStateMap} map
     * @return {*}  {boolean}
     * @memberof Model
     */
    _set_state_if_same_type(mid: string, map: IStateMap<Model>): boolean;
    /**
     * map[ id ] = obj for each objects starting from this recursively
     * @param {{ [id: number]: Model }} map
     * @param {number} date
     * @memberof Model
     */
    _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap;
}
export type SpinalLoadCallBack<T extends Model> = (model: T, error?: boolean | string) => void;
declare global {
    function new_dom_element(params?: INewDomElementParam, nodeName?: string): HTMLElement;
    function newDomElement(params?: INewDomElementParam, nodeName?: string): HTMLElement;
}
export interface INewAlertMsgParam {
    parent?: Element;
    title?: string;
    msg?: string;
    btn?: {
        txt: string;
        click: (evt?: MouseEvent) => boolean;
        backgroundColor: string;
    }[];
    onclose?: (evt?: MouseEvent) => boolean;
}
/**
 * make msg popup
 * @export
 * @class NewAlertMsg
 */
export class NewAlertMsg {
    static readonly _constructorName: string;
    constructor(params?: INewAlertMsgParam);
    hideBtn: () => void;
    hide_btn(): void;
    showBtn: () => void;
    show_btn(): void;
    hide(): void;
    show(): void;
    setMsg(msg: string): void;
}
declare global {
    var NewAlertMsg: NewAlertMsgType;
    var new_alert_msg: NewAlertMsgType;
}
export function getUrlPath(searchQuery?: string): string;
export class FileSystem {
    static readonly _constructorName: string;
    static debug: boolean;
    static _disp: boolean;
    static popup: NewAlertMsg;
    static _cur_tmp_server_id: number;
    static _sig_server: boolean;
    static _userid: string | number;
    static _timeout_reconnect: number;
    static is_cordova: boolean;
    static _objects_to_send: {
        [serverId: number]: Model;
    };
    static _timer_send: ReturnType<typeof setTimeout>;
    static _timer_chan: ReturnType<typeof setTimeout>;
    static _nb_callbacks: number;
    static _callbacks: {
        [id: number]: SpinalLoadCallBack<Model>;
    };
    static _type_callbacks: [string, SpinalLoadCallBack<Model>][];
    static _nb_insts: number;
    static _insts: {
        [idInstance: number]: FileSystem;
    };
    static _files_to_upload: {
        [key: number]: Path;
    };
    static _ptr_to_update: {
        [key: number]: Model;
    };
    static _tmp_objects: {
        [key: number]: Model;
    };
    static _objects: {
        [key: number]: Model;
    };
    static _url: string;
    static _port: string | number;
    static url_com: string;
    static url_upload: string;
    static CONNECTOR_TYPE: 'Node' | 'Browser';
    _data_to_send: string;
    _session_num: number;
    _num_inst: number;
    make_channel_error_timer: number;
    static _password: string;
    static _XMLHttpRequest: any;
    static _home_dir: string;
    constructor(sessionId?: number);
    /**
     * load object in $path and call $callback with the corresponding model ref
     *
     * @param {*} path
     * @param {*} callback
     * @memberof FileSystem
     */
    load<T extends Model>(path: string, callback: SpinalLoadCallBack<T>): void;
    load_type<T extends Model>(type: string, callback: SpinalLoadCallBack<T>): void;
    load_or_make_dir(dir: string, callback: SpinalLoadCallBack<Directory>): void;
    load_ptr<T extends Model>(ptr: number, callback: SpinalLoadCallBack<T>): void;
    load_right<T extends Model>(ptr: number, callback: SpinalLoadCallBack<T>): void;
    share_model(ptr: Model, file_name: string, share_type: number, targetName: string): void;
    share_model(ptr: number, file_name: string, share_type: number, targetName: string): void;
    make_channel(): void;
    onConnectionError(error_code: number): void;
    static get_inst(): FileSystem;
    static set_server_id_if_necessary(out: IFsData, obj: Model): void;
    static signal_change(m: Model): void;
    static _tmp_id_to_real(tmp_id: number, res: number): void;
    static _create_model_by_name(name: string): any;
    static extend(child: any, parent: any): any;
    static _get_new_tmp_server_id(): number;
    static _send_chan(): void;
    static _timeout_chan_func(): void;
    static _get_chan_data(): string;
    static _timeout_send_func(): boolean;
    static _my_xml_http_request(): any;
}
declare global {
    var spinal: spinalType;
    var spinalCore: typeof _ModelProcessManager.spinal.spinalCore;
    var FileSystem: typeof _ModelProcessManager.spinal.FileSystem;
    var ModelProcessManager: typeof _ModelProcessManager.spinal.ModelProcessManager;
    var Process: typeof _ModelProcessManager.spinal.Process;
    var BindProcess: typeof _ModelProcessManager.spinal.BindProcess;
    var Model: typeof _ModelProcessManager.spinal.Model;
    var Obj: typeof _ModelProcessManager.spinal.Obj;
    var Bool: typeof _ModelProcessManager.spinal.Bool;
    var Val: typeof _ModelProcessManager.spinal.Val;
    var Str: typeof _ModelProcessManager.spinal.Str;
    var Lst: typeof _ModelProcessManager.spinal.Lst;
    var Vec: typeof _ModelProcessManager.spinal.Vec;
    var Choice: typeof _ModelProcessManager.spinal.Choice;
    var TypedArray: typeof _ModelProcessManager.spinal.TypedArray;
    var TypedArray_Int32: typeof _ModelProcessManager.spinal.TypedArray_Int32;
    var TypedArray_Float64: typeof _ModelProcessManager.spinal.TypedArray_Float64;
    var Directory: typeof _ModelProcessManager.spinal.Directory;
    var File: typeof _ModelProcessManager.spinal.File;
    var TiffFile: typeof _ModelProcessManager.spinal.TiffFile;
    var Path: typeof _ModelProcessManager.spinal.Path;
    var Ptr: typeof _ModelProcessManager.spinal.Ptr;
    var Pbr: typeof _ModelProcessManager.spinal.Pbr;
    var SessionModel: typeof _ModelProcessManager.spinal.SessionModel;
    var User: typeof _ModelProcessManager.spinal.User;
    var UserRight: typeof _ModelProcessManager.spinal.UserRight;
    var RightSetList: typeof _ModelProcessManager.spinal.RightSetList;
    var RightsItem: typeof _ModelProcessManager.spinal.RightsItem;
}
export function spinalRegisterModel(model: typeof Model, name?: string): void;
export function spinalRegister(obj: any, name: string): void;
export function bind(model: Model | Model[], func: Process | (() => void), onchange_construction?: boolean): Process;
declare global {
    function bind(model: Model | Model[], func: Process | (() => void), onchange_construction: boolean): Process;
}
/**
 * obj is a DOM object. src is a string or an array of
 * string containing one or several classNames separated with spaces
 * @export
 * @param {HTMLElement} obj
 * @param {(string | string[])} src
 * @return {*}  {void}
 */
export function addClass(obj: HTMLElement, src: string | string[]): void;
declare global {
    function add_class(obj: HTMLElement, src: string | string[]): void;
    function addClass(obj: HTMLElement, src: string | string[]): void;
}
/**
 * real position of an object
 * @export
 * @param {HTMLElement} l
 * @return {*}  {number}
 */
export function getLeft(l: HTMLElement): number;
declare global {
    function getLeft(l: HTMLElement): number;
    function get_left(l: HTMLElement): number;
}
/**
 * real position of an object
 * @export
 * @param {HTMLElement} l
 * @return {*}  {number}
 */
export function getTop(l: HTMLElement): number;
declare global {
    function get_top(l: HTMLElement): number;
    function getTop(l: HTMLElement): number;
}
/**
 * obj is a DOM object. src is a string or an array of string
 * containing one or several classNames separated with spaces
 * @export
 * @param {HTMLElement} obj
 * @param {(string | string[])} src
 * @return {*}  {void}
 */
export function remClass(obj: HTMLElement, src: string | string[]): void;
declare global {
    function remClass(obj: HTMLElement, src: string | string[]): void;
    function rem_class(obj: HTMLElement, src: string | string[]): void;
}
/**
 * @export
 * @interface ISpinalNewPopupParam
 */
export interface ISpinalNewPopupParam {
    popup_closer?: true;
    onclose?: () => void;
    fixed_opacity?: string | number;
    event?: MouseEvent;
    top_x?: number;
    top_y?: number;
    width?: string;
    height?: string;
    child?: HTMLElement;
}
/**
 * make a popup window.
 * returns the creted "inside" div
 * clicking outside closes the window.
 * drag title permits to move he window
 * @export
 * @param {string} title
 * @param {ISpinalNewPopupParam} [params={}]
 * @return {*}  {HTMLElement}
 */
export function spinalNewPopup(title: string, params?: ISpinalNewPopupParam): HTMLElement;
declare global {
    function spinalNewPopup(title: string, params?: ISpinalNewPopupParam): HTMLElement;
    function spinal_new_popup(title: string, params?: ISpinalNewPopupParam): HTMLElement;
}

//# sourceMappingURL=types.d.ts.map
