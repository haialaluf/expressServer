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

mongoose.connect('mongodb://localhost/');
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(ans) {
    console.log('MongoDb is Connected!');
});


// Express Session
app.use(session({
    secret: 'this is secret',
    saveUninitialized: false,
    resave: false
}));

// Cookie Parser
app.use(cookieParser());

// Passport init
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Cors Allow Origin
app.use(cors({origin: 'http://localhost:3000', credentials: true}));

app.use('/public', express.static('public'));

module.exports = app;