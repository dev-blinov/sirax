const express = require('express');
const router = express.Router();
const Binance = require('../services/Binance');

router.get('/account', async (req, res) => {
  try {
    const data = await Binance.getAccount();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

router.get('/exchange-info', async (req, res) => {
  try {
    const data = await Binance.getExchangeInfo();
    res.json(data);
  } catch (err) {
    console.error(err.response);
  }
});

router.get('/klines', async (req, res) => {
  try {
    const { symbol, startTime, endTime, limit = 1000 } = res.query;
    const data = await Binance.getKLines({ symbol, startTime, endTime, limit });
    res.json(data);
  } catch (err) {
    console.error(err.response);
  }
});



module.exports = router;
