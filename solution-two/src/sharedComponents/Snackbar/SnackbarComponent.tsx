import React, { useContext } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { SnackbarContext } from './Context';
import { useSnackbarActions } from './useSnackbarActions';

function Alert(props) {
  return <MuiAlert elevation={6} {...props} />;
}

export const SnackbarComponent = () => {
  const [{ open, message, variant }] = useContext(SnackbarContext);
  const actions = useSnackbarActions();

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={actions.close}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      key="bottomleft">
      {open ? (
        <Alert data-testid="snackbar-component" onClose={actions.close} severity={variant}>
          {message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};
