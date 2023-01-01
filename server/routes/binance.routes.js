const express = require('express');
const dayjs = require('dayjs');
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

router.get('/history/:symbol', async (req, res) => {
  try {
    const {
      interval = '1d',
      limit = 1000
    } = res.query || {};
    const { symbol } = req.params;
    const data = await Binance.getKLines({ symbol, interval, limit });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});



module.exports = router;
