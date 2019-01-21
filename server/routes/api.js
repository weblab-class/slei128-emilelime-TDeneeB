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
    currentprompt: "",
    seenprompts: [], //list of ids of seen prompts
    users: [],
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
router.post('/game/:roomid/join', (req, res) => {
  req.room.users.push(req.user._id);
  req.room.save((err, room) => {
    if (err) {
      console.log(err);
      res.send(500, "something derped joining the room");
    } else {
      room.populate('users', (err, room) => {
        res.send({}); //sends the fact that Jamie joined to jamie
        const io = req.app.get('socketio');
        //params is the stuff after : in the url
        io.in(req.params.roomid).emit('roomStateChange', room); //updates all users in room that Jamie joined
      });
    }
  });
})

// api endpoints
router.post('/input', (req, res) => { //this
  // res.send('hi');
  console.log("router.post is running");
  console.log(req.body.text);

  //EDIT THIS CHUNK BELOW, ITS SUPPOSED TO PUSH BACKEND TO INPUT DATABASE BUT ITS BROKEN

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
