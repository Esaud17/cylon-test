var Cylon = require('cylon');

var users = require('../collections/user');
var leads = require('../collections/lead');


var service = function(io){
	var divice = leads.model('dive_ledmotion',leads);

	io.on('connection', function (socket) {
		
		divice.find({hand:'left'}).count().exec(function(err,left){
			if(err){
				console.log(err);
			}
			else{
				divice.find({hand:'right'}).count().exec(function(err,right){
					if(err){
						console.log(err);
					}
					else{
						socket.emit('ready',{left:left, right:right});
					}	
				});
			}	
		});

  		socket.on('cytlon', function (data) {
    		
    		Cylon.robot({

				  connections: {
				    leapmotion: { adaptor: 'leapmotion' }
				  },

				  devices: {
				    leapmotion: { driver: 'leapmotion' }
				  },

				  work: function(my) {
				  	//res.render("leadOn",{"title":"servidor encendido"});

				  	my.leapmotion.on("gesture", function(gesture){ 
				  		//console.log(gesture);
				  	});

				    my.leapmotion.on('hand', function(payload) {
				  
				     var data_divice= {  
				     	hand:payload.type, 
				     	palm_velocity:payload.palmVelocity,
				     	sphere_center:payload.palmVelocity, 
				     };

				    var rdivice = new leads(data_divice);

				    rdivice.save(function(error,data){});

				 	divice.find({hand:'left'}).count().exec(function(err,left){
							if(err){
								//console.log(err);
							}
							else{
								divice.find({hand:'right'}).count().exec(function(err,right){
									if(err){
										//console.log(err);
									}
									else{
										socket.emit('char',{left:left, right:right });
									}	
								});
							}	
						});

				    });

				  }
			}).start();
  		});

	});

};

module.exports = service;