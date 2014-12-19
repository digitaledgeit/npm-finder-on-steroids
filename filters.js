var p     = require('path');
var glob  = require('minimatch');

module.exports = {

	/**
	 * Accept a file when all filters return true
	 * @param   {...Function(String, Object)} filter
	 * @returns {Function(String, Object)}
	 */
	and: function() {
		var fns = arguments;
		return function(path, stats) {
			for (var i=0; i<fns.length; ++i) {
				var fn = fns[i]; //TODO: check input type is a function
				if (!fn(path, stats)) {
					return false;
				}
			}
			return true;
		}
	},

	/**
	 * Accept a file when any filter returns true
	 * @param   {...Function(String, Object)} filter
	 * @returns {Function(String, Object)}
	 */
	or: function() {
		var fns = arguments;
		return function(path, stats) {
			for (var i=0; i<fns.length; ++i) {
				var fn = fns[i]; //TODO: check input type is a function
				if (fn(path, stats)) {
					return true;
				}
			}
			return false;
		}
	},

	/**
	 * Return true when the path is a file
	 * @returns {Function(String, Object)}
	 */
	files: function() {
		return function(path, stats) {
			return stats.isFile();
		}
	},

	/**
	 * Return true when the path is a directory
	 * @returns {Function(String, Object)}
	 */
	directories: function() {
		return function(path, stats) {
			return stats.isDirectory();
		}
	},

	/**
	 * Return true when the path is no more than four nodes deep
	 *  Note: to be used with `walkFilter` otherwise it'll only show depth-1 levels
	 * @param   {Number} depth
	 * @returns {Function(String, Object)}
	 */
	depth: function(depth) { //TODO: handle min and max e.g. .depth(min, max)
		return function(path, stats) {
			return stats.depth < depth;
		}
	},

	/**
	 * Return true when the path matches the search String
	 * @param   {RegExp|String} pattern
	 * @returns {Function(String, Object)}
	 */
	name: function(pattern) {
		return function(path, stats) {

      //only compare the leaf name
      path = p.basename(path);

			if (pattern instanceof RegExp) {
				return pattern.test(path);
			} else {
				return glob(path, pattern);
			}

		}
	},

	/**
	 * Return true when the path matches the search String
	 * @param   {RegExp|String} pattern
	 * @returns {Function(String, Object)}
	 */
	path: function(pattern) {
		return function(path, stats) {

      //only compare the relative path
      path = p.relative(stats.root, path);

			if (pattern instanceof RegExp) {
				return pattern.test(path);
			} else {
				return glob(path, pattern);
			}

		}
	},

  /**
   * Return true when the file size is within the specified range
   * @param   {Number} min    The minimum size in bytes
   * @param   {Number} [max]  The maximum size in bytes
   * @returns {Function(String, Object)}
   */
  size: function(min, max) {
    return function(path, stats) {

      if (min && max) {
        return stats.size >= min && stats.size <= max;
      } else {
        return stats.size >= min
      }

    }
  }

	//TODO: .date() handle min and max e.g. .date(min, max)

};