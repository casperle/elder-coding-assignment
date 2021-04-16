import Error from 'next/error';

import { Main } from '@layout/Main';

export const ErrorPageBoundary = ({ serverError, notFound, children }) => {
  if (notFound) {
    return (
      <Main>
        <Error statusCode={404} title="The requested user not found" />
      </Main>
    );
  }

  if (serverError) {
    return (
      <Main>
        <Error statusCode={serverError.status} title={serverError.description} />
      </Main>
    );
  }

  return children;
};
