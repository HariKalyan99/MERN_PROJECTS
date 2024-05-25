const PASSWORD = process.env.ROUTE_PASSWORD

const verifyAuth = (request, response, next) => {
    const {authorization} = request.headers;

    if(!authorization || authorization !== PASSWORD){
        return response.status(403).json({message: "Unauthorized access"})
    }

    next();
}

module.exports = verifyAuth;