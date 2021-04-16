import * as React from 'react';
import clsx from 'clsx';

import { capitalize } from '@material-ui/core/utils';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = () => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `pending={true}`. */
  pending: {},
  /* Styles applied to the pendingIndicator element. */
  pendingIndicator: {
    position: 'absolute',
    visibility: 'visible',
    display: 'flex',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="center"`. */
  pendingIndicatorCenter: {
    left: '50%',
    transform: 'translate(-50%)',
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="start"`. */
  pendingIndicatorStart: {
    left: 14,
  },
  /* Styles applied to the pendingIndicator element if `pendingPosition="end"`. */
  pendingIndicatorEnd: {
    right: 14,
  },
  /* Styles applied to the endIcon element if `pending={true}` and `pendingPosition="end"`. */
  endIconPendingEnd: {
    visibility: 'hidden',
  },
  /* Styles applied to the startIcon element if `pending={true}` and `pendingPosition="start"`. */
  startIconPendingStart: {
    visibility: 'hidden',
  },
  /* Styles applied to the label element if `pending={true}` and `pendingPosition="center"`. */
  labelPendingCenter: {
    visibility: 'hidden',
  },
});

const PendingIndicator = <CircularProgress color="inherit" size={16} />;

const LoadingButtonComponent = React.forwardRef(function LoadingButton(props, ref) {
  const {
    children,
    classes,
    className,
    disabled = false,
    pending = false,
    pendingIndicator = PendingIndicator,
    pendingPosition = 'center',
    ...other
  } = props as any;

  return (
    <Button
      className={clsx(
        classes.root,
        {
          [classes.pending]: pending,
        },
        className,
      )}
      disabled={disabled || pending}
      ref={ref}
      classes={{
        startIcon: classes[`startIcon${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`],
        endIcon: classes[`endIcon${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`],
        label: classes[`label${pending ? 'Pending' : ''}${capitalize(pendingPosition)}`],
      }}
      {...other}>
      {pending && (
        <div className={clsx(classes.pendingIndicator, classes[`pendingIndicator${capitalize(pendingPosition)}`])}>
          {pendingIndicator}
        </div>
      )}

      {children}
    </Button>
  );
});

export const LoadingButton = withStyles(styles as any, { name: 'MuiLoadingButton' })(LoadingButtonComponent) as any;
