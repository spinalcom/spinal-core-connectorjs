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


# contains an id of a model on the server
#
#

root = if typeof _root_obj == "undefined" then global else window

class Ptr extends spinalCore._def["Model"]
    # model may be a number (the pointer)
    constructor: ( model ) ->
        super()
        @data = {}
        @_set model
        
    load: ( callback ) ->
        if @data.model?
            callback @data.model, false
            return Promise.resolve(@data.model, false)
        else if @data.value and @data.value != 0 and FileSystem._objects[@data.value]
            callback(FileSystem._objects[@data.value], false)
            return Promise.resolve(FileSystem._objects[@data.value], false)
        else
            return new Promise(
                (resolve) =>
                    FileSystem.get_inst()?.load_ptr(@data.value,
                        (model_load, ischange) ->
                            if (typeof callback != 'undefined')
                                callback(model_load, ischange)
                            resolve(model_load, ischange)
                    )
            )            
        
    _get_fs_data: ( out ) ->
        FileSystem.set_server_id_if_necessary out, this
        if @data.model?
            FileSystem.set_server_id_if_necessary out, @data.model
            out.mod += "C #{@_server_id} #{@data.model._server_id} "
            #
            @data.value = @data.model._server_id
            if @data.model._server_id & 3
                FileSystem._ptr_to_update[ @data.model._server_id ] = this
        else
            out.mod += "C #{@_server_id} #{@data.value} "

    _set: ( model ) ->
        if typeof model == "number"
            res = @data.value != model
            @data = { value: model }
            return res
            
        if model instanceof Model
            res = @data.value != model._server_id
            @data = {
                model: model
                value: model._server_id
            }
            return res
                
        return false
            
    _get_state: ->
        @_data

    _set_state: ( str, map ) ->
        @set str

spinalCore.register_models(Ptr)
root.Ptr = Ptr
