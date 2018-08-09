import { IMAGE_BASE } from './env';

export default function resolveImage(url: string): string {
  if (!url) {
    return '-';
  }
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    return url;
  }
  if (url.indexOf('/') !== 0) {
    url = '/' + url;
  }
  return `${IMAGE_BASE}${url}`;
}
