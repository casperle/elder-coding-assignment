import { useCallback, useContext } from 'react';

import { ApplicationContext } from '@context/ApplicationContext';
import { useHttpClientAwaitable, ApiSectionNamespace, IHttpClientRequest } from '@api';

import { IUsersApiUser } from '../../../model/model';

interface IUserRequestParams {
  id: number;
}

export const useUserRequest = ({ id }: IUserRequestParams): IHttpClientRequest<IUsersApiUser> => {
  const { callHttpClient } = useContext(ApplicationContext);

  const { request } = useHttpClientAwaitable<IUsersApiUser, {}>(
    callHttpClient,
    'get',
    ApiSectionNamespace.EUsersApiKeys.USERS_URL,
  );

  return useCallback(() => request({ url: `${id}` }), [id]);
};
