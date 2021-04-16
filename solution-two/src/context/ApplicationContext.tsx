import React, { useCallback, useMemo, useContext } from 'react';

import { httpClient } from '@api/httpClient';
import { IHttpClientRequestParams } from '@api/httpClient';
import { noop } from '@utils/noop';
import { getApiUrl } from '@utils/getApiUrl';

export interface IApplicationContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callHttpClient: (params: IHttpClientRequestParams) => any;
}

const defaultContextValue: IApplicationContext = {
  callHttpClient: noop,
};

export const ApplicationContext = React.createContext<IApplicationContext>(defaultContextValue);

export const ApplicationContextProvider: React.FC = ({ children }) => {
  const callHttpClient = useCallback(
    ({ method, url, data, params, customHeaders }: IHttpClientRequestParams) => {
      return httpClient({ method, url, data, params, baseApiUrl: getApiUrl(), customHeaders });
    },
    [getApiUrl],
  );

  const contextReturnValue = useMemo(() => {
    return {
      callHttpClient,
    };
  }, [callHttpClient]);

  return <ApplicationContext.Provider value={contextReturnValue}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext(ApplicationContext);
