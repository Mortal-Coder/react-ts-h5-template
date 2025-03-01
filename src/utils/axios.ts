/* 封装axios */

import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig,
} from 'axios';
import NProgress from './progress';
import { Toast } from 'antd-mobile';
import { ContentTypeEnum, ResultEnum } from '@/constant/httpEnum';

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    'Content-Type': ContentTypeEnum.FORM_URLENCODED,
  },
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {},
};

class Http {
  // 当前实例
  private static axiosInstance: AxiosInstance;
  // 请求配置
  private static axiosConfigDefault: AxiosRequestConfig;

  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      (config) => {
        NProgress.start();
        // 发送请求前，可在此携带 token
        // if (token) {
        //   config.headers['token'] = token
        // }
        return config;
      },
      (error: AxiosError) => {
        Toast.show({
          content: error.message,
          icon: 'fail',
        });
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        // 与后端协定的返回字段
        const { code, message, data } = response.data;
        // 判断请求是否成功
        const isSuccess =
          data !== undefined &&
          Reflect.has(response.data, 'code') &&
          code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return data;
        } else {
          // 处理请求错误
          Toast.show({
            content: message || '请求失败',
            icon: 'fail',
          });
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // 处理 HTTP 网络错误
        let message = '';
        // HTTP 状态码
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = '请求错误';
            break;
          case 401:
            message = '未授权，请登录';
            break;
          case 403:
            message = '拒绝访问';
            break;
          case 404:
            message = `请求地址出错: ${error.response?.config?.url}`;
            break;
          case 408:
            message = '请求超时';
            break;
          case 500:
            message = '服务器内部错误';
            break;
          case 501:
            message = '服务未实现';
            break;
          case 502:
            message = '网关错误';
            break;
          case 503:
            message = '服务不可用';
            break;
          case 504:
            message = '网关超时';
            break;
          case 505:
            message = 'HTTP版本不受支持';
            break;
          default:
            message = '网络连接故障';
        }

        Toast.show({
          content: message,
          icon: 'fail',
        });
        return Promise.reject(error);
      },
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // 通用请求函数
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request<unknown, T>(config)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // 便捷请求方法
  public get<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
      ...config,
    });
  }

  public post<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  public put<T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }

  public delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, params, ...config });
  }
}

export const http = new Http(configDefault);
