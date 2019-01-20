// import node modules
const mongoose = require('mongoose');

// define a schema
const InputModelSchema = new mongoose.Schema ({
  userid  	: String,
  input     : String,
});

// compile model from schema
module.exports = mongoose.model('InputModel', InputModelSchema);