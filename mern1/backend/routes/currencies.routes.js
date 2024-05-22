const { getCurrencies, getCurrenciesServer, getCurrenciesData, getCurrenciesDataById } = require('../controllers/currencies.controllers');

const currenciesRouter = require('express').Router();



currenciesRouter.get("/", getCurrencies)

currenciesRouter.get("/server", getCurrenciesServer)

currenciesRouter.get("/currencies", getCurrenciesData)

currenciesRouter.get("/currencies/:id", getCurrenciesDataById)


module.exports = currenciesRouter;
