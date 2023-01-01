const express = require('express');
const app = express();
const routers = require('./routes');

app.use('/', routers);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
