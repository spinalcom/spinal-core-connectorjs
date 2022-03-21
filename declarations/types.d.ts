/**
 * @export
 * @interface IFsData
 */
export interface IFsData {
    cre: string;
    mod: string;
}
/**
 * @export
 * @interface IOptionFileSystem
 */
export interface IOptionFileSystem {
    url: string;
    port?: string | number;
    userid?: string | number;
    password?: string;
    sessionId?: number;
    home_dir: string;
    accessToken?: string;
}
/**
 * @export
 * @interface IOptionFileSystemWithUser
 */
export interface IOptionFileSystemWithUser {
    url: string;
    port?: string | number;
    userid: string | number;
    password: string;
    home_dir: string;
    accessToken?: string;
}
/**
 * @export
 * @interface IOptionFileSystemWithSessionId
 */
export interface IOptionFileSystemWithSessionId {
    url: string;
    port?: string | number;
    sessionId: number;
    home_dir: string;
    accessToken?: string;
}
/**
 * @export
 * @interface IFlatModelMap
 */
export interface IFlatModelMap {
    [id: number]: Model;
}
/**
 * @export
 * @interface IStateMap
 * @template T
 */
export interface IStateMap<T extends Model = Model> {
    [key: string]: {
        type: string;
        data: string;
        buff: T;
    };
}
export type SpinalOnChangeBindModel = () => void;
/**
 * @export
 * @interface IFileInfoOption
 */
export interface IFileInfoOption {
    model_type?: string;
    [key: string]: any;
}
export type SpinalFilterFunction<T extends Model = Model> = (item: T) => boolean;
export type SpinalSortFunction<T extends Model = Model> = (item1: T, item2: T) => number;
/**
 * Bese representation of an Array
 * @export
 * @class Lst
 * @extends {Model}
 * @template T
 */
