/* tslint:disable unified-signatures */
import readdir from "readdir-on-steroids";
import { Finder, Filter, Stats } from "./types";
import * as filters from "./filters";

export class FileSystemFinder implements Finder {
  private readonly directory: string;
  private readonly listFilters: Filter[] = [];
  private readonly walkFilters: Filter[] = [];

  constructor(directory: string) {
    this.directory = directory;
  }

  files(): Finder {
    this.listFilters.push(filters.files());
    return this;
  }

  directories(): Finder {
    this.listFilters.push(filters.directories());
    return this;
  }

  depth(max: number): Finder;
  depth(min: number, max: number): Finder;
  depth(minOrMax: number, max?: number): Finder {
    if (max === undefined) {
      this.walkFilters.push(filters.depth(minOrMax));
      this.listFilters.push(filters.depth(minOrMax));
    } else {
      this.walkFilters.push(filters.depth(minOrMax, max));
      this.listFilters.push(filters.depth(minOrMax, max));
    }
    return this;
  }

  name(name: string | RegExp): Finder {
    this.listFilters.push(filters.name(name));
    return this;
  }

  path(path: string | RegExp): Finder {
    this.listFilters.push(filters.path(path));
    return this;
  }

  size(max: number): Finder;
  size(min: number, max: number): Finder;
  size(minOrMax: number, max?: number): Finder {
    if (max === undefined) {
      this.listFilters.push(filters.size(minOrMax));
    } else {
      this.listFilters.push(filters.size(minOrMax, max));
    }
    return this;
  }

  include(filter: string | RegExp | Filter): Finder {
    this.listFilters.push(filters.include(filter));
    return this;
  }

  exclude(filter: string | RegExp | Filter): Finder {
    this.listFilters.push(filters.exclude(filter));
    return this;
  }

  filter(filter: string | RegExp | Filter): Finder {
    // tslint:disable-next-line no-console
    console.warn(
      "Finder.filter() has been deprecated. Please use `Finder.include()` instead."
    );
    return this.include(filter);
  }

  find(): Promise<string[]> {
    const promise: Promise<string[]> = readdir(this.directory, {
      listFilter: filters.and(...this.listFilters),
      walkFilter: filters.and(...this.walkFilters)
    });
    return promise;
  }
}
