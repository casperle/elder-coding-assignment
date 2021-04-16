export const generateErrorProps = (error) => {
  if (error.response?.status === 404) {
    return { props: { notFound: true } };
  }

  return {
    props: {
      serverError: {
        status: error.response?.status || '000',
        description: error.response?.statusText || 'Unknown error happened.',
      },
    },
  };
};
