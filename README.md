# finder-on-steroids
Recursively find files and directories on the filesystem.

## Installation

	npm install --save finder-on-steroids

## Usage

	var finder = require('finder-on-steroids');

	var directory = process.argv[2] || process.cwd();

	finder(directory).files().depth(2).name('*.js').find(function(err, files) {
		console.log(err, files);
	});

## Methods

### Finder.files() : Finder

Restrict results to contain only files as identified by `fs.Stat.isFile()`.

### Finder.directories() : Finder

Restrict results to contain only directories identified by `fs.Stat.isDirectory()`.

### Finder.depth(depth : Number) : Finder

Restrict results to contain only paths of a specific number of levels.

### Finder.name(pattern : String|RegExp) : Finder

Restrict results to contain only files and directories with names that match the specified pattern. Takes a glob string or RegExp.

### Finder.path(pattern : String|RegExp) : Finder

Restrict results to contain only files and directories with relative paths that match the specified pattern. Takes a glob string or RegExp.

### Finder.size(min : Number, [max : Number]) : Finder

Restrict results to contain only files and directories of size within the specified range.

- `min` - The minimum number of bytes that results can contain 
- `max` - optional - The maximum number of bytes that results can contain

### Finder.filter(Function(path : String : path, stat : Object) : Boolean) : Finder

Restrict results to contain only files and directories according to a custom filter function.

### Finder.find([Function(Error, Array) : callback]) : Promise

Finds files matching the specified criteria.

## License

The MIT License (MIT)

Copyright (c) 2014 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.