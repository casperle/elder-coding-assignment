import { createContext, Dispatch } from 'react';

import { SNACKBAR_VARIANTS } from './constants';
import { ISnackbarState, ISnackbarReducerAction } from './model';

export const SnackbarContext = createContext<[ISnackbarState, Dispatch<ISnackbarReducerAction>]>([
  { variant: SNACKBAR_VARIANTS.SUCCESS, open: false, message: '' },
  () => {},
]);
