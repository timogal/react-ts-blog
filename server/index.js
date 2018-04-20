const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const setup = require('./middlewares/addDevMiddlewars');
  setup(app);
}

app.listen(8080, function (err) {
  if (err) {
    return console.error(err);
  }
  console.error('Server Started!');
});
