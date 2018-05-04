declare module '*.scss' {
  const content: any;

  export = content;
}

declare module 'normalize.css' {
}

declare module 'babel-polyfill' {
}

declare module 'classnames' {
  type Param = undefined | string | number | string[] | {[K in string]: boolean};

  const cx: (first: Param, ...rest: Param[]) => string;

  export = cx;
}
