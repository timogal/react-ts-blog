import * as _ from 'lodash';
import * as invariant from 'invariant';

import { isProd } from './env';
import { EnhancedStore } from 'types/index';

import { DAEMON, MODE, RESTART_ON_REMOUNT } from './constants';

interface Descriptor {
  saga: () => any
  mode?: MODE
}

const checkKey = (key: any) => {
  invariant(
    _.isString(key) && !_.isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string'
  )
};


export function injectSagaFactory(store: EnhancedStore) {
  return function injectSaga(key: string, descriptor: Descriptor, ...args: any[]) {
    checkKey(key);

    const { saga, mode = RESTART_ON_REMOUNT } = descriptor;

    let hasSaga: boolean = Reflect.has(store.injectedSagas, key);

    if (!isProd) {
      const oldDescriptor = store.injectedSagas[key];

      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga
      || (hasSaga && mode === RESTART_ON_REMOUNT)) {
      store.injectedSagas[key] = {
        saga,
        mode,
        task: store.runSaga(saga, args)
      }
    }
  }
}

export function ejectSagaFactory(store: EnhancedStore) {
  return function (key: string) {
    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (isProd) {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  }
}

export default function getInjectors(store: EnhancedStore) {
  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store)
  };
}







