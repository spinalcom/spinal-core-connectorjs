#!/bin/bash

LICENSE_TEXT="/*
* Copyright 2015 SpinalCom - www.spinalcom.com
*
* This file is part of SpinalCore.
*
* Please read all of the following terms and conditions of the Free Software
* license Agreement (\"Agreement\") carefully.
*
* This Agreement is a legally binding contract between the Licensee (as defined
* below) and SpinalCom that sets forth the terms and conditions that govern
* your use of the Program. By installing and/or using the Program, you agree to
* abide by all the terms and conditions stated or referenced herein.
*
* If you do not agree to abide by these terms and conditions, do not
* demonstrate your acceptance and do not install or use the Program.
*
* You should have received a copy of the license along with this file. If not,
* see <http://resources.spinalcom.com/licenses.pdf>.
*/
"

# TODO: Modularize npm module to get rid of concatenating dependencies
#compileCoffeeScript()
#{
#
#s}

FILES="src/index.coffee\
    src/model-process-manager.coffee\
    src/spinal-user-manager.coffee\
    src/models/model.coffee\
    src/models/model.obj.coffee\
    src/models/model.choice.coffee\
    src/models/model.bool.coffee\
    src/models/model.const-or-not.coffee\
    src/models/model.constrained-val.coffee\
    src/models/model.lst.coffee\
    src/models/model.val.coffee\
    src/models/model.vec.coffee\
    src/models/model.str.coffee\
    src/models/model.typed-array.coffee\
    src/models/model.typed-array-float64.coffee\
    src/models/model.typed-array-int32.coffee\
    src/models/model.User.coffee\
    src/file-system/file-system.coffee\
    src/file-system/models/model.directory.coffee\
    src/file-system/models/model.file.coffee\
    src/file-system/models/model.path.coffee\
    src/file-system/models/model.ptr.coffee\
    src/file-system/models/model.pbr.coffee\
    src/file-system/models/model.rightsItem.coffee\
    src/file-system/models/model.SessionModel.coffee\
    src/file-system/models/model.tiff-file.coffee\
    src/file-system/models/model.userRight.coffee\
    src/file-system/models/mode.rightSetList.coffee\
    src/processes/process.coffee\
    src/processes/bind-process.coffee\
    src/Utils/DomHelper.coffee"

# Build SpinalCore node module from CoffeeScript
buildForNode()
{
    echo "${LICENSE_TEXT}" > lib/spinalcore.node.js;
    cat $FILES | $(npm bin)/coffee -t -c --stdio >> lib/spinalcore.node.js
}

# Build SpinalCore for browser from node module
buildForBrowser()
{
    buildForNode;
    echo "var _root_obj = this;" > lib/spinalcore.browser.js;
    echo "$($(npm bin)/browserify --detect-globals false extras/browser.js)" >> lib/spinalcore.browser.js;
}

# Build SpinalCore for both browser and node
build()
{
    buildForNode;
    buildForBrowser;
}

# Main
if [[ $1 == "--browser" ]]; then
    buildForBrowser;
elif [[ $1 == "--node" ]]; then
    buildForNode;
else
    build;
fi
