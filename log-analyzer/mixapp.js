#!/usr/bin/env node

var fs = require('fs');
var _ = require('underscore');

var ips = [];

// fs.readFile('../logs/mixapp.log', 'utf8', function (err,data) {
// 	if (err) return console.log(err);

// 	var lines  = data.split('\n');

// 	for (var i = 0; i < lines.length; i++) {
// 		var line = lines[i];

// 		// console.log(line);

// 		var match_ip = line.match(/(^\d+\.\d+\.\d+\.\d+)/);
// 		if(match_ip && match_ip[1]){
// 			var ip = match_ip[1];

// 			ips.push(ip);
// 		}
// 	};


// 	console.log(ips);
// });


var uniqueIps = [];

fs.readFile('../logs/mixapp-ips.json', 'utf8', function (err,data) {
	if (err) return console.log(err);

	var ips  = JSON.parse(data);

	for (var i = 0; i < ips.length; i++) {
		var ip = ips[i];

		if(!_.contains(uniqueIps, ip)){
			uniqueIps.push(ip);
		}

	};

	console.log(ips);
	console.log('> unique ips: ', uniqueIps.length);
});