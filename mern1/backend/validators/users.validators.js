const Joi = require('joi');

const userJoiSchema = Joi.object().keys({
    gender: Joi.string().valid('male', 'female'),
    age: Joi.number().integer().min(0).max(100),
}).or('gender', 'age');


const searchQueryValidator = ({gender, age}) => {
    const {error}  = userJoiSchema.validate({
        gender, age
    })

    if(error){
        return error;
    }
}

module.exports = searchQueryValidator;