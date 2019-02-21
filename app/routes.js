
var dbquery = require('./dbquery');


// funkcja z drogami przy logowaniu i rejestracji
module.exports = function(app, passport){

	// get signup - powrót do rejestracji gdy niepowodzenie
	app.get('/signup', function(req, res){
		res.json({state: "failure", message: req.flash('err_auth')});
	});

	//sprawdzenie czy istnieje email na bierząco 
	app.get('/signup/e/:email', function(req, res){

		// funkcja sprawdzająca czy dany email istnieje w bazie
		dbquery.isOccupiedEmail(req.params.email, function(err, exists){

			if(err)
				res.json({error_occupied: "email niepowodzenie:"+err});

			if(exists)
				res.json({find : "success"});
			else
				res.json({find : "failure"});
		});
	});

	//sprawdzenie czy istnieje nick na bierząco 
	app.get('/signup/n/:nickname', function(req, res){

		// funkcja sprawdzająca czy dany email istnieje w bazie
		dbquery.isOccupiedNickname(req.params.nickname, function(err, exists){

			if(err)
				res.json({error_occupied: "nickname niepowodzenie:"+err});

			if(exists)
				res.json({find : "success"});
			else
				res.json({find : "failure"});
		});
	});

	// post signup - wysyłanie formularza rejestracji do sprawdzenia 
	app.post('/signup', function(req,res,next){

		passport.authenticate('local-signup', function(err,user,info){

			// jeśli błąd to wyślij do użytkownika
			if(err){
				req.flash('err_auth',"email istnieje juz w bazie");
				res.redirect('/signup');
			}

			// przekieruj na profil
			if(user){
				dbquery.addNickname(req.body, function(err, u){
					if(err)
						req.flash('err_auth',err);


					req.flash('user', u);
					res.redirect('/profile/'+u.id);

				});

				
			}
				

		})(req,res,next);
	});


	// get login - powrót do logowania gdy niepowodzenie
	app.get('/login', function(req, res){
		res.json({state: 'failure', message: "Niewłaściwe hasło lub email"});
	});

	// post login - wysyłanie formularza logowania do sprawdzenia 
	app.post('/login', function(req,res,next){

		passport.authenticate('local-login', function(err,user,info){

			// jeśli błąd to wyślij do użytkownika
			if(err){
				req.flash('err_auth',"Niewłaściwe hasło lub email");
				res.redirect('/login');
			}

			// przekieruj na profil
			if(user){
				req.flash('user', user);
				res.redirect('/profile/'+user.id);
			}
				

		})(req,res,next);
	});

	// przekierowanie na profil użytkownika
	app.get('/profile/:id', isLoggedIn, function(req,res){
		res.json({state: "success", message: "autoryzacja przebiegła pomyślnie", user: req.flash('user')[0]});
	});


	// wylogowanie 
	app.get('/logout', function(req, res){
		res.redirect('/');
	});



};

// sprawdzanie autoryzacji w sesji
function isLoggedIn(req, res, next){

	if(req.isAuthenticated){
		return next();
	}

	res.redirect('/');
}