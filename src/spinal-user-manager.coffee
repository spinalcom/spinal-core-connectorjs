# Copyright 2015 SpinalCom - www.spinalcom.com
#
# This file is part of SpinalCore.
#
# Please read all of the following terms and conditions
# of the Free Software license Agreement ("Agreement")
# carefully.
#
# This Agreement is a legally binding contract between
# the Licensee (as defined below) and SpinalCom that
# sets forth the terms and conditions that govern your
# use of the Program. By installing and/or using the
# Program, you agree to abide by all the terms and
# conditions stated or referenced herein.
#
# If you do not agree to abide by these terms and
# conditions, do not demonstrate your acceptance and do
# not install or use the Program.
#
# You should have received a copy of the license along
# with this file. If not, see
# <http://resources.spinalcom.com/licenses.pdf>.

# scalar
root = if typeof _root_obj == "undefined" then global else window



###*
* @class SpinalUserManager
###
class root.SpinalUserManager

  
  # @method post_user_id
  # @param {String} options
  # @param {String} username
  # @param {String} password
  # @return {Promise} `UserID` or `-1`
  # @promise {String} UserID
  @post_user_id: (options, username, password,
   success_callback, error_callback = null) ->
    request = "U #{username} #{password} "
    @send_xhr(options, '/user/_', request, (response) ->
      if parseInt(response) == -1
        SpinalUserManager._if_error(error_callback, 'post_user_id', status)
      else
        success_callback(response)
    , (status) ->
      SpinalUserManager._if_error(error_callback, 'post_user_id', status)
    )

  @post_user_change_password: (options, userID, oldPassword, newPassword,
   success_callback = null, error_callback = null) ->
    return new Promise(
      (resolve, reject) =>
        request = "p #{userID} #{oldPassword} #{newPassword} "
        @send_xhr(options, '/user/_', request, (response) ->
          if parseInt(response) == -1
            if (error_callback != null)
              error_callback(response)
            reject(response)
          else
            if (success_callback != null)
              success_callback(response)
            resolve(response)
        , (status) ->
          if (error_callback != null)
            error_callback(response)
          reject(response)
        )
    )

  @post_admin_id: (options, adminUserName, adminPassword,
   success_callback = null, error_callback = null) ->
    return new Promise(
      (resolve, reject) =>
        request = "A #{adminUserName} #{adminPassword} "
        @send_xhr(options, '/user/_', request, (response) ->
          if parseInt(response) == -1
            if (error_callback != null)
              error_callback(response)
            reject(response)
          else
            if (success_callback != null)
              success_callback(response)
            resolve(response)
        , (status) ->
          if (error_callback != null)
            error_callback(response)
          reject(response)
        )
    )

  @post_admin_user_id: (options, adminID, adminPassword, targetUserName
   success_callback, error_callback = null) ->
    request = "A #{adminID} #{adminPassword} #{targetUserName} "
    @send_xhr(options, '/user/_', request, (response) ->
      if parseInt(response) == -1
        if (error_callback != null)
          error_callback(response)
      else
        success_callback(response)
    , (status) ->
      if (error_callback != null)
        error_callback(response)
    )



  @send_xhr: (options, get_cmd, _data_to_send, success_callback, error_callback) ->
    path = ""
    if typeof options == 'string'
      options = url.parse(options)
    FileSystem._url = options.hostname
    FileSystem._port = options.port
    if FileSystem.CONNECTOR_TYPE == "Node" || FileSystem.is_cordova
      if (FileSystem._port)
        path = "http://" + FileSystem._url + ":" + FileSystem._port + get_cmd
      else
        path = "http://" + FileSystem._url + get_cmd
    else if FileSystem.CONNECTOR_TYPE == "Browser"
      path = get_cmd

    xhr_object = FileSystem._my_xml_http_request()
    xhr_object.open 'POST', path, true
    xhr_object.onreadystatechange = ->
      if @readyState == 4 and @status == 200
        success_callback @responseText
      else if @readyState == 4
        error_callback(@status)
      xhr_object.setRequestHeader('Content-Type', 'text/plain')
      xhr_object.send _data_to_send

  @_if_error: (error_callback, fun, response) ->
    if (error_callback != null)
      error_callback(response)
    else
      console.error('Error on ' + fun + ' and the error_callback was not set.')


  # @get_user_id: (options, user_name, password, success_callback, error_callback = null) ->
  #   # Access: /get_user_id?u=<user>&p=<password>
  #   get_cmd = '/get_user_id?u=' + user_name + '&p=' + password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_user_id', response)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_user_id', status)
  #   )

  # @get_admin_id: (options, admin_name, password, success_callback, error_callback = null) ->
  #   # Access: /get_user_id?u=<user>&p=<password>
  #   get_cmd = '/get_admin_id?u=' + admin_name + '&p=' + password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_admin_id', response)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_admin_id', status)
  #   )

  # @new_account: (options, user_name, password, success_callback, error_callback = null) ->
  #   # Access: /get_new_account?e=<user>&p=<password>&cp=<confirm_password>
  #   get_cmd = '/get_new_account?e=' + user_name + '&p=' + password + '&cp=' + password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_new_account', status)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_new_account', status)
  #   )

  # @change_password: (options, user_id, password, new_password,
  #  success_callback, error_callback = null) ->
  #   # Access: /get_change_user_password?e=<user>&op=<old_pass>&np=<newpass>&cp=<confim_pass>
  #   get_cmd = '/get_change_user_password?e=' + user_id + '&op=' + password +
  #    '&np=' + new_password + '&cp=' + new_password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_change_user_password', status)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_change_user_password', status)
  #   )

  # @delete_account: (options, user_id, password, success_callback, error_callback = null) ->
  #   # Access: /get_delete_account?e=<user>&i=<id>&p=<password>
  #   get_cmd = '/get_delete_account?e=' + user_name + '&i=' + user_id + '&p=' + password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_delete_account', status)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_delete_account', status)
  #   )

  # @change_password_by_admin: (options, username, password, admin_id,
  #  admin_password, success_callback, error_callback = null) ->
  #   # Access: ?u=<username>&np=<newpass>&a=<admin_id>&ap=<adminPass>
  #   # admin == 644(root) or 168(admin)
  #   get_cmd = '/get_change_user_password_by_admin?u=' + username + '&np=' + password +
  #    '&a=' + admin_id + '&ap=' + admin_password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_change_user_password_by_admin', status)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_change_user_password_by_admin', status)
  #   )

  # @delete_account_by_admin: (options, username, admin_id, admin_password,
  #  success_callback, error_callback = null) ->
  #   # Access: /get_delete_account_by_admin?u=<username>&a=<admin_id>&ap=<adminPassword>
  #   # admin == 644(root) or 168(admin)
  #   get_cmd = '/get_delete_account_by_admin?u=' + username + '&a=' + admin_id +
  #    '&ap=' + admin_password
  #   @send_xhr(options, get_cmd, (response) ->
  #     if parseInt(response) == -1
  #       SpinalUserManager._if_error(error_callback, 'get_delete_account_by_admin', status)
  #     else
  #       success_callback(response)
  #   , (status) ->
  #     SpinalUserManager._if_error(error_callback, 'get_delete_account_by_admin', status)
  #   )
