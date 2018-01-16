/**
 * Created by hai on 28/06/2017.
 */
const Item = require('../schemas/item.js');

module.exports = {
    addItem: (req, res) => {
        let item = {
            name: req.body.name,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            filesUrl: req.body.fileList,
            videoUrl: req.body.videoUrl,
            type: parseInt(req.body.itemType),
            tags: req.body.tags
        };
        Item.create(item).then(
            (dbRes) => {
                res.json({id: dbRes._id})
            },
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
        let queryPrams = req.query;
        if (queryPrams.type) {
            queryPrams.type = parseInt(queryPrams.type);
        }
        Item.find(queryPrams).then(
            (dbRes) => {
                res.json(dbRes)
            },
            (err) => {
                res.status(411).send(err)
            });
    }
};