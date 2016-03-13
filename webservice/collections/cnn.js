var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/lead", function(err, res) {
    if(err) throw err;
    console.log("Connected to Database it's [ OK ]");
});

module.exports = mongoose;