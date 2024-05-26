const Joi = require('joi');

const commentValidatonScema = Joi.object().keys({
    author: Joi.string().required(),
    content: Joi.string().required().max(500)
})

const discussionValidationSchema = Joi.object().keys({
    title: Joi.string().required().max(150),
    author: Joi.string().required(),
    content: Joi.string().default(""),
    comments: Joi.array().items(commentValidatonScema),
    userId: Joi.number().integer().min(1).max(1000).default(1)
})

module.exports = {discussionValidationSchema, commentValidatonScema}