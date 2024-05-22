const mongoose = require('mongoose');


const blogsSchema = new mongoose.Schema({
    userId: {type: Number, unique: true, maxlength: 50},
    title: {type: String, maxlength: 100},
    body: {type: String, maxlength: 200},
    tags: {type: [String]},
    reactions: {type: Number}
})

const BlogsModel = new mongoose.model("Blogs", blogsSchema, "blog");

module.exports = BlogsModel;