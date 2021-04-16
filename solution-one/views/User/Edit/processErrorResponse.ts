const INPUT_NAME_MAP = {
  email: 'Email',
  username: 'Username',
  name: 'Name',
};

export const processErrorResponse = (error) => {
  if (error?.response?.status === 422 && error?.response?.data?.errors) {
    return error?.response?.data?.errors.reduce((acc, error) => {
      return `${acc}"${error.msg}" for field "${INPUT_NAME_MAP[error.param] || error.param}". `;
    }, '');
  }

  return `Unknown error happened. Please contact the site administrator. Error code: ${error.code || '000'}`;
};
