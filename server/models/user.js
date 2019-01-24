// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema({
  googleid: String,
  name: String,
  photo: String,
  totalscore: Number,
  currentrooms: [{type: mongoose.Schema.Types.ObjectId, ref:"RoomModel"}]
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
