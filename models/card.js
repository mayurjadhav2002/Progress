const mongoose = require("mongoose");
const { v4 } = require('uuid');

const card = new mongoose.Schema({
    id: {
        type: String,
        default: v4
    },
    title:{
        type: String
    },
    bid: {
        type: String,
       
    },
    task: [{
        type: String,
        required: true
    }],
    
    index:{
        type: Number,
        
    },
    tags: [
        {
            tagName: { type: String },
            color: { type: String }
        }
    ],
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String,  // Corrected from "Type" to "type"
        default: ""
    },
    addedRepo: {
        type: String,  // Corrected from "Type" to "type"
    },
    documentation: {
        type: mongoose.Schema.Types.ObjectId
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_avatar: {
        type: String
    },
    priority: {
        type: String,
        default: "low"
    },
    deadline: {
        type: String,
        required: false
    },
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userAvatar: { type: String },
        userComment: { type: String, default: "" }
    }]
});

module.exports = card;
