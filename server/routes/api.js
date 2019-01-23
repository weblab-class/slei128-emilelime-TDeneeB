// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

const router = express.Router();

// what we need
const User = require('../models/user');
const Input = require('../models/input');
const Room  = require('../models/room');

const game = require('../game');


// get info about user
router.get('/whoami', function(req, res) {
  if(req.isAuthenticated()) {
      res.send(req.user);
  }
  else {
      res.send({});
  }
});

router.get('/user', function(req, res) {
  User.findOne({ _id: req.query._id }, function(err, user) {
      res.send(user);
  });
});

// not used
router.get('/input', function(req, res) {
  Input.find({ input: req.query.text }, function(err, inputs) {
      res.send(inputs);
  })
});

//Creates a new room in the database
router.post('/newroom', (req,res) => {
  const newRoom = new Room({
    roomid: Math.random().toString(36).substr(2, 5),
    host: req.user._id,
    teamname: "WeridFlex",
    currentprompt: "",
    seenprompts: [], //list of ids of seen prompts
    users: [],
    inputs: {},
    votesFor: {},
    score: {},
    gamestate: game.STATE_JOINING
  });

  newRoom.save(function(err, room) {
    if (err) {
      res.send(500, "Something derped putting the thing into the db")
    } else {
      res.send({'newRoomId': room.roomid})
    }
  });
});

//finds the room in the db that has the matching roomid
//sends that room to front end
router.use('/game/:roomid', function(req, res, next) {
  Room.findOne({'roomid': req.params.roomid })
  .populate('host')
  .populate('users')
  .exec(function(err, room) {
    if (err) {
      res.send(404, "Room not found");
    } else {
      req.room = room;
      next();
    }
  });
});
router.get('/game/:roomid', function(req, res) {
  res.send(req.room);
});

function sendRoomStateChange(req, room) {
  room.populate('users', (err, room) => {
    const io = req.app.get('socketio');
    //params is the stuff after : in the url
    io.in(req.params.roomid).emit('roomStateChange', room); //updates all users in room that Jamie joined
  });
}

router.post('/game/:roomid/join', (req, res) => {
  req.room.users.push(req.user._id);
  req.room.save((err, room) => {
    if (err) {
      console.log(err);
      res.send(500, "something derped joining the room");
    } else {
      res.send({}); //sends the fact that Jamie joined to jamie
      sendRoomStateChange(req, room)
    }
  });
});

//tell server we're changing gamestate to PROMPTING, when HOST clicks "startgame"
router.post('/game/:roomid/startgame', (req,res)=> {
  req.room.gamestate = game.STATE_PROMPTING;
  req.room.currentprompt = "Say something funny!"; //TODO
  req.room.save((err,room)=> {
    res.send({});
    sendRoomStateChange(req, room);
  });
})

router.post('/game/:roomid/input', (req, res) => { //this
  let userInput = req.body.text;
  req.room.inputs.set(req.user._id, userInput);

  // if this was the last user's input,
  // advance to the next gamestate
  allUsersSubmittedInput = true;
  req.room.users.forEach( (user) => {
    if (!(req.room.inputs.has(user.id) || user._id==req.user.id)) {
      allUsersSubmittedInput = false;
    }
  })
  if (allUsersSubmittedInput) {
    req.room.gamestate = game.STATE_VOTE;
  }

  req.room.save(function(err, room) {
    res.send({});
    sendRoomStateChange(req, room);
  });
});

router.post('/game/:roomid/vote', (req, res) => { //this
  let voteFor = req.body.voteFor;
  req.room.votesFor.set(req.user._id, voteFor);

  // if this was the last user's vote,
  // advance to the next gamestate
  allUsersSubmittedVote = true;
  req.room.users.forEach( (user) => {
    if (!(req.room.votesFor.has(user.id) || user._id==req.user.id)) {
      allUsersSubmittedVote = false;
    }
  })
  if (allUsersSubmittedVote) {
    req.room.gamestate = game.STATE_LEADERBOARD;
  }

  req.room.save(function(err, room) {
    res.send({});
    sendRoomStateChange(req, room);
  });
});

router.post('/game/:roomid/nextround', (req, res) => { //this
  req.room.inputs = undefined;
  req.room.votesFor = undefined;
  req.room.score = undefined;
  req.room.save(function(err, room) {
    req.room.inputs = {};
    req.room.votesFor = {};
    req.room.score = {};
    req.room.currentprompt = "Say something else funny!!!";
    req.room.gamestate = game.STATE_PROMPTING;

    req.room.save(function(err, room) {
      res.send({});
      sendRoomStateChange(req, room);
    });
  })
});


router.post('/input', (req, res) => { //this
  // res.send('hi');
  console.log("router.post is running");
  console.log(req.body.text);

  const newInput = new Input({
    'userid': req.user._id,
    // 'creator_name': req.user.name,
    'input': req.body.text
  });

  // connect.ensureLoggedIn();

  console.log('new input is created');

  newInput.save(function(err, input) {
    // configure socket
    console.log('new input function ran');
    const io = req.app.get('socketio');
    io.emit("input", { userid: req.user._id, input:req.body.text});
    if (err) console.log(err);
  });
  res.send({});
});

module.exports = router;
