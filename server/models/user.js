// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  userid        : String,
  totalscore     	  : Number,
  currentrooms  : {
                    roomid: String,
                    roomscore: Number
                  }
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
