import { useContext, useCallback } from 'react';

import { ApplicationContext } from '@context/ApplicationContext';
import { useHttpClientAwaitable, ApiSectionNamespace, IHttpClientRequest } from '@api';

import { IUsersApiUser } from '../../../model/model';

interface ILeaderboardApiQueryParams {
  userId: number;
}

interface IUserStatsRequestParams {
  id: number;
}

export const useUserStatsRequest = ({ id }: IUserStatsRequestParams): IHttpClientRequest<IUsersApiUser> => {
  const { callHttpClient } = useContext(ApplicationContext);

  const { request } = useHttpClientAwaitable<IUsersApiUser, ILeaderboardApiQueryParams>(
    callHttpClient,
    'get',
    ApiSectionNamespace.ELeaderboardApiKeys.LEADERBOARD_URL,
  );

  return useCallback(() => request({ query: { userId: id } }), [id]);
};
