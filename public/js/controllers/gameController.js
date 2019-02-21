
angular.module('game', ['gameService', 'game.load', 'game.profile','game.wait', 'game.play'])

	.controller('gameController', function($rootScope, GameServer, Load, Profile, Wait, Play){

		// wylogowanie z gry
		$rootScope.logout = function(){
			GameServer.logout()
				.success(function(data){
					$rootScope.authenticated = false;
					$rootScope.current_user = '';
					WorldGame.destroy();
				})
				.error(function(err){
					console.log(err);
				})
		}

		// sprawdzanie czy istnieje już taki nick
		checkNickName = function(){
			GameServer.checkNickName($rootScope.current_user)
				.success(function(data){

					if(!data){
						prompt("sdfsdf","fdsfdsf");
					}
				})
				.error(function(err){
					prompt("sdfsdf","fdsfdsf");
				})
		}
			
		// okno gry w phaser io 
		WorldGame = new Phaser.Game(World.minWidth,World.minHeight,Phaser.AUTO,'game_canvas');
		

		// ==============  stany gry 
		// wczytywanie wszystkich grafik, dźwięków
		WorldGame.state.add('Load', Load);
		// profil gracza
		WorldGame.state.add('Profile', Profile);
		// czekanie na zawodników 
		WorldGame.state.add('Wait', Wait);
		// gra 
		WorldGame.state.add('Play', Play);

		// włączenie pierwszego stanu 
		WorldGame.state.start('Load');

	})