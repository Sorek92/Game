// moduł aplikacji 
angular.module('gameApp', ['ngRoute', 'user', 'game'])

	.run(function($rootScope) {
		IO.socket = io.connect();
		$rootScope.authenticated = false;
		$rootScope.current_user  = 'Gość';

	})

// drogi 
	.config(['$routeProvider',
		function($routeProvider){
			$routeProvider
			.when('/login', {
				templateUrl : 'views/login.html',
				controller : 'authcontroller'
			})
			.when('/signup', {
				templateUrl : 'views/signup.html',
				controller : 'authcontroller'
			})
			.when('/', {
				templateUrl : 'views/main.html',
				controller : 'mainController'
			})
			.when('/profile/:id', {
				templateUrl : 'views/profile.html',
				controller : 'gameController'
			})
		}])

// kontroller do podstawowej strony 
	.controller('mainController', function($rootScope){
		Authenticated = $rootScope.authenticated;
		Current_user = $rootScope.current_user;
		// detekcja rozmiarów 
		World.minHeight = 480;
		World.minWidth = 800;
  		
		console.log(Current_user + " : auth : " + Authenticated);
	});