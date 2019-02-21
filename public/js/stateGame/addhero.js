


angular.module('game.addhero',[])


	.factory('AddHero', function(GameServer){

		return {
			init: function(){
				console.log("4");
			},
			preload: function() {
				console.log("5");
			},
			create: function() {

				console.log("6");
				WorldGame.stage.backgroundColor = '#182d45';

				var ilosc = Hero.length;
				console.log("ilosc : "+ ilosc);
				var numer = 0; 

				titleText = WorldGame.add.text(World.minWidth/2-45,10, 'Ninja War');

				// wybór klasy bohatera
				classNext = WorldGame.add.button(200,50, 'buttonNext', this.showNextClass(numer,ilosc),this, 2,0,1);
				classNext.scale.setTo(0.3,0.3);
				WorldGame.add.text(70,50, Hero[numer]);
				classPrev = WorldGame.add.button(10,50, 'buttonPrev', this.showPrevClass(numer,ilosc),this, 2,0,1);
				classPrev.scale.setTo(0.3,0.3);

				// wybór profesji bohatera
				occupationNext = WorldGame.add.button(200,100, 'buttonNext', this.showNextOccupation,this, 2,0,1);
				occupationNext.scale.setTo(0.3,0.3);

				occupationPrev = WorldGame.add.button(10,100, 'buttonPrev', this.showPrevOccupation,this, 2,0,1);
				occupationPrev.scale.setTo(0.3,0.3);

				// wybór wyglądu bohatera
				aspectNext = WorldGame.add.button(200,150, 'buttonNext', this.showNextAspect,this, 2,0,1);
				aspectNext.scale.setTo(0.3,0.3);
				
				aspectPrev = WorldGame.add.button(10,150, 'buttonPrev', this.showPrevAspect,this, 2,0,1);
				aspectPrev.scale.setTo(0.3,0.3);




				newHero = WorldGame.add.button(10,400, 'button', this.addhero,this, 2,0,1);
				//newHero.scale.setTo(0.3,0.3);
			},
			update: function(){


			},
			addhero: function(){

				GameServer.addHero(World.user_id)
					.success(function(data){
						if(!data){
							WorldGame.add.text(100,WorldGame.world.centerY, 'Not Hero');
						}else{
							WorldGame.add.text(100,WorldGame.world.centerY, data.state);
						}
					})
					.error(function(err){
						console.log(err);
					})

				WorldGame.state.start('Profile');
			},
			showNextClass: function(numer,ilosc){
				if(numer===ilosc){
					numer=0;
				}else{
					numer +=1;
				}
			},
			showPrevClass: function(numer, ilosc){

			}

		}
	})