import { AxiosResponse } from 'axios';

export namespace ApiSectionNamespace {
  // users section
  export enum EUsersApiKeys {
    USERS_URL = '/users',
  }

  // games section
  export enum EGamesApiKeys {
    GAMES_URL = '/games',
  }

  // leaderboard section
  export enum ELeaderboardApiKeys {
    LEADERBOARD_URL = '/leaderboard',
  }
}

export interface IHttpClientResponseOnRender<T> {
  loading: boolean;
  errorMessage: string | null;
  error?: any;
  response: T | null;
}

export interface ExtendedAxiosResponse<T> extends AxiosResponse<T> {
  error?: any;
}

export interface IRequestParam<P> {
  data?: P;
  query?: P;
  url?: string;
}

export interface IAxiosErrorMessage {
  status: number;
  statusText: string;
  data: null;
  error?: any;
}

export interface IHttpClientResponse<T, P> extends IHttpClientResponseOnRender<T> {
  request: (params?: IRequestParam<P>) => Promise<void>;
}

export interface IHttpClientResponseAwaitable<T, P> {
  request: (params?: IRequestParam<P>) => Promise<ExtendedAxiosResponse<T> | IAxiosErrorMessage>;
}

export type IHttpClientRequest<T> = () => Promise<ExtendedAxiosResponse<T> | IAxiosErrorMessage>;

export interface IAwaitableMethodResponse<T, P> {
  request: (params?: IRequestParam<P>) => Promise<T>;
}

export interface IGeneralRequestResponse<T> {
  data: T;
  messages: string[];
}

export interface IHeader {
  [name: string]: string;
}
