import React from 'react';
import Link from 'next/link';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
  }),
);

export const UserProfileMainInfo = ({ user, userScore, userGames }) => {
  const classes = useStyles();

  if (!user || !userScore) {
    return null;
  }

  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1">
            {user.name}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Wins: {userScore.wins}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Losses: {userScore.losses}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Average score: {userScore.averageScore}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Played games: {userGames.length}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            <Link href={`/users/edit/${user.id}`}>
              <MuiLink href={`/users/edit/${user.id}`} component="button" color="primary">
                Edit profile
              </MuiLink>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
