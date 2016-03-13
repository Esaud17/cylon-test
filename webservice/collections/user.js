var mongoose = require('./cnn'),
    Schema   = mongoose.Schema;

var ModelSchema =  new Schema({
	user:{type:String,required:true,unique:true},
	status:{type:String},
});

module.exports = mongoose.model('users_ledmotion', ModelSchema);