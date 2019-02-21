


angular.module('game.load',[])


	.factory('Load', function($rootScope,GameServer){
		return {
			init: function(){
				
			},
			preload: function() {
				WorldGame.stage.backgroundColor = '#182d45';
				
			},
			create: function() {

				WorldGame.load.onLoadStart.add(this.loadStart, this);
    			WorldGame.load.onFileComplete.add(this.fileComplete, this);
    			WorldGame.load.onLoadComplete.add(this.loadComplete, this);

				textLoading = WorldGame.add.text(WorldGame.centerX, WorldGame.centerY, 'Start Loading', { fill: '#ffffff' });
    			this.start();		 

			},
			start: function(){

				// wczytanie obrazków
				WorldGame.load.spritesheet('buttonNext', 'assets/images/buttonNext.png', 64, 64, 3);
				WorldGame.load.spritesheet('buttonPrev', 'assets/images/buttonPrev.png', 64, 64, 3);
				WorldGame.load.spritesheet('buttonAdd', 'assets/images/plus.png', 200, 200,1);
				WorldGame.load.spritesheet('buttonRemove', 'assets/images/minus.png', 200, 200, 1);

				WorldGame.load.spritesheet('black', 'assets/images/hero1.png', 200, 200, 1);
				WorldGame.load.spritesheet('red', 'assets/images/hero2.png', 200, 200, 1);
				WorldGame.load.spritesheet('green', 'assets/images/hero3.png', 200, 200, 1);
				WorldGame.load.spritesheet('blue', 'assets/images/hero4.png', 200, 200, 1);

				WorldGame.load.spritesheet('graj', 'assets/images/graj.png', 200, 200, 1);
				WorldGame.load.spritesheet('wybrano', 'assets/images/wybrano.png', 200, 200, 1);
				//WorldGame.load.sound()

				
				
				/*GameServer.loadHeroes()
					.success(function(data){
						//Hero = data;
					})
					.error(function(err){
						console.log(err);
					});
				*/

				WorldGame.load.start();

			},
			loadStart: function(){
				textLoading.setText("Loading ...");
			},
			fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {

				textLoading.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);

			},
			loadComplete: function() {

				textLoading.setText("Load Complete");
				WorldGame.state.start('Profile');

			},
			update: function(){

			},
			render: function(){
				//console.log("3");
			}
		}
	})