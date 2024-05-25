const { getUser, getUserServer, getUsers, getUserByUuid, getUserByGenderAge } = require('../controllers/users.controllers');
const searchQueryGenderAge = require('../middlewares/users.middlewares');


const userRouter = require('express').Router();


userRouter.get("/", getUser);
userRouter.get("/server", getUserServer);
userRouter.get("/users", getUsers);
userRouter.get("/users/search", searchQueryGenderAge, getUserByGenderAge)
userRouter.get("/users/:uuid", getUserByUuid);

module.exports = userRouter;
