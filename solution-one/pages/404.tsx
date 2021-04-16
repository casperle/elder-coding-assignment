import Error from 'next/error';

import { Main } from '@layout/Main';

const Page404 = () => {
  return (
    <Main>
      <Error statusCode={404} />
    </Main>
  );
};

export default Page404;
