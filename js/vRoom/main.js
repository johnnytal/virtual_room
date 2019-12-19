var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
	
	step_ended = true;
	
	STEP_ACCEL = 13;
	STEP_TIME = 580;

	head = 0;
	add_y = 0;
	add_x = 0;
	
	factor = 0;
	
	STEP_VALUE = WIDTH / 7.5; // x steps is the width and height of the room
};

gameMain.prototype = {
    create: function(){
    	game.stage.backgroundColor = '#f7f7f7';

    	kid = game.add.sprite(0, 0, 'kid');

    	kid.x = WIDTH / 2 - kid.width / 2;
    	kid.y = HEIGHT - kid.height - 50;
    	
    	arrow = kid.addChild(game.make.sprite(kid.width / 2, 5, 'arrow'));
    	arrow.scale.set(.75, .75);
    	arrow.anchor.set(.5, 1);
    	arrow.angle = head;
    	
	    kid.inputEnabled = true;
    	kid.events.onInputDown.add(calibrate_head, this);
    	
    	table = game.add.sprite(450, 150, 'table');
    	tv = game.add.sprite(100, 400, 'tv');
    	sofa = game.add.sprite(650, 450, 'sofa');
    	
    	game.physics.enable(kid, Phaser.Physics.ARCADE);
  		game.physics.enable(arrow, Phaser.Physics.ARCADE);
  		game.physics.enable(table, Phaser.Physics.ARCADE);
  		game.physics.enable(tv, Phaser.Physics.ARCADE);
  		game.physics.enable(sofa, Phaser.Physics.ARCADE);
  		
    	debugAccel = game.add.text(75, 50, "Accel: " + overall_accel, {font: '42px', fill: 'black'});
    	debugSteps = game.add.text(75, 100, "Steps: " + overall_steps, {font: '42px', fill: 'black'});
    	
    	debugAngle = game.add.text(500, 50, "Angle: " + head, {font: '42px', fill: 'purple'});

		try{
			window.addEventListener('devicemotion', readAccel);
		}catch(e){}
		
		try{
			window.addEventListener("deviceorientation", readOrientation, true);
		}catch(e){}

        try{
        	window.plugins.insomnia.keepAwake();
    	} catch(e){}	
    	
    	setTimeout(function(){ // initial calibration
    		calibrate_head();
    	}, 1000);
   },
   update: function(){
 		checkOverlap(kid, sofa);    
 		checkOverlap(kid, table);    
 		checkOverlap(kid, tv);    
   }
};

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    if (Phaser.Rectangle.intersects(boundsA, boundsB)){
    	collideKid(spriteB);
    }
}

function collideKid(_object){
	navigator.vibrate(50);
	
	if (_object.key == 'sofa' && game.stage.backgroundColor != '#f0f'){
		game.stage.backgroundColor = '#f0f';
	}
	else if (_object.key == 'table' && game.stage.backgroundColor != '#0ff'){
		game.stage.backgroundColor = '#0ff';
	}
	else if (_object.key == 'tv' && game.stage.backgroundColor != '#0f0'){
		game.stage.backgroundColor = '#0f0';
	}
}

function readAccel(event){
	overall_accel = Math.abs(
		event.accelerationIncludingGravity.z + (event.accelerationIncludingGravity.y / 1.65)
	);
	
	debugAccel.text = "Accel: " + Math.round(overall_accel * 10) / 10;
	
	if (step_ended && overall_accel > STEP_ACCEL){
		overall_steps++;
		debugSteps.text = "Steps: " + overall_steps;
		
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
    
    debugAngle.text = "Angle: " + head;

	add_y = Math.cos(head * (Math.PI / 180)) * -STEP_VALUE; // cos of radians times step value
	add_x = Math.sin(head * (Math.PI / 180)) * STEP_VALUE;
}

function calibrate_head(){
	factor = head * -1;
}
