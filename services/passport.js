const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');

//Mongooes
const mongoose = require('mongoose');
const User = mongoose.model('users');

//Automatically called by passport.
//Before Cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//After Cookie
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({
            googleId: profile.id
        })
        
        if(existingUser) {
            //we have a record with the given profile ID.
            return done(null, existingUser );
        } 
        
        //Make a new record.
        const user = await new User({ googleId: profile.id }).save()
        done(null, user);
                
    })
);