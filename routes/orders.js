/**
 * Created by haialaluf on 31/12/2017.
 */
const Order = require('../schemas/order.js');


module.exports = {
    makeOrder: (req, res) => {
        let order = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date: req.body.date,
            address: req.body.address,
            items: req.body.items
        };
        Order.create(order).then(
            (dbRes) => {
                // mailService.send(application, 'hai.alaluf@gmail.com');
                res.json({msg: 'Yofi Tofi :)'});
            },
            (err) => res.status(411).send(err));
    },

    deleteOrder: (req, res) => {
        Order.findById(req.query.id).then(
            (dbRes) => dbRes.remove(
                (dbRes) => res.json(dbRes)),
            (err) => res.status(411).send(err));
    },

    getOrders: (req, res) => {
        let queryPrams = req.query;
        Order.find(queryPrams)
            .populate('items')
            .exec().then(
            (dbRes) => {
                res.json(dbRes)
            },
            (err) => {
                res.status(411).send(err)
            });
    }
};