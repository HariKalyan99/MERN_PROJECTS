const Joi = require('joi');

const userSchema = Joi.object().keys({
    gender: Joi.string().valid('male', 'female'),
    age: Joi.number().integer().min(0).max(100)
}).or('gender', 'age');

const validSearchQueryGenderAge = ({gender, age}) => {
    const {error} = userSchema.validate({
        gender, age
    }) 

    if(error){
        return error;
    }

}

module.exports = validSearchQueryGenderAge;