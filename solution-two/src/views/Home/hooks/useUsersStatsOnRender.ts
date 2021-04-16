import { useEffect, useMemo, useState, useContext, useCallback } from 'react';

import { ApplicationContext } from '@context/ApplicationContext';
import { useErrorContext } from '@context/ErrorContext';
import { useHttpClientAwaitable, IHttpClientResponseOnRender, ApiSectionNamespace } from '@api';

import { modifyUsersStats } from './../utils/modifiers';
import { ILeaderboardApiUserScore, IUserScore, IUsersApiUser, IUserApiQueryParams } from './../../model/model';
import { USERS_SCORE_DEFAULT_LIMIT } from './../model/constants';

interface IUsersStatsOnRenderParams {
  sortBy: string;
  order: string;
  limit?: number;
}

interface IUsersStatsApiQueryParams {
  _sort: string;
  _order: string;
  _limit: number;
}

export const useUsersStatsOnRender = ({
  sortBy,
  order,
  limit = USERS_SCORE_DEFAULT_LIMIT,
}: IUsersStatsOnRenderParams): IHttpClientResponseOnRender<IUserScore[]> => {
  const { callLogger } = useErrorContext();
  const { callHttpClient } = useContext(ApplicationContext);

  const [response, setRequestResponse] = useState<ILeaderboardApiUserScore[] | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { request: usersStatsRequest } = useHttpClientAwaitable<ILeaderboardApiUserScore[], IUsersStatsApiQueryParams>(
    callHttpClient,
    'get',
    ApiSectionNamespace.ELeaderboardApiKeys.LEADERBOARD_URL,
  );

  const { request: usersRequest } = useHttpClientAwaitable<IUsersApiUser[], IUserApiQueryParams>(
    callHttpClient,
    'get',
    ApiSectionNamespace.EUsersApiKeys.USERS_URL,
  );

  const consumeServerError = useCallback((errorResponse) => {
    setErrorMessage(errorResponse.statusText);
    setLoading(false);
    callLogger({
      logMessage: `Unable to get Users scores on On Render Request. API Responded with: ${errorResponse.statusText}`,
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    (async (): Promise<void> => {
      const usersStatsResponse = await usersStatsRequest({ query: { _sort: sortBy, _order: order, _limit: limit } });

      // Stop executing if the server load fails
      if (usersStatsResponse.status !== 200 || !usersStatsResponse.data) {
        consumeServerError(usersStatsResponse);

        return;
      }

      const usersStats = usersStatsResponse.data;
      const userIds = usersStats.map((userScore) => userScore.userId);

      const usersResponse = await usersRequest({ query: { id: userIds } });

      // Stop executing if the server load fails
      if (usersResponse.status !== 200 || !usersResponse.data) {
        consumeServerError(usersResponse);

        return;
      }

      const users = usersResponse.data;
      const userNamesMap = users
        ? users.reduce((acc, user) => {
            acc[user.id] = user.name;

            return acc;
          }, {})
        : [];

      setRequestResponse(
        usersStats.map((userScore) => {
          return { ...userScore, userName: userNamesMap[userScore.userId] || 'Deleted User' };
        }),
      );
      setLoading(false);
    })();
  }, [sortBy, order, limit]);

  return useMemo(
    () => ({
      errorMessage,
      loading,
      response: modifyUsersStats(response),
    }),
    [response, errorMessage, loading],
  );
};
