// import node modules
const mongoose = require('mongoose');

const User = require('./user').schema; //   ./means this directory

// define a schema
const RoomModelSchema = new mongoose.Schema({
  roomid: String,
  host: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
  teamname:String,
  currentprompt: String,
  seenprompts: [String], //list of ids of seen prompts
  users: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
  inputs: {type: Map, of: String},
  votesFor: {type: Map, of: String},
  score: {type: Map, of: Number},
  gamestate: Number,
  roundnumber: Number
});

/*
gamestatus
0: Joining
1: prompt
2: WaitForInputs
3: Vote
4: WaitForVotes
5: LeaderBoard
*/

// compile model from schema
module.exports = mongoose.model('RoomModel', RoomModelSchema);
