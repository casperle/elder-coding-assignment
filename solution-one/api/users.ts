import { httpClient } from './httpClient';

const DEFAULT_URL = 'users';

const getUrl = (url = '') => `${DEFAULT_URL}${url ? `/${url}` : ''}`;

export const getUsersByIds = ({ ids = [] }: { ids: Array<number> }) => {
  return httpClient({
    url: getUrl(),
    params: { id: ids },
  });
};

export const getUserById = ({ id }: { id: number }) => {
  return httpClient({
    url: getUrl(`${id}`),
  });
};

export const updateUserById = ({
  id,
  data,
}: {
  id: number;
  data: { name: string; email: string; username: string };
}) => {
  return httpClient({
    url: getUrl(`${id}`),
    data,
    method: 'put',
  });
};
