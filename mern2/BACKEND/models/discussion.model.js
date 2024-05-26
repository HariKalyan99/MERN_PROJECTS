const mongoose = require('mongoose')


const discussionSchema = new mongoose.Schema({
    title: {type: String, required: true, maxlength: 50, default: ""},
    content: {type: String, maxlength: 300, default: ""},
    author: {type: String},
    userId: {type: Number, default: 0},
    comments: {type: [String]}
}, {timestamps: true})


const DiscussionModel = new mongoose.model("Discussions", discussionSchema, "discussion");

module.exports = DiscussionModel;