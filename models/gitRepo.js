const mongoose = require("mongoose")

const gitRepo= mongoose.Schema({
    name:{
        type:String
    },
// Add html_for
    url:{
        type:String
    },
// languages URL
    languages:{
        type:String
    },
    description:{
        type:String,
        default: ""
    },
// homepage
    homePage:{
        type:String,
    },

    default_branch:{
        type:String
    }
})

module.exports = gitRepo