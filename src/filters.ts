/* tslint:disable no-shadowed-variable unified-signatures */
import * as p from "path";
import { Minimatch } from "minimatch";
import { Filter, Stats } from "./types";

export function and(...fns: Filter[]) {
  return (path: string, stats: Stats) => {
    for (const fn of fns) {
      if (!fn(path, stats)) {
        return false;
      }
    }
    return true;
  };
}

export function or(...fns: Filter[]) {
  return (path: string, stats: Stats) => {
    for (const fn of fns) {
      if (fn(path, stats)) {
        return true;
      }
    }
    return false;
  };
}

export function files(): Filter {
  return (path, stats) => stats.isFile();
}

export function directories(): Filter {
  return (path, stats) => stats.isDirectory();
}

export function depth(max: number): Filter;
export function depth(min: number, max: number): Filter;
export function depth(minOrMax: number, max?: number): Filter {
  return (path, stats) => {
    const { depth } = stats;
    if (max === undefined) {
      return depth <= minOrMax;
    } else {
      return depth >= minOrMax && depth <= max;
    }
  };
}

export function name(pattern: string | RegExp): Filter {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(p.basename(path));
  } else {
    return (path, stats) => pattern.test(p.basename(path));
  }
}

export function path(pattern: string | RegExp): Filter {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(p.dirname(path));
  } else {
    return (path, stats) => pattern.test(p.dirname(path));
  }
}

export function size(max: number): Filter;
export function size(min: number, max: number): Filter;
export function size(minOrMax: number, max?: number): Filter {
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

export function include(pattern: string | RegExp | Filter): Filter {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => glob.match(path);
  } else if (pattern instanceof RegExp) {
    return (path, stats) => pattern.test(path);
  } else {
    return (path, stats) => pattern(path, stats);
  }
}

export function exclude(pattern: string | RegExp | Filter): Filter {
  if (typeof pattern === "string") {
    const glob = new Minimatch(pattern);
    return (path, stats) => !glob.match(path);
  } else if (pattern instanceof RegExp) {
    return (path, stats) => !pattern.test(path);
  } else {
    return (path, stats) => !pattern(path, stats);
  }
}
