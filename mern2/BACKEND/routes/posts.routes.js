const { getPosts, addPosts, updatePosts, deletePosts, searchPosts, getPostsById } = require('../controllers/posts.controllers');

const postRouter = require('express').Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/search", searchPosts)
postRouter.post("/posts/new", addPosts)
postRouter.get("/posts/:id", getPostsById)
postRouter.delete("/posts/:id", deletePosts)
postRouter.put("/posts/:id", updatePosts);


module.exports = postRouter;