/**
 * Created by haialaluf on 04/01/2018.
 */
const Item = require('../schemas/item.js');
const mongoose = require('mongoose');

const wizard = mongoose.model('wizard', new mongoose.Schema({
    name: String,
    stages: [{
        title: String,
        description: String
    }],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'item' }]
}));

wizard.createWizard = (_wizard) => {
    return new  Promise((resave, rejecte) => {
        const items = _wizard.items.map(item => ({
            name: item.name,
            description: item.description || '',
            shortDescription: item.shortDescription ||'',
            filesUrl: item.fileList || [],
            videoUrl: item.videoUrl || '',
            type: Number(item.type) || 0,
            tags: item.tags || ''
        }));
        return Item.insertMany(items)
            .then((items) => {
                _wizard.items = items.map(item => {
                    return item._id
                });
                return wizard.create(_wizard)
            })
            .then((res) => {
                if (res.errors) {
                    rejecte(wizard.errors)
                } else {
                    resave(res);
                }
            })
    });
};

module.exports = wizard;