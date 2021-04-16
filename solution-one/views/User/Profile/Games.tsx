import React from 'react';
import moment from 'moment';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';
import Typography from '@material-ui/core/Typography';

const DEFAULT_USER_GAMES = [];

const columns = [
  {
    field: 'userScore',
    sortable: false,
    headerName: 'User score',
    width: 200,
    renderCell: (params) => {
      const scores = params.getValue('scores');
      const winnerId = params.getValue('winnerId');

      return scores.find((score) => score.memberId === winnerId).score;
    },
  },
  {
    field: 'createdAt',
    sortable: false,
    headerName: 'Date',
    type: 'date',
    width: 150,
    valueFormatter: (params) => moment(params.getValue('createdAt')).format('HH:mm DD.MM.YYYY'),
  },
];

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
        columns={columns}
      />
    </Paper>
  );
};
