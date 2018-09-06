import axios from 'axios';

import { API_BASE, DAILY_SENTENCE_API } from './env';
import { canUseDOM } from './support';
import { toDateString } from './DateUtils';

interface SentenceCache {
  [K: string]: any
}

const sentenceCache: SentenceCache = {};

const Api = axios.create({
  baseURL: API_BASE,
});

export async function loadDailySentence() {
  const today = toDateString();
  const cached = sentenceCache[today];
  if (cached) {
    return cached;
  }
  // 判断是否为node环境
  const api = canUseDOM ? '/daily-sentence' : DAILY_SENTENCE_API;
  try {
    const { data } = await axios.get(api);
    let json;
    if (typeof  data === 'string') {
      json = JSON.parse(data);
    } else {
      json = data;
    }
    // 缓存
    sentenceCache[today] = json;
    return json;
  } catch (e) {
    return null;
  }
}

export default Api;
