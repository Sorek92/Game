


angular.module('game.wait',[])


	.factory('Wait', function($rootScope,GameServer){
		var ty ='';
		//var przeciwnik='';

		return {
			init: function(){
				
				
			},
			preload: function() {
				WorldGame.stage.backgroundColor = '#182d45';
				
			},
			create: function() {

				//pokaz pokój 
				WorldGame.add.text(10,10,"Czekanie na graczy , polaczeni gracze ");

				wyswietlenie = WorldGame.add.text(10,200,'');
				IO.socket.emit('zawodnicy', User);
				ty = User.name;


				// zmiana na przeslanie calej postaci do serwera 
				//
				//pokazanie ciebie 
				//console.log(WorldGame);

				//jesli sa 2 osoby to przejdz do game.js 
				

				// lub czekaj na podłaczenie 


			},
			update: function(){

				
				IO.socket.on('two', function(data){

					
						Przeciwnik = data;
						wyswietlenie.setText("Ty: "+ ty + "Przeciwnik: "+ Przeciwnik);		



						WorldGame.state.start('Play');
				});

			}
		}
	})