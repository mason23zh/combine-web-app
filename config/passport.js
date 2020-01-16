const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('./keys');
const User = mongoose.model('users');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        }, (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken);
            // console.log(profile);

            const newUser = {
                googleID: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }

            //*check for ecisting user
            User.findOne({
                googleID: profile.id
            }).then(user => {
                if (user) {
                    console.log('User already exist in the DB.');
                    done(null, user);
                } else {
                    //* create user if not in the DB
                    console.log('New User');
                    new User(newUser).save().then(user => {
                        done(null, user);
                    })
                }
            })
        })
    )
}