var mocha   = require('mocha');
var assert  = require('assert');

var fs      = require('fs');
var path    = require('path');
var finder  = require('../');

var root = __dirname+'/..';

describe('finder', function() {

  it('.files() should only return files', function(done) {
    finder(root).files().find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert(files.length > 0);
      for (var i=0; i<files.length; ++i) {
        assert(fs.statSync(files[i]).isFile());
      }
      done();
    });
  });

  it('.directories() should only return directories', function(done) {
    finder(root).directories().find(function(err, directories) {
      assert.equal(null, err);
      assert(directories instanceof Array);
      assert(directories.length > 0);
      for (var i=0; i<directories.length; ++i) {
        assert(fs.statSync(directories[i]).isDirectory());
      }
      done();
    });
  });

  it('.depth() should only return paths two nodes deep', function(done) {
    finder(root).depth(2).find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert(files.length > 0);
      for (var i=0; i<files.length; ++i) {
        assert(path.relative(root, files[i]).split(/[\\\/]/).length <= 2 );
      }
      done();
    });
  });

  it('.name() should only return *.json files', function(done) {
    finder(root).name('*.json').find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert(files.length > 0);
      for (var i=0; i<files.length; ++i) {
        assert.equal('.json', path.extname(files[i]));
      }
      done();
    });
  });

  it('.path() should only return immediate children of node_modules directories', function(done) {
    finder(root).path('node_modules/*').find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert(files.length > 0);
      for (var i=0; i<files.length; ++i) {
        assert.notEqual(-1, files[i].indexOf('node_modules'));
      }
      done();
    });
  });

  it('.size() should only return files >=1KB', function(done) {
    finder(root).files().size(1000).find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert(files.length > 0);
      for (var i=0; i<files.length; ++i) {
        assert(fs.statSync(files[i]).size > 1000);
      }
      done();
    });
  });

  it('.filter() should pass path and stats arguments to filter', function(done) {
    var count = 0;
    finder(root).filter(function(path, stats) {
      assert.equal('string', typeof(path));
      assert.equal('object', typeof(stats));
      return ++count === 1; //allow a single file
    }).find(function(err, files) {
      assert.equal(null, err);
      assert(files instanceof Array);
      assert.equal(1, files.length);
      done();
    });
  });

});