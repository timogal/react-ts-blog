import * as express from 'express';
import * as path from "path";
import * as ejs from 'ejs';

import setupDev from './addDevMiddlewars';
import addAssetHooks from './addAssetHooks';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  require('module-alias/register');
  addAssetHooks();
}

function setup(app: express.Application) {
  // html 模板解析器
  // @ts-ignore
  app.engine('.html', ejs.__express);
  app.set('view engine', 'html');
  if (isDev) {
    app.set('views', path.join(process.cwd(), 'server/template'));
    setupDev(app);
  } else {
    app.set('views', path.join(process.cwd(), 'dist/template'));
    app.use(express.static(path.join(process.cwd(), 'dist/client')));
  }
}

export default setup;
