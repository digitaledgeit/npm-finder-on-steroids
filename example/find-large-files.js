var finder = require('../');

var directory = process.argv[2] || process.cwd();

finder(directory).files().depth(2).size(5*1000*1000).find(function(err, files) {
	if (err) {
    console.log('Error: ', err);
  } else {
    console.log("\n  Found "+files.length+" files >= 5MB:");
    console.log("   - "+files.join("\n   - ")+"\n");
  }
});
