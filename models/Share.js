const mongoose = require("mongoose");
const { v4 } = require("uuid");

const Share = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sharing: {
        type: String,
        // Either "project" or "doc"
        required: true
    },
    unique_key: {
        type: String,
        default: v4,
    },
    shared_with: {
        type: String,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    shared_resource_id: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Add a new field for expiration date
Share.add({
    expiration_date: {
        type: Date,
        default: function () {
            // Calculate expiration date 3 days from the creation date
            return new Date(+this.createdAt + 3 * 24 * 60 * 60 * 1000);
        },
    },
});

// Create a virtual field to check if the share has expired
Share.virtual('expired').get(function () {
    return Date.now() > this.expiration_date.getTime();
});

module.exports = mongoose.model("Share", Share);
