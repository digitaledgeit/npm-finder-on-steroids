import { Finder } from "./finder";

export default function(directory: string) {
  return new Finder(directory);
}
