import * as express from 'express';
import * as path from "path";

import setupDev from './addDevMiddlewars';

function setup(app: express.Application) {
  if (process.env.NODE_ENV === 'development') {
    setupDev(app);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
  }

  /*app.get('*', (request, response) => {
    fs.readFile(path.join(process.cwd(), 'server/template/index.html'), {}, (err: Error, file: any) => {
      if (err) {
        response.sendStatus(404);
      } else {
        response.send(file.toString());
      }
    });
  });*/
}

export default setup;
