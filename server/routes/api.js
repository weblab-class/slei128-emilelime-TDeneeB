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
    // it seems like req.user gets doesn't update
    User.findById(req.user._id)
    // .populate() replaces a list of ObjectID's with a list of those actual objects
    .populate('currentrooms') //populate serves to populate currentrooms
    //field in user model, which is a list of objectIDs; it does so by going into the reference RoomModel
    .exec((err, user) => {
      res.send(user);
    });
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
    teamname: "",
    currentprompt: "",
    seenprompts: [], //list of ids of seen prompts
    users: [],
    inputs: {},
    votesFor: {},
    score: {},
    gamestate: game.STATE_JOINING,
    roundnumber: 1
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
  // add this room to the user's currentrooms
  // req.user doesn't have .save() anymore so we gotta find it again
  User.findById(req.user._id, (err, user) => {
    // on req.room, ._id is an ObjectID, and .id is a STRING
    console.log(user.currentrooms, req.room.id, typeof req.room.id);
    if (user.currentrooms.indexOf(req.room.id)>=0) {
      console.log('This user already has this room in currentrooms!');
    } else {
      // user is already in this room!
      user.currentrooms.push(req.room.id);
      user.save();
    }
  });

  // add this user to the room
  userids_in_room  = req.room.users.map(u => u.id);
  console.log(userids_in_room, req.user._id, typeof req.user._id); // on req.user, _id is a STRING
  if (userids_in_room.indexOf(req.user._id)>=0) {
    console.log('This room already has this user in it!');
  } else {
    req.room.users.push(req.user._id);
    req.room.score.set(req.user._id, 0);
    req.room.save((err, room) => {
        res.send({}); //sends the fact that Jamie joined to jamie
        sendRoomStateChange(req, room);
    });
  }
  // also add this room to the users active rooms
});

//tell server we're changing gamestate to PROMPTING, when HOST clicks "startgame"
router.post('/game/:roomid/startgame', (req,res)=> {
  req.room.gamestate = game.STATE_PROMPTING;
  req.room.currentprompt = game.prompts[Math.floor(Math.random()*game.prompts.length)].text;
  req.room.roundnumber= 1;
  req.room.save((err,room)=> {
    res.send({});
    sendRoomStateChange(req, room);
  });
})

router.post('/game/:roomid/maketeamname', (req,res)=> {
  let teamName = req.body.teamname;
  req.room.teamname = teamName;
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

//methods for Map:
//Map object holds key-value pairs and remembers the original insertion order of the keys.
//.get(key)--->value
//.set(key,value)
//.has(key)--> T/F
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
    req.room.users.forEach( (user) => {
      let voteForUserId = req.room.votesFor.get(user.id);
      let currentNumVotes = req.room.score.get(voteForUserId);
      req.room.score.set(voteForUserId, currentNumVotes+1);
    });
    req.room.users.forEach((user)=> {
      let newlyEarnedScore = req.room.score.get(user.id);
      user.totalscore += newlyEarnedScore;
      user.save((err, user) => {
        if (err) console.log('error saving user', err);
      });
    })
    req.room.gamestate = game.STATE_LEADERBOARD;
  }

  req.room.save(function(err, room) {
    if (err) {
      console.log('Error saving room', err)
      res.status(500).send(err);
    } else {
      res.send({});
      sendRoomStateChange(req, room);
    }
  });
});

router.post('/game/:roomid/nextround', (req, res) => { //this
  req.room.inputs = undefined;
  req.room.votesFor = undefined;
  req.room.save(function(err, room) {
    req.room.inputs = {};
    req.room.votesFor = {};
    req.room.currentprompt = game.prompts[Math.floor(Math.random()*game.prompts.length)].text;
    req.room.gamestate = game.STATE_PROMPTING;
    req.room.roundnumber = ++req.room.roundnumber;

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
