const mongoose = require('mongoose');
const app = require('./app');

let server;
mongoose.connect(process.env.MONGO_CONNECT_URL, {}).then(() => {
  server = app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}`);
  });
});
