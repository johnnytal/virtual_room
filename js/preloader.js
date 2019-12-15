var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
    	progressTxt = this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '0%',{
             font: '25px', fill: 'white', fontWeight: 'normal', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);
  
        loadingTxt = this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "Loading...", {
            font: '18px', fill: 'lightgrey', fontWeight: 'normal', align: 'center'
        });
        
        this.game.load.spritesheet("button", "assets/images/button4.png", 486/2, 185);
        this.game.load.image("gear", "assets/images/gearBtn2.png");
        this.game.load.image("ok", "assets/images/ok.png");
        this.game.load.image("musicBtn", "assets/images/musicBtn.png");
        this.game.load.image("panel", "assets/images/panel.png");

        this.game.load.audio('musicSfx2', 'assets/audio/music2.ogg');
    },
    
    create: function(){
        this.game.state.start("Game"); 
    }
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text = progress+"%";
};