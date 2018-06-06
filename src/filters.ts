/* tslint:disable no-shadowed-variable unified-signatures */
import * as p from "path";
import { Minimatch } from "minimatch";
import { Stats } from "readdir-on-steroids";

export type FilterFunction = (path: string, stats: Stats) => boolean;

export function and(...fns: FilterFunction[]) {
  return (path: string, stats: Stats) => {
    for (const fn of fns) {
      if (!fn(path, stats)) {
        return false;
      }
    }
    return true;
  };
}

export function or(...fns: FilterFunction[]) {
  return (path: string, stats: Stats) => {
    for (const fn of fns) {
      if (fn(path, stats)) {
        return true;
      }
    }
    return false;
  };
}

export function files(): FilterFunction {
  return (path, stats) => stats.isFile();
}

export function directories(): FilterFunction {
  return (path, stats) => stats.isDirectory();
}

export function depth(max: number): FilterFunction;
export function depth(min: number, max: number): FilterFunction;
export function depth(minOrMax: number, max?: number): FilterFunction {
  return (path, stats) => {
    const { depth } = stats;
    if (max === undefined) {
      return depth <= minOrMax;
    } else {
      return depth >= minOrMax && depth <= max;
    }
  };
}

export function name(pattern: string | RegExp): FilterFunction {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(p.basename(path));
  } else {
    return (path, stats) => pattern.test(p.basename(path));
  }
}

export function path(pattern: string | RegExp): FilterFunction {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(p.dirname(path));
  } else {
    return (path, stats) => pattern.test(p.dirname(path));
  }
}

export function size(max: number): FilterFunction;
export function size(min: number, max: number): FilterFunction;
export function size(minOrMax: number, max?: number): FilterFunction {
  return (path, stats) => {
    const { size } = stats;
    if (max === undefined) {
      return size <= minOrMax;
    } else {
      return size >= minOrMax && size <= max;
    }
  };
}

//TODO: .date() handle min and max e.g. .date(min, max)

export function include(
  pattern: string | RegExp | FilterFunction
): FilterFunction {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(path);
  } else if (pattern instanceof RegExp) {
    return (path, stats) => pattern.test(path);
  } else {
    return (path, stats) => pattern(path, stats);
  }
}

export function exclude(
  pattern: string | RegExp | FilterFunction
): FilterFunction {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => !glob.match(path);
  } else if (pattern instanceof RegExp) {
    return (path, stats) => !pattern.test(path);
  } else {
    return (path, stats) => !pattern(path, stats);
  }
}
