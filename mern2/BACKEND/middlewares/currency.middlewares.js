const validSearchQueryMinSize = require("../validators/currency.validators")

const searchQueryMinSize = (request, response, next) => {
    const {minSize} = request.query
    const error = validSearchQueryMinSize(minSize);

    if(error){
        return response.status(403).json({message: error});
    }

    next();
}

module.exports = searchQueryMinSize;