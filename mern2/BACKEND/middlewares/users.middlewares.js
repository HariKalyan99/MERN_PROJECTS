const validSearchQueryGenderAge = require("../validators/users.validators");

const searchQueryGenderAge = (request, response, next) => {
    const {gender, age} = request.query;

    const error = validSearchQueryGenderAge({
        gender, age
    })

    if(error){
        return response.status(422).json({message: error});
    }

    next();
}

module.exports = searchQueryGenderAge;