import { useEffect, useMemo, useState, useContext, useCallback } from 'react';

import { ApplicationContext } from '@context/ApplicationContext';
import { useErrorContext } from '@context/ErrorContext';
import { useHttpClientAwaitable, IHttpClientResponseOnRender, ApiSectionNamespace } from '@api';

import { useUserRequest } from './useUserRequest';
import { useUserGamesRequest } from './useUserGamesRequest';
import { useUserStatsRequest } from './useUserStatsRequest';
import { getUserHighestScoreStructure } from './getUserHighestScoreStructure';

import { IUserProfileData, IUserApiQueryParams, IUsersApiUser } from '../../../model/model';

export const useProfileDataOnRender = ({ id }): IHttpClientResponseOnRender<IUserProfileData> => {
  const { callLogger } = useErrorContext();
  const { callHttpClient } = useContext(ApplicationContext);

  const [response, setRequestResponse] = useState<IUserProfileData | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { request: usersRequest } = useHttpClientAwaitable<IUsersApiUser, IUserApiQueryParams>(
    callHttpClient,
    'get',
    ApiSectionNamespace.EUsersApiKeys.USERS_URL,
  );

  const consumeServerError = useCallback((failedResponses) => {
    const statusTexts = failedResponses.map((response) => response.statusText).join(', ');
    const errors = failedResponses.map((response) => response.error);

    setErrorMessage(statusTexts);
    setError(errors);
    setLoading(false);
    callLogger({
      logMessage: `Unable to get User profile data on On Render Request. API Responded with: ${statusTexts}`,
    });
  }, []);

  const userRequest = useUserRequest({ id });
  const userGamesRequest = useUserGamesRequest({ id });
  const userStatsRequest = useUserStatsRequest({ id });

  useEffect(() => {
    setLoading(true);

    (async () => {
      const userProfileResponses = await Promise.all([userRequest(), userGamesRequest(), userStatsRequest()]);

      // Stop executing if the server load fails
      const failedResponses = userProfileResponses.filter((response) => response.status !== 200);
      if (failedResponses.length) {
        consumeServerError(failedResponses);

        return;
      }

      const [userResponse, userGamesResponse, userStatsResponse] = userProfileResponses;

      const user = userResponse.data;
      const userGames = userGamesResponse.data;
      const userStats = userStatsResponse.data[0];

      const { highestScore } = userStatsResponse.data[0];
      const { against } = highestScore;

      let userHighestScore = await getUserHighestScoreStructure({
        userId: id,
        highestScore: highestScore.score,
        against,
        userGames,
        usersRequest,
      });

      setRequestResponse({ user, userScore: userStats, userHighestScore, userGames });
      setLoading(false);
    })();
  }, []);

  return useMemo(
    () => ({
      errorMessage,
      loading,
      error,
      response,
    }),
    [response, errorMessage, error, loading],
  );
};
