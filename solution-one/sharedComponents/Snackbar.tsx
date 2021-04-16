import React, { createContext, useContext, useReducer, Dispatch } from 'react';
// import { Alert } from 'react-bootstrap';
// import styled from 'styled-components';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// const AlertContainer = styled.div<{ open: boolean }>`
//   position: fixed;
//   top: 24px;
//   left: auto;
//   right: 24px;
//   z-index: 9999;
//   min-width: 300px;
//   ${(props) => !props.open && 'display: none;'}
// `;

export const SNACKBAR_VARIANTS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'danger',
  INFO: 'info',
};

const snackbarActionTypes = {
  SNACK_BAR__CLOSE: 'SNACK_BAR__CLOSE',
  SNACK_BAR__OPEN: 'SNACK_BAR__OPEN',
};

interface ISnackbarState {
  variant: string;
  open: boolean;
  message: string;
}

interface ISnackbarReducerAction {
  type: string;
  payload?: { [T in keyof ISnackbarState]?: ISnackbarState[T] };
}

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

const SnackbarContext = createContext<[ISnackbarState, Dispatch<ISnackbarReducerAction>]>([
  { variant: SNACKBAR_VARIANTS.SUCCESS, open: false, message: '' },
  () => {},
]);

export type ICreateSnacbarActions = (
  dispatch: Dispatch<ISnackbarReducerAction>,
) => {
  close(): void;
  open(message: any, variant: string): void;
  error(message: any): void;
  success(message: any): void;
  warning(message: string): void;
  info(message: string): void;
};

function createSnacbarActions(dispatch: Dispatch<ISnackbarReducerAction>): ReturnType<ICreateSnacbarActions> {
  let timeout = null;
  const snackbarActions: ReturnType<ICreateSnacbarActions> = {
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

  return createSnacbarActions(dispatch);
};

export const withSnackbarActions = <T extends any>(Component: React.ComponentType<T>) => (props: T): any => {
  return (
    <SnackbarContext.Consumer>
      {(consumerValues: [ISnackbarState, Dispatch<ISnackbarReducerAction>]) => {
        const [_, dispatch] = consumerValues;

        return <Component {...props} snackbarActions={createSnacbarActions(dispatch)} />;
      }}
    </SnackbarContext.Consumer>
  );
};

export interface ISnackbarActionsProps {
  snackbarActions: ReturnType<ICreateSnacbarActions>;
}

function SnackbarComponent() {
  const [{ open, message, variant }] = useContext(SnackbarContext);
  const actions = useSnackbarActions();

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={actions.close}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key="bottomleft">
      <Alert onClose={actions.close} severity={variant}>
        {message}
      </Alert>
    </Snackbar>
  );
}

const snackbarReducer: any = (state: any, action: any) => {
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

const snackbarInitialState = { variant: SNACKBAR_VARIANTS.SUCCESS, open: false, message: '' };

export const SnackbarProvider: any = ({ children }: any) => {
  return (
    <SnackbarContext.Provider value={useReducer(snackbarReducer, snackbarInitialState) as any}>
      <SnackbarComponent />
      {children}
    </SnackbarContext.Provider>
  );
};
