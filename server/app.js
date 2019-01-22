// express and io
const express = require("express");
const path = require("path");
require(‘dotenv’).config();

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

//request parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// set up sessions (so that If you log in and refresh the page, you should stay logged in!)
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", api); //this tells app to use Api.js (moved to below until set routes)
// app.use("/auth", auth);

//user info
app.get(['/profile/:user'], function (req, res) {
  res.sendFile(path.join(__dirname, '../socket/dist', 'index.html'));
});


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

// set routes
//app.use('/', views);
app.use('/api', api );
app.use(express.static(publicPath));

// logout route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

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


const port = (process.env.PORT||3000);
http.listen(3000, () => {
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

/* *******************************
   *                             *
   *       below is socket        *
   *    stuff for game logic              *
   ******************************* */
//
// let round = {};
// let gameStarted = false;
//
//
// const getNextGameState = () => {
//   if (!game.game_over) {
//     game = nextStep(game);
//     io.emit("update_game", game);
//   }
// };
//
// // Websocket shenanigans
// let ioRoom = io.of("/" + roomid);
// ioRoom.on('connection', function(socket){
//   let numConnected = 0;
//   console.log('someone connected');
// });
// ioRoom.emit('hi', 'everyone!');
//
// // io.on("newGameCreated", newGameCreated);
// // io.on("beginNewGame", hostPrepareGame);
//
// io.on('connection', (socket) => {
//   numConnected+= 1;
//   console.log("a user connected they are user number " + numConnected);
//   if (!gameStarted) {
//     game = initNewGame();
//     gameInterval = setInterval(
//       () => {
//         getNextGameState();
//       },
//       gameTick,
//     );
//     socket.join('some room');
//     // socket.emit("new_game", game);
//     gameStarted = true;
//   }
//   socket.on("myClick", (data) => {
//     socket.emit('myClick', data) ///???
//   });
//   socket.on("disconnect", () => {
//     console.log("a user disconnected");
//     numConnected -= 1;
//     clearInterval(gameInterval)
//     if (numConnected === 0) {
//       gameStarted = false;
//     }
//   })
// });
//
// //
