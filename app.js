/**
 * Created by hai on 21/05/2017.
 */
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const db = mongoose.connection;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cookie Parser
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

mongoose.connect('mongodb://localhost/');
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(ans) {
    console.log('MongoDb is Connected!')
});

// Passport init
require('./config/passport')(passport);
//app.use(session({ secret: 'pleasedonttellanyone' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

// Cors Allow Origin
app.use(cors({origin: '*'}));

app.use('/public', express.static('public'));

module.exports = app;