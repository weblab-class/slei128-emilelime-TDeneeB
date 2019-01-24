// express and io
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const bodyParser = require("body-parser");
const session = require('express-session');

const app = express();
const http = require("http").Server(app);
const db = require('./db');
const passport = require('./passport');

const io = require("socket.io")(http);

// const { initNewGame, nextStep } = require("./game");

const publicPath = path.resolve(__dirname, "..", "client", "dist");
const api = require("./routes/api");

let rooms = {};
// rooms: roomID -> room
//
// room: users -> [User]
// statuses -> {userID : status}

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api); //this tells app to use Api.js (moved to below until set routes)

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);

app.use(express.static(publicPath));

// logout route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// catch URL's handled by React Router,
// and serve the single page web app.
function sendSinglePageApp(req, res) {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
}
app.get('/game/:roomid', sendSinglePageApp);

// 404 route
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// route error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
});

http.listen((process.env.PORT||3000), () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});

//socket stuff
app.set('socketio',io);
io.on('connection', (socket)=> {
  // console.log('Query:', socket.handshake.query);
  let roomid = socket.handshake.query.room;
  socket.join(roomid);
  console.log('socket join room id ' + roomid);
});
