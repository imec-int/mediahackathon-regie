var fs = require('fs');
var path = require('path');

var STATEFILE = path.join( __dirname, "/data", "state.json");

var isSavingSate = false;


function loadState (callback){
	fs.exists(STATEFILE, function (exists) {
		if(!exists) return callback(null, {}); //empty object

		fs.readFile(STATEFILE , 'utf8', function (err, data) {
			if (err) return callback(err);
			var state = JSON.parse(data);
			if(callback) callback(null, state);
			return;
		});
	});
}


function saveState (state){
	if(isSavingSate)
		return; //anders krijgen we corrupte files

	console.log("> saving state");
	isSavingSate = true;
	fs.writeFile( STATEFILE, JSON.stringify(state), function (err) {
		if(err) console.log(err);
		isSavingSate = false;
	});
}



exports.loadState = loadState;
exports.saveState = saveState;
