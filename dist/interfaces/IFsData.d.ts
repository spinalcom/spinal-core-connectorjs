import type { Model } from '../Models/Model';
/**
 * the commands of a batch: the creations (N) go before the changes (C) referring to them
 * @export
 * @interface IFsData
 */
export interface IFsData {
    cre: string;
    mod: string;
    /**
     * length the batch may reach: a container with a new model that doesn't fit anymore is written in a
     * next batch (later), its new models that fit are created in this one (see FileSystem._register)
     */
    budget?: number;
    /** the containers to write again in a next batch */
    later?: Model[];
    /** the models taken from FileSystem._objects_to_send for this batch */
    taken?: Model[];
    /** the models given a temporary id in this batch */
    registered?: Model[];
}
