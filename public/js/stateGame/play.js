


angular.module('game.play',[])


	.factory('Play', function($rootScope,GameServer){
		var hero;
		var cursors;
		var moving = 0;
		return {
			init: function(){
				
			},
			preload: function() {
				WorldGame.stage.backgroundColor = '#293596';
				
			},
			create: function() {

				WorldGame.add.text(10,10,"play ");


				hero = WorldGame.add.sprite( User.xPosition, User.yPosition, User.color);
				enemy = WorldGame.add.sprite( Przeciwnik.xPosition, Przeciwnik.yPosition, Przeciwnik.color);

				cursors = WorldGame.input.keyboard.createCursorKeys();

				WorldGame.input.onDown.add(this.toggle, this);

			},
			toggle:function(){
				moving = (moving === 0) ? moving = 1 : moving = 0;
			},
			update: function(){

				IO.socket.emit('pozycja', {x: hero.x, y:hero.y});

				IO.socket.on('pozycjaupdate', function(data){
					if(enemy.x != data[0]){
						enemy.x = data[0];
						console.log('x: '+ data[0]);
					}
					if(enemy.y != data[1]){
						enemy.y = data[1];
						console.log('y: '+ data[1]);
					}

				})

  				if (moving === 0)
    			{
       				if (cursors.up.isDown)
        			{
           				WorldGame.camera.y -= 4;
       				}
        			else if (cursors.down.isDown)
        			{
            			WorldGame.camera.y += 4;
        			}

        			if (cursors.left.isDown)
       				{
           				WorldGame.camera.x -= 4;
        			}
        			else if (cursors.right.isDown)
        			{
           				WorldGame.camera.x += 4;
        			}
    			}
   			 	else
    			{
       				if (cursors.left.isDown)
       			 	{
       			    	hero.x -= 4;
      				}
      			  	else if (cursors.right.isDown)
        			{
            			hero.x += 4;
        			}

        			if (cursors.up.isDown)
        			{
            			hero.y -= 4;
        			}
        			else if (cursors.down.isDown)
        			{
            			hero.y += 4;
        			}
    			}
			}


			///fdsfdsf
		}
	})