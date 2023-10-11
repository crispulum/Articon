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
        default: 'unknown',
    },
    medium: {
        type: String,
        default: 'Unknown'
    },
    url: {
        type: String,
        default: 'Unknown'
    },
    thumbnailURL: {
        type: String,
        default: 'Unknown'
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