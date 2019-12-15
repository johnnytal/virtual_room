var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
	
	step_ended = true;
	
	STEP_ACCEL = 13.3;
	STEP_TIME = 400;
	
	images = ['computer', 'instruments', 'sofa'];
	
	head = 0;
};

gameMain.prototype = {
    create: function(){
    	bgImage = game.add.image(0, 0, images[0]);
    	
    	kid = game.add.image(0, 0, 'kid');
    	
    	kid.x = WIDTH / 2 - kid.width / 2;
    	kid.y = HEIGHT - kid.height;
    	
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
	
	if (step_ended && overall_accel > STEP_ACCEL){
		overall_steps++;
		debugSteps.text = "overall steps: " + overall_steps;
		
		step_ended = false;
		
		setTimeout(function(){
			step_ended = true;
		}, STEP_TIME);
		
		kid.y -= 50;
	}
}

function readOrientation(event) {
    head = Math.round(360 - event.alpha);
    
    debugAngle.text = "angle: " + head;
}