const Users = require('./routes/users.js');
const Items = require('./routes/items.js');
const FileUpload = require('./routes/fileUpload.js');
const app = require('./app');
const passport = require('passport');
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.send(401);

app.post('/api/addItem', ensureAuthenticated, Items.addItem);

app.delete('/api/deleteItem', ensureAuthenticated, Items.deleteItem);

app.get('/api/getItemById', Items.getItemById);

app.get('/api/getItems', Items.getItems);

app.post('/api/uploadImage', FileUpload.fileUpload);

// process the login form
app.post('/api/login', passport.authenticate('local-login'), Users.loginLocal);

// process the signup form
app.post('/api/register', Users.signupLocal);

// process the signup form
app.post('/api/logout', Users.logout);

app.get('/api/whoAmI', Users.whoAmI);

app.listen(1818);
