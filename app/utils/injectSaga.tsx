import * as React from 'react';
import * as hoistNonReactStatics from 'hoist-non-react-statics';

import { EnhancedStore } from 'types/index';
import { MODE } from './constants';

import getInjectors from './sagaInjectors';

interface SagaInjectOptions {
  key: string
  saga: any
  mode?: MODE
}

interface InjectSagaContext {
  store: EnhancedStore
}

export default function injectSaga({ key, saga, mode }: SagaInjectOptions) {
  return (WrappedComponent: React.ComponentType) => {
    class InjectSaga extends React.Component<any, any> {
      static WrappedComponent = WrappedComponent;

      static displayName = `withSaga(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

      context: InjectSagaContext;

      injectors = getInjectors(this.context.store);

      componentWillMount() {
        const { injectSaga } = this.injectors;

        injectSaga(key, { saga, mode }, this.props);
      }

      componentWillUnmount() {
        const { ejectSaga } = this.injectors;

        ejectSaga(key);
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        );
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  }
}
