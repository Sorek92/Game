

angular.module('userService', [])

	.factory('Users', function($location, $http){

		return {
			get : function(){
				return $location.path('/');
			},
			login : function(user){
				return $http.post('/login', user);
			},
			create : function(user){
				return $http.post('/signup', user);
			},
			emailOccupied : function(user){
				return $http.get('/signup/e/'+user.email);
			},
			nicknameOccupied : function(user){
				return $http.get('/signup/n/'+user.nickname);
			},
			redirect : function(url){
				return $location.path(url);
			}

		}
	})