const PASSWORD = process.env.ROUTER_PASSWORD;

const verifyAuhorization = (request, response, next) => {
    const {authorization} = request.headers;
    if(!authorization || authorization !== PASSWORD){
        return response.status(403).json({message: "Unauthorized access"})
    }
    next();
}

module.exports = verifyAuhorization;