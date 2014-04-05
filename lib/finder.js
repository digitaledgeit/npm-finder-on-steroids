var readdir = require('readdir-on-steroids/lib/readdir');
var filters = require('./filters');

/**
 * Creates a filter wrapper and applies it to the finder object
 * @param   {function}      filterFn
 * @param   {string}        [filterName]
 * @returns {function}
 */
function createFilter(filterFn, filterName) {
	filterName = filterName || 'listFilter';
	return function() {
		if (typeof this.options[filterName] === 'function') {
			this.options[filterName] = filters.and(this.options[filterName], filterFn.apply(filterFn, arguments));
		} else {
			this.options[filterName] = filterFn.apply(filterFn, arguments);
		}
		return this;
	};
}

/**
 * A finder
 * @param   {string}    directory
 * @param   {object}    [options]   The readdir-on-steroids options
 * @constructor
 */
function Finder(directory, options) {
	this.directory  = directory;
	this.options    = options || {};
}

/**
 * Include files
 * @return  {Promise}
 */
Finder.prototype.files = createFilter(filters.files);

/**
 * Include directories
 * @return  {Promise}
 */
Finder.prototype.directories = createFilter(filters.directories);

/**
 * Filters files greater than the specified depth
 * @param   {integer}   depth
 * @return  {Promise}
 */
Finder.prototype.depth = createFilter(filters.depth, 'walkFilter');

/**
 * Filters files matching the specified string
 * @param   {string}    pattern
 * @return  {Promise}
 */
Finder.prototype.name = createFilter(filters.name);

/**
 * Filters files matching the specified string
 * @param   {string}    pattern
 * @return  {Promise}
 */
Finder.prototype.path = createFilter(filters.path);

/**
 * Filters files matching the specified string
 * @param   {function(path, stats)} filterFn
 * @return  {Promise}
 */
Finder.prototype.filter = function(filterFn) {
	var filterName = 'listFilter';
	if (typeof this.options[filterName] === 'function') {
		this.options[filterName] = filters.and(this.options[filterName], filterFn.apply(filterFn, arguments));
	} else {
		this.options[filterName] = filterFn.apply(filterFn, arguments);
	}
	return this;
};

/**
 * Finds files matching the criteria
 * @return  {Promise}
 */
Finder.prototype.find = function() {
	return readdir(this.directory, this.options);
};

/**
 * Creates a new finder object
 * @param   {string}                directory
 * @param   {object}                [options]
 * @param   {integer}               [options.depth]
 * @return  {Finder}
 */
Finder.create = function(directory, options) {
	return new Finder(directory, options);
};

module.exports = Finder;