import { useCallback } from 'react';

import { AxiosResponse, Method } from 'axios';

import { formatUrl } from '@utils/formatUrl';

import {
  IHttpClientResponseAwaitable,
  IRequestParam,
  IHeader,
  IAxiosErrorMessage,
  ExtendedAxiosResponse,
} from './model/model';

import { HttpClientType } from '.';

export const useHttpClientAwaitable = <T, P>(
  callHttpClient: HttpClientType,
  method: Method,
  baseUrl: string,
  customHeaders?: IHeader[],
): IHttpClientResponseAwaitable<T, P> => {
  const request = useCallback(
    async (params: IRequestParam<P> = {}): Promise<ExtendedAxiosResponse<T> | IAxiosErrorMessage> => {
      const { data, query, url } = params;

      try {
        return await callHttpClient({
          method,
          url: url ? formatUrl(baseUrl, url) : baseUrl,
          data,
          params: query,
          customHeaders: customHeaders,
        });
      } catch (Error) {
        return Promise.resolve({
          statusText: Error.message,
          status: Error.response?.statusCode || 500,
          data: null,
          error: Error,
        });
      }
    },
    [callHttpClient, method, baseUrl, customHeaders],
  );

  return { request };
};
