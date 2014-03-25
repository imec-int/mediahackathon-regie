var Smartphone = function (options){

	var socket = null;

	var init = function (){
		console.log("init");
		initSocket();
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
		// add ourselves to the 'smartphone' room
		socket.on('connect', function() {
			socket.emit('room', 'smartphone');
		});
	};

	var addHandlers = function () {

	};

	return {
		init: init
	};
};



$(function(){
	var smartphone = new Smartphone();
	smartphone.init();
});

