var Controller = function (options){
	var svostate = 0;
	var socket = null;
	// var lightsocket = null;

	var init = function (){
		console.log("init");
		initSocket();
		// initLightSocket();
		addHandlers();
	};

	var initSocket = function (){
		if(socket) return; // already initialized

		socket = io.connect(window.location.hostname);

		// some debugging statements concerning socket.io
		socket.on('reconnecting', function(seconds){
			console.log('reconnecting in ' + seconds + ' seconds');
		});
		socket.on('reconnect', function(){
			console.log('reconnected');
		});
		socket.on('reconnect_failed', function(){
			console.log('failed to reconnect');
		});
		// add ourselves to the 'controller' room
		socket.on('connect', function() {
			socket.emit('room', 'controller');
		});
		socket.on('stats', function(stats) {
			$('#connectedphones').html(stats.smartphones)
			// console.log(stats.usersPerHack)
			$('#eplepticstats').html(stats.usersPerHack.epleptic)
			$('#phiemelstats').html(stats.usersPerHack.phiemel)
			$('#hexamusicstats').html(stats.usersPerHack.hexamusic)
			$('#sounddefenderstats').html(stats.usersPerHack.sounddefender)
			$('#mediagoostats').html(stats.usersPerHack.mediagoo)
			$('#oscilloscoopstats').html(stats.usersPerHack.oscilloscoop)
		});
	};


	// var initLightSocket = function (){
	// 	if(lightsocket) return; // already initialized
	// 	lightsocket = io.connect('127.0.0.1:9000');
	// 	lightsocket.on('reconnecting', function(seconds){
	// 		console.log('reconnecting  light in ' + seconds + ' seconds');
	// 	});
	// 	lightsocket.on('reconnect', function(){
	// 		console.log('light reconnected');
	// 	});
	// 	lightsocket.on('reconnect_failed', function(){
	// 		console.log('light failed to reconnect');
	// 	});
	// };


	var addHandlers = function () {
		$('#killlights').click(function(){socket.emit('switchevent', 'no');});
		$('#lights').click(function(){socket.emit('switchevent', 'lights');});

	};

	var showhack = function(id) {
		socket.emit('showhack', id);
		// lightsocket.emit('switchevent', id);
		$('.btn-success').addClass('btn-primary').removeClass('btn-success');
		$("#"+id).addClass('btn-success').removeClass('btn-primary');

	};

	var statereset = function(id){
		socket.emit('resethack', id);

	}

	// var nolight = function() {
	// 	lightsocket.emit('switchevent', 'no');
	// };



	return {
		init: init,
		showhack: showhack,
		statereset: statereset
	};
};



$(function(){
	window.controller = new Controller();
	controller.init();
});
