var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
	
	step_ended = true;
	
	STEP_ACCEL = 13.5;
	STEP_TIME = 500;
	
	images = ['computer', 'instruments', 'sofa'];
	
	head = 0;
};

gameMain.prototype = {
    create: function(){
    	bgImage = game.add.image(0, 0, images[0]);
    	
    	debugAccel = game.add.text(110, 30, "overall accel: " + overall_accel, {font: '42px', fill: 'white'});
    	debugSteps = game.add.text(110, 100, "overall steps: " + overall_steps, {font: '42px', fill: 'white'});
    	
    	debugAngle = game.add.text(110, 200, "angle: " + head, {font: '42px', fill: 'pink'});

        try{
        	window.plugins.insomnia.keepAwake();
    	} catch(e){}
    	
		try{
			window.addEventListener('devicemotion', readAccel);
		}catch(e){}
		
		try{
			window.addEventListener("deviceorientation", readOrientation, true);
		}catch(e){}
    }
};

function readAccel(event){
	overall_accel = Math.abs(
		event.accelerationIncludingGravity.x + 
		event.accelerationIncludingGravity.y + 
		event.accelerationIncludingGravity.z
	);
	
	debugAccel.text = "overall accel: " + overall_accel;
	
	if (overall_accel > STEP_ACCEL){
		overall_steps++;
		debugSteps.text = "overall steps: " + overall_steps;
		
		step_ended = false;
		
		setTimeout(function(){
			step_ended = true;
		}, STEP_TIME);
	}
}

function readOrientation(event) {
    head = 360 - event.alpha;
    
    debugAngle.text = "angle: " + head;
}