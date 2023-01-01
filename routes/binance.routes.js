const express = require('express');
const router = express.Router();
const binanceRoutes = require('../services/Binance');

router.get('/account', async (req, res) => {
  try {
    const data = (await binanceRoutes.getAccount()).data;
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/exchange-info', async (req, res) => {
  try {
    const data = (await binanceRoutes.getExchangeInfo()).data;
    res.json(data);
  } catch (err) {
    console.error(err.response);
  }
});


module.exports = router;
