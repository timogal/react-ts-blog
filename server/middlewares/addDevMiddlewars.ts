import * as webpack from 'webpack';
import * as path from 'path';
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
  const middleware = createWebpackMiddleware(compiler, (webpackConfig.output && webpackConfig.output.publicPath) || '');

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const fs = middleware.fileSystem;

  app.get('*', (request, response) => {
    const publicPath: string = compiler.options.output ? (compiler.options.output.publicPath || '/') : '/';
    fs.readFile(path.join(publicPath, 'index.html'), {}, (err: Error, file: any) => {
      console.error(err);
      if (err) {
        response.sendStatus(404);
      } else {
        response.send(file.toString());
      }
    });
  });
}

export default setup;
