import { useCallback, useEffect, useMemo } from 'react';

import { useErrorContext } from '@context/ErrorContext';
import { ApiSectionNamespace, useHttpClientOnDemand, IHttpClientResponse } from '@api';

interface IEditUserApiParams {
  email: string;
  name: string;
  username: string;
}

interface IEditUserParams {
  id: number;
  email: string;
  name: string;
  username: string;
}

export const useEditUserOnDemand = (): IHttpClientResponse<{}, IEditUserParams> => {
  const { callLogger } = useErrorContext();
  const { loading, errorMessage, error, response, request } = useHttpClientOnDemand<{}, IEditUserApiParams>(
    'put',
    ApiSectionNamespace.EUsersApiKeys.USERS_URL,
  );

  useEffect(() => {
    if (!loading && errorMessage) {
      callLogger({ logMessage: `Unable to update User data. API Responded with: ${errorMessage}` });
    }
  }, [loading, errorMessage, response, callLogger]);

  const requestOnDemand = useCallback(
    async ({ data: { id, email, name, username } }) => {
      return await request({ data: { email, name, username }, url: `${id}` });
    },
    [request],
  );

  return useMemo(() => {
    return {
      loading,
      errorMessage,
      error,
      request: requestOnDemand,
      response,
    };
  }, [loading, errorMessage, error, requestOnDemand, response]);
};
