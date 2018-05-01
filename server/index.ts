import * as express from 'express';

import setup from './middlewares/frontendMiddleware';

const app = express();

setup(app);

const port: number = parseInt(process.env.PORT || '9000', 10);

app.listen(8080, function (err: Error) {
  if (err) {
    return console.error(err);
  }
  console.error('Server Started!');
});
