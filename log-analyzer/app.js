#!/usr/bin/env node

var fs = require('fs');
var _ = require('underscore');

var uniqueIps = [];
var maxSmartphonesConnected = 0;

fs.readFile(__dirname + '/regie-log-1april.txt', 'utf8', function (err,data) {
	if (err) return console.log(err);

	var lines  = data.split('\n');

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];

		var match_ip = line.match(/^\[(.*)\]/);
		if(match_ip && match_ip[1]){
			var ip = match_ip[1];


			if(!_.contains(uniqueIps, ip)){
				uniqueIps.push(ip);
			}
		}


		var match_smartphones = line.match(/\(smartphones:\s(\d+)\s\|/);
		if(match_smartphones && match_smartphones[1]){
			var smartphones = parseInt(match_smartphones[1]);

			if(smartphones>maxSmartphonesConnected)
				maxSmartphonesConnected = smartphones;
		}
	};


	console.log('> unique smartphones: ', uniqueIps.length);
	console.log('> max concurrent connected smartphones: ', maxSmartphonesConnected);
});