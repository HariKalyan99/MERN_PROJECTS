const Joi = require('joi');


const currencySchema = Joi.object().keys({
    minSize: Joi.number().min(0).max(1),
})

const validSearchQueryMinSize = (minSize) => {
    const {error} = currencySchema.validate({
        minSize
    })

    if(error){
        return error;
    }

}

module.exports = validSearchQueryMinSize;