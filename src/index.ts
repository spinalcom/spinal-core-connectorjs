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

import { FileSystem } from './FileSystem/FileSystem';
import { Directory } from './FileSystem/Models/Directory';
import { File } from './FileSystem/Models/File';
import { Path } from './FileSystem/Models/Path';
import { Pbr } from './FileSystem/Models/Pbr';
import { Ptr } from './FileSystem/Models/Ptr';
import { RightSetList } from './FileSystem/Models/RightSetList';
import { RightsItem } from './FileSystem/Models/RightsItem';
import { SessionModel } from './FileSystem/Models/SessionModel';
import { TiffFile } from './FileSystem/Models/TiffFile';
import { User } from './FileSystem/Models/User';
import { UserRight } from './FileSystem/Models/UserRight';
import './globalsDef';
import { ModelProcessManager } from './ModelProcessManager';
import { Bool } from './Models/Bool';
import { Choice } from './Models/Choice';
import { Lst } from './Models/Lst';
import { Model } from './Models/Model';
import { Obj } from './Models/Obj';
import { Str } from './Models/Str';
import { TypedArray_Float64 } from './Models/TypedArray_Float64';
import { TypedArray_Int32 } from './Models/TypedArray_Int32';
import { Val } from './Models/Val';
import { Vec } from './Models/Vec';
import { BindProcess } from './Processes/BindProcess';
import { Process } from './Processes/Process';
import { spinalCore } from './Spinalcore';
import { spinalRegister, spinalRegisterModel } from './Utils/spinalRegister';
export * from './FileSystem/FileSystem';
export * from './FileSystem/Models/Directory';
export * from './FileSystem/Models/File';
export * from './FileSystem/Models/Path';
export * from './FileSystem/Models/Pbr';
export * from './FileSystem/Models/Ptr';
export * from './FileSystem/Models/RightSetList';
export * from './FileSystem/Models/RightsItem';
export * from './FileSystem/Models/SessionModel';
export * from './FileSystem/Models/TiffFile';
export * from './FileSystem/Models/User';
export * from './FileSystem/Models/UserRight';
export * from './interfaces/IFileInfo';
export * from './interfaces/IFileInfoOption';
export * from './interfaces/IFlatModelMap';
export * from './interfaces/IFsData';
export * from './interfaces/IOptionFilesystem';
export * from './interfaces/ISpinalModels';
export * from './interfaces/IStateMap';
export * from './interfaces/SpinalCallBackError';
export * from './interfaces/SpinalFilterFunction';
export * from './interfaces/SpinalLoadCallBack';
export * from './interfaces/SpinalOnChangeBindModel';
export * from './interfaces/SpinalSortFunction';
export * from './interfaces/SpinalStoreCallBackSucess';
export * from './ModelProcessManager';
export * from './Models/Bool';
export * from './Models/Choice';
export * from './Models/Lst';
export * from './Models/Model';
export * from './Models/Obj';
export * from './Models/Str';
export * from './Models/TypedArray';
export * from './Models/TypedArray_Float64';
export * from './Models/TypedArray_Int32';
export * from './Models/Val';
export * from './Models/Vec';
export * from './Processes/BindProcess';
export * from './Processes/GlobalBindFunction';
export * from './Processes/Process';
export * from './Spinalcore';
export * from './Utils/DomHelper';
export * from './Utils/getUrlPath';
export * from './Utils/isIterable';
export * from './Utils/spinalRegister';

if (!('spinal' in globalThis)) {
  globalThis.spinal = ModelProcessManager.spinal;
}

spinalRegister(spinalCore, 'spinalCore');
spinalRegister(FileSystem, 'FileSystem');
spinalRegister(ModelProcessManager, 'ModelProcessManager');
spinalRegister(Process, 'Process');
spinalRegister(BindProcess, 'BindProcess');
spinalRegisterModel(Model, 'Model');
spinalRegisterModel(Obj, 'Obj');
spinalRegisterModel(Bool, 'Bool');
spinalRegisterModel(Val, 'Val');
spinalRegisterModel(Str, 'Str');
spinalRegisterModel(Lst, 'Lst');
spinalRegisterModel(Vec, 'Vec');
spinalRegisterModel(Choice, 'Choice');
spinalRegisterModel(TypedArray_Int32, 'TypedArray_Int32');
spinalRegisterModel(TypedArray_Float64, 'TypedArray_Float64');
spinalRegisterModel(Directory, 'Directory');
spinalRegisterModel(File, 'File');
spinalRegisterModel(TiffFile, 'TiffFile');
spinalRegisterModel(Path, 'Path');
spinalRegisterModel(Ptr, 'Ptr');
spinalRegisterModel(Pbr, 'Pbr');
spinalRegisterModel(SessionModel, 'SessionModel');
spinalRegisterModel(User, 'User');
spinalRegisterModel(UserRight, 'UserRight');
spinalRegisterModel(RightSetList, 'RightSetList');
spinalRegisterModel(RightsItem, 'RightsItem');
