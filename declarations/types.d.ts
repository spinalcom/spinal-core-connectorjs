export interface IFsData {
    cre: string;
    mod: string;
}
export interface IOptionFileSystem {
    url: string;
    port?: string | number;
    userid?: string | number;
    password?: string;
    sessionId?: number;
    home_dir: string;
    accessToken?: string;
}
export interface IOptionFileSystemWithUser {
    url: string;
    port?: string | number;
    userid: string | number;
    password: string;
    home_dir: string;
    accessToken?: string;
}
export interface IOptionFileSystemWithSessionId {
    url: string;
    port?: string | number;
    sessionId: number;
    home_dir: string;
    accessToken?: string;
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
export interface IFileInfoOption {
    model_type?: string;
    [key: string]: any;
}
export type SpinalFilterFunction<T extends Model> = (item: T) => boolean;
export type SpinalSortFunction<T extends Model> = (item1: T, item2: T) => number;
export class Lst<T extends Model = any> extends Model {
    static _constructorName: string;
    _constructorName: string;
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
    protected _set(value: Lst<T>): boolean;
    _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap;
    _get_fs_data(out: IFsData): void;
    _get_state(): string;
    _set_state(str: string, map: IStateMap<T>): void;
    _static_size_check(force: boolean): boolean;
    [Symbol.iterator](): Generator<T, void, unknown>;
}
/**
 * @export
 * @class Obj
 * @extends {Model}
 * @template T
 */
export class Obj<T extends string | number | boolean> extends Model {
    static _constructorName: string;
    _constructorName: string;
    _data: T;
    constructor(data?: any);
    toString(): string;
    equals(obj: any): boolean;
    get(): any;
    _get_fs_data(out: IFsData): void;
    protected _set(value: T): boolean;
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
/**
 * representation of a string
 * @export
 * @class Str
 * @extends {Obj<string>}
 */
export class Str extends Obj<string> {
    static _constructorName: string;
    _constructorName: string;
    _data: string;
    /**
     * @readonly
     * @type {number}
     * @memberof Str
     */
    get length(): number;
    /**
     * Creates an instance of Str.
     * @param {(string | Str)} [data='']
     * @memberof Str
     */
    constructor(data?: string | Str);
    /**
     * toggle presence of str in this
     * @param {string} str
     * @param {string} [space=' ']
     * @return {*}  {boolean}
     * @memberof Str
     */
    toggle(str: string, space?: string): boolean;
    /**
     * true if str is contained in this
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    contains(str: string): boolean;
    /**
     * @param {(string | Model)} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    equals(str: string | Model): boolean;
    /**
     * @return {*}  {string}
     * @memberof Str
     */
    toString(): string;
    /**
     * @param {string} str
     * @return {*}  {boolean}
     * @memberof Str
     */
    ends_with(str: string): boolean;
    /**
     * @return {*}  {Str}
     * @memberof Str
     */
    deep_copy(): Str;
    /**
     * @param {IFsData} out
     * @memberof Str
     */
    _get_fs_data(out: IFsData): void;
    /**
     * @protected
     * @param {(Str | string)} [value='']
     * @return {*}  {boolean}
     * @memberof Str
     */
    protected _set(value?: Str | string): boolean;
    /**
     * @return {*}  {string}
     * @memberof Str
     */
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
export interface IFileInfo extends Model {
    model_type?: Str;
    [key: string]: any;
}
export class Ptr<T extends Model = any> extends Model {
    static _constructorName: string;
    _constructorName: string;
    data: {
        model?: T;
        value?: any;
    };
    /**
     * Creates an instance of Ptr.
     * @param {*} model
     * @memberof Ptr
     */
    constructor(model: any);
    /**
     * @return {*}  {Promise<T>}
     * @memberof Ptr
     */
    load(): Promise<T>;
    /**
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof Ptr
     */
    load(callback: SpinalLoadCallBack<T>): void;
    /**
     * @param {IFsData} out
     * @memberof Ptr
     */
    _get_fs_data(out: IFsData): void;
    protected _set(model: number | T): boolean;
    _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
export class File<T extends Model = any> extends Model {
    static _constructorName: string;
    _constructorName: string;
    name: Str;
    _created_at: Str;
    _ptr: Ptr<T>;
    _info: IFileInfo;
    constructor(name?: string, ptr_or_model?: number | T, info?: any);
    load(): Promise<T>;
    load(callback?: SpinalLoadCallBack<T>): void;
}
export class TiffFile<T extends Model = any> extends File<T> {
    static _constructorName: string;
    _constructorName: string;
    _ptr_tiff: Ptr;
    _has_been_converted: number;
    constructor(name?: string, ptr_or_model?: number, ptr_tiff?: number, info?: {});
    load_tiff(callback: SpinalLoadCallBack<T>): void;
}
export class Directory extends Lst<File | TiffFile> {
    static _constructorName: string;
    _constructorName: string;
    constructor();
    base_(): any;
    find(name: string): File | TiffFile;
    load(name: string, callback: SpinalLoadCallBack<any>): void;
    has(f: SpinalFilterFunction<File>): boolean;
    has(name: string): boolean;
    add_file(name: string, obj: any, params?: IFileInfoOption): File;
    add_tiff_file(name: string, obj: any, tiff_obj: any, params?: IFileInfoOption): TiffFile;
    force_add_file(name: string, obj: any, params?: IFileInfoOption): File;
    get_file_info(info: any): string;
}
/**
 * representation of a number
 * @export
 * @class Val
 * @extends {Obj<number>}
 */
export class Val extends Obj<number> {
    static _constructorName: string;
    _constructorName: string;
    /**
     * Creates an instance of Val.
     * @param {(number | Val)} [data=0]
     * @memberof Val
     */
    constructor(data?: number | Val);
    /**
     * toggle true / false ( 1 / 0 )
     * @return {*}  {boolean}
     * @memberof Val
     */
    toggle(): boolean;
    /**
     * @return {*}  {boolean}
     * @memberof Val
     */
    toBoolean(): boolean;
    /**
     * @return {*}  {Val}
     * @memberof Val
     */
    deep_copy(): Val;
    /**
     * @param {number} v
     * @memberof Val
     */
    add(v: number): void;
    /**
     * we do not take _set from Obj because we want a conversion if value is not a number
     * @protected
     * @param {(string | boolean | number | Val)} value
     * @return {*}  {boolean}
     * @memberof Val
     */
    protected _set(value: string | boolean | number | Val): boolean;
}
export class Path extends Model {
    static _constructorName: string;
    _constructorName: string;
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
    static _constructorName: string;
    _constructorName: string;
    constructor(model: any);
}
export class RightSetList<T extends Model = any> extends Lst<T> {
    static _constructorName: string;
    _constructorName: string;
    constructor();
}
export class RightsItem<T extends Model = any> extends Lst<T> {
    static _constructorName: string;
    _constructorName: string;
    constructor();
}
export class SessionModel extends Model {
    static _constructorName: string;
    _constructorName: string;
    constructor();
}
export class User extends Model {
    static _constructorName: string;
    _constructorName: string;
    constructor();
}
export class UserRight extends Model {
    static _constructorName: string;
    _constructorName: string;
    constructor();
    set(): boolean;
}
export interface ISpinalModel {
    [key: string]: any;
}
export class Bool extends Obj<boolean> {
    static _constructorName: string;
    _constructorName: string;
    constructor(data?: boolean | Bool);
    toggle(): boolean;
    toBoolean(): boolean;
    deep_copy(): Bool;
    protected _set(value: string | boolean | Bool): boolean;
    _get_fs_data(out: IFsData): void;
}
export class Choice extends Model {
    static _constructorName: string;
    _constructorName: string;
    num: Val;
    lst: Lst<Str>;
    constructor(InitIdx?: Val | number, stringChoises?: (string | Str)[]);
    filter(): boolean;
    item(): Str;
    get(): string;
    toString(): string;
    equals(a: Choice | Str): boolean;
    protected _set(value: string | number): boolean;
}
export abstract class TypedArray<T extends Int32Array | Float64Array> extends Model {
    static _constructorName: string;
    _constructorName: string;
    _size: number[];
    _data: T;
    /**
     * Creates an instance of TypedArray.
     * @param {(number | number[])} [size]
     * @param {T} [data]
     * @memberof TypedArray
     */
    protected constructor(size?: number | number[], data?: T);
    /**
     * @abstract
     * @return {*}  {*}
     * @memberof TypedArray
     */
    abstract base_type(): any;
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */
    dim(): number;
    /**
     * @param {number} [d]
     * @return {*}  {(number | number[])}
     * @memberof TypedArray
     */
    size(d?: number): number | number[];
    /**
     * @param {(number[] | number)} index
     * @param {*} value
     * @memberof TypedArray
     */
    set_val(index: number[] | number, value: any): void;
    /**
     * @return {*}  {number}
     * @memberof TypedArray
     */
    nb_items(): number;
    /**
     * @return {*}  {string}
     * @memberof TypedArray
     */
    toString(): string;
    /**
     * @param {(TypedArray<any> | any)} obj
     * @return {*}  {boolean}
     * @memberof TypedArray
     */
    equals(obj: TypedArray<any> | any): boolean;
    /**
     * @param {number} [index]
     * @return {*}  {(number | T)}
     * @memberof TypedArray
     */
    get(index?: number): number | T;
    /**
     * @param {number[]} new_size
     * @memberof TypedArray
     */
    resize(new_size: number[]): void;
    /**
     * @protected
     * @param {*} str
     * @return {*}  {boolean}
     * @memberof TypedArray
     */
    protected _set(str: any): boolean;
    /**
     * @param {IFsData} out
     * @memberof TypedArray
     */
    _get_fs_data(out: IFsData): void;
    /**
     * @return {*}  {string}
     * @memberof TypedArray
     */
    _get_state(): string;
    /**
     * @param {string} str
     * @memberof TypedArray
     */
    _set_state(str: string): void;
}
/**
 * @export
 * @class TypedArray_Float64
 * @extends {TypedArray<Float64Array>}
 */
export class TypedArray_Float64 extends TypedArray<Float64Array> {
    static _constructorName: string;
    _constructorName: string;
    /**
     * Creates an instance of TypedArray_Float64.
     * @param {(number | number[])} [size]
     * @param {Float64Array} [data]
     * @memberof TypedArray_Float64
     */
    constructor(size?: number | number[], data?: Float64Array);
    /**
     * @return {*}  {typeof TypedArray_Float64}
     * @memberof TypedArray_Float64
     */
    base_type(): typeof TypedArray_Float64;
    /**
     * @return {*}  {TypedArray_Float64}
     * @memberof TypedArray_Float64
     */
    deep_copy(): TypedArray_Float64;
}
export class TypedArray_Int32 extends TypedArray<Int32Array> {
    static _constructorName: string;
    _constructorName: string;
    /**
     * Creates an instance of TypedArray_Int32.
     * @param {(number | number[])} [size]
     * @param {Int32Array} [data]
     * @memberof TypedArray_Int32
     */
    constructor(size?: number | number[], data?: Int32Array);
    /**
     * @return {*}  {typeof TypedArray_Int32}
     * @memberof TypedArray_Int32
     */
    base_type(): typeof TypedArray_Int32;
    /**
     * @return {*}  {TypedArray_Int32}
     * @memberof TypedArray_Int32
     */
    deep_copy(): TypedArray_Int32;
}
export class Vec extends Lst<Val> {
    static _constructorName: string;
    _constructorName: string;
    /**
     * Creates an instance of Vec.
     * @memberof Vec
     */
    constructor();
    /**
     * @return {*}  {typeof Val}
     * @memberof Vec
     */
    base_type(): typeof Val;
    /**
     * @return {*}  {string}
     * @memberof Vec
     */
    _underlying_fs_type(): string;
}
/**
 * @export
 * @param {*} obj
 * @return {*}  {boolean}
 */
export function isIterable(obj: any): boolean;
export class Process {
    static _constructorName: string;
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
    static _constructorName: string;
    f: () => void;
    constructor(model: Model | Model[], onchange_construction: boolean, f: () => void);
    onchange(): void;
}
export type SpinalCallBackError = () => void;
export type SpinalLoadCallBackSucess<T extends Model = Model> = (model: T) => void;
export type SpinalStoreCallBackSucess = () => void;
declare export namespace spinalCore {
    const _def: ISpinalModel;
    const version: string;
    /**
     * @export
     * @param {(URL | string)} options
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     */
    function connect(options: URL | string, accessToken?: string): FileSystem;
    /**
     * @export
     * @param {(URL | string)} options
     * @param {number} sessionId
     * @param {string} [accessToken]
     * @return {*}  {FileSystem}
     */
    function connectWithSessionId(options: URL | string, sessionId: number, accessToken?: string): FileSystem;
    function connectAndLoadWithApi(options: URL | string, username: string, password: string, organAccessToken?: string): FileSystem;
    /**
     * stores a model in the file system
     * @export
     * @param {FileSystem} fs
     * @param {Model} model
     * @param {string} path
     * @return {*}  {Promise<void>}
     */
    function store(fs: FileSystem, model: Model, path: string, fileOption: IFileInfoOption): Promise<void>;
    /**
     * stores a model in the file system
     * @export
     * @param {FileSystem} fs
     * @param {Model} model
     * @param {string} path
     * @param {SpinalStoreCallBackSucess} callback_success
     * @param {SpinalCallBackError} [callback_error]
     * @return {*}  {void}
     */
    function store(fs: FileSystem, model: Model, path: string, callback_success: SpinalStoreCallBackSucess, callback_error?: SpinalCallBackError, fileOption?: IFileInfoOption): void;
    /**
     * @export
     * @param {typeof Model} model
     * @param {string} [name]
     */
    function register_models(model: typeof Model, name?: string): void;
    /**
     * @export
     * @param {(typeof Model[]
     *       | {
     *           [key: string]: typeof Model;
     *         })} modelList
     */
    function register_models(modelList: typeof Model[] | {
        [key: string]: typeof Model;
    }): void;
    /**
     * loads a model from the file system
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {string} path
     * @return {*}  {Promise<T>}
     */
    function load<T extends Model>(fs: FileSystem, path: string): Promise<T>;
    /**
     * loads a model from the file system
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {string} path
     * @param {SpinalLoadCallBack<T>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     */
    function load<T extends Model>(fs: FileSystem, path: string, callback_success: SpinalLoadCallBack<T>, callback_error?: SpinalCallBackError): void;
    /**
     * loads all the models of a specific type
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     * @return {*}
     */
    function load_type<T extends Model>(fs: FileSystem, type: string, callback_success: SpinalLoadCallBack<T>, callback_error?: SpinalCallBackError): void;
    /**
     * @export
     * @param {FileSystem} fs
     * @param {number} ptr
     * @return {*}  {Promise<RightsItem>}
     */
    function load_right(fs: FileSystem, ptr: number): Promise<RightsItem>;
    /**
     * @export
     * @param {FileSystem} fs
     * @param {number} ptr
     * @param {SpinalLoadCallBack<RightsItem>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     */
    function load_right(fs: FileSystem, ptr: number, callback_success: SpinalLoadCallBack<RightsItem>, callback_error?: SpinalCallBackError): void;
    /**
     * @export
     * @param {FileSystem} fs
     * @param {number} ptr
     * @param {string} file_name
     * @param {number} right_flag
     * @param {string} targetName
     * @return {*}  {void}
     */
    function share_model(fs: FileSystem, ptr: number, file_name: string, right_flag: number, targetName: string): void;
    const right_flag: {
        AD: number;
        WR: number;
        RD: number;
    };
    /**
     * "export function" method: extend one object as a class, using the same 'class' concept as coffeescript
     * @deprecated
     * @export
     * @param {*} child
     * @param {*} parent
     * @return {*}  {*}
     */
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
    /**
     * @export
     * @param {Model} obj
     * @return {*}  {string}
     */
    function get_object_class(obj: Model): string;
    /**
     * @export
     * @param {(Model | object)} m
     * @return {*}  {string[]}
     */
    function _get_attribute_names(m: Model | object): string[];
    /**
     * create a Model using a line of get_state(using.type, .data, ...)
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
    /**
     * @export
     * @param {typeof Model} model
     * @param {string} [name]
     */
    function register_models(model: typeof Model, name?: string): void;
    /**
     * @export
     * @param {(typeof Model[]
     *       | {
     *           [key: string]: typeof Model;
     *         })} modelList
     */
    function register_models(modelList: typeof Model[] | {
        [key: string]: typeof Model;
    }): void;
    /**
     * @export
     * @param {typeof Model} func
     * @param {string} [name]
     */
    function _register_models_check(func: typeof Model, name?: string): void;
    /**
     * the function that is called after a very short timeout,
     * when at least one object has been modified
     * @export
     */
    function _sync_processes(): void;
    const spinal: Partial<{
        version: string;
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
    static _constructorName: string;
    _constructorName: string;
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
    protected _set(value: any): boolean;
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
    static _constructorName: string;
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
export function getUrlPath(url: string, port: number | string, searchQuery?: string): string;
export class FileSystem {
    static _constructorName: string;
    static debug: boolean;
    static _disp: boolean;
    static _cur_tmp_server_id: number;
    static _sig_server: boolean;
    static get _userid(): string | number;
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
    _home_dir: string;
    static url_com: string;
    static url_upload: string;
    static CONNECTOR_TYPE: 'Node' | 'Browser';
    _data_to_send: string;
    _session_num: number;
    _num_inst: number;
    make_channel_error_timer: number;
    static _XMLHttpRequest: any;
    /**
     * Creates an instance of FileSystem.
     * @param {IOptionFileSystemWithSessionId} {
     *     url,
     *     port,
     *     home_dir,
     *     sessionId,
     *     accessToken,
     *   }
     * @memberof FileSystem
     */
    constructor({ url, port, home_dir, sessionId, accessToken, }: IOptionFileSystemWithSessionId);
    /**
     * Creates an instance of FileSystem.
     * @param {IOptionFileSystemWithUser} {
     *     url,
     *     port,
     *     userid,
     *     password,
     *     home_dir,
     *     accessToken,
     *   }
     * @memberof FileSystem
     */
    constructor({ url, port, userid, password, home_dir, accessToken, }: IOptionFileSystemWithUser);
    /**
     * load object in $path and call $callback with the corresponding model ref
     * @template T
     * @param {string} path
     * @return {*}  {Promise<T>}
     * @memberof FileSystem
     */
    load<T extends Model>(path: string): Promise<T>;
    /**
     * load object in $path and call $callback with the corresponding model ref
     * @template T
     * @param {string} path
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    load<T extends Model>(path: string, callback: SpinalLoadCallBack<T>): void;
    /**
     * load all the objects of $type
     * @template T
     * @param {string} type
     * @param {SpinalLoadCallBack<T>} callback
     * @memberof FileSystem
     */
    load_type<T extends Model>(type: string, callback: SpinalLoadCallBack<T>): void;
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
    static _tmp_id_to_real(tmp_id: number, res: number): void;
    /**
     * @deprecated
     * @static
     * @param {*} _child
     * @param {*} _parent
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static extend(_child: any, _parent: any): any;
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
