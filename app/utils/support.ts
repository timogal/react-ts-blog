const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  (window as any).document &&
  (window as any).document.createElement
);

function supportWebp(): boolean {
  if (!canUseDOM) {
    return false;
  }
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    // was able or not to get WebP representation
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  return false;
}

const webpSupported: boolean = supportWebp();

export {
  canUseDOM,
  webpSupported,
}
