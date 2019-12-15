var gameMain = function(game){};

gameMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#faf';
    	
		ble.scan([], 15, success, failure); //services, seconds, success, failure
    }
};

function success(device){
	game.stage.backgroundColor = '#0a0';
	
	alert(JSON.stringify(device));
	
	setTimeout(function(){
		ble.connect(device.id, connectCallback, disconnectCallback);
	}, 5000);
}

function failure(e){
	game.stage.backgroundColor = '#000';
	
	alert(e);
}

function connectCallback(){
	alert('connected!');
}

function disconnectCallback(){
	alert('disconnected!');
}
