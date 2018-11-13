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

url = require('url')
root = if typeof _root_obj == "undefined" then global else window

# Define main API
class root.spinalCore

    @_def = {}

    @connect: (options) ->
        if typeof options == 'string'
            options = url.parse(options)

        if options.path.slice(-1)[0] != "/"
            options.path += "/"

        FileSystem._home_dir = options.path
        FileSystem._url = options.hostname
        FileSystem._port = options.port
        if options.auth != null
          auth =  options.auth.split ":"
          FileSystem._userid = auth[0]
          if auth.length > 1
            FileSystem._password = auth[1]
        else
          # set default user id
          FileSystem._userid = 644
          FileSystem._password = ""
        return new FileSystem

    # stores a model in the file system
    @store: (fs, model, path, callback_success, callback_error) ->
        if typeof callback_error == "undefined"
          callback_error = ->
            console.log("Model could not be stored. You can pass a callback to handle this error.")

        # Parse path
        lst = path.split "/"
        file_name = lst.pop()
        if lst[0] == ""
            lst.splice 0, 1
        path = lst.join "/" # Absolute paths are not allowed

        fs.load_or_make_dir FileSystem._home_dir + path, ( dir, err ) ->
            if err
                callback_error()
            else
                file = dir.detect ( x ) -> x.name.get() == file_name
                if file?
                    dir.remove file
                dir.add_file file_name, model, { model_type: "Model" }
                callback_success()

    # register models, required when ussing modules require/import
    @register_models: (modelList) ->
      if modelList && modelList instanceof Function
        modelList = [modelList]
      if modelList instanceof Array
        for m in modelList
            spinalCore._def[m.name] = m
      else
        for key, value  of modelList
            spinalCore._def[key] = value

    # loads a model from the file system
    @load: (fs, path, callback_success, callback_error) ->
        if typeof callback_error == "undefined"
          callback_error = ->
            console.log("Model could not be loaded. You can pass a callback to handle this error.")

        # Parse path
        lst = path.split "/"
        file_name = lst.pop()
        if lst[0] == ""
            lst.splice 0, 1
        path = lst.join "/" # Absolute paths are not allowed

        fs.load_or_make_dir FileSystem._home_dir + path, ( current_dir, err ) ->
            if err
                callback_error()
            else
                file = current_dir.detect ( x ) -> x.name.get() == file_name
                if file?
                    file.load ( data, err ) ->
                        if err
                            callback_error()
                        else
                            callback_success data, err
                else
                    callback_error()

    # loads all the models of a specific type
    @load_type: (fs, type, callback_success, callback_error) ->
        if typeof callback_error == "undefined"
          callback_error = ->
            console.log("Model of this type could not be loaded. " +
             "You can pass a callback to handle this error.")

        fs.load_type type, ( data, err ) ->
            if err
                callback_error()
            else
                callback_success data, err

    @load_right: (fs, ptr, callback_success, callback_error) ->
        if typeof callback_error == "undefined"
            callback_error = ->
                console.log("Model Right could not be loaded."+
                 " You can pass a callback to handle this error.")

        fs.load_right ptr, ( data, err ) ->
            if err
                callback_error()
            else
                callback_success data, err


    @share_model: (fs, ptr, file_name, right_flag, targetName) ->
        fs.share_model ptr, file_name, right_flag, targetName

    @right_flag: { AD: 1, WR: 2, RD: 4 }

    # "static" method: extend one object as a class, using the same 'class' concept as coffeescript
    @extend: (child, parent) ->
        for key, value of parent
            child[key] = value

        ctor = () ->
            @constructor = child
            return

        ctor.prototype = parent.prototype
        child.prototype = new ctor()
        child.__super__ = parent.prototype

        # using embedded javascript because the word 'super' is reserved
        `child.super = function () {
            var args = [];
           	for (var i=1; i < arguments.length; i++)
                args[i-1] = arguments[i];
            child.__super__.constructor.apply(arguments[0], args);
        }`

        root = global ? window
        child_name = /^function\s+([\w\$]+)\s*\(/.exec( child.toString() )[ 1 ]
        root[child_name] = child

module.exports = spinalCore
