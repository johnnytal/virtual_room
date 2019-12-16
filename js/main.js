var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
	
	step_ended = true;
	
	STEP_ACCEL = 11;
	STEP_TIME = 300;

	head = 0;
	add_y = 0;
	add_x = 0;
	
	factor = 0;
	
	STEP_VALUE = WIDTH / 7; // 7 steps is the width and height of the room
};

gameMain.prototype = {
    create: function(){
    	bgImage = game.add.image(0, 0, 'room');
    	
    	kid = game.add.sprite(0, 0, 'kid');

    	kid.x = WIDTH / 2 - kid.width / 2;
    	kid.y = HEIGHT - kid.height - 50;
    	
    	arrow = kid.addChild(game.make.sprite(kid.width / 2, 5, 'arrow'));
    	arrow.scale.set(.75, .75);
    	arrow.anchor.set(.5, 1);
    	arrow.angle = head;
    	
	    kid.inputEnabled = true;
    	kid.events.onInputDown.add(calibrate_head, this);
    	
	  	game.physics.enable(kid, Phaser.Physics.ARCADE);
  		game.physics.enable(arrow, Phaser.Physics.ARCADE);

    	debugAccel = game.add.text(110, 50, "overall accel: " + overall_accel, {font: '42px', fill: 'black'});
    	debugSteps = game.add.text(110, 100, "overall steps: " + overall_steps, {font: '42px', fill: 'black'});
    	
    	debugAngle = game.add.text(450, 75, "angle: " + head, {font: '42px', fill: 'purple'});

		try{
			window.addEventListener('devicemotion', readAccel);
		}catch(e){}
		
		try{
			window.addEventListener("deviceorientation", readOrientation, true);
		}catch(e){}

        try{
        	window.plugins.insomnia.keepAwake();
    	} catch(e){}	
   }
};

function readAccel(event){
	overall_accel = Math.abs(
		event.accelerationIncludingGravity.z
	);
	
	debugAccel.text = "overall accel: " + Math.round(overall_accel * 100) / 100;
	
	if (step_ended && overall_accel > STEP_ACCEL){
		overall_steps++;
		debugSteps.text = "overall steps: " + overall_steps;
		
		step_ended = false;
		
		kid.x += add_x;
		kid.y += add_y;
		
		setTimeout(function(){
			step_ended = true;
		}, STEP_TIME);
	}
}

function readOrientation(event) {
    head = Math.round(360 - event.alpha) + factor;
    
    arrow.angle = head;
    
    debugAngle.text = "angle: " + head;

	add_y = Math.cos(head * (Math.PI / 180)) * -STEP_VALUE; // cos of radians times step value
	add_x = Math.sin(head * (Math.PI / 180)) * STEP_VALUE;
}

function calibrate_head(){
	factor = head * -1;
}
