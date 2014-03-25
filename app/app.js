#!/usr/bin/env node

var express = require('express');
var http = require('http')
var path = require('path');
var utils = require('./utils');
var config = require('./config');
var socketio = require('socket.io');
var url = require('url');
var async = require('async');
var fs = require('fs');
var _ = require('underscore');

var app = express();
var serverAddress = null;

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	if(!process.env.PORT) app.use(express.logger('tiny')); //show only when debugging locally
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('mediahackathonregie654646416843161'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});


var server = http.createServer(app).listen(app.get('port'), function (){
	console.log("> Webserver listening on port " + app.get('port'));
});

// Socket IO
var io = socketio.listen(server);
io.set('log level', 0);

app.get('/', function (req, res){
	res.render('smartphone', {
		title: 'mixapp.be'
	});
});

app.get('/regie', function (req, res){
	res.render('controller', {
		title: 'mixapp.be | Regie',
		hacks: config.hacks
	});
});


io.sockets.on('connection', function (newSocket) {
	// let's define 2 rooms: smartphone & controller
	newSocket.on('room', function (room) {

		if( room == 'smartphone'){
			smartphoneConnected(newSocket);
			// enter room:
			newSocket.join(room);
		}

		if( room == 'controller' ){
			controllerConnected(newSocket);
			// enter room:
			newSocket.join(room);
		}
	});
});

function smartphoneConnected (socket) {
	console.log('> new smartphone connected (' + getStats() + ')');

	socket.on('event', function (data) {

	});

	socket.on('disconnect', function() {
		console.log('> smartphone disconnected (' + getStats() + ')');
	});
}


function controllerConnected (socket) {
	console.log('> controller connected (' + getStats() + ')');


	socket.on('showhack', function (id) {
		var hack = _.find(config.hacks, function (hack) { return hack.id == id; });
		console.log('> showing hack:');
		console.log(hack);

		io.sockets.in('smartphone').emit('changeiframe', hack.smartphone );
	});


	socket.on('disconnect', function() {
		console.log('> controller disconnected (' + getStats() + ')');
	});
}


function getStats () {
	return 'smartphones: ' + io.sockets.clients('smartphone').length + ' | controllers: ' + io.sockets.clients('controller').length;
}



