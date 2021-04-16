import axios, { AxiosPromise, Method } from 'axios';

import { formatUrl } from '@utils/formatUrl';

import { TIMEOUT } from './model/constants';

export type HttpClientType = (params: IHttpClientRequestParams) => AxiosPromise<any>;

export interface IHttpClientRequestParams {
  method: Method;
  url: string;
  data?: { [fieldName: string]: any };
  params?: { [fieldName: string]: any };
  timeout?: number;
  baseApiUrl?: string;
  customHeaders?: { [fieldName: string]: any };
}

export const httpClient: HttpClientType = ({
  method = 'get',
  url = '',
  data = {},
  params = {},
  baseApiUrl = '',
  timeout = TIMEOUT,
  customHeaders = {},
}) => {
  const headers = { 'Content-Type': 'application/json', ...customHeaders };

  return axios({
    url: formatUrl(baseApiUrl, url),
    method,
    timeout,
    headers,
    params,
    data,
  });
};
