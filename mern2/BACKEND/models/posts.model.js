const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    userId: {type: Number, required: true, unique: true, maxlength: 10},
    title: {type: String, required: true, unique: true, maxlength: 100},
    body: {type: String, maxlength: 300},
    tags: [String],
    reactions: {type: Number, maxlength: 3}
}, {timestamps: true});

const postsModel = new mongoose.model("Posts", postsSchema, "post");

module.exports = postsModel;
