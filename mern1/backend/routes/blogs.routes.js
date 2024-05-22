const { getBlogsPage, postBlogs,getBlogById, updateBlogs, deletBlogs, searchBlogs } = require('../controllers/blogs.controllers');

const blogsRouter = require('express').Router();

blogsRouter.get("/blog", getBlogsPage);
blogsRouter.get("/blog/search", searchBlogs)
blogsRouter.get("/blog/:id", getBlogById);
blogsRouter.post("/blog/new", postBlogs);
blogsRouter.put("/blog/:id", updateBlogs);
blogsRouter.delete("/blog/:id", deletBlogs)

module.exports = blogsRouter