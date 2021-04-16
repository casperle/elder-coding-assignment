import { useContext, useCallback } from 'react';

import { ApplicationContext } from '@context/ApplicationContext';
import { useHttpClientAwaitable, ApiSectionNamespace, IHttpClientRequest } from '@api';

import { IGamesApiGame } from '../../../model/model';

interface IGamesApiQueryParams {
  winnerId: number;
}

interface IUserGamesRequestParams {
  id: number;
}

export const useUserGamesRequest = ({ id }: IUserGamesRequestParams): IHttpClientRequest<IGamesApiGame[]> => {
  const { callHttpClient } = useContext(ApplicationContext);

  const { request } = useHttpClientAwaitable<IGamesApiGame[], IGamesApiQueryParams>(
    callHttpClient,
    'get',
    ApiSectionNamespace.EGamesApiKeys.GAMES_URL,
  );

  return useCallback(() => request({ query: { winnerId: id } }), [id]);
};
