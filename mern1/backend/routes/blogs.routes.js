const { getBlogsPage, postBlogs } = require('../controllers/blogs.controllers');

const blogsRouter = require('express').Router();

blogsRouter.get("/blog", getBlogsPage)
blogsRouter.post("/blog/new", postBlogs)

module.exports = blogsRouter