import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as express from 'express';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../build/webpack.config';

function createWebpackMiddleware(compiler: webpack.Compiler, publicPath: string) {
  return webpackDevMiddleware(compiler, {
    publicPath,
    stats: {
      errors: true,
      errorDetails: true
    },
  });
}

function setup(app: express.Application) {
  const compiler = webpack(webpackConfig);

  compiler.hooks.emit.tap('html-emit', function (compilation) {
    const assets = compilation.assets;

    let file;
    let data;

    Object.keys(assets).forEach((key) => {
      if (key.match(/\.html$/)) {
        file = path.resolve(process.cwd(), key);
        data = assets[key].source();
        fs.writeFileSync(file, data);
      }
    });
  });

  const middleware = createWebpackMiddleware(compiler,
    (webpackConfig.output && webpackConfig.output.publicPath) || '/');

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (request, response) => {
    fs.readFile(path.join(process.cwd(), 'server/template/index.html'), {}, (err: Error, file: any) => {
      if (err) {
        response.sendStatus(404);
      } else {
        response.send(file.toString());
      }
    });
  });
}

export default setup;
