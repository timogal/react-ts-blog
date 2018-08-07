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

declare module '*.png' {
  const pngPath: string;

  export = pngPath;
}
