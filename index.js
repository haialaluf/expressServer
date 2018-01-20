const Settings = require('./config/settings.js');
const Users = require('./routes/users.js');
const websiteSettings = require('./routes/websiteSettings.js');
const Items = require('./routes/items.js');
const Wizard = require('./routes/wizards.js');
const Order = require('./routes/orders.js');
const Applications = require('./routes/applications.js');
const FileUpload = require('./routes/fileUpload.js');
const app = require('./app');
const passport = require('passport');
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.send(401);
const cfenv = require('cfenv');
const appEnvOpts = {};
const appEnv = cfenv.getAppEnv(appEnvOpts);


// Applications
app.post('/api/contactMessage', Applications.makeApplication);


// Authentication
app.post('/api/auth/login', passport.authenticate('local-login'), Users.whoAmI);

app.post('/api/auth/register', Users.signupLocal);

app.post('/api/auth/logout', Users.logout);

app.get('/api/auth/whoAmI', Users.whoAmI);

app.get('/api/auth/facebook', passport.authenticate('facebook-token'), Users.whoAmI);

app.get('/api/auth/google', passport.authenticate('google-token'), Users.whoAmI);


//Website settings
app.put('/api/settings'/*, ensureAuthenticated*/, websiteSettings.putSettings);

app.get('/api/settings', websiteSettings.getSettings);


//Items:
app.post('/api/addItem', ensureAuthenticated, Items.addItem);

app.delete('/api/deleteItem', ensureAuthenticated, Items.deleteItem);

app.get('/api/getItemById', Items.getItemById);

app.get('/api/getItems', Items.getItems);


//Wizards:
app.post('/api/createWizard'/*, ensureAuthenticated*/, Wizard.createWizard);

app.delete('/api/deleteWizard', ensureAuthenticated, Wizard.deleteWizard);

app.get('/api/getWizardById', Wizard.getWizardById);

app.get('/api/getWizards'/*, ensureAuthenticated*/, Wizard.getWizard);


//Orders
app.post('/api/order', Order.makeOrder);

app.delete('/api/order', ensureAuthenticated, Order.deleteOrder);

app.get('/api/order', ensureAuthenticated,  Order.getOrders);


//Files upload
app.post('/api/uploadFiles', FileUpload.fileUpload);


app.get('/api/test', (req, res) => res.json('Hello :)'));


if (Settings.env === 'prod') {
    app.listen(appEnv.port, "0.0.0.0", function () {
        // print a message when the server starts listening
        console.log("server starting on " + appEnv.url + ':' + appEnv.port);
    });
} else {
    app.listen(8080)
}
