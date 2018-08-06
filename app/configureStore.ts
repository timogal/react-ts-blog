import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';
import {
  applyMiddleware,
  compose,
  createStore,
  Store,
} from 'redux';

import reducers from './reducers';

const composeEnhancer = process.env.NODE_ENV !== 'production'
&& typeof window === 'object'
&& (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Prevent recomputing reducers for `replaceReducer`
    shouldHotReload: false,
  })
  : compose;

export default function configureStore(initialState: any = {}, history: History): Store {
  return createStore(
    connectRouter(history)(reducers),
    fromJS(initialState),
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  );
}
