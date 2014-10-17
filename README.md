# finder-on-steroids
Recursively find files and directories.

## Installation

	npm install --save finder-on-steroids

## Methods

### Finder.files() : Finder

Restrict results to contain only files as identified by fs.Stat.isFile().

### Finder.directories() : Finder

Restrict results to contain only directories identified by fs.Stat.isDirectory().

### Finder.depth(Number : depth) : Finder

Restrict results to contain only paths of a specific number of levels.

### Finder.name(RegExp|String : pattern) : Finder

Restrict results to contain only files and directories with names that match the specified pattern. Takes a RegExp or glob string.

### Finder.path(RegExp|String : pattern) : Finder

Restrict results to contain only files and directories with relative paths that match the specified pattern. Takes a RegExp or glob string.

### Finder.filter(Function(String : path, Object : stats)) : Finder

Restrict results to contain only files and directories according to a custom filter function.

### Finder.find([Function(Error, Array) : callback]) : Promise

Finds files matching the specified criteria.

## Usage

	var finder = require('finder-on-steroids');

	var directory = process.argv[2] || process.cwd();

	finder(directory).files().depth(2).name('*.js').find(function(err, files) {
		console.log(err, files);
	});
