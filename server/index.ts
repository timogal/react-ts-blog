import * as express from 'express';
import * as path from 'path';

import * as Loadable from 'react-loadable';

import './middlewares/addAssetHooks.js';
import setup from './middlewares/frontendMiddleware';

import clientRoute from './routes/client';

import * as ejs from 'ejs';

const app = express();

setup(app);

// html 模板解析器
// @ts-ignore
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.set('views', path.join(process.cwd(), 'server/template'));

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
