const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        default: 2023,
    },
    medium: {
        type: String,
        default: 'Unknown'
    },
    url: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },
    emotion: {
        type: String,
        required: true,
    },
    submitted_by: {
        type: String,
        required: true,
    },
});

const art = mongoose.model('art', artSchema);

module.exports = art;