/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
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
