/* tslint:disable unified-signatures */
import { Stats } from "readdir-on-steroids";

type Filter = (path: string, stats: Stats) => boolean;

interface Finder {
  files(): Finder;
  directories(): Finder;

  depth(max: number): Finder;
  depth(min: number, max: number): Finder;
  depth(minOrMax: number, max?: number): Finder;

  name(name: string | RegExp): Finder;
  path(path: string | RegExp): Finder;

  size(max: number): Finder;
  size(min: number, max: number): Finder;
  size(minOrMax: number, max?: number): Finder;

  filter(filter: string | RegExp | Filter): Finder;
  include(filter: string | RegExp | Filter): Finder;
  exclude(filter: string | RegExp | Filter): Finder;

  find(): Promise<string[]>;
}

export { Finder, Filter, Stats };
