const Joi = require('joi');


const authorValidationSchema = Joi.object().keys({
    fullName: Joi.string().default("").max(50),
    userName: Joi.string().required().max(25),
    email: Joi.string().required().email({tlds: {allow: false}}),
    password: Joi.string().required()
})


const authorLoginSchema = Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required()
})




module.exports = {authorValidationSchema, authorLoginSchema};