var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
	
	step_ended = true;
	
	STEP_ACCEL = 13.4;
	STEP_TIME = 350;
	
	images = ['computer', 'instruments', 'sofa'];
	
	head = 0;
	add_y = 0;
	add_x = 0;
};

gameMain.prototype = {
    create: function(){
    	bgImage = game.add.image(0, 0, images[0]);
    	
    	kid = game.add.sprite(0, 0, 'kid');

    	kid.x = WIDTH / 2 - kid.width / 2;
    	kid.y = HEIGHT - kid.height;
    	
    	arrow = kid.addChild(game.make.sprite(kid.width / 2, 0, 'arrow'));
    	arrow.anchor.set(.5, 1);
    	arrow.angle = head;
    	
	  	game.physics.enable(kid, Phaser.Physics.ARCADE);
  		game.physics.enable(arrow, Phaser.Physics.ARCADE);

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
	
	debugAccel.text = "overall accel: " + Math.round(overall_accel * 100) / 100;
	
	if (step_ended && overall_accel > STEP_ACCEL){
		overall_steps++;
		debugSteps.text = "overall steps: " + overall_steps;
		
		step_ended = false;
		
		setTimeout(function(){
			step_ended = true;
		}, STEP_TIME);
		
		kid.x += add_x;
		kid.y += add_y;
	}
}

function readOrientation(event) {
    head = Math.round(360 - event.alpha);
    
    arrow.angle = head;
    
    debugAngle.text = "angle: " + head;
    
    add_y = 25 - Math.sin(head) * 25;
    add_x = 0 + Math.sin(head) * 25;
}