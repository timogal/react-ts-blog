declare module 'babel-polyfill' {
}

declare module '*.scss' {
  const content: any;

  export default content;
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
  export default function (...args: any[]): string;
}

declare module '*.png' {
  const pngPath: string;

  export default pngPath;
}
