var gameMain = function(game){
	overall_accel = 0;
	overall_steps = 0;
};

gameMain.prototype = {
    create: function(){
    	debugAccel = game.add.text(110, 30, "overall accel: " + overall_accel, {font: '42px', fill: 'white'});
    	debugSteps = game.add.text(110, 100, "overall steps: " + overall_steps, {font: '42px', fill: 'white'});
    	
		try{
			window.addEventListener('devicemotion', readAccel);
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
	
	if (overall_accel > 15){
		overall_steps++;
		debugSteps.text = "overall steps: " + overall_steps;
	}
}



