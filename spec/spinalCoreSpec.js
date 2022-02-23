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

var spinalCore = require('..');

describe('The SpinalCore API', function () {
  // TODO: The test suite cases should be per method

  it('should extend a JavaScript object', function () {
    function TestModel() {
      TestModel.super(this);
    }

    spinalCore.extend(TestModel, Model);

    sampleModel = new TestModel();

    expect(typeof sampleModel.add_attr).toBe('function');
  });

  describe('The FileSystem interaction', function () {
    var conn;

    beforeAll(function () {
      conn = spinalCore.connect('http://user@host:8888/dir');

      spyOn(conn, 'load_or_make_dir');
    });

    it('should return a FileSystem instance', function () {
      expect(conn).toEqual(jasmine.any(FileSystem));
    });

    it('should store a model in the FileSystem', function () {
      var modelSample = new Str('some text');
      spinalCore.store(conn, modelSample, 'test', function () {});

      expect(conn.load_or_make_dir).toHaveBeenCalled();
    });

    it('should load a model from the FileSystem', function () {
      spinalCore.load(conn, 'test', function () {});

      expect(conn.load_or_make_dir).toHaveBeenCalled();
    });
  });
});
