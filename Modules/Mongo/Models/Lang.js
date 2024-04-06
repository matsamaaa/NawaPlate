const mongoose = require('mongoose');
const Langs = require('../../../Configs/Langs');

const langModel = new mongoose.Schema({
    memberId: String,
    lang: {
        type: String,
        validate: {
            validator: function(value) {
                return Langs[value];
            },
            message: 'This language has not yet been translated'
        }
    }
})