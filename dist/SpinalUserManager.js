"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinalUserManager = void 0;
const sendXhr_1 = require("./Utils/sendXhr");
class SpinalUserManager {
    static get_user_id(options, username, password, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_user_id?u=<user>&p=<password>
            const get_cmd = `/get_user_id?u=${username}&p=${password}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_user_id', error);
            }
        });
    }
    static get_admin_id(options, adminName, password, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_user_id?u=<user>&p=<password>
            var get_cmd = `/get_admin_id?u=${adminName}&p=${password}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_admin_id', error);
            }
        });
    }
    static new_account(options, username, password, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_new_account?e=<user>&p=<password>&cp=<confirm_password>
            var get_cmd = `/get_new_account?e=${username}&p=${password}&cp=${password}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_new_account', error);
            }
        });
    }
    static change_password(options, user_id, password, newPassword, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_change_user_password?e=<user>&op=<old_pass>&np=<newpass>&cp=<confim_pass>
            var get_cmd = `/get_change_user_password?e=${user_id}&op=${password}&np=${newPassword}&cp=${newPassword}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_change_user_password', error);
            }
        });
    }
    static delete_account(options, userId, password, userNameToDelete, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_delete_account?e=<user>&i=<id>&p=<password>
            const get_cmd = `/get_delete_account?e=${userNameToDelete}&i=${userId}&p=${password}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_delete_account', error);
            }
        });
    }
    static change_password_by_admin(options, targetUsername, targetPassword, adminUserId, adminPassword, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: ?u=<username>&np=<newpass>&a=<admin_id>&ap=<adminPass>
            // admin == 644(root) or 168(admin)
            const get_cmd = `/get_change_user_password_by_admin?u=${targetUsername}&np=${targetPassword}&a=${adminUserId}&ap=${adminPassword}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_change_user_password_by_admin', error);
            }
        });
    }
    static delete_account_by_admin(options, targetUsername, adminUserId, adminPassword, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: /get_delete_account_by_admin?u=<username>&a=<admin_id>&ap=<adminPassword>
            // admin == 644(root) or 168(admin)
            const get_cmd = `/get_delete_account_by_admin?u=${targetUsername}&a=${adminUserId}&ap=${adminPassword}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_delete_account_by_admin', error);
            }
        });
    }
    static change_account_rights_by_admin(options, targetUsername, targetAcountRight, adminUserId, adminPassword, success_callback, error_callback = null) {
        return __awaiter(this, void 0, void 0, function* () {
            // Access: ?u=<username>&ri=<rights>&a=<admin_id>&ap=<adminPass>
            // admin == 644(root) or 168(admin)
            const get_cmd = `/get_change_account_rights_by_admin?u=${targetUsername}&ri=${targetAcountRight}&a=${adminUserId}&ap=${adminPassword}`;
            try {
                const response = yield (0, sendXhr_1.sendXhr)(options, get_cmd, 'GET');
                if (parseInt(response) === -1)
                    throw new Error('command rejected by the server');
                if (typeof success_callback === 'function') {
                    success_callback(response);
                }
                return response;
            }
            catch (error) {
                SpinalUserManager._if_error(error_callback, 'get_change_account_rights_by_admin', error);
            }
        });
    }
    static _if_error(error_callback, fun, response) {
        if (error_callback !== null) {
            return error_callback(response);
        }
        else {
            return console.log('Error on ' + fun + ' and the error_callback was not set.');
        }
    }
}
exports.SpinalUserManager = SpinalUserManager;
//# sourceMappingURL=SpinalUserManager.js.map