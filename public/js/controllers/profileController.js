
angular.module('profileController', ['menuController'])
	
	.controller('profileController', function($rootScope, $http){


		$rootScope.logout = function(){
			$http.get('/logout');
			$rootScope.authenticated = false;
			$rootScope.current_user = '';
			game.destroy();
		};

		var game = new Phaser.Game(800, 600,Phaser.AUTO,'game_canvas');

		var sprite;
		var tilesprite;
		var cursors;
		var button;

		var menuState = {
			preload: function() {
				game.load.spritesheet('boom', 'assets/images/boom.jpg', 50,50,24);
				game.load.spritesheet('ninja', 'assets/images/ninja2.png', 60,60,32);
				game.load.image('background_start', 'assets/images/background_start.png');
				game.load.spritesheet('button_start', 'assets/images/button_start.png',225,225);
			},
			create: function() {
				var world = game.world;
				var textPadding = 20;

				tilesprite = game.add.tileSprite(0, 0,world.width, world.height, 'background_start');

				sprite = game.add.sprite(100,100,'ninja');
				sprite.animations.add('left', [8,9,10,11,12,13,14,15],5, true);
				sprite.animations.add('right', [16,17,18,19,20,21,22,23],5, true);
				sprite.animations.add('up', [24,25,26,27,28,29,30,31],5, true);
				sprite.animations.add('down', [0,1,2,3,4,5,6,7],5, true);

				var newGameBtn = game.add.text(world.centerX, world.centerY + textPadding, 'New game');
				newGameBtn.inputEnabled = true;

				button = game.add.button(game.world.centerX - 90, 400, 'button_start', actionOnClick, this, 1,2,0);


    			function actionOnClick(){
    				console.log("actionOnClick");
    				game.state.start('game');
    			}

				cursors = game.input.keyboard.createCursorKeys();
			},
			update: function(){

				if(cursors.left.isDown){
					sprite.position.x -=3;
					sprite.animations.play('left');
				}else

				if(cursors.right.isDown){
					sprite.position.x +=3;
					sprite.animations.play('right');
				}else

				if(cursors.up.isDown){
					sprite.position.y -=3;
					sprite.animations.play('up');
				}else

				if(cursors.down.isDown){
					sprite.position.y +=3;
					sprite.animations.play('down');
				}else{
					sprite.animations.stop();
				}


			}
		};
		
		game.state.add('MainMenu', menuState);
		game.state.start('MainMenu'); 

	});