var finder = require('../index');

var directory = process.argv[2] || process.cwd();

finder(directory).files().depth(2).name('*.js').find().then(function(files) {
	console.log(files);
	console.log('done!');
});
