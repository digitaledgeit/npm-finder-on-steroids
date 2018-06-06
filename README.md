# finder-on-steroids

Recursively find and filter files and folders in a directory.

[![CircleCI](https://circleci.com/gh/jameslnewell/readdir-on-steroids.svg?style=svg)](https://circleci.com/gh/jameslnewell/readdir-on-steroids)

## Installation

```bash
npm install --save finder-on-steroids
```

## Usage

```js
import finder from "../src";

const directory = process.argv[4] || ".";

finder(directory)
  .files()
  .depth(1)
  .name("*.ts")
  .find()
  .then(
    files => {
      console.log("\n  Found " + files.length + " TypeScript files:");
      console.log("   - " + files.sort().join("\n   - ") + "\n");
    },
    error => console.error(error)
  );
```

## API

### `finder(directory: string): Finder`

Create a new finder object.

### `.files(): Finder`

Restrict results to contain only files as identified by `fs.Stat.isFile()`.

### `.directories(): Finder`

Restrict results to contain only directories identified by `fs.Stat.isDirectory()`.

### `.depth(max: number) : Finder`

### `.depth(min: number, max: number) : Finder`

Restrict results to contain only paths up to a specific depth.

### `.name(pattern: string|RegExp): Finder`

Restrict results to contain only files and directories with base names that match the specified pattern. Takes a glob string or a RegExp.

### `.path(pattern: string|RegExp): Finder`

Restrict results to contain only files and directories with dir names that match paths that match the specified pattern. Takes a glob string or RegExp.

### `.size(max: number) : Finder`

### `.size(min: number, max: number) : Finder`

Restrict results to contain only files and directories of size within the specified range.

### `.include(Function(filter: string | RegExp | (path: string, stat: Stats) => boolean): Finder`

Restrict results to contain only files and directories according to a custom filter function.

### `.exclude(Function(filter: string | RegExp | (path: string, stat: Stats) => boolean): Finder`

Restrict results to contain only files and directories according to a custom filter function.

### `.find(): Promise<string[]>`

Start finding files.

## License

The MIT License (MIT)

Copyright (c) 2014 James Newell
