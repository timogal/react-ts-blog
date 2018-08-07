const isProd = process.env.NODE_ENV === 'production';

const API_BASE = isProd ? 'https://api.zhyui.com' : 'http://api.zhyui.com';
const IMAGE_BASE = isProd ? 'https://assets-cdn.zhyui.com' : 'http://bing-wallpaper.zhyui.com';

export {
  isProd,
  API_BASE,
  IMAGE_BASE,
};
