/**
 * Created by hai on 28/06/2017.
 */
const mongoose = require('mongoose');

const item = mongoose.model('item', new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    videoUrl: String,
    filesUrl: [String],
    tags: [String],
    pricing: String,
    type: Number
}));

module.exports = item;