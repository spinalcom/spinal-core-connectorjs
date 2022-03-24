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
