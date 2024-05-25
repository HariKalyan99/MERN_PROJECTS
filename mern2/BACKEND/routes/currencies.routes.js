const { getCurrency, getCurrencyServer, getCurrencies, getCurrencyById, postCurrency, getCurrencyByMinsize } = require('../controllers/currency.controllers');
const searchQueryMinSize = require('../middlewares/currency.middlewares');

const currencyRouter = require('express').Router();


currencyRouter.get("/", getCurrency);
currencyRouter.get("/server", getCurrencyServer);
currencyRouter.get("/currencies", getCurrencies);
currencyRouter.get("/currency/search", searchQueryMinSize, getCurrencyByMinsize)
currencyRouter.post("/currencies/new", postCurrency);
currencyRouter.get("/currencies/:id", getCurrencyById)


module.exports = currencyRouter;