import React from 'react';
import moment from 'moment';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
  }),
);

export const UserProfileHighestScore = ({ userHighestScore }) => {
  const classes = useStyles();

  if (!userHighestScore) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Typography gutterBottom variant="subtitle1">
        Highest score: {userHighestScore.score}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Against: {userHighestScore.againstUser}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Date: {moment(userHighestScore.date).format('HH:mm DD.MM.YYYY')}
      </Typography>
    </Paper>
  );
};
