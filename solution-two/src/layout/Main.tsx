import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Topbar } from './Topbar';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
}));

export const Main: React.FC = (props) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Topbar />

        <main>{children}</main>
      </div>
    </>
  );
};
