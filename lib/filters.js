var p = require('path');
var g = require('minimatch');

module.exports = {

	/**
	 * Returns true when all filters return true
	 * @param   {...function(path, stats)} filter
	 * @returns {function(path, stats)}
	 */
	and: function() {
		var args = arguments;
		return function(path, stats) {
			for (var i=0; i<args.length; ++i) {
				var arg = args[i]; //TODO: check input type is a function
				if (!arg(path, stats)) {
					return false;
				}
			}
			return true;
		}
	},

	/**
	 * Accepts a file when any filter returns true
	 * @param   {...function(path, stats)} filter
	 * @returns {function(path, stats)}
	 */
	or: function() {
		var args = arguments;
		return function(path, stats) {
			for (var i=0; i<args.length; ++i) {
				var arg = args[i]; //TODO: check input type is a function
				if (arg(path, stats)) {
					return true;
				}
			}
			return false;
		}
	},

	/**
	 * Returns true when the path is a file
	 * @returns {function(path, stats)}
	 */
	files: function() {
		return function(path, stats) {
			return stats.isFile();
		}
	},

	/**
	 * Returns true when the path is a directory
	 * @returns {function(path, stats)}
	 */
	directories: function() {
		return function(path, stats) {
			return stats.isDirectory();
		}
	},

	/**
	 * Returns true when the path is no more than four nodes deep
	 *  Note: to be used with `walkFilter` otherwise it'll only show depth-1 levels
	 * @param   {integer} depth
	 * @returns {function(path, stats)}
	 */
	depth: function(depth) {
		return function(path, stats) {
			//TODO: handle <, <=, =, >, >=, etc
			return stats.depth < depth;
		}
	},

	/**
	 * Returns true when the path matches the search string
	 * @param   {string|RegExp} search
	 * @returns {function(path, stats)}
	 */
	name: function(search) {
		return function(path, stats) {
			path = p.basename(path);
			if (search instanceof RegExp) {
				return search.test(path);
			} else {
				return g(path, search);
			}
		}
	},

	/**
	 * Returns true when the path matches the search string
	 * @param   {string|RegExp} search
	 * @returns {function(path, stats)}
	 */
	path: function(search) {
		return function(path, stats) {
			if (search instanceof RegExp) {
				return search.test(path);
			} else {
				return g(path, search);
			}
		}
	}

	//TODO: size.. handle <, <=, =, >, >=, etc
	//TODO: date

};