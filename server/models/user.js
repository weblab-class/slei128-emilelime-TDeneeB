
// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  userid        : String,
  score     	  : String,
  currentgames  : [],
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
