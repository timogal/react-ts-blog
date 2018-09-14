import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import * as express from 'express';
import { StaticRouter } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as qs from 'qs';

import configureStore from '../../app/configureStore';
import App from '../../app/containers/App';
import { IMAGE_BASE } from '../../app/utils/env';
import ssrRoutes from '../../app/ssrRoutes';

function isStaticPath(url: string): boolean {
  return /\.(ico|png|jpg|gif|woff|woff2|svg|ttf|eof|js|css|json|txt)$/.test(url);
}

async function clientRoute(
  request: express.Request, response: express.Response,
  next: express.NextFunction) {

  const url = request.path;
  if (isStaticPath(url)) {
    return next();
  }

  const search = qs.stringify(request.query);

  const initialState = {
    router: {
      location: {
        pathname: url,
        search: search ? `?${search}` : ''
      },
      action: 'POP'
    }
  };
  const history = createMemoryHistory();

  const store = configureStore(initialState, history);

  const tasks: any[] = [];

  ssrRoutes.forEach(route => {
    const match = matchPath(url, route);
    if (match && route.loadData) {
      tasks.push(route.loadData(store, match));
    }
  });

  try {
    await Promise.all(tasks);
  } catch (e) {
    console.warn('Process SSR failed:' + e.message);
  }

  const context = {};

  const html = renderToString((
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  ));

  const helmet = Helmet.renderStatic();

  response.render('index', {
    content: html,
    state: JSON.stringify(store.getState().toJS()),
    prefetch: IMAGE_BASE,
    helmet,
  });
}

export default clientRoute;
