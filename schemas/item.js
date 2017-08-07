/**
 * Created by hai on 28/06/2017.
 */
const mongoose = require('mongoose');

const item = mongoose.model('item', new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String
}));

module.exports = item;