const Blogs = require('../models/blogs.models');


class BlogServices {
    getBlog = async() => {
        const result = await Blogs.find();
        return result;
    }

    getBlogsById = async(id) => {
        const result = await Blogs.findOne({_id: id});
        return result;
    }

    post = async(body) => {
        const Blog = new Blogs({...body})
        const result = await Blog.save();
        return result;
    }

    update = async(id, body) => {
        const result = await Blogs.findOneAndUpdate({_id: id}, {...body}, {new: true});
        return result;
    }
    
    delete = async(id) => {
        const result = await Blogs.findOneAndDelete({_id: id});
        return result;
    }


    search = async(title) => {
        const result = await Blogs.find({title: {$regex: new RegExp(title)}});
        return result;
    }
}

module.exports = BlogServices;