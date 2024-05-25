const serverInfo = {
    server: "Node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const currencyInfo = require('../json/currencies.json');

const getCurrency = (request, response) => {
    response.send("<h1>Welcome to Node-express server</h1>")
}

const getCurrencies = (request, response) => {
    response.status(200).json(currencyInfo.data);
}

const getCurrencyServer = (request, response) => {
    response.status(200).json({...serverInfo, server: "Node-epress server"});
}

const getCurrencyById = (request, response) => {
    const {id} = request.params;
    return response.status(200).json(currencyInfo.data.find(x => x.id?.toLowerCase() === id?.toLowerCase()));
}

const getCurrencyByMinsize = (request, response) => {
    const {minSize} = request.query;
    return response.status(302).json(currencyInfo.data.filter(x => Number(x.min_size) == Number(minSize)));
}

const postCurrency = (request, response) => {
    currencyInfo.data = [request.body,...currencyInfo.data]
    return response.status(201).json(currencyInfo.data);
}


module.exports = {getCurrencies, getCurrency, getCurrencyById, getCurrencyServer, postCurrency, getCurrencyByMinsize}