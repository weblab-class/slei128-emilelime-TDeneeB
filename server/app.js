const express = require("express");
const path = require("path");
// const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();
const http = require("http").Server(app);
const db = require('./db');
const passport = require('./passport');
const io = require("socket.io")(http);

const publicPath = path.resolve(__dirname, "..", "client", "dist");

const api = require("./api");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api", api); //this tells app to use Api.js
// app.use("/auth", auth);

// set up sessions (so that If you log in and refresh the page, you should stay logged in!)
// app.use(session({
//   secret: 'session-secret',
//   resave: 'false',
//   saveUninitialized: 'true'
// }));


// hook up passport
app.use(passport.initialize());
app.use(passport.session());

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

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});

// why are we using http.listen(3000) not app.listen(3000) like below?

// app.get(‘/api’, (req, res) => {
//   res.json({message: ‘Welcome to the Server’});
// });
// app.listen(8081, ()=>{
//   console.log(‘API listening on port 8081’);
// });
