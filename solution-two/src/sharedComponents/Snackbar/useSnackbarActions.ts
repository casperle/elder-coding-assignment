import { Dispatch, useContext } from 'react';

import { ICreateSnackbarActions, ISnackbarReducerAction } from './model';
import { snackbarActionTypes, SNACKBAR_VARIANTS } from './constants';
import { SnackbarContext } from './Context';

function createSnackbarActions(dispatch: Dispatch<ISnackbarReducerAction>): ReturnType<ICreateSnackbarActions> {
  let timeout = null;
  const snackbarActions: ReturnType<ICreateSnackbarActions> = {
    close(): void {
      dispatch && dispatch({ type: snackbarActionTypes.SNACK_BAR__CLOSE });
    },
    open(message: any, variant: string): void {
      dispatch && dispatch({ type: snackbarActionTypes.SNACK_BAR__OPEN, payload: { message, variant } });

      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        snackbarActions.close();
      }, 5000);
    },
    error(message: any): void {
      snackbarActions.open(message, SNACKBAR_VARIANTS.ERROR);
    },
    success(message: string): void {
      snackbarActions.open(message, SNACKBAR_VARIANTS.SUCCESS);
    },
    warning(message: string): void {
      snackbarActions.open(message, SNACKBAR_VARIANTS.WARNING);
    },
    info(message: string): void {
      snackbarActions.open(message, SNACKBAR_VARIANTS.INFO);
    },
  };

  return snackbarActions;
}

export const useSnackbarActions = () => {
  const [_, dispatch] = useContext(SnackbarContext);

  return createSnackbarActions(dispatch);
};
