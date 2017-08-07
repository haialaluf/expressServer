/**
 * Created by hai on 30/04/2017.
 */
const User = require('../schemas/user.js');

module.exports = {

    signupLocal: function (req, res) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        User.find({'local.email': email}).then(
            (user) => {
                if (user.length) {
                    res.status(412).send({message: 'That email is already taken.'});
                } else {
                    let newUser = new User();
                    // set the user's local credentials
                    newUser.local.name = name;
                    newUser.local.email = email;
                    newUser.local.password = User.generateHash(password);

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            res.status(411).send(err);
                        else
                            res.json(newUser);
                    });
                }
            },
            (err) => {
                res.status(411).send(err);
            });
    },

    loginLocal: function (req, res) {
        res.json(req.user);
    },
};

