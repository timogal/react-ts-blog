import * as express from 'express';

import setup from './middlewares/addDevMiddlewars';

const app = express();

if (process.env.NODE_ENV === 'development') {
  setup(app);
}

app.listen(8080, function (err: Error) {
  if (err) {
    return console.error(err);
  }
  console.error('Server Started!');
});
