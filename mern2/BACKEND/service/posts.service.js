const PostsModel = require("../models/posts.model")

class PostsService {
    read = async() => {
        const result = await PostsModel.find();
        return result;
    }
    readId = async(id) => {
        const result = await PostsModel.find({_id: id});
        return result;
    }

    add = async(body) => {
        const Posts = new PostsModel({...body});
        const result = await Posts.save();
        return result;
    }

    update = async(id, body) => {
        const result = await PostsModel.findOneAndUpdate({_id: id}, {...body}, {new: true});
        return result;
    }

    delete = async(id) => {
        const result = await PostsModel.findOneAndDelete({_id: id});
        return result;
    }

    search = async(title) => {
        const result = await PostsModel.find({title: {$regex : new RegExp(title)}});
        return result;
    }


}


module.exports = PostsService;