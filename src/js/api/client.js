import axios from 'axios';

import { API_URL } from '../const/api-url';

const client = axios.create({
  baseURL: API_URL,
});

export default client;
