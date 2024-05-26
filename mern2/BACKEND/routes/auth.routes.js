const { postAuthSignup, postAuthLogin } = require('../controllers/auth.controllers');
const {validateSchema, validateLoginSchema} = require('../middlewares/validateAuth.middleware');
const {authorValidationSchema, authorLoginSchema} = require('../validators/auth.validators');

const signUpRouter = require('express').Router();

const validateUser = validateSchema(authorValidationSchema)
const validateLogin = validateLoginSchema(authorLoginSchema) 


signUpRouter.post("/signup",validateUser, postAuthSignup);
signUpRouter.post("/login",validateLogin, postAuthLogin);

module.exports = signUpRouter;