export * from "./types";
import { Finder } from "./types";
import { FileSystemFinder } from "./finder";

export default function(directory: string): Finder {
  return new FileSystemFinder(directory);
}
