const mongoose = require('mongoose');

const Documentation = new mongoose.Schema({
    docID: {
        type: String,
        require: true
    }
    ,
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shared_with: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    published: {
        type: Boolean,
        default: false
    },
    group: {
        name: { type: String, default: 'main' },
        color: { type: String, default: '#1565cf' }
    },
    document_title: {
        type: String,
    },
    document: {
        type: String
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Documentation', Documentation);
