import * as dateFormat from 'dateformat';

const defaultFormat: string = 'yyyy-mm-dd';

export function toDateString(time?: any): string {
  return format(time);
}

export function format(time?: any, format?: string): string {
  if (!format) {
    format = defaultFormat;
  }
  return dateFormat(time, format);
}
