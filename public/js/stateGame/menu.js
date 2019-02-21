


angular.module('game.menu',[])


	.factory('Menu', function(){
		return {
			preload: function() {
				WorldGame.load.spritesheet('button', 'assets/images/buttons.png', 301, 100, 3);
				WorldGame.load.image('background_menu','assets/images/background_menu.png');
			},
			create: function() {
				WorldGame.stage.backgroundColor = '#182d45';

				//background = WorldGame.add.tileSprite(0,0,800,600, 'background_menu');


				button = WorldGame.add.button(WorldGame.world.centerX - 75, 150, 'button', actionPlay, this, 2,0,1);
				//button.frame = 1;
				text1 = WorldGame.add.text(WorldGame.world.centerX , 100, "Graj");
				button.scale.setTo(0.5,0.5);

				button2 = WorldGame.add.button(WorldGame.world.centerX - 75, 250, 'button', actionCreate, this, 2,0,1);
				text2 = WorldGame.add.text(WorldGame.world.centerX, 200, "Stwórz/Wybierz");
				button2.scale.setTo(0.5,0.5);

				button3 = WorldGame.add.button(WorldGame.world.centerX - 75, 350, 'button', actionSettings, this, 2,0,1);
				text3 = WorldGame.add.text(WorldGame.world.centerX, 300, "Ustawienia");
				button3.scale.setTo(0.5,0.5);

				button4 = WorldGame.add.button(WorldGame.world.centerX - 75, 450, 'button', actionInfo, this, 2,0,1);
				text4 = WorldGame.add.text(WorldGame.world.centerX, 400, "Informacje");
				button4.scale.setTo(0.5,0.5);

				function actionPlay(){
					console.log(" idz do gry");
				}

				function actionCreate(){
					console.log("stworz lub wybierz bohatera");
				}

				function actionSettings(){
					console.log("ustawienia gry");
				}

				function actionInfo(){
					WorldGame.state.start('Info');
				}
			},
			update: function(){


			}

		}
	})