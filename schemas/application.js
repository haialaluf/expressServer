/**
 * Created by haialaluf on 05/12/2017.
 */
const mongoose = require('mongoose');

const application = mongoose.model('application', new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
}));

module.exports = application;