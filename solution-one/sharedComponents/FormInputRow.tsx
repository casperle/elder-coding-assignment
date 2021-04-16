import React from 'react';

import { Field } from 'react-final-form';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export const FormInputRow = (props) => {
  const { title, type, name } = props;

  return (
    <>
      <Typography variant="subtitle1" color="textPrimary">
        {title}
      </Typography>
      <Field
        name={name}
        render={({ input, meta }) => {
          return (
            <TextField
              placeholder={title}
              variant="outlined"
              size="medium"
              name={name}
              fullWidth
              type={type}
              helperText={meta.touched && meta.error ? meta.error : undefined}
              error={meta.touched && !!meta.error}
              {...input}
            />
          );
        }}
      />
    </>
  );
};
