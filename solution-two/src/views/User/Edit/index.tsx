import React, { useCallback, useEffect, useState } from 'react';
import { Form as FinalForm } from 'react-final-form';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { LoadingButton } from '@sharedComponents/LoadingButton';
import { FormInputRow } from '@sharedComponents/FormInputRow';
import { LoadingIndicator } from '@sharedComponents/LoadingIndicator';
import { useSnackbarActions } from '@sharedComponents/Snackbar';

import { processErrorResponse } from './processErrorResponse';
import { validate } from './formValidations';
import { useEditUserOnDemand } from './hooks/useEditUserOnDemand';
import { useUserOnRender } from './hooks/useUserOnRender';
import { useStyles } from './hooks/useStyles';

export const UserEdit: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [userId] = useState(router?.query?.id ? Number(router.query.id) : null);
  const { error: openErrorSnackbar, success: openSuccessSnackbar } = useSnackbarActions();

  const { loading: userLoading, errorMessage: userError, response: userResponse } = useUserOnRender({ id: userId });

  const {
    request: editUserRequest,
    response: editUserResponse,
    error: editUserError,
    loading: editUserLoading,
  } = useEditUserOnDemand();

  const onSubmit = useCallback(async ({ email, name, username }) => {
    editUserRequest({ data: { id: userId, email, name, username } });
  }, []);

  const goBack = useCallback(() => {
    router.push(`/users/${userId}`);
  }, []);

  useEffect(() => {
    if (userError) {
      openErrorSnackbar(userError);
    }
  }, [userError]);

  useEffect(() => {
    if (editUserResponse && !editUserError) {
      openSuccessSnackbar('User successfully updated.');
      goBack();
    }
  }, [editUserResponse, editUserError]);

  if (userLoading || !userResponse) {
    return <LoadingIndicator />;
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <FinalForm
          onSubmit={onSubmit}
          subscription={{ error: true }}
          validate={validate}
          initialValues={userResponse}
          render={({ handleSubmit }) => {
            return (
              <>
                {editUserError && (
                  <Alert className={classes.alert} variant="outlined" severity="error">
                    {processErrorResponse(editUserError)}
                  </Alert>
                )}
                <Grid container>
                  <Grid item xs={12} className={classes.formRow}>
                    <Typography gutterBottom variant="subtitle1">
                      Edit <strong>{userResponse.name}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.formRow}>
                    <FormInputRow title="Username" name="username" type="text" />
                  </Grid>
                  <Grid item xs={12} className={classes.formRow}>
                    <FormInputRow title="Name" name="name" type="text" />
                  </Grid>
                  <Grid item xs={12} className={classes.formRow}>
                    <FormInputRow title="Email" name="email" type="email" />
                  </Grid>
                  <Grid item container justify="center" xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button variant="outlined" fullWidth size="large" color="secondary" onClick={goBack}>
                        Back
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        color="primary"
                        size="large"
                        fullWidth
                        pending={editUserLoading}>
                        Save
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          }}
        />
      </Paper>
    </div>
  );
};
