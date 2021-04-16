import { useContext, useState, useCallback, useMemo } from 'react';
import { Method } from 'axios';

import { ApplicationContext } from '@context/ApplicationContext';

import { IHttpClientResponse, IRequestParam, IHeader } from './model/model';
import { useHttpClientAwaitable } from './useHttpClientAwaitable';

export const useHttpClientOnDemand = <T, P>(
  method: Method,
  url: string,
  customHeaders?: IHeader[],
): IHttpClientResponse<T, P> => {
  const { callHttpClient } = useContext(ApplicationContext);

  const [response, setRequestResponse] = useState<T | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { request: awaitableRequest } = useHttpClientAwaitable<T, P>(callHttpClient, method, url, customHeaders);

  const request = useCallback(
    async (params?: IRequestParam<P>) => {
      setLoading(true);
      setErrorMessage(null);
      setError(null);

      const requestResponse = await awaitableRequest(params);

      if (requestResponse.status !== 200) {
        setErrorMessage(requestResponse.statusText);
        setError(requestResponse.error || null);
      }

      setRequestResponse(requestResponse.data);

      setLoading(false);
    },
    [awaitableRequest],
  );

  return useMemo(() => {
    return { loading, errorMessage, error, response, request };
  }, [loading, errorMessage, response, error, request]);
};
