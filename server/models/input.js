//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT

// import node modules
const mongoose = require('mongoose');

// define a schema
const InputModelSchema = new mongoose.Schema ({
  creator_id  	: String,
  creator_name  : String,
  parent      	: String,
  content     	: String,
});

// compile model from schema
module.exports = mongoose.model('InputModel', InputModelSchema);
