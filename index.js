const Settings = require('./config/settings.js');
const Users = require('./routes/users.js');
const Items = require('./routes/items.js');
const Order = require('./routes/orders.js');
const Applications = require('./routes/applications.js');
const FileUpload = require('./routes/fileUpload.js');
const {app} = require('./app');
const passport = require('passport');
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.send(401);
const cfenv = require('cfenv');
const appEnvOpts = {};
const appEnv = cfenv.getAppEnv(appEnvOpts);

//Items:
app.post('/api/addItem', ensureAuthenticated, Items.addItem);

app.delete('/api/deleteItem', ensureAuthenticated, Items.deleteItem);

app.get('/api/getItemById', Items.getItemById);

app.get('/api/getItems', Items.getItems);


//Orders
app.post('/api/order', Order.makeOrder);

app.delete('/api/order', ensureAuthenticated, Order.deleteOrder);

app.get('/api/order', ensureAuthenticated,  Order.getOrders);


//Files upload
app.post('/api/uploadFiles', FileUpload.fileUpload);

// process the login form
app.post('/api/auth/login', passport.authenticate('local-login'), Users.whoAmI);

// process the signup form
app.post('/api/auth/register', Users.signupLocal);

// process the signup form
app.post('/api/auth/logout', Users.logout);

app.get('/api/auth/whoAmI', Users.whoAmI);

app.get('/api/auth/facebook', passport.authenticate('facebook-token'), Users.whoAmI);

app.get('/api/auth/google', passport.authenticate('google-token'), Users.whoAmI);

// process the application form
app.post('/api/contactMessage', Applications.makeApplication);




if (Settings.env === 'prod') {
    app.listen(appEnv.port, "0.0.0.0", function () {
        // print a message when the server starts listening
        console.log("server starting on " + appEnv.url);
    });
} else {
    app.listen(8080)
}
