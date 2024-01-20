const mongoose = require("mongoose");
const gitRepo = require("./gitRepo");
const { v4 } = require("uuid");

const Project = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    AddedGitRepo: [gitRepo],
    timeline: {
        type: Date,
        default: ""
    },
    color: {
        type: String,
        default: ''
    },
    collaborators: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        }
    ],
    invite: { type: [String] },
    inviteCode: {
        type: String,
        default: v4
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    validate: {
        validator: async function () {
            // Check if created_by user's ID is in collaborators array
            const createdByUserId = this.created_by.toString();
            const hasCreatedByUser = this.collaborators.some(collaborator => collaborator.userId.toString() === createdByUserId);

            return !hasCreatedByUser; // Return true if the validation passes
        },
        message: "The created_by user cannot be in the collaborators array."
    }
});

module.exports = mongoose.model("Project", Project);
