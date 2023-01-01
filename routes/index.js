const express = require('express');
const router = express.Router();
const binance = require('./binance.routes');

router.use('/binance', binance);

module.exports = router;
