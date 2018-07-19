declare module 'babel-polyfill' {
}

declare module '*.scss' {
  const content: any;

  export default content;
}

declare module 'classnames' {
  export default function (...args: any[]): string;
}

declare module '*.png' {
  const pngPath: string;

  export default pngPath;
}
