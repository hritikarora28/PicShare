const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