export class Lst<T extends Model = any> extends Model {
    /**
     * @static
     * @type {string}
     * @memberof Lst
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Lst
     */
    _constructorName: string;
    /**
     * @type {number}
     * @memberof Lst
     */
    length: number;
    /**
     * Creates an instance of Lst.
     * @param {*} [data]
     * @memberof Lst
     */
    constructor(data?: any);
    /**
     * @return {*}  {number}
     * @memberof Lst
     */
    static_length(): number;
    /**
     * @protected
     * @return {*}  {number}
     * @memberof Lst
     */
    protected default_value(): number;
    /**
     * @protected
     * @return {*}  {*}
     * @memberof Lst
     */
    protected base_type(): any;
    /**
     * @return {*}  {ReturnType<T['get']>[]}
     * @memberof Lst
     */
    get(): ReturnType<T['get']>[];
    /**
     * @return {*}  {[number]}
     * @memberof Lst
     */
    size(): [number];
    /**
     * @return {*}  {string}
     * @memberof Lst
     */
    toString(): string;
    /**
     * @param {Lst<T>} lst
     * @return {*}  {boolean}
     * @memberof Lst
     */
    equals(lst: Lst<T>): boolean;
    /**
     * @param {*} value
     * @param {boolean} [force=false]
     * @return {*}  {void}
     * @memberof Lst
     */
    push(value: any, force?: boolean): void;
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    pop(): T;
    /**
     * @memberof Lst
     */
    clear(): void;
    /**
     * @param {*} value
     * @return {*}  {number}
     * @memberof Lst
     */
    unshift(value: any): number;
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    shift(): T;
    /**
     * @param {T} item
     * @memberof Lst
     */
    remove(item: T): void;
    /**
     * @param {T} item
     * @memberof Lst
     */
    remove_ref(item: T): void;
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {T[]}
     * @memberof Lst
     */
    filter(f: SpinalFilterFunction<T>): T[];
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {T}
     * @memberof Lst
     */
    detect(f: SpinalFilterFunction<T>): T;
    /**
     * @param {SpinalSortFunction<T>} sort
     * @return {*}  {Array<T>}
     * @memberof Lst
     */
    sorted(sort: SpinalSortFunction<T>): Array<T>;
    /**
     * @param {SpinalFilterFunction<T>} f
     * @return {*}  {boolean}
     * @memberof Lst
     */
    has(f: SpinalFilterFunction<T>): boolean;
    /**
     * @param {T} value
     * @return {*}  {(1 | -1)}
     * @memberof Lst
     */
    indexOf(value: T): 1 | -1;
    /**
     * @param {T} value
     * @return {*}  {number}
     * @memberof Lst
     */
    indexOf_ref(value: T): number;
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    contains(value: T): boolean;
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    contains_ref(value: T): boolean;
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    toggle(value: T): boolean;
    /**
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    toggle_ref(value: T): boolean;
    /**
     * @param {number} begin
     * @param {number} [end=this.length]
     * @return {*}  {Lst<T>}
     * @memberof Lst
     */
    slice(begin: number, end?: number): Lst<T>;
    /**
     * @param {Lst<T>} new_tab
     * @param {boolean} [force=false]
     * @return {*}  {void}
     * @memberof Lst
     */
    concat(new_tab: Lst<T>, force?: boolean): void;
    /**
     * @param {number} index
     * @param {number} [n=1]
     * @return {*}  {void}
     * @memberof Lst
     */
    splice(index: number, n?: number): void;
    /**
     * @param {number} index
     * @param {Lst<T>} lst
     * @memberof Lst
     */
    insert(index: number, lst: Lst<T>): void;
    /**
     * @param {number} index
     * @param {T} val
     * @return {*}  {void}
     * @memberof Lst
     */
    set_or_push(index: number, val: T): void;
    /**
     * @param {number} size
     * @memberof Lst
     */
    trim(size: number): void;
    /**
     * @param {string} sep
     * @return {*}  {string}
     * @memberof Lst
     */
    join(sep: string): string;
    /**
     * @return {*}  {Lst<T>}
     * @memberof Lst
     */
    deep_copy(): Lst<T>;
    /**
     * @return {*}  {T}
     * @memberof Lst
     */
    back(): T;
    /**
     * @return {*}  {boolean}
     * @memberof Lst
     */
    real_change(): boolean;
    /**
     * @protected
     * @param {Lst<T>} value
     * @return {*}  {boolean}
     * @memberof Lst
     */
    protected _set(value: Lst<T>): boolean;
    /**
     * @protected
     * @param {IFlatModelMap} map
     * @param {number} date
     * @return {*}  {IFlatModelMap}
     * @memberof Lst
     */
    protected _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap;
    /**
     * @param {IFsData} out
     * @memberof Lst
     */
    _get_fs_data(out: IFsData): void;
    /**
     * @protected
     * @return {*}  {string}
     * @memberof Lst
     */
    protected _get_state(): string;
    /**
     * @param {string} str
     * @param {IStateMap<T>} map
     * @memberof Lst
     */
    _set_state(str: string, map: IStateMap<T>): void;
    /**
     * @param {boolean} force
     * @return {*}  {boolean}
     * @memberof Lst
     */
    _static_size_check(force: boolean): boolean;
    /**
     * @return {*}  {Generator<T, void, unknown>}
     * @memberof Lst
     */
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
    /**
     * Creates an instance of Obj.
     * @param {*} [data]
     * @memberof Obj
     */
    constructor(data?: any);
    /**
     * @return {*}  {string}
     * @memberof Obj
     */
    toString(): string;
    /**
     * @param {*} obj
     * @return {*}  {boolean}
     * @memberof Obj
     */
    equals(obj: any): boolean;
    /**
     * @return {*}  {*}
     * @memberof Obj
     */
    get(): T;
    /**
     * @param {IFsData} out
     * @memberof Obj
     */
    _get_fs_data(out: IFsData): void;
    /**
     * @protected
     * @param {T} value
     * @return {*}  {boolean}
     * @memberof Obj
     */
    protected _set(value: T): boolean;
    /**
     * @@protected
     * @return {*}  {string}
     * @memberof Obj
     */
    protected _get_state(): string;
    /**
     * @param {string} str
     * @param {unknown} _map
     * @return {*}  {boolean}
     * @memberof Obj
     */
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
     * @protected
     * @return {*}  {string}
     * @memberof Str
     */
    protected _get_state(): string;
    _set_state(str: string, _map: unknown): boolean;
}
/**
 * @export
 * @interface IFileInfo
 * @extends {Model}
 */
