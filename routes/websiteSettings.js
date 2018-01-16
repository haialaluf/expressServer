/**
 * Created by haialaluf on 15/01/2018.
 */
/**
 * Created by haialaluf on 04/01/2018.
 */
const Settings = require('../schemas/settings.js');

module.exports = {
    
    putSettings: (req, res) => {
        Settings.find().then(
            (dbRes) => {
                if (dbRes.length) {
                    let settings = dbRes[0];
                    settings.activeWizard = req.body.activeWizard;
                    settings.save((dbRes) => res.json(settings))
                } else {
                    let settings = new Settings;
                    settings.activeWizard = req.body.activeWizard;
                    Settings.create(settings).then(
                        (dbRes) => res.json(settings)
                    );
                }
            },
            (err) => res.status(411).send(err)
        );
    },

    getSettings: (req, res) => {
        Settings.find().then(
            (dbRes) => {
                let settings = dbRes[0] || {};
                res.json(settings)
            },
            (err) => {
                res.status(411).send(err)
            });
    }
};