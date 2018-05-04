import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import * as  Loadable from 'react-loadable';
import 'babel-polyfill';

import App from './containers/App';

const history = createBrowserHistory();

Loadable.preloadReady().then(() => {
  ReactDOM.render(
    (
      <Router history={history}>
        <App />
      </Router>
    ),
    document.getElementById('root') as HTMLElement
  );
});
