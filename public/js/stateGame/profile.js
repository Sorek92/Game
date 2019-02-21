


angular.module('game.profile',[])


	.factory('Profile', function($rootScope,GameServer){
		return {
			init: function(){
				textLoading.destroy();
			},
			preload: function() {
				WorldGame.stage.backgroundColor = '#182d45';	
				IO.socket.emit('id', {
	 				id : World.user_id
				}); 
			},
			create: function() {

				//WorldGame.load.onLoadStart.add(this.loadStart, this);
    			//WorldGame.load.onFileComplete.add(this.fileComplete, this);
    			//WorldGame.load.onLoadComplete.add(this.loadComplete, this);

    			//text = WorldGame.add.text(32, 32, 'Click to start load', { fill: '#ffffff' });
    			//this.start();

				// wyświetlenie nicku gracza
				//nickname = WorldGame.add.text(10,10,"Zalogowano jako: "+$rootScope.current_user);

				// wyświetlenie tytułu gry
				//titleText = WorldGame.add.text(World.minWidth/2-45,10, 'Ninja War');
					 
				// jeśli wiecej niż jeden bohater to wyświetl strzałki
				//if(World.heroNumber > 0){
					//buttonNext = WorldGame.add.button(200,WorldGame.world.centerY, 'buttonNext', this.showNext,this, 2,0,1);
					//buttonPrev = WorldGame.add.button(10,WorldGame.world.centerY, 'buttonPrev', this.showPrev,this, 2,0,1);				
				//}

				// przyciski do dodania i usuniecia bohatera
				//buttonAdd = WorldGame.add.button(20,WorldGame.world.centerY+100, 'buttonAdd', this.addHero,this, 2,0,1);
				//buttonAdd.scale.setTo(0.2,0.2);
				//buttonRemove = WorldGame.add.button(190,WorldGame.world.centerY+100, 'buttonRemove', this.removeHero,this, 2,0,1);
				//buttonRemove.scale.setTo(0.2,0.2);


				hero1 = WorldGame.add.button(50,WorldGame.world.centerY-200, 'black', this.wybierz(1),this, 2,0,1);
				hero2 = WorldGame.add.button(250,WorldGame.world.centerY-200, 'red', this.wybierz(2),this, 2,0,1);
				hero3 = WorldGame.add.button(450,WorldGame.world.centerY-200, 'green', this.wybierz(3),this, 2,0,1);
				hero4 = WorldGame.add.button(650,WorldGame.world.centerY-200, 'blue', this.wybierz(4),this, 2,0,1);

				hero1.scale.setTo(0.2,0.2);
				hero2.scale.setTo(0.2,0.2);
				hero3.scale.setTo(0.2,0.2);
				hero4.scale.setTo(0.2,0.2);


				Hero.wybierz = WorldGame.add.sprite(50,WorldGame.world.centerY,'wybrano');
				Hero.wybierz.scale.setTo(0.2,0.2);

				Graj = WorldGame.add.button(50,300, 'graj', this.graj,this, 2,0,1);
				Graj.scale.setTo(0.2,0.2);




			},
			update: function(){

				
				//console.log();
			},
			wybierz: function(n){
				// jesli wybierze to  pod obrazkiem pojawi sie co zostało wybrane 
				switch(n){
					case 1: 
						//Wybierz.body.moveUp(50);
						//Hero.wybierz.position.x = 50;
						console.log('Hero');
						// wczytanie wlasciwosci gracza i przypisanie do danych 
						break;
					case 2: 
						//Hero.wybierz.x = 250;
						//Hero.wybierz.position.x = 250;
						break;
					case 3: 
						//Hero.wybierz.x = 450;
						//Hero.wybierz.position.x = 450;
						break;
					case 4: 
						//Hero.wybierz.x = 650;
						//XX = 650;
						break;
				}

			},
			graj: function(){
				//polaczenie gracza z pokojem 
				//socket.join('1111');
				//WorldGame.state.start('Wait');
				IO.socket.emit('Wczytaj', {
					ok: 'ok'
				});

				IO.socket.on('play', function(data){
						User = data;
						console.log(User);
						WorldGame.state.start('Wait');
				})

				

			},
			showNext: function(){

				if(World.hero >= World.heroNumber)
					World.hero = 0;
				else
					World.hero += 1;

			},
			showPrev: function(){

				if(World.hero <= 0)
					World.hero = World.heroNumber;
				else
					World.hero -= 1;

			},
			addHero: function(){
				WorldGame.state.start('AddHero');
			},
			removeHero: function(){
				console.log("remove hero");
			},
			render: function(){
				//console.log("3");

			}
		}
	})