// zapytania do bazy danych

var User = require('./models/userModel');
var Hero = require('./models/heroModel'); 
var Param = require('./models/paramModel'); 

// zapytania w formie funkcji 
module.exports = {

	// sprawdzanie czy login już istnieje
	isOccupiedNickname : function(nickname, callback){

		var query = User.findOne({'nickname' : nickname});
		query.exec(function(err,user){

			// jeśli bład w szukaniu to zwróc go
			if(err)
				callback(err)

			// jeśli zapytanie poszło pomyślnie zwróć znalezionego użytkownika z loginem
			callback(null,user);
		});
	},


	// sprawdzanie czy email już istnieje
	isOccupiedEmail : function(email, callback){

		var query = User.findOne({'email' : email});
		query.exec(function(err,user){

			// jeśli błąd w szukaniu to zwróc go
			if(err)
				callback(err);

			// jeśli zapytanie poszło pomyślnie to zwróć znalezionego użytkownika z emailem
			callback(null, user);
		});
	},

	// dodanie nicku do bazy danych
	addNickname: function(user, callback){
		var u = user;
		var query = User.findOne({'email' : u.email});
		query.exec(function(err,user){
			if(err)
				callback(err);

			user.nickname = u.nickname;
			user.save();
			
			callback(null,user);
		})

	},

	// zwrócenie wszystkich postaci gracza
	showHeroes: function(id, callback){

		var u_id = id;
		var query = Hero.find({publisher_id : u_id});
		query.exec(function(err, users){
			if(err)
				callback(err);

			callback(null, users);
		})
	},


	// dodanie postaci gracza
	addHero: function(id, callback){

		var u_id = id;
		

		var h = new Hero();

		h.nacja = "mag";
		h.experiance = 300;
		h.publisher_id = u_id;

		h.save(); 

		callback(null, h);

	},


	// zwrócenie parametrów postaci
	getHeroes: function(callback){

		/*var query = Param.find({});
		query.exec(function(err, result){
			if(err)
				callback(err);

			callback(null, result);
		});*/
	
		var params;


		params = {
			"mag": "sorek",
			"pozycja": "łucznik"
		};


		callback(null, params);


	}

}