export interface IFileInfo extends Model {
    model_type?: Str;
    [key: string]: any;
}
/**
 * @export
 * @class Ptr
 * @extends {Model}
 * @template T
 */
export class Ptr<T extends Model = any> extends Model {
    /**
     * @static
     * @type {string}
     * @memberof Ptr
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Ptr
     */
    _constructorName: string;
    /**
     * @type {{ model?: T; value?: any }}
     * @memberof Ptr
     */
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
    /**
     * @protected
     * @param {(number | T)} model
     * @return {*}  {boolean}
     * @memberof Ptr
     */
    protected _set(model: number | T): boolean;
    /**
     * @protected
     * @return {*}
     * @memberof Ptr
     */
    protected _get_state(): string;
    /**
     * @param {string} str
     * @param {unknown} _map
     * @return {*}  {boolean}
     * @memberof Ptr
     */
    _set_state(str: string, _map: unknown): boolean;
}
/**
 * representation of a virtual File
 * @export
 * @class File
 * @extends {Model}
 * @template T
 */
export class File<T extends Model = any> extends Model {
    /**
     * @static
     * @type {string}
     * @memberof File
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof File
     */
    _constructorName: string;
    /**
     * @type {Str}
     * @memberof File
     */
    name: Str;
    /**
     * @type {Str}
     * @memberof File
     */
    _created_at: Str;
    /**
     * @type {Ptr<T>}
     * @memberof File
     */
    _ptr: Ptr<T>;
    /**
     * @type {IFileInfo}
     * @memberof File
     */
    _info: IFileInfo;
    /**
     * Creates an instance of File.
     * @param {string} [name='']
     * @param {(number | T)} [ptr_or_model=0]
     * @param {*} [info={}]
     * @memberof File
     */
    constructor(name?: string, ptr_or_model?: number | T, info?: any);
    /**
     * @return {*}  {Promise<T>}
     * @memberof File
     */
    load(): Promise<T>;
    /**
     * @param {SpinalLoadCallBack<T>} [callback]
     * @memberof File
     */
    load(callback?: SpinalLoadCallBack<T>): void;
}
/**
 * @export
 * @class TiffFile
 * @extends {File<T>}
 * @template T
 */
export class TiffFile<T extends Model = any> extends File<T> {
    /**
     * @static
     * @type {string}
     * @memberof TiffFile
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof TiffFile
     */
    _constructorName: string;
    /**
     * @type {Ptr}
     * @memberof TiffFile
     */
    _ptr_tiff: Ptr;
    /**
     * @type {number}
     * @memberof TiffFile
     */
    _has_been_converted: number;
    /**
     * Creates an instance of TiffFile.
     * @param {string} [name='']
     * @param {number} [ptr_or_model=0]
     * @param {number} [ptr_tiff=0]
     * @param {*} [info={}]
     * @memberof TiffFile
     */
    constructor(name?: string, ptr_or_model?: number, ptr_tiff?: number, info?: any);
    load_tiff(callback: SpinalLoadCallBack<T>): void;
}
/**
 * representation of a virtual Directory
 * @export
 * @class Directory
 * @extends {(Lst<File | TiffFile>)}
 */
