const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        default: 'unknown (probably an error)'
    },
    year: {
        type: String,
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
    thumbnailURL: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0,
    },
    emotion: {
        type: String,
        default: 'Happy'
    },
    submitted_by: {
        type: String,
        required: true,
    },
});



const art = mongoose.model('art', artSchema);

module.exports = art;