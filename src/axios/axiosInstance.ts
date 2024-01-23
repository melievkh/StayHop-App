import axios, { InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SecureStorageKey } from 'src/constants/storage';

import { silentTokenRefresh } from './api';
import ENDPOINTS from './endpoints';
import { store } from '../store';
import { accountActions } from '../store/slices/accountSlice';

const BASE_URL = 'http://192.168.43.83:3000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

const endpointsWithoutToken = [ENDPOINTS.signin, ENDPOINTS.signup];

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await SecureStore.getItemAsync(SecureStorageKey.ACCESS_TOKEN);

    if (config.url && accessToken && !endpointsWithoutToken.includes(config.url)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    const userId = await SecureStore.getItemAsync(SecureStorageKey.USER_ID);

    const { data } = response;

    if (!userId) return;

    if (config.url === ENDPOINTS.refresh(userId) && data?.error?.statusCode === 401) {
      await SecureStore.deleteItemAsync(SecureStorageKey.REFRESH_TOKEN);
      store.dispatch(accountActions.reset());

      return;
    }

    if (data?.error?.statusCode === 401 && !config.url.includes(ENDPOINTS.refresh(userId))) {
      if (!config.retry) {
        config.retry = true;

        try {
          await silentTokenRefresh(axiosInstance);
          config.retry = false;
          return axiosInstance(config);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