export class Directory extends Lst<File | TiffFile> {
    /**
     * @static
     * @type {string}
     * @memberof Directory
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Directory
     */
    _constructorName: string;
    constructor();
    /**
     * @return {*}  {*}
     * @memberof Directory
     */
    base_type(): typeof File;
    /**
     * @param {string} name
     * @return {*}  {(File | TiffFile)}
     * @memberof Directory
     */
    find(name: string): File | TiffFile;
    /**
     * @param {string} name
     * @param {SpinalLoadCallBack<any>} callback
     * @memberof Directory
     */
    load(name: string, callback: SpinalLoadCallBack<any>): void;
    /**
     * @param {SpinalFilterFunction<File>} f
     * @return {*}  {boolean}
     * @memberof Directory
     */
    has(f: SpinalFilterFunction<File>): boolean;
    /**
     * @param {string} name
     * @return {*}  {boolean}
     * @memberof Directory
     */
    has(name: string): boolean;
    /**
     * @param {string} name
     * @param {*} obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {File}
     * @memberof Directory
     */
    add_file(name: string, obj: any, params?: IFileInfoOption): File;
    /**
     * @param {string} name
     * @param {*} obj
     * @param {*} tiff_obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {TiffFile}
     * @memberof Directory
     */
    add_tiff_file(name: string, obj: any, tiff_obj: any, params?: IFileInfoOption): TiffFile;
    /**
     * @param {string} name
     * @param {*} obj
     * @param {IFileInfoOption} [params={}]
     * @return {*}  {File}
     * @memberof Directory
     */
    force_add_file(name: string, obj: any, params?: IFileInfoOption): File;
    /**
     * @param {*} info
     * @return {*}  {string}
     * @memberof Directory
     */
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
/**
 * representation of a file to upload
 * @export
 * @class Path
 * @extends {Model}
 */
export class Path extends Model {
    /**
     * @static
     * @type {string}
     * @memberof Path
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Path
     */
    _constructorName: string;
    /**
     * @type {(File | Buffer)}
     * @memberof Path
     */
    file?: File | Buffer;
    /**
     * @type {Val}
     * @memberof Path
     */
    remaining: Val;
    /**
     * @type {Val}
     * @memberof Path
     */
    to_upload: Val;
    /**
     * Creates an instance of Path.
     * @param {(File | Buffer)} [file]
     * @memberof Path
     */
    constructor(file?: File | Buffer);
    /**
     * @param {{ remaining: Val; to_upload: Val }} info
     * @memberof Path
     */
    get_file_info(info: {
        remaining: Val;
        to_upload: Val;
    }): void;
    /**
     * @param {IFsData} out
     * @memberof Path
     */
    _get_fs_data(out: IFsData): void;
}
/**
 * @export
 * @class Pbr
 * @extends {Ptr<T>}
 * @template T
 */
export class Pbr<T extends Model = any> extends Ptr<T> {
    /**
     * @static
     * @type {string}
     * @memberof Pbr
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Pbr
     */
    _constructorName: string;
    /**
     * Creates an instance of Pbr.
     * @param {*} model
     * @memberof Pbr
     */
    constructor(model: any);
}
/**
 * @export
 * @class RightsItem
 * @extends {Lst<T>}
 * @template T
 */
export class RightsItem<T extends Model = any> extends Lst<T> {
    /**
     * @static
     * @type {string}
     * @memberof RightsItem
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof RightsItem
     */
    _constructorName: string;
    /**
     * Creates an instance of RightsItem.
     * @memberof RightsItem
     */
    constructor();
}
/**
 * @export
 * @class RightSetList
 * @extends {Lst<RightsItem>}
 */
export class RightSetList extends Lst<RightsItem> {
    /**
     * @static
     * @type {string}
     * @memberof RightSetList
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof RightSetList
     */
    _constructorName: string;
    /**
     * Creates an instance of RightSetList.
     * @memberof RightSetList
     */
    constructor();
}
/**
 * @export
 * @class SessionModel
 * @extends {Model}
 */
export class SessionModel extends Model {
    /**
     * @static
     * @type {string}
     * @memberof SessionModel
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof SessionModel
     */
    _constructorName: string;
    /**
     * Creates an instance of SessionModel.
     * @memberof SessionModel
     */
    constructor();
}
/**
 * @export
 * @class User
 * @extends {Model}
 */
export class User extends Model {
    /**
     * @static
     * @type {string}
     * @memberof User
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof User
     */
    _constructorName: string;
    /**
     * Creates an instance of User.
     * @memberof User
     */
    constructor();
}
/**
 * @export
 * @class UserRight
 * @extends {Model}
 */
export class UserRight extends Model {
    /**
     * @static
     * @type {string}
     * @memberof UserRight
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof UserRight
     */
    _constructorName: string;
    /**
     * Creates an instance of UserRight.
     * @memberof UserRight
     */
    constructor();
    /**
     * @return {*}  {boolean}
     * @memberof UserRight
     */
    set(): boolean;
}
/**
 * @export
 * @interface ISpinalModel
 */
export interface ISpinalModel {
    [key: string]: any;
}
/**
 * Bese representation of a Boolean
 * @export
 * @class Bool
 * @extends {Obj<boolean>}
 */
export class Bool extends Obj<boolean> {
    /**
     * @static
     * @type {string}
     * @memberof Bool
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Bool
     */
    _constructorName: string;
    /**
     * Creates an instance of Bool.
     * @param {(boolean | Bool)} [data=false]
     * @memberof Bool
     */
    constructor(data?: boolean | Bool);
    /**
     * toggle true / false ( 1 / 0 )
     * @return {*}  {boolean}
     * @memberof Bool
     */
    toggle(): boolean;
    /**
     * @return {*}  {boolean}
     * @memberof Bool
     */
    toBoolean(): boolean;
    /**
     * @return {*}  {Bool}
     * @memberof Bool
     */
    deep_copy(): Bool;
    /**
     * we do not take _set from Obj because we want a conversion if value is not a boolean
     * @protected
     * @param {(string | boolean | Bool)} value
     * @return {*}  {boolean}
     * @memberof Bool
     */
    protected _set(value: string | boolean | Bool): boolean;
    /**
     * @param {IFsData} out
     * @memberof Bool
     */
    _get_fs_data(out: IFsData): void;
}
/**
 * @export
 * @class Choice
 * @extends {Model}
 */
export class Choice extends Model {
    /**
     * @static
     * @type {string}
     * @memberof Choice
     */
    static _constructorName: string;
    /**
     * @type {string}
     * @memberof Choice
     */
    _constructorName: string;
    /**
     * @type {Val}
     * @memberof Choice
     */
    num: Val;
    /**
     *
     * @type {Lst<Str>}
     * @memberof Choice
     */
    lst: Lst<Str>;
    /**
     * Creates an instance of Choice.
     * @param {(Val | number)} [InitIdx]
     * @param {((string | Str)[])} [stringChoises]
     * @memberof Choice
     */
    constructor(InitIdx?: Val | number, stringChoises?: (string | Str)[]);
    /**
     * @return {*}  {boolean}
     * @memberof Choice
     */
    filter(): boolean;
    /**
     * @return {*}  {Str} the seleected value
     * @memberof Choice
     */
    item(): Str;
    /**
     * @return {*}  {string} the seleected value
     * @memberof Choice
     */
    get(): string;
    /**
     * @return {*}  {string}
     * @memberof Choice
     */
    toString(): string;
    /**
     * @param {(Choice | Str)} a
     * @return {*}  {boolean}
     * @memberof Choice
     */
    equals(a: Choice | Str): boolean;
    /**
     * @protected
     * @param {(string | number)} value
     * @return {*}  {boolean}
     * @memberof Choice
     */
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
     * @protected
     * @return {*}  {string}
     * @memberof TypedArray
     */
    protected _get_state(): string;
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
export interface IAuthResponse {
    accessToken: string;
    expires: number;
}
export interface ICreateSessionResponse {
    sessionNumber: number;
    graphServerId: number;
}
export type SpinalCallBackError = () => void;
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
    function auth(options: URL | string, username: string, password: string): Promise<IAuthResponse>;
    function authOrgan(options: URL | string, bosRegisterKey: string, organName: string, organType: string): Promise<IAuthResponse>;
    function createSession(options: URL | string, token: string): Promise<ICreateSessionResponse>;
    /**
     * stores a model in the file system
     * @export
     * @param {FileSystem} fs
     * @param {Model} model
     * @param {string} path
     * @param {IFileInfoOption} [fileOption]
     * @return {*}  {Promise<void>}
     */
    function store(fs: FileSystem, model: Model, path: string, fileOption?: IFileInfoOption): Promise<void>;
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
    function load<T extends Model = Model>(fs: FileSystem, path: string): Promise<T>;
    /**
     * loads a model from the file system
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {string} path
     * @param {SpinalLoadCallBack<T>} callback_success
     * @param {SpinalCallBackError} [callback_error]
     */
    function load<T extends Model = Model>(fs: FileSystem, path: string, callback_success: SpinalLoadCallBack<T>, callback_error?: SpinalCallBackError): void;
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
     * @param {string} path
     * @return {*}  {Promise<Directory>}
     */
    function load_directory(fs: FileSystem, path: string): Promise<Directory>;
    /**
     * @export
     * @param {FileSystem} fs
     * @param {string} path
     * @param {SpinalLoadCallBack<Directory>} [callback]
     */
    function load_directory(fs: FileSystem, path: string, callback?: SpinalLoadCallBack<Directory>): void;
    /**
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {number} ptr
     * @return {*}  {Promise<Model>}
     */
    function load_ptr<T extends Model>(fs: FileSystem, ptr: number): Promise<Model>;
    /**
     * @export
     * @template T
     * @param {FileSystem} fs
     * @param {number} ptr
     * @param {SpinalLoadCallBack<T>} [callback]
     */
    function load_ptr<T extends Model>(fs: FileSystem, ptr: number, callback?: SpinalLoadCallBack<T>): void;
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
declare export namespace SpinalUserManager {
    function get_user_id(options: string | URL, username: string, password: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function get_admin_id(options: string | URL, adminName: string, password: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function new_account(options: string | URL, username: string, password: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function change_password(options: string | URL, user_id: string | number, password: string, newPassword: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function delete_account(options: string | URL, userId: string | number, password: string, userNameToDelete: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function change_password_by_admin(options: string | URL, targetUsername: string, targetPassword: string, adminUserId: string | number, adminPassword: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function delete_account_by_admin(options: string | URL, targetUsername: string, adminUserId: string | number, adminPassword: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
    function change_account_rights_by_admin(options: string | URL, targetUsername: string, targetAcountRight: string | number, adminUserId: string | number, adminPassword: string, success_callback?: (response: string) => void, error_callback?: () => void): Promise<string>;
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
        SpinalUserManager: typeof SpinalUserManager;
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
/**
 * Bese representation of a Object
 * @export
 * @class Model
 */
export class Model {
    static _constructorName: string;
    _constructorName: string;
    /**
     * registered attribute names (in declaration order)
     * @type {string[]}
     * @memberof Model
     */
    _attribute_names: string[];
    /**
     * id of the model
     * @type {number}
     * @memberof Model
     */
    model_id: number;
    /**
     * synchronized processes
     * @type {Process[]}
     * @memberof Model
     */
    _processes: Process[];
    /**
     * parent models (depending on this)
     * @type {Model[]}
     * @memberof Model
     */
    _parents: Model[];
    /**
     * "date" of previous change. We start at + 2 because
     * we consider that an initialisation is a modification.
     * @type {number}
     * @memberof Model
     */
    _date_last_modification: number;
    /**
     * id unique from server.
     * It doesn't exist at creation but added after a sync of the server
     * @type {number}
     * @memberof Model
     */
    _server_id?: number;
    [nameAttr: string]: any;
    /**
     * Creates an instance of Model.
     * @param {*} [attr]
     * @memberof Model
     */
    constructor(attr?: any);
    /**
     * Do nothing here, TBD in child if needed.
     * Called in rem_attr if have no more parent.
     * @memberof Model
     */
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
    /**
     * @param {(Process | BindProcess | Function)} f recommanded to use Process | BindProcess, using Function can lead to error
     * @memberof Model
     */
    unbind(f: Process | BindProcess | Function): void;
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
    /**
     * return a string which describes the changes in this and children since date
     * @param {number} [date=-1]
     * @return {*}  {string}
     * @memberof Model
     */
    get_state(date?: number): string;
    /**
     * add attribute
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
    /**
     * add attribute
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
     * @param {{ [key: string]: any }} instanceOfModel
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
     * @param {number} [_for_display=0]
     * @return {*}  {number}
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
     * To be redifined in children if needed
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
    protected _get_state(): string;
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
     * @protected
     * @param {*} value
     * @return {*}  {boolean}
     * @memberof Model
     */
    protected _set(value: any): boolean;
    /**
     * called by set. change_level should not be defined by the user
     *  (it permits to != change from child of from this)
     * @protected
     * @param {number} [change_level=2]
     * @return {*}  {ReturnType<typeof setTimeout>}
     * @memberof Model
     */
    protected _signal_change(change_level?: number): ReturnType<typeof setTimeout>;
    /**
     * generic definition of _set_state. ( called by _use_state )
     * @param {string} str
     * @param {IStateMap} map
     * @memberof Model
     */
    _set_state(str: string, map: IStateMap<Model>): void;
    /**
     * return true if info from map[ mid ] if compatible with this.
     * If it's the case, use this information to update data
     * @protected
     * @param {string} mid
     * @param {IStateMap<Model>} map
     * @return {*}  {boolean}
     * @memberof Model
     */
    protected _set_state_if_same_type(mid: string, map: IStateMap<Model>): boolean;
    /**
     * map[ id ] = obj for each objects starting from this recursively
     * @protected
     * @param {IFlatModelMap} map
     * @param {number} date
     * @return {*}  {IFlatModelMap}
     * @memberof Model
     */
    protected _get_flat_model_map(map: IFlatModelMap, date: number): IFlatModelMap;
}
export type SpinalLoadCallBack<T extends Model = Model> = (model: T, error?: boolean | string) => void;
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
/**
 * intance of the connection to an server
 * @export
 * @class FileSystem
 */
export class FileSystem {
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
    static get _userid(): string | number;
    /**
     * @static
     * @type {number}
     * @memberof FileSystem
     */
    static _timeout_reconnect: number;
    /**
     * @static
     * @type {boolean}
     * @memberof FileSystem
     */
    static is_cordova: boolean;
    /**
     * data are sent after a timeout (and are concatened before)
     * @static
     * @type {{ [serverId: number]: Model }}
     * @memberof FileSystem
     */
    static _objects_to_send: {
        [serverId: number]: Model;
    };
    /**
     * @static
     * @type {ReturnType<typeof setTimeout>}
     * @memberof FileSystem
     */
    static _timer_send: ReturnType<typeof setTimeout>;
    /**
     * @static
     * @type {ReturnType<typeof setTimeout>}
     * @memberof FileSystem
     */
    static _timer_chan: ReturnType<typeof setTimeout>;
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
     * @type {string}
     * @memberof FileSystem
     */
    _home_dir: string;
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
    /**
     * @static
     * @param {number} tmp_id
     * @param {number} res
     * @return {*}  {void}
     * @memberof FileSystem
     */
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
    /**
     * @static
     * @return {*}  {*}
     * @memberof FileSystem
     */
    static _my_xml_http_request(): any;
}
declare global {
    var spinal: spinalType;
    var spinalCore: typeof _ModelProcessManager.spinal.spinalCore;
    var FileSystem: typeof _ModelProcessManager.spinal.FileSystem;
    var ModelProcessManager: typeof _ModelProcessManager.spinal.ModelProcessManager;
    var SpinalUserManager: typeof _ModelProcessManager.spinal.SpinalUserManager;
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
