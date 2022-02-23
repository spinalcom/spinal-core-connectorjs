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

import type { SpinalFilterFunction } from '../../interfaces/SpinalFilterFunction';
import type { SpinalLoadCallBack } from '../../interfaces/SpinalLoadCallBack';
import { Lst } from '../../Models/Lst';
import { File } from './File';
import { TiffFile } from './TiffFile';

export class Directory extends Lst<File | TiffFile> {
  static readonly _constructorName: string = 'Directory';
  readonly _constructorName: string = Directory._constructorName;

  constructor() {
    super();
  }

  base_(): any {
    return File;
  }

  find(name: string): File | TiffFile {
    for (let i = 0; i < this.length; i++) {
      const file: File = this[i];
      if (file.hasOwnProperty('name') && file.name.equals(name)) return file;
    }
    return undefined;
  }

  load(name: string, callback: SpinalLoadCallBack<any>): void {
    let f = this.find(name);
    if (f) f.load(callback);
    else callback(undefined, 'file does not exist');
  }

  has(f: SpinalFilterFunction<File>): boolean;
  has(name: string): boolean;
  has(name: string | SpinalFilterFunction<File>): boolean {
    if (typeof name === 'string') {
      for (let i = 0; i < this.length; i++) {
        const file = this[i];
        if (file.name.equals(name)) return true;
      }
      return false;
    }
    for (let i = 0; i < this.length; i++) {
      if (name(this[i])) return true;
    }
    return false;
  }

  add_file(name: string, obj: any, params = {}): File {
    const f = this.find(name);
    if (f) return f;
    let res = new File(name, obj, params);
    this.push(res);
    return res;
  }

  add_tiff_file(name: string, obj: any, tiff_obj: any, params = {}): TiffFile {
    const f = this.find(name);
    if (f) return <TiffFile>f;
    const res = new TiffFile(name, obj, tiff_obj, params);
    this.push(res);
    return res;
  }

  force_add_file(name: string, obj: any, params = {}): File {
    let num = 0;
    let filename = name;
    let f = this.find(filename);
    while (f) {
      filename = name + '_' + num;
      f = this.find(filename);
      if (f) num++;
    }
    let res = new File(filename, obj, params);
    this.push(res);
    return res;
  }

  get_file_info(info: any): string {
    return (info.icon = 'folder');
  }
}
