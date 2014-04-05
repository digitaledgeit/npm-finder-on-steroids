# finder-on-steroids
Recursively finds files and directories.

## Installation

	npm install finder-on-steroids

## Methods

### Finder.files()

Restrict results to only files identified by fs.Stat.isFile().

### Finder.directories()

Restrict results to only directories identified by fs.Stat.isDirectory().

### Finder.depth(depth)

Restrict results to only a specific number of levels deep.

### Finder.name(pattern)

Restrict results to only files and directories with names that match the base name. Takes a glob string or RegExp.

### Finder.path(pattern)

Restrict results to only files and directories with names that match the full path. Takes a glob string or RegExp.

### Finder.filter(function(path, stats))

Restrict results using a custom filter function.

## Usage

	var finder = require('finder-on-steroids');

	var directory = process.argv[2] || process.cwd();

	finder(directory).files().depth(2).name('*.js').find().then(function(files) {
		console.log(files);
		console.log('done!');
	});
