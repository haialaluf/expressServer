/**
 * Created by hai on 23/07/2017.
 */
// load all the things we need
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const Auth = require('./auth.js');

// load up the user model
const User = require('../schemas/user');

// expose this function to our app using module.exports
module.exports = (passport) => {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        (req, email, password, done) => { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, (err, user) => {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {massage: 'No user found.'}); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, {massage: 'Wrong password.'}); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

        }));


    passport.use(new FacebookTokenStrategy({
        clientID: Auth.facebook.clientID,
        clientSecret: Auth.facebook.clientSecret,
        }, function(accessToken, refreshToken, profile, done) {
            User.findOne({ 'facebook.id': profile.id }, (err, user) => {
                if (err) {
                    return done(err)
                } else if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;
                    newUser.save((err) => {
                        if (err) {
                            throw err;
                        } else {
                            return done(null, newUser);
                        }
                    })
                }
            });
        }
    ));

    passport.use(new GoogleTokenStrategy({
            clientID: Auth.google.clientID,
            clientSecret: Auth.google.clientSecret
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({ 'google.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err)
                } else if (user) {
                    return done(null, user);
                } else {
                    let newUser = new User();
                    newUser.google.id = profile.id;
                    newUser.google.token = accessToken;
                    newUser.google.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.save((err) => {
                        if (err) {
                            throw err;
                        } else {
                            return done(null, newUser);
                        }
                    })
                }
            });
        }
    ));

};


