const mongoose = require('mongoose');
const cards = require('./card');
const { v4 } = require('uuid');

const KanbanSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: ""
    },
    board: [
        {
            bid: {
                type: String,
                default: v4
            },
            id:{
                type: String,
                default: v4
            },
            boardName: {
                type: String,
            },
            card: [cards]
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Kanban', KanbanSchema);
