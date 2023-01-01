const express = require('express');
const cors = require('cors');
const app = express();
const routers = require('./routes');


app.use(cors());

app.use('/', routers);

module.exports = app;
