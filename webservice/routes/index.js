var express = require('express');
var Cylon = require('cylon');

var users = require('../collections/user');
var leads = require('../collections/lead');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/data", function(req, res, next){
	var divice = leads.model('dive_ledmotion',leads);

	divice.find({ }).exec(function(err,col){
		if(err){
			console.log(err);
			res.send(404);
		}
		else{
			res.render('data',{ collections:col });
		}	
	});
	
});


router.get("/leadpoweron/:usuario/:estado", function(req, res, next){

	var data = { user:req.params.usuario ,status:req.params.estado};

 	var  usuario = new users(data);

	usuario.save(function(error,data){
		if(error){
			console.log(error);
		}else{
			console.log(data);
		}
	});

	Cylon.robot({
	  connections: {
	    leapmotion: { adaptor: 'leapmotion' }
	  },

	  devices: {
	    leapmotion: { driver: 'leapmotion' }
	  },

	  work: function(my) {
	  	res.render("leadOn",{"title":"servidor encendido"});

	  	my.leapmotion.on("gesture", function(gesture){ 
	  		console.log(gesture);
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
				}
		});


	    });

	  }
	}).start();

});

module.exports = router;
