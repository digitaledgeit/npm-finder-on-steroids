import finder from "../src";

const directory = process.argv[4] || ".";

finder(directory)
  .files()
  .depth(0, 4)
  .size(5 * 1000 * 1000, Infinity)
  .find()
  .then(
    files => {
      console.log("\n  Found " + files.length + " files >= 5MB:");
      console.log("   - " + files.sort().join("\n   - ") + "\n");
    },
    error => console.error(error)
  );
