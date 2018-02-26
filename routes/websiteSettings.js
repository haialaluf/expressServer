/**
 * Created by haialaluf on 15/01/2018.
 */
/**
 * Created by haialaluf on 04/01/2018.
 */
const Settings = require('../schemas/settings.js');
const AppSettings = require('../config/settings.js');

const generateRespnonceData = (settings, isAuthenticated) => {
    if (isAuthenticated) {
        return {
            settings: settings,
            storage: AppSettings.storage
        }
    } else {
        return {
            settings: settings,
            storage: {
                bucketName: AppSettings.storage.bucketName,
                region: AppSettings.storage.region,
                apiVersions: AppSettings.storage.apiVersions
            }
        }
    }

}

module.exports = {
    
    putSettings: (req, res) => {
        Settings.find().then(
            (dbRes) => {
                if (dbRes.length) {
                    let settings = dbRes[0];
                    if (req.body.activeWizard) {
                        settings.activeWizard = req.body.activeWizard;
                    }
                    if (req.body.homeView) {
                        settings.homeView = req.body.homeView;
                    }
                    settings.save((dbRes) => res.json(generateRespnonceData(settings, req.isAuthenticated()))                )
                } else {
                    let settings = new Settings;
                    settings.activeWizard = req.body.activeWizard;
                    settings.homeView = req.body.homeView;
                    Settings.create(settings).then(
                        res.json(generateRespnonceData(settings, req.isAuthenticated()))
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
                res.json(generateRespnonceData(settings, req.isAuthenticated()))
            },
            (err) => {
                res.status(411).send(err)
            });
    }

};