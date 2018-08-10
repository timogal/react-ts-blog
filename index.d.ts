declare module 'babel-polyfill' {
}

declare module '*.scss' {
  const content: any;

  export = content;
}

declare module 'connected-react-router/immutable' {
  import * as React from 'react';

  export const LOCATION_CHANGE: string;
  export const CALL_HISTORY_METHOD: string;

  export function connectRouter(history: any): any;

  export function routerMiddleware(history: any): any;

  export class ConnectedRouter extends React.Component<any> {

  }
}

declare module 'classnames' {
  const cx: (...args: any[]) => string;
  export = cx;
}

declare module 'invariant' {
  interface Invariant {
    (condition: boolean, format?: string, ...args: any[]): void;
  }

  const invariant: Invariant;
  export = invariant;
}

declare module 'hoist-non-react-statics' {
  import * as React from 'react';

  interface HoistNonReactStatics {
    <P>(
      targetComponent: React.ComponentType<P>,
      sourceComponent: React.ComponentType<any>,
      blacklist?: { [K: string]: any }
    ): React.ComponentType<P>
  }

  const hoistNonReactStatics: HoistNonReactStatics;

  export = hoistNonReactStatics;
}

declare module '*.png' {
  const pngPath: string;

  export = pngPath;
}
