import { setIn } from 'final-form';

export const validateFormValues = async (values, validationSchema) => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce((formError, innerError) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});

    return errors;
  }
};
