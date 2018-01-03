/**
 * Created by haialaluf on 31/12/2017.
 */
const mongoose = require('mongoose');

const order = mongoose.model('order', new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    address: String,
    phone: String,
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }]
}));

module.exports = order;