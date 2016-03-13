var mongoose = require('./cnn'),
    Schema   = mongoose.Schema;

var ModelSchema =  new Schema({
	hand:{type:String},
	palm_velocity:[{type:Number}],
	sphere_center:[{type:Number}],

});

module.exports = mongoose.model('dive_ledmotion', ModelSchema);