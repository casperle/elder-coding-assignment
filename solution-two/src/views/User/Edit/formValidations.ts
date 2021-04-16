import * as yup from 'yup';
import { validateFormValues } from '@utils/validateFormValues';

interface IUserFormValues {
  email: string;
  username: string;
  name: string;
}

export const validate = (values: IUserFormValues) => {
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
