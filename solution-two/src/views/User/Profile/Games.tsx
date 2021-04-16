import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';

import { gamesTableColumns } from './gamesTableColumns';
import { DEFAULT_USER_GAMES } from './model/constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
  }),
);

export const UserProfileGames = ({ userGames }) => {
  const classes = useStyles();

  if (!userGames?.length) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="subtitle1">
        User wins
      </Typography>
      <DataGrid
        autoHeight
        pageSize={5}
        disableColumnMenu
        disableSelectionOnClick
        sortingMode="server"
        rows={userGames || DEFAULT_USER_GAMES}
        columns={gamesTableColumns}
        columnBuffer={gamesTableColumns.length}
      />
    </Paper>
  );
};
