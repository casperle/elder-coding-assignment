import { Dispatch } from 'react';

export interface ISnackbarState {
  variant: string;
  open: boolean;
  message: string;
}

export interface ISnackbarReducerAction {
  type: string;
  payload?: { [T in keyof ISnackbarState]?: ISnackbarState[T] };
}

export type ICreateSnackbarActions = (
  dispatch: Dispatch<ISnackbarReducerAction>,
) => {
  close(): void;
  open(message: any, variant: string): void;
  error(message: any): void;
  success(message: any): void;
  warning(message: string): void;
  info(message: string): void;
};
