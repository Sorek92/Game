
// strategia lokalna
var localStrategy = require('passport-local').Strategy;

// wczytanie modelu użytkownika
var User = require('../app/models/userModel');

// export funkcji
module.exports = function(passport) {
	
	// serializacja użytkownika w sesji
	passport.serializeUser(function(user, done){
		console.log("serialize");
		done(null, user._id);
	});

	// deserializacja użytkownika w sesji
	passport.deserializeUser(function(id, done){

		// szukanie użytkownika w bazie po id
		User.findById(id, function(err, user){
			console.log("deserialize");
			if(!err)
				done(null, user)
			else
				done(err, null);
		});
	});

	// lokalna rejestracja
	passport.use('local-signup', new localStrategy({

		// ustawienie pól do autoryzacji
		usernameField : 'email',
		passwordField : 'password',
		// zwrot całej formy
		passReqToCallback : true
	},
	function(req, email, password, done){

		// szukanie czy użytkownik o podanym emailu istnieje już w bazie
		User.findOne({'email' : email}, function(err,user){

			// jeśli błędy zwróć je
			if(err)
				return done(err);

			// sprawdzenie czy istnieje taki użytownik
			if(user){
				return done("istnieje email");
			}else{

				// tworzenie nowego użytkonika
				var newUser = new User();

				newUser.email = email;
				newUser.password = newUser.generateHash(password);

				newUser.save(function(err){

					if(err)
						return done(err);
					return done(null, newUser);
				});
			}
		});
	}));


	// lokalne logowanie 
	passport.use('local-login', new localStrategy({

		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done){

		// szukanie czy użytkownik z takim emailem istnieje
		User.findOne({'email' : email}, function(err, user){

			console.log(user);
			// jeśli błąd to zwrócenie go
			if(err)
				return done(err);

			// jesli nie znaleziono użytkonika 
			if(!user)
				return done('Nie znaleziono');
			
			// sprawdzanie czy dobre hasło
			if(!user.validPassword(password))
				return done('Niewłaściwe hasło');

			// zwrócenie użytkownika 
			return done(null, user);
		});
	}));

};