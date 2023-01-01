const express = require('express');
const app = express();
const routers = require('./routes');

app.use('/', routers);

module.exports = app;
