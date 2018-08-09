import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import * as  Loadable from 'react-loadable';
import 'babel-polyfill';

import 'assets/favicon.ico';
import 'assets/robots.txt';

import App from './containers/App';
import configureStore from './configureStore';

const history = createBrowserHistory();

const initialState = (window as any).__INITIAL_STATE__;

const store = configureStore(initialState, history);

Loadable.preloadReady().then(() => {
  ReactDOM.hydrate(
    (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    ),
    document.getElementById('root') as HTMLElement
  );
});
