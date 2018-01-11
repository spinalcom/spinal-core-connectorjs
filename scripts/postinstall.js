/*
 * Copyright 2015 SpinalCom - www.spinalcom.com
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

var fs = require('fs');
var path = require('path');

var browserPath = path.resolve('../../.browser_organs');
var browserLibPath = path.resolve('../../.browser_organs/lib');
var spinalCoreLib = path.resolve('./lib/spinalcore.browser.js');

console.log('Postinstall script inititated.');
if (!fs.existsSync(browserPath)) {
  fs.mkdirSync(browserPath);
}
if (!fs.existsSync(browserLibPath)) {
  fs.mkdirSync(browserLibPath);
}

if (!fs.existsSync(path.resolve(browserLibPath + '/spinalcore.browser.js'))) {
copyRecursiveSync(spinalCoreLib, path.resolve(browserLibPath + '/spinalcore.browser.js'));
}

console.log('Postinstall script finished.');

function copyRecursiveSync(src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (exists && isDirectory) {
    fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(path.join(src, childItemName),
        path.join(dest, childItemName));
    });
  } else {
    fs.linkSync(src, dest);
  }
};
