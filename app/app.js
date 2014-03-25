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
var statemananger = require('./statemananger');

var app = express();
var serverAddress = null;

var state;
statemananger.loadState(function (err, state_) {
	if(err) return console.log(err);
	state = state_;
});

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
	var iframeurl = '';
	var hacktitle = '';
	var hack = getHackById( state.currentHackId );
	if(hack){
		iframeurl = hack.smartphone;
		hacktitle = hack.title;
	}

	res.render('smartphone', {
		title: 'mixapp.be | ' + hacktitle,
		iframeurl: iframeurl
	});
});

app.get('/regie', function (req, res){
	res.render('controller', {
		title: 'mixapp.be | Regie',
		hacks: config.hacks
	});
});

app.get('/svo', function (req, res){
	res.render('svo', {
		title: 'mixapp.be | svo',
	});
});

io.sockets.on('connection', function (newSocket) {
	// let's define 2 rooms: smartphone & controller
	newSocket.on('room', function (room) {
		newSocket.join(room);

		if( room == 'smartphone'){
			smartphoneConnected(newSocket);
		}

		if( room == 'controller' ){
			controllerConnected(newSocket);
		}
	});
});

function smartphoneConnected (socket) {
	console.log('[' + socket.handshake.address.address + '] >  new smartphone connected (' + getStats() + ')');

	pushStatsToController();

	socket.on('iframechanged', function (iframeurl) {
		// console.log('[' + socket.handshake.address.address + '] > smartphone changed to :' + iframeurl);

		var hack = getHackBySmartphoneUrl(iframeurl);
		socket.hack = hack; //mooi wegsteken in de socket :-)

		pushStatsToController();
	});

	socket.on('disconnect', function() {
		var ip = socket.handshake.address.address;

		// in een volgende event-loop doen:
		setTimeout(function () {
			console.log('[' + ip + '] > smartphone disconnected (' + getStats() + ')');
			pushStatsToController();
		},0);
	});
}


function controllerConnected (socket) {
	console.log('> controller connected (' + getStats() + ')');

	pushStatsToController();

	socket.on('showhack', function (id) {
		var hack = getHackById(id);
		console.log('> showing hack:');
		console.log(hack);

		io.sockets.in('smartphone').emit('changeiframe', {url: hack.smartphone, title: hack.title} );
		io.sockets.in('svo').emit('changesvo', hack.svo );

		state.currentHackId = hack.id;
		statemananger.saveState(state);
	});


	socket.on('disconnect', function() {
		// in een volgende event-loop doen:
		setTimeout(function () {
			console.log('> controller disconnected (' + getStats() + ')');
			pushStatsToController();
		},0);
	});
}

function getHackById (id) {
	return _.find(config.hacks, function (hack) { return hack.id == id; });
}

function getHackBySmartphoneUrl (url) {
	return _.find(config.hacks, function (hack) { return hack.smartphone == url; });
}

function pushStatsToController () {
	var usersPerHack = {};
	for (var i = 0; i < config.hacks.length; i++) {
		usersPerHack[config.hacks[i].id] = 0;
	};

	for (var i = 0; i < io.sockets.clients('smartphone').length; i++) {
		var smarphoneSocket = io.sockets.clients('smartphone')[i];
		if(smarphoneSocket.hack){
			usersPerHack[smarphoneSocket.hack.id]++;
		}
	};

	var stats = {
		'smartphones' : io.sockets.clients('smartphone').length,
		'controllers' : io.sockets.clients('controller').length,
		usersPerHack  : usersPerHack
	}
	console.log(stats);

	io.sockets.in('controller').emit('stats', stats);

}

function getStats () {
	return 'smartphones: ' + io.sockets.clients('smartphone').length + ' | controllers: ' + io.sockets.clients('controller').length;
}
