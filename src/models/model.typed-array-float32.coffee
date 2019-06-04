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

# 
##  TypedArray_Float32 is broken in spinalHub do not use
# 

root = if typeof _root_obj == "undefined" then global else window

class TypedArray_Float32 extends spinalCore._def["TypedArray"]
    constructor: ( size = [], data ) ->
        super size, data
        console.error(new Error('TypedArray_Float32 is broken in spinalHub use, TypedArray_Float64 instead.'))
        
    base_type: ->
        Float32Array

    deep_copy: ->
        new TypedArray_Float32 @_size, @_data

spinalCore.register_models(TypedArray_Float32)
root.TypedArray_Float32 = TypedArray_Float32
