import axios, { Method } from 'axios';

import { getApiUrl } from '@utils/getApiUrl';

interface IAxiosConfig {
  method: Method;
  url: string;
  data: { [fieldName: string]: any };
  params: { [fieldName: string]: any };
  timeout: number;
  headers: { [fieldName: string]: any };
}

interface IHttpClientParams extends IAxiosConfig {
  additionalHeaders: { [fieldName: string]: any };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const httpClient = ({
  method = 'get',
  url = '',
  data = {},
  params = {},
  timeout = 15000,
  additionalHeaders = {},
}: Partial<IHttpClientParams>) => {
  const apiUrl = getApiUrl();
  const headers = { 'Content-Type': 'application/json', ...additionalHeaders };

  const config: IAxiosConfig = {
    url: `${apiUrl}/${url}`,
    method,
    timeout,
    headers,
    params,
    data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((e) => {
      // Provisional API error logging
      // Should be handled by some tool as sentry
      e.code = getRandomInt(1000000000);

      console.error(e);

      throw e;
    });
};
