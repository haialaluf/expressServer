/**
 * Created by haialaluf on 04/01/2018.
 */
const Wizard = require('../schemas/wizard.js');

module.exports = {
    createWizard: (req, res) => {
        let wizard = {
            name: req.body.name,
            stages: req.body.stages,
            items: req.body.items
        };
        Wizard.create(wizard).then(
            (dbRes) => {
                res.json({id: dbRes._id})
            },
            (err) => res.status(411).send(err));
    },

    getWizardById: (req, res) => {
        Wizard.findById(req.query.id).then(
            (dbRes) => res.json(dbRes),
            (err) => res.status(411).send(err));
    },

    deleteWizard: (req, res) => {
        Wizard.findById(req.query.id).then(
            (dbRes) => {
                dbRes.remove((dbRes) => res.json(dbRes))
            },
            (err) => res.status(411).send(err)
        );
    },

    getWizard: (req, res) => {
        let queryPrams = req.query;
        Wizard.find(queryPrams).then(
            (dbRes) => {
                res.json(dbRes)
            },
            (err) => {
                res.status(411).send(err)
            });
    }
};