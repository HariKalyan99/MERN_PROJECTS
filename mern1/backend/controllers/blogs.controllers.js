const BlogsModel = require("../models/blogs.models")

const getBlogsPage = async(request, response) => {
    const result = await BlogsModel.find();
    return response.status(200).json(result);
}

const postBlogs = async(request, response) => {
    const Blogs = new BlogsModel({...request.body})
    const result = await Blogs.save();
    return response.status(200).json(result);
}

module.exports = {getBlogsPage, postBlogs} 