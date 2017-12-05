/*
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


// Set environment
app.env = 'dev';

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json(    ));

if (app.env === 'prod') {
    mongoose.connect('mongodb://admin:WKJSUDCDNSAYFBXQ@sl-us-south-1-portal.17.dblayer.com:28522,sl-us-south-1-portal.12.dblayer.com:28522/compose?authSource=admin&ssl=true', {
            useMongoClient: true
        });
} else {
    mongoose.connect('mongodb://localhost/', {
        useMongoClient: true
    })
}
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