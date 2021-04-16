import React, { useCallback, useState } from 'react';
import * as yup from 'yup';
import { Form as FinalForm } from 'react-final-form';
import { useRouter } from 'next/router';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSnackbarActions } from '@sharedComponents/Snackbar';

import { validateFormValues } from '@utils/validateFormValues';
import { LoadingButton } from '@sharedComponents/LoadingButton';
import { FormInputRow } from '@sharedComponents/FormInputRow';
import { updateUserById } from '@api/users';

import { processErrorResponse } from './processErrorResponse';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: `${theme.spacing(2)}px auto`,
      maxWidth: 800,
    },
    alert: {
      marginBottom: theme.spacing(2),
    },
    formRow: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const validate = (values) => {
  return validateFormValues(
    values,
    yup.object({
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required')
        .max(128, 'The maximum length is 128 characters'),
      username: yup.string().required('Username is required').max(128, 'The maximum length is 128 characters'),
      name: yup.string().required('Name is required').max(128, 'The maximum length is 128 characters'),
    }),
  );
};

export const UserEdit = ({ user }) => {
  const classes = useStyles();
  const router = useRouter();
  const [errors, setErrors] = useState(null);
  const [pending, setPending] = useState(false);
  const { success: openSuccessSnackbar } = useSnackbarActions();

  const goBack = useCallback(() => {
    router.push(`/users/${user.id}`);
  }, []);

  const onSubmit = useCallback(async (data) => {
    setErrors(null);
    setPending(true);

    const { email, name, username } = data;

    try {
      await updateUserById({ id: user.id, data: { email, name, username } });

      openSuccessSnackbar('User successfully updated.');
      goBack();
    } catch (e) {
      // The main error handling is done on client side
      setErrors(processErrorResponse(e));
      setPending(false);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <FinalForm
          onSubmit={onSubmit}
          subscription={{ error: true }}
          validate={(values) => validate(values)}
          initialValues={user}
          render={({ handleSubmit }) => {
            return (
              <>
                {errors && (
                  <Alert className={classes.alert} variant="outlined" severity="error">
                    {errors}
                  </Alert>
                )}
                <Grid container>
                  <Grid item xs={12} className={classes.formRow}>
                    <Typography gutterBottom variant="subtitle1">
                      Edit <strong>{user.name}</strong>
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
                        pending={pending}>
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
