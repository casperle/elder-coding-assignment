import { snackbarActionTypes } from './constants';

export const snackbarReducer: any = (state: any, action: any) => {
  switch (action.type) {
    case snackbarActionTypes.SNACK_BAR__CLOSE:
      return {
        ...state,
        open: false,
      };
    case snackbarActionTypes.SNACK_BAR__OPEN:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        variant: action.payload.variant,
      };

    default:
      return state;
  }
};
