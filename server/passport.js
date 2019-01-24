//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT

const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID, // added our own
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, // added our own
  callbackURL: '/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
//Look up the user by the “googleid” supplied by Google.
  User.findOne({
    'googleid': profile.id
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      const user = new User({
        name: profile.displayName,
        googleid: profile.id,
        photo: profile.photos[0].value,
        totalscore: 0
      });

      user.save(function(err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = passport;
