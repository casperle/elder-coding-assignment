import React, { useReducer } from 'react';

import { SNACKBAR_VARIANTS } from './constants';
import { SnackbarContext } from './Context';
import { snackbarReducer } from './reducer';
import { SnackbarComponent } from './SnackbarComponent';

const snackbarInitialState = { variant: SNACKBAR_VARIANTS.SUCCESS, open: false, message: '' };

export const SnackbarProvider: any = ({ children }: any) => {
  return (
    <SnackbarContext.Provider value={useReducer(snackbarReducer, snackbarInitialState) as any}>
      <SnackbarComponent />
      {children}
    </SnackbarContext.Provider>
  );
};
