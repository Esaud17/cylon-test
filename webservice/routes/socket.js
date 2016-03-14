var Cylon = require('cylon');

var users = require('../collections/user');
var leads = require('../collections/lead');


var service = function(io){

	io.on('connection', function (socket) {
  		socket.emit('ready', { msj: 'server socket on' });
  		
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

				     var divice = new leads(data_divice);

				     divice.save(function(error,data){
							if(error){
								//console.log(error);
							}else{
								//console.log(data);
								socket.emit('hand', { data:data });
							}
					});


				    });

				  }
			}).start();
  		});

	});

};

module.exports = service;