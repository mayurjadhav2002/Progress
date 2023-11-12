const { Schema, default: mongoose } = require("mongoose");

const userProject = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        unique: true,
    },
    // Project Created by User
    project:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'Project' }
    ],
    // Project Shared with User
    shared_project:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'Project' }
    ]
})