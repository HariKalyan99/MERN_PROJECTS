const PostsService = require('../service/posts.service');
const Posts = new PostsService();
const getPosts = async(request, response) => {

    const result = await Posts.read()  
        return response.status(200).json(result)
}

const getPostsById = async(request, response) => {
    const {id} = request.params;
    const result = await Posts.readId(id);
    return response.status(200).json(result);
}

const addPosts = async(request, response) => {
    try{
    const result = await Posts.add({...request.body})  
    return response.status(201).json(result);
    }catch(error) {
        return response.status(400).json({message: error.message})
    }
}

const updatePosts = async(request, response) => {
    const {id} = request.params;
    const result = await Posts.update(id, {...request.body})
    return response.status(201).json(result);
}

const deletePosts = async(request, response) => {
        const {id} = request.params;
        const result = await Posts.delete(id)
        return response.status(302).json(result);
}

const searchPosts = async(request, response) => {
    const {title} = request.query;
    const result = await Posts.search(title);
    return response.status(200).json(result);
}

module.exports = {getPosts, addPosts, updatePosts, deletePosts, searchPosts, getPostsById};