/**
 * SpinalEventEmitter is a singleton class that allows to emit and listen to events
 * @export
 * @class SpinalEventEmitter
 */
export declare class SpinalEventEmitter {
    private constructor();
    private static instance;
    static getInstance(): SpinalEventEmitter;
    private emitter;
    on: {
        <Key extends EventType>(type: Key, handler: Handler<Record<EventType, unknown>[Key]>): void;
        (type: "*", handler: WildcardHandler<Record<EventType, unknown>>): void;
    };
    off: {
        <Key extends EventType>(type: Key, handler?: Handler<Record<EventType, unknown>[Key]>): void;
        (type: "*", handler: WildcardHandler<Record<EventType, unknown>>): void;
    };
    emit: {
        <Key extends EventType>(type: Key, event: Record<EventType, unknown>[Key]): void;
        <Key_1 extends EventType>(type: undefined extends Record<EventType, unknown>[Key_1] ? Key_1 : never): void;
    };
    waitEvt(evt: string): Promise<any>;
}
declare type EventType = string | symbol;
declare type Handler<T = unknown> = (event: T) => void;
declare type WildcardHandler<T = Record<string, unknown>> = (type: keyof T, event: T[keyof T]) => void;
export {};
