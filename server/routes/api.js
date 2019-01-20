// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// what we need
const User = require('../models/user');
const Input = require('../models/input');

const router = express.Router();

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

router.get('/input', function(req, res) {
  Input.find({ input: req.query.text }, function(err, inputs) {
      res.send(inputs);
  })
});

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
 