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

declare module 'd3-cloud' {

  interface CloudStatic {
    (): Cloud<Word>;

    <T extends Word>(): Cloud<T>;
  }

  interface Word {
    text?: string;
    font?: string;
    style?: string;
    weight?: string | number;
    rotate?: number;
    size?: number;
    padding?: number;
    x?: number;
    y?: number;
  }

  interface Cloud<T extends Word> {
    start(): Cloud<T>;

    stop(): Cloud<T>;

    timeInterval(): number;

    timeInterval(interval: number): Cloud<T>;

    words(): T[];

    words(words: T[]): Cloud<T>;

    size(): [number, number];

    size(size: [number, number]): Cloud<T>;

    font(): (datum: T, index: number) => string;

    font(font: string): Cloud<T>;

    font(font: (datum: T, index: number) => string): Cloud<T>;

    fontStyle(): (datum: T, index: number) => string;

    fontStyle(style: string): Cloud<T>;

    fontStyle(style: (datum: T, index: number) => string): Cloud<T>;

    fontWeight(): (datum: T, index: number) => string | number;

    fontWeight(weight: string | number): Cloud<T>;

    fontWeight(weight: (datum: T, index: number) => string | number): Cloud<T>;

    rotate(): (datum: T, index: number) => number;

    rotate(rotate: number): Cloud<T>;

    rotate(rotate: (datum: T, index: number) => number): Cloud<T>;

    text(): (datum: T, index: number) => string;

    text(text: string): Cloud<T>;

    text(text: (datum: T, index: number) => string): Cloud<T>;

    spiral(): (size: number) => (t: number) => [number, number];

    spiral(name: string): Cloud<T>;

    spiral(spiral: (size: number) => (t: number) => [number, number]): Cloud<T>;

    fontSize(): (datum: T, index: number) => number;

    fontSize(size: number): Cloud<T>;

    fontSize(size: (datum: T, index: number) => number): Cloud<T>;

    padding(): (datum: T, index: number) => number;

    padding(padding: number): Cloud<T>;

    padding(padding: (datum: T, index: number) => number): Cloud<T>;

    canvas(canvas: () => HTMLElement): Cloud<T>;

    on(type: "word", listener: (word: T) => void): Cloud<T>;

    on(type: "end", listener: (tags: T[], bounds: { x: number; y: number }[]) => void): Cloud<T>;

    on(type: string, listener: (...args: any[]) => void): Cloud<T>;

    on(type: "word"): (word: T) => void;

    on(type: "end"): (tags: T[], bounds: { x: number; y: number }[]) => void;

    on(type: string): (...args: any[]) => void;
  }

  const cloud: CloudStatic;

  export = cloud;
}

declare module 'github-markdown-css' {
}

declare module '*.png' {
  const pngPath: string;

  export = pngPath;
}
