/**
 * Created by hai on 30/04/2017.
 */
const mongoose = require('mongoose');

const modelExample = mongoose.model('modelExample', new mongoose.Schema({
    name: String
}));

module.exports = modelExample;