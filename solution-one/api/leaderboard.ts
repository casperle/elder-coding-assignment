import { httpClient } from './httpClient';
import { getUsersByIds } from './users';

const DEFAULT_URL = 'leaderboard';

const getUrl = (url = '') => `${DEFAULT_URL}${url ? `/${url}` : ''}`;

export const USERS_STATS_DEFAULT_SORTING = {
  sortBy: 'wins',
  order: 'desc',
};
export const USERS_STATS_DEFAULT_LIMIT = 10;

export const getUsersStats = async ({
  sortBy,
  order,
  limit = USERS_STATS_DEFAULT_LIMIT,
}: {
  sortBy: string;
  order: string;
  limit?: number;
}) => {
  const usersStats = await httpClient({
    url: getUrl(),
    params: { _sort: sortBy, _order: order, _limit: limit },
  });

  const userIds = usersStats ? usersStats.map((userScore) => userScore.userId) : [];

  const users = await getUsersByIds({ ids: userIds });

  const userNamesMap = users
    ? users.reduce((acc, user) => {
        acc[user.id] = user.name;

        return acc;
      }, {})
    : [];

  return usersStats.map((userScore) => {
    return { ...userScore, userName: userNamesMap[userScore.userId] || 'Deleted User' };
  });
};

export const getUserScoreById = async ({ id }: { id: number }) => {
  return httpClient({
    url: getUrl(),
    params: { userId: id },
  });
};
