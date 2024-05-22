const currenciesInfo = require('../currencies.json')
const serverInfo = {
    server: "node-http server",
    date: new Date().toDateString(),
    time: new Date().toTimeString()
}
const getCurrencies = (request,response) => {
    response.send("<h1>Hello from node-express server</h1>")
}

const getCurrenciesServer =  (request,response) => {
    response.status(200).json({...serverInfo, server: "node-express server for currencies"})
}

const getCurrenciesData = (request, response) => {
    response.status(200).json(currenciesInfo)
}

const getCurrenciesDataById =  (request, response) => {
    response.status(200).json(currenciesInfo.data.find(x => x.id?.toLowerCase() === request.params.id?.toLowerCase()))
}
module.exports = {getCurrencies, getCurrenciesServer, getCurrenciesData, getCurrenciesDataById};
