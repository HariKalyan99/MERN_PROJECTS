const BlogServices = require('../service/blogs.services');
const Blogs = new BlogServices();


const getBlogsPage = async(request, response) => {
    const result = await Blogs.getBlog();
    return response.status(200).json(result);
}

const getBlogById = async(request, response) => {
    const result = await Blogs.getBlogsById(request.params.id);
    return response.status(200).json(result);
}

const postBlogs = async(request, response) => {
    const result = await Blogs.post({...request.body})
    return response.status(200).json(result);
}

const updateBlogs = async(request, response) => {
    const {id} = request.params;
    const result = await Blogs.update(id, request.body);
    return response.status(200).json(result); 
}

const deletBlogs = async(request, response) => {
    const {id} = request.params;
    const result = await Blogs.delete(id);
    return response.status(200).json(result);
}

const searchBlogs = async(request, response) => {
    const {title} = request.query;
    const result = await Blogs.search(title);
    return response.status(200).json(result);
}

module.exports = {getBlogsPage, postBlogs, getBlogById, updateBlogs, deletBlogs, searchBlogs} 