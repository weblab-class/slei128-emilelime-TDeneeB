// express and io
const express = require("express");
const path = require("path");
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


app.use("/api", api); //this tells app to use Api.js (moved to below until set routes)
// app.use("/auth", auth);

// set up sessions (so that If you log in and refresh the page, you should stay logged in!)
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

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


http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});

//
