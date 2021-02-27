import Axios from 'axios';
import { getToken } from './auth';
import { backendUrl } from './constants';

const backend = Axios.create({
  baseURL: backendUrl
});

backend.interceptors.request.use(config => {
  if (process.env.NODE_ENV === 'development') {
    console.info('✉️ ', config.method?.toUpperCase() + ' ' + config.url);
  }
  config.headers = {
    Authorization: `Bearer ${getToken()}`
  };
  return config;
});

backend.interceptors.response.use(
  config => config,
  error => {
    return Promise.reject(error.response.data);
  }
);

export default backend;
