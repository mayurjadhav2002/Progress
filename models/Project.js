const mongoose = require("mongoose")
const gitRepo = require("./gitRepo")

const Project = mongoose.Schema({
    created_by:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    AddedGitRepo: [gitRepo],
    timeline:{
        type: Date,
        default: ""
    },
    color: {
        type: String,
        default: ''
    }, 
    deleted: {
        type:Boolean,
        default:false
    }
},{timestamps: true})

module.exports = mongoose.model("Project", Project)