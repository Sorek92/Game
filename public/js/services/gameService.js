angular.module('gameService',[])

	.factory('GameServer', function($location, $http){

		return {
			loadHeroes: function(){
				// ładowanie danych profilowych
				return $http.post('/loadHeroes'); 
			},
			logout: function(){
				return $http.get('/logout');
			},
			getHeroes: function(id){
				return $http.get('/heroes/'+id);
			},
			addHero: function(id){
				return $http.get('/heroes/add/'+id);
			},
			getParameters: function(){
				return $http.post('/heroes/params');		
			}

		}
	})