const Users = require('./routes/users.js');
const Items = require('./routes/items.js');
const FileUpload = require('./routes/fileUpload.js');
const app = require('./app');
const passport = require('passport');


app.post('/api/addItem', Items.addItem);

app.delete('/api/deleteItem', Items.deleteItem);

app.get('/api/getItemById', Items.getItemById);

app.get('/api/getItems', Items.getItems);

app.post('/api/uploadImage', FileUpload.fileUpload);

// process the login form
app.post('/api/login', passport.authenticate('local-login'), Users.loginLocal);

// process the signup form
app.post('/api/register', Users.signupLocal);


app.listen(1818);
