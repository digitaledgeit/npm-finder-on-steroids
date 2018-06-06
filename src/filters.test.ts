import { Stats } from "readdir-on-steroids";
import * as filters from "./filters";

describe("filters", () => {
  describe("files()", () => {
    it("should return true when the path is a file", () => {
      const include = filters.files()("foo.bar", {
        isFile: () => true
      } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the path is not a file", () => {
      const include = filters.files()("foo.bar", {
        isFile: () => false
      } as Stats);
      expect(include).toBeFalsy();
    });
  });

  describe("directories()", () => {
    it("should return true when the path is a directory", () => {
      const include = filters.directories()("foobar", {
        isDirectory: () => true
      } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the path is not a directory", () => {
      const include = filters.directories()("foobar", {
        isDirectory: () => false
      } as Stats);
      expect(include).toBeFalsy();
    });
  });

  describe("depth()", () => {
    it("should return true when the depth is equal", () => {
      const include = filters.depth(0)("foobar", { depth: 0 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the depth is less than the value", () => {
      const include = filters.depth(3)("foobar", { depth: 2 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return false when the depth is greater than the value", () => {
      const include = filters.depth(3)("foobar", { depth: 4 } as Stats);
      expect(include).toBeFalsy();
    });

    it("should return true when the depth is in the range", () => {
      const include = filters.depth(2, 5)("foobar", { depth: 4 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the depth is less than the range", () => {
      const include = filters.depth(2, 5)("foobar", { depth: 1 } as Stats);
      expect(include).toBeFalsy();
    });

    it("should return false when the depth is greater than the range", () => {
      const include = filters.depth(2, 5)("foobar", { depth: 6 } as Stats);
      expect(include).toBeFalsy();
    });
  });

  describe("name()", () => {
    it("should return true when the path does match the glob", () => {
      const include = filters.name("*.json")("package.json", {} as Stats);
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the glob", () => {
      const include = filters.name("*.json")("foo.bar", {} as Stats);
      expect(include).toBeFalsy();
    });

    it("should return true when the path does match the regexp", () => {
      const include = filters.name(/\.json$/)("package.json", {} as Stats);
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the regexp", () => {
      const include = filters.name(/\.json$/)("foo.bar", {} as Stats);
      expect(include).toBeFalsy();
    });
  });

  describe("path()", () => {
    it("should return true when the path does match the glob", () => {
      const include = filters.path("packages/**")(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the glob", () => {
      const include = filters.path("packages/**")(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does match the regexp", () => {
      const include = filters.path(/packages\//)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the regexp", () => {
      const include = filters.path(/packages\//)(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });
  });

  describe("size()", () => {
    it("should return true when the size is equal", () => {
      const include = filters.size(0)("foobar", { size: 0 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the size is less than the value", () => {
      const include = filters.size(3)("foobar", { size: 2 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return false when the size is greater than the value", () => {
      const include = filters.size(3)("foobar", { size: 4 } as Stats);
      expect(include).toBeFalsy();
    });

    it("should return true when the size is in the range", () => {
      const include = filters.size(2, 5)("foobar", { size: 4 } as Stats);
      expect(include).toBeTruthy();
    });

    it("should return true when the size is less than the range", () => {
      const include = filters.size(2, 5)("foobar", { size: 1 } as Stats);
      expect(include).toBeFalsy();
    });

    it("should return false when the size is greater than the range", () => {
      const include = filters.size(2, 5)("foobar", { size: 6 } as Stats);
      expect(include).toBeFalsy();
    });
  });

  describe("include()", () => {
    it("should return true when the path does match the glob", () => {
      const include = filters.include("packages/**")(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the glob", () => {
      const include = filters.include("packages/**")(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does match the regexp", () => {
      const include = filters.include(/packages\//)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the regexp", () => {
      const include = filters.include(/packages\//)(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does match the filter", () => {
      const include = filters.include(() => true)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does not match the filter", () => {
      const include = filters.include(() => false)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });
  });

  describe("include()", () => {
    it("should return false when the path does match the glob", () => {
      const include = filters.exclude("packages/**")(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does not match the glob", () => {
      const include = filters.exclude("packages/**")(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does match the regexp", () => {
      const include = filters.exclude(/packages\//)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does not match the regexp", () => {
      const include = filters.exclude(/packages\//)(
        "node_modules/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });

    it("should return false when the path does match the filter", () => {
      const include = filters.exclude(() => true)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeFalsy();
    });

    it("should return true when the path does not match the filter", () => {
      const include = filters.exclude(() => false)(
        "packages/finder-on-steroids/package.json",
        {} as Stats
      );
      expect(include).toBeTruthy();
    });
  });
});
