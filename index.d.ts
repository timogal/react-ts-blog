declare module 'babel-polyfill' {
}

declare module '*.scss' {
  const content: any;

  export = content;
}

declare module 'connected-react-router/immutable' {
  import * as React from 'react';
  import { Path, LocationState, LocationDescriptorObject } from 'history';

  export function push(path: Path, state?: LocationState): RouterAction;
  export function push(location: LocationDescriptorObject): RouterAction;

  export function replace(path: Path, state?: LocationState): RouterAction;
  export function replace(location: LocationDescriptorObject): RouterAction;

  export function go(n: number): RouterAction

  export function goBack(): RouterAction

  export function goForward(): RouterAction

  export const LOCATION_CHANGE: '@@router/LOCATION_CHANGE';
  export const CALL_HISTORY_METHOD: string;

  export const routerActions: {
    push: typeof push
    replace: typeof replace
    go: typeof go
    goBack: typeof goBack
    goForward: typeof goForward
  };

  export interface LocationActionPayload {
    method: string;
    args?: any[];
  }

  export interface RouterAction {
    type: typeof CALL_HISTORY_METHOD;
    payload: LocationActionPayload;
  }

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

declare module 'lodash/isString' {
  interface LodashIsStringStatic {
    (value: any): value is string
  }

  const isString: LodashIsStringStatic;

  export = isString;
}

declare module 'lodash/isEmpty' {
  interface LodashIsEmptyStatic {
    (value: any): boolean
  }

  const isEmpty: LodashIsEmptyStatic;

  export = isEmpty;
}

declare module 'html2json' {
  export interface TextNode {
    node: 'text'
    text: string
  }

  export interface ElementNode {
    node: 'element'
    tag: string
    attr?: { [K: string]: string }
    child?: (ElementNode | TextNode)[]
  }

  export type HTMLNode = TextNode | ElementNode;

  export interface RootNode {
    node: 'root'
    child: HTMLNode[]
  }

  interface Html2jsonStatic {
    (html: string): RootNode
  }

  interface Json2htmlStatic {
    (node: RootNode): string
  }

  const html2json: Html2jsonStatic;
  const json2html: Json2htmlStatic;

  export { html2json, json2html }
}

declare module 'github-markdown-css' {
}

declare module 'react-motion-drawer' {
  import * as React from 'react';

  interface DrawerProps {
    zIndex?: number
    noTouchOpen?: boolean
    noTouchClose?: boolean
    onChange?: (open: boolean) => void
    drawerStyle?: object
    className?: any
    overlayClassName?: any
    /**
     * react-motion config
     */
    config?: any
    open?: boolean
    width?: number | string
    height?: number | string
    handleWidth?: number
    peakingWidth?: number
    panTolerance?: number
    right?: boolean
    overlayColor?: string
    fadeOut?: boolean
    offset?: number
  }

  export default class Drawer extends React.Component<DrawerProps> {
  }
}

declare module '*.png' {
  const pngPath: string;

  export = pngPath;
}
