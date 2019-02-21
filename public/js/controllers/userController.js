// 

angular.module('user', ['userService'])

	.controller('authcontroller', function($rootScope, $scope, Users){

		// dane użytkonika z formularzy
		$scope.user = {}; 
		// błedy formularza rejestracji
		$scope.errors_signup = {};
		// błedy formularzaq logowania 
		$scope.errors_login = {};
		// aktywność przycisku zaloguj i zarejestruj 
		$scope.inactive = true;

		


//==============================================FORMULARZ REJESTRACJI

		// funkcja sprawdzająca czy dana jest pusta lub nie istnieje
		checkOneEmpty = function(x){

			// jeśli nie puste to zwróć true
			if(x != "" && x != undefined){
				return true;
			}else{
				return false;
			}
		}; 

		// funkcja sprawdzająca czy wszystkie pola są dobrze uzupełnione
		checkFieldsOfSignup = function(){
			
			var x = 0 ;
			x = checkOneEmpty($scope.user.email)+checkOneEmpty($scope.user.password)+checkOneEmpty($scope.user.password2);

			// jeśli wszystkie wypełnione to zwróć true
			if(x === 3){
				return true
			}else{
				return false;
			}
		};

		// funkcja sprawdzająca czy dany email już istnieje
		checkEmailOccupied = function(){
			$scope.errors_login.auth = undefined;
			Users.emailOccupied($scope.user)
				.success(function(data){

					if(data.find === "success"){
						$scope.errors_signup.email = "Taki email już istnieje";
						$scope.errors_login.email = undefined;
					}else{
						$scope.errors_signup.email = undefined;
						$scope.errors_login.email = "Nie ma takiego użytkonika";
					}
				})
				.error(function(err){
					if(err)
						console.log(err);
				})
		};

		// funkcja sprawdzająca czy dany email już istnieje
		checkNicknameOccupied = function(){

			Users.nicknameOccupied($scope.user)
				.success(function(data){

					if(data.find === "success"){
						$scope.errors_signup.nickname = "Taki nick już istnieje";
					}else{
						$scope.errors_signup.nickname = undefined;
					}
				})
				.error(function(err){
					if(err)
						console.log(err);
				})
		};

		// sprawdzanie emaila
		$scope.checkNicknameSignup = function(){

			if(checkOneEmpty($scope.user.nickname)){
				$scope.errors_signup.nickname = undefined;
				checkNicknameOccupied();
			}else{
				$scope.errors_signup.nickname = "Puste pole Nickname";
			}

		};

		// sprawdzanie emaila
		$scope.checkEmailSignup = function(){

			if(checkOneEmpty($scope.user.email)){
				$scope.errors_signup.email = undefined;
				checkEmailOccupied();
			}else{
				$scope.errors_signup.email = "Puste pole Email";
			}

		};

		// sprawdzanie hasła
		$scope.checkPasswordSignup = function(x){


			switch(x){
				// sprawdzanie pierwszego pola z hasłem
				case 1 : 
					if(checkOneEmpty($scope.user.password)){
						$scope.errors_signup.password = undefined;

						if(checkOneEmpty($scope.user.password2)){
							if($scope.user.password === $scope.user.password2){
								$scope.errors_signup.auth = undefined;
							}else{
								$scope.errors_signup.auth = " hasła się różnia";
							}
							
						}else{
							$scope.errors_signup.auth = undefined;
						}

					}else{
						$scope.errors_signup.password = "Puste pole";
					}
				break;

				// sprawdzanie drugiego pola z hasłem
				case 2 : 

					if(checkOneEmpty($scope.user.password2)){
						$scope.errors_signup.password2 = undefined;

						if(checkOneEmpty($scope.user.password2)){
							if($scope.user.password === $scope.user.password2){
								$scope.errors_signup.auth = undefined;
							}else{
								$scope.errors_signup.auth = " hasła się różnia";
							}
						}else{
							$scope.errors_signup.auth = undefined;
						}

					}else{
						$scope.errors_signup.password2 = "Puste pole";
					}

				break; 
			}
		};



//==============================================FORMULARZ LOGOWANIA
		
		// funkcja sprawdzająca czy wszystkie dane wpisane
		checkFieldsOfLogin = function(){
			var x = 0;
			x = checkOneEmpty($scope.user.email) + checkOneEmpty($scope.user.password);
			if(x != 2)
				return true;
			else
				return false;
		};

		//sprawdzanie emaila
		$scope.checkEmailLogin = function(){

			if(checkOneEmpty($scope.user.email)){
				$scope.errors_login.email = undefined;
				checkEmailOccupied();
			}else{
				$scope.errors_login.email = "Puste pole login/email";
			}
		};

		// sprawdzanie hasła
		$scope.checkPasswordLogin = function(){

			if(checkOneEmpty($scope.user.password)){
				$scope.errors_login.password = undefined;
			}else{
				$scope.errors_login.password = "Puste pole";
			}
		}



//==============================================PRZYCISKI
		$scope.createUser = function(){

			if(!$scope.errors_signup.email && !$scope.errors_signup.nickname && !$scope.errors_signup.auth){
				Users.create($scope.user)
					.success(function(data){

						if(data.state == "success"){
							$rootScope.authenticated = true;
							$rootScope.current_user = data.user.email;
							World.user_id = data.user._id;
							//console.log(data);
							Users.redirect('/profile/'+data.user._id);
						}else{
							$scope.errors_signup.auth = data.message;
						}
					})
					.error(function(err){
						console.log(err);
					});
			}

		};

		$scope.loginUser = function(){
			if(!$scope.errors_login.email && !$scope.errors_login.password && !$scope.errors_login.auth){
				Users.login($scope.user)
					.success(function(data){
						if(data.state == "success"){
							$rootScope.authenticated = true;
							$rootScope.current_user = data.user.email;
							World.user_id = data.user._id;
							Users.redirect('/profile/'+data.user._id);
						}else{
							$scope.errors_login.auth = data.message;
						}
					})
					.error(function(err){
						console.log(err);
					});
			}
		};

	});

