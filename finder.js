var readdir = require('readdir-on-steroids');
var filters = require('./filters');

/**
 * Wrap a filter and apply it to the finder object
 * @param   {Function}      fn      The filter function
 * @param   {String}        [type]  The filter type
 * @returns {Function}
 */
function filter(fn, type) {
  type = type || 'listFilter';
  return function() {
    if (typeof this.options[type] === 'function') {
      this.options[type] = filters.and(this.options[type], fn.apply(this, arguments));
    } else {
      this.options[type] = fn.apply(this, arguments);
    }
    return this;
  };
}

/**
 * A finder class
 * @constructor
 * @param   {String}                directory
 * @param   {Object}                [options]
 * @return  {Finder}
 */
function Finder(directory, options) {

  if (!(this instanceof Finder)) {
    return new Finder(directory, options);
  }

  this.directory  = directory;
  this.options    = options || {};
}

/**
 * Restrict results to contain only files as identified by fs.Stat.isFile().
 * @return  {Finder}
 */
Finder.prototype.files = filter(filters.files);

/**
 * Restrict results to contain only directories identified by fs.Stat.isDirectory().
 * @return  {Finder}
 */
Finder.prototype.directories = filter(filters.directories);

/**
 * Restrict results to contain only paths of a specific number of levels.
 * @param   {Number}    depth
 * @return  {Finder}
 */
Finder.prototype.depth = filter(filters.depth, 'walkFilter');

/**
 * Restrict results to contain only files and directories with names that match the specified pattern. Takes a RegExp or glob string.
 * @param   {String}    pattern
 * @return  {Finder}
 */
Finder.prototype.name = filter(filters.name);

/**
 * Restrict results to contain only files and directories with relative paths that match the specified pattern. Takes a RegExp or glob string.
 * @param   {String}    pattern
 * @return  {Finder}
 */
Finder.prototype.path = filter(filters.path);

/**
 * Restrict results to contain only files and directories according to a custom filter function.
 * @param   {Function(String, Object)} fn
 * @return  {Finder}
 */
Finder.prototype.filter = function(fn) {
  var type = 'listFilter';

  if (typeof this.options[type] === 'function') {
    this.options[type] = filters.and(this.options[type], fn);
  } else {
    this.options[type] = fn;
  }

  return this;
};

/**
 * Finds files matching the criteria
 * @param   {Function(Error|null, Array|null)} [callback]
 * @return  {Promise}
 */
Finder.prototype.find = function(callback) {
  var promise = readdir(this.directory, this.options);

  if (callback) {

    //handle success
    promise.done(
      function(files) {
        callback(null, files);
        return files;
      },
      function(err) {
        callback(err, null);
      }
    );

  }

  return promise;
};

module.exports = Finder;