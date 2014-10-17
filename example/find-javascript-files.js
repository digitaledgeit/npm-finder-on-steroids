var finder = require('../');

var directory = process.argv[2] || process.cwd();

finder(directory).files().depth(2).name('*.js').find(function(err, files) {
	if (err) {
    console.log('Error: ', err);
  } else {
    console.log("\n  Found "+files.length+" JavaScript files:");
    console.log("   - "+files.join("\n   - ")+"\n");
  }
});
