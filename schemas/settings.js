/**
 * Created by haialaluf on 15/01/2018.
 */
const mongoose = require('mongoose');

const Settings = mongoose.model('Settings', new mongoose.Schema({
    activeWizard: { type: mongoose.Schema.Types.ObjectId, ref: 'wizard' },
    homeView: { 
        components:[
            {
                componentType: Number,
                data: [
                    {
                        title: String,
                        text: String,
                        imageUrl: String,
                        animation: String,
                        longText: String,
                        colors: {
                            background: String,
                            text: String,
                            title: String
                        }
                    }
                ]
            }
        ]
    }
}));

module.exports = Settings;