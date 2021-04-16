import { useEffect } from 'react';

import { useHttpClientOnDemand, IHttpClientResponseOnRender, ApiSectionNamespace } from '@api';

import { IUsersApiUser } from '../../../model/model';

interface IUserRequestParams {
  id: number;
}

export const useUserOnRender = ({ id }: IUserRequestParams): IHttpClientResponseOnRender<IUsersApiUser> => {
  const { loading, errorMessage, error, response, request } = useHttpClientOnDemand<IUsersApiUser, {}>(
    'get',
    ApiSectionNamespace.EUsersApiKeys.USERS_URL,
  );

  useEffect(() => {
    request({ url: `${id}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, errorMessage, error, response };
};
