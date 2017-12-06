/**
 * Created by hai on 28/06/2017.
 */
const Item = require('../schemas/item.js');

module.exports = {
    addItem: (req, res) => {
        Item.create({name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, properties: req.body.properties}).then(
            (dbRes) => res.json({id: dbRes._id}),
            (err) => res.status(411).send(err));
    },

    getItemById: (req, res) => {
        Item.findById(req.query.id).then(
            (dbRes) => res.json(dbRes),
            (err) => res.status(411).send(err));
    },

    deleteItem: (req, res) => {
        Item.findById(req.query.id).then(
            (dbRes) => dbRes.remove(
                (dbRes) => res.json(dbRes)),
            (err) => res.status(411).send(err));
    },

    getItems: (req, res) => {
        Item.find().then(
            (dbRes) => res.json(dbRes),
            (err) => res.status(411).send(err));
    }
};