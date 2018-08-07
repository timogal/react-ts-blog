import axios from 'axios';

import { API_BASE } from './env';

const Api = axios.create({
  baseURL: API_BASE,
});

export default Api;
