const { getUser, getUserServer, getUserData, getUserDataByUuid, getData } = require('../controllers/users.controllers');
const validateSearchQuery = require('../middlewares/users.middlewares');

const userRouter = require('express').Router();


userRouter.get("/", getUser)
userRouter.get("/server", getUserServer)
userRouter.get("/users", getUserData)
userRouter.get("/users/search",validateSearchQuery,  getData)
userRouter.get("/users/:uuid", getUserDataByUuid)


module.exports = userRouter;

