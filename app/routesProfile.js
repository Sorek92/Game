
var dbquery = require('./dbquery');
var Param = require('./models/paramModel'); 

// funkcja z drogami przy logowaniu i rejestracji
module.exports = function(app, server){


	
	var playerId = 0;

	var roomId = function(){
		return 1;
	}

	var users = [];


	var io = require('socket.io')(server);

	io.on('connection', function (socket) {

		var PlayerSet = function(){
			return [
			{
				color: "black",
				xPosition: 50,
				yPosition: 50
			},
			{
				color: "red",
				xPosition: 100,
				yPosition: 50
			},
			{
				color: "green",
				xPosition: 200,
				yPosition: 50
			},
			{
				color: "blue",
				xPosition: 300,
				yPosition: 50
			}]
		}

		var p = PlayerSet();
		var i = playerId % 4;
		socket.playerColor = p[i].color;
		socket.xPosition = p[i].xPosition;
		socket.yPosition = p[i].yPosition;
		socket.roomId = roomId();


		

		var player = {
			id: playerId,
			name: '',
			color: socket.playerColor,
			room: socket.roomId,
			xPosition: socket.xPosition,
			yPosition: socket.yPosition, 
		}
		
		// odbiór id clienta
		socket.on('id', function(data){
			player.name = data.id;
		});
		
		// przyłączenie do pokoju
		//socket.join(socket.roomId);

		// 
		socket.on('Wczytaj', function(data){
			if(data.ok === 'ok')
				socket.emit('play',player);
		});



		socket.on('zawodnicy', function(data){
			
			users.push(data);
			console.log("data:"+data);
			console.log("users:"+users);

			if(users.length===2){
				
				if(users[0]===data){
					socket.broadcast.emit('two',users[0]);
					socket.emit('two',users[1]);
					console.log('pokoj'+socket.roomId);
				}
				else {
					socket.broadcast.emit('two',users[1]);
					socket.emit('two',users[0]);
					console.log('pokoj'+socket.roomId);
				}
				socket.roomId +=1 ;
				users= [];

			}
			


			
		});

		socket.on('pozycja', function(data){
			pozycja = [data.x, data.y];
			//console.log("uzytkownik "+ data.name + " jest na pozycji x: "+ data.xPosition +" y: "+ data.yPosition);
			socket.broadcast.emit('pozycjaupdate',pozycja);

		})
  		

  		playerId = playerId + 1;
  		socket.on('disconnect', function(){
  			//socket.broadcast.to(socket.roomId).emit('user disconnected');
  		})

	});




};


/*
	app.get('/heroes/:id', function(req,res){
		dbquery.showHeroes(req.params.id, function(err,exists){
			if(err)
				console.log(err);

			if(exists)
				res.json(exists);
			else
				res.json(exists);
		});
	});


	app.get('/heroes/add/:id', function(req,res){


		dbquery.addHero(req.params.id, function(err,exists){
			if(err)
				console.log(err);

			//console.log("a"+exists);
			if(exists)
				res.json(exists);
			else
				res.json(exists);
		});
	});

	app.post('/loadHeroes', function(req, res){

		console.log("jestem tu ");

		dbquery.getHeroes(function(err, exists){
			if(err)
				console.log(err);
			if(exists)
				res.json(exists);
			else
				res.json(exists);


		});

		//res.json(params);

	});

	*/