/**
 * Created by haialaluf on 04/01/2018.
 */
const mongoose = require('mongoose');

const wizard = mongoose.model('wizard', new mongoose.Schema({
    name: String,
    stages: [{
        title: String,
        description: String
    }],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }]
}));

module.exports = wizard;