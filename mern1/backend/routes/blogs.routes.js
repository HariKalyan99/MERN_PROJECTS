const { getBlogsPage } = require('../controllers/blogs.controllers');

const blogsRouter = require('express').Router();

blogsRouter.get("/", getBlogsPage)


module.exports = blogsRouter