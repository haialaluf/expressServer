/**
 * Created by haialaluf on 15/01/2018.
 */
const mongoose = require('mongoose');

const Settings = mongoose.model('Settings', new mongoose.Schema({
    activeWizard: { type: mongoose.Schema.Types.ObjectId, ref: 'wizard' }
}));

module.exports = Settings;