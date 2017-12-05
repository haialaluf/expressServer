/**
 * Created by haialaluf on 05/12/2017.
 */
const Application = require('../schemas/application.js');
const mailService = require('../moduls/mailService.js');

module.exports = {
    makeApplication: (req, res) => {
        let application = {name: req.body.name, email: req.body.email, subject: req.body.subject, message: req.body.subject};
        Application.create(application).then(
            (dbRes) => {
                mailService.send(application, 'hai.alaluf@gmail.com');
                res.json({msg: 'Yofi Tofi :)'});
            },
            (err) => res.status(411).send(err));
    }
};