import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import * as  Loadable from 'react-loadable';
import 'babel-polyfill';

import App from './containers/App';
import configureStore from './configureStore';

const history = createBrowserHistory();

const store = configureStore({}, history);

Loadable.preloadReady().then(() => {
  ReactDOM.render(
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
