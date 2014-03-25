var Controller = function (options){

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
		// add ourselves to the 'controller' room
		socket.on('connect', function() {
			socket.emit('room', 'controller');
		});
		socket.on('stats', function(stats) {
			$('#connectedphones').html(stats.smartphones)
		});
	};

	var addHandlers = function () {

	};

	var showhack = function(id) {
		socket.emit('showhack', id);
		$('.btn-success').addClass('btn-primary').removeClass('btn-success');
		$("#"+id).addClass('btn-success').removeClass('btn-primary');
	};

	return {
		init: init,
		showhack: showhack
	};
};



$(function(){
	window.controller = new Controller();
	controller.init();
});
