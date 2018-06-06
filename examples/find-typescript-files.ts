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
