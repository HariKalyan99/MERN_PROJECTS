const { postAuthSignup, postAuthLogin, postNewDisussion } = require('../controllers/auth.controllers');
const { fetchUserInCollection } = require('../middlewares/userdiscussion.middleware');
const {validateSchema, validateLoginSchema} = require('../middlewares/validateAuth.middleware');
const {authorValidationSchema, authorLoginSchema} = require('../validators/auth.validators');
const { discussionValidationSchema } = require('../validators/discussion.validator');
const passport = require('passport');

const signUpRouter = require('express').Router();

const validateUser = validateSchema(authorValidationSchema)
const validateLogin = validateLoginSchema(authorLoginSchema) 

const validateDiscussion = validateSchema(discussionValidationSchema);
const authenticate = passport.authenticate("jwt", {session: false});

signUpRouter.post("/signup",validateUser, postAuthSignup);
signUpRouter.post("/login",validateLogin, postAuthLogin);
signUpRouter.post("/discussion/new", authenticate, fetchUserInCollection,validateDiscussion,  postNewDisussion)

module.exports = signUpRouter;