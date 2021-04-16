import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { useSnackbarActions } from '@sharedComponents/Snackbar';
import { LoadingIndicator } from '@sharedComponents/LoadingIndicator';

import { useProfileDataOnRender } from './hooks/useProfileDataOnRender';
import { UserProfileMainInfo } from './MainInfo';
import { UserProfileGames } from './Games';
import { UserProfileHighestScore } from './HighestScore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
  }),
);

export const UserProfile: React.FC = () => {
  const router = useRouter();
  const classes = useStyles();

  const [userId] = useState(router?.query?.id ? Number(router.query.id) : null);

  const { error: openErrorSnackbar } = useSnackbarActions();
  const {
    errorMessage: profileDataErrorMessage,
    error: profileDataError,
    loading: profileDataLoading,
    response: profileDataResponse,
  } = useProfileDataOnRender({ id: userId });

  useEffect(() => {
    if (profileDataErrorMessage) {
      openErrorSnackbar(`The following server error happened: ${profileDataErrorMessage}`);
    }
  }, [profileDataErrorMessage]);

  if (profileDataError) {
    const firstError = profileDataError[0];

    return (
      <Error
        statusCode={firstError.response?.status || 500}
        title={firstError.response?.statusText || 'Unexpected server error.'}
      />
    );
  }

  if (profileDataLoading || !profileDataResponse) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <UserProfileMainInfo
        user={profileDataResponse.user}
        userScore={profileDataResponse.userScore}
        userGames={profileDataResponse.userGames}
      />
      <UserProfileHighestScore userHighestScore={profileDataResponse.userHighestScore} />
      <UserProfileGames userGames={profileDataResponse.userGames} />
    </div>
  );
};
