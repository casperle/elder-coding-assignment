import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { UserProfileMainInfo } from './MainInfo';
import { UserProfileGames } from './Games';
import { UserProfileHighestScore } from './HighestScore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

export const UserProfile = ({ user, userScore, userGames, userHighestScore }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserProfileMainInfo user={user} userScore={userScore} userGames={userGames} />
      <UserProfileHighestScore userHighestScore={userHighestScore} />
      <UserProfileGames userGames={userGames} />
    </div>
  );
};
