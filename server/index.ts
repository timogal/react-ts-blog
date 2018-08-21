import * as express from 'express';

import * as Loadable from 'react-loadable';

import setup from './middlewares/frontendMiddleware';
import dailySentence from './routes/dailySentence';

import clientRoute from './routes/client';

const app = express();

setup(app);

// 每日一句接口
app.get('/daily-sentence', dailySentence);
// react route
app.use(clientRoute);

const port: number = parseInt(process.env.PORT || '9000', 10);

Loadable.preloadAll().then(() => {
  app.listen(port, function (err: Error) {
    if (err) {
      return console.error(err);
    }
    console.error(`Server Started at port ${port}!`);
  });
});
