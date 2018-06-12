jest.dontMock("fs");
import * as fs from "fs";
import * as p from "path";
import finder from "../src";

const root = __dirname + "/..";

describe("finder", () => {
  it("should throw when root does not exist", async () => {
    expect.assertions(1);
    try {
      await finder("non-existent-directory")
        .files()
        .find();
    } catch (error) {
      // expect(error).toBeInstanceOf(Error);
      expect(error).toEqual(
        expect.objectContaining({
          code: "ENOENT",
          message: expect.stringContaining("no such file or directory")
        })
      );
    }
  });

  it(".files() should only return files", async () => {
    const paths = await finder(root)
      .files()
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(fs.statSync(path).isFile()).toBeTruthy();
    }
  });

  it(".directories() should only return directories", async () => {
    const paths = await finder(root)
      .directories()
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(fs.statSync(path).isDirectory()).toBeTruthy();
    }
  });

  it(".depth() should only return paths one node deep", async () => {
    const paths = await finder(root)
      .depth(1)
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(p.relative(root, path).split(/[\\\/]/).length).toBeLessThanOrEqual(
        2
      );
    }
  });

  it(".name() should only return *.json files", async () => {
    const paths = await finder(root)
      .name("*.json")
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(p.extname(path)).toEqual(".json");
    }
  });

  it(".path() should only return immediate children of node_modules directories", async () => {
    const paths = await finder(root)
      .path("node_modules/*")
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(path.split(p.sep)).toHaveLength(3);
    }
  });

  it(".size() should only return files >=1KB", async () => {
    const paths = await finder(root)
      .files()
      .size(1000, Infinity)
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(fs.statSync(path).size).toBeGreaterThanOrEqual(1000);
    }
  });

  it(".include() & .exclude() should pass path and stats arguments to filter", async () => {
    const paths = await finder(root)
      .include("**/*.ts")
      .exclude("**/*.test.ts")
      .exclude("**/*.d.ts")
      .exclude("node_modules/**")
      .exclude("examples/**")
      .find();
    expect(paths).toBeInstanceOf(Array);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      expect(path).toContain("src");
    }
  });
});
