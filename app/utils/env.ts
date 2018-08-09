const isProd = process.env.NODE_ENV === 'production';

const API_BASE = isProd ? 'https://api.zhyui.com' : 'http://api.zhyui.com';
const IMAGE_BASE = isProd ? 'https://assets-cdn.zhyui.com' : 'http://bing-wallpaper.zhyui.com';
const SHARE_APP_KEY = '1af02d3c1a6f2';
const BASE_URL = 'https://www.zhyui.com';

export {
  isProd,
  API_BASE,
  IMAGE_BASE,
  SHARE_APP_KEY,
  BASE_URL,
};
