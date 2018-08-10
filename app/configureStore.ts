import { History } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router/immutable';
import { fromJS } from 'immutable';
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import createSagaMiddleware from 'redux-saga';

import { EnhancedStore } from "types/index";

import reducers from './reducers';

const composeEnhancer = process.env.NODE_ENV !== 'production'
&& typeof window === 'object'
&& (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Prevent recomputing reducers for `replaceReducer`
    shouldHotReload: false,
  })
  : compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState: any = {}, history: History): EnhancedStore {
  const store = createStore(
    connectRouter(history)(reducers),
    fromJS(initialState),
    composeEnhancer(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
      )
    )
  );

  const enhancedStore = (store as EnhancedStore);

  // extensions
  enhancedStore.runSaga = sagaMiddleware.run;

  enhancedStore.injectedSagas = {};

  return enhancedStore;
}
