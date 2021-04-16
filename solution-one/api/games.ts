import { httpClient } from './httpClient';

const DEFAULT_URL = 'games';

const getUrl = (url = '') => `${DEFAULT_URL}${url ? `/${url}` : ''}`;

export const getUserWinGamesById = ({ id }: { id: number }) => {
  return httpClient({
    url: getUrl(),
    params: { winnerId: id },
  });
};
