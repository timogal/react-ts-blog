import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';
import * as express from 'express';
// @ts-ignore
import { ConnectedRouter } from 'connected-react-router/immutable';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import configureStore from '../../app/configureStore';
import App from '../../app/containers/App';
import ssrRoutes from '../../app/ssrRoutes';

function isStaticPath(url: string): boolean {
  return /\.(ico|png|jpg|gif|woff|woff2|svg|ttf|eof|js|css|json)$/.test(url);
}

async function clientRoute(
  request: express.Request, response: express.Response,
  next: express.NextFunction) {

  const url = request.path;
  if (isStaticPath(url)) {
    return next();
  }

  const initialState = {};
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
    return next(e);
  }

  const context = {};

  const html = renderToString((
    <Provider store={store}>
      <ConnectedRouter history={history} location={url} context={context}>
        <App />
      </ConnectedRouter>
    </Provider>
  ));

  const helmet = Helmet.renderStatic();

  response.render('index', {
    content: html,
    title: helmet.title ? helmet.title.toString() : '<title>心有猛虎，细嗅蔷薇</title>',
    meta: helmet.meta.toString(),
    state: JSON.stringify(store.getState().toJS())
  });
}

export default clientRoute;
