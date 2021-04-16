import Error from 'next/error';

import { Main } from '@layout/Main';

const Page404: React.FC = () => {
  return (
    <Main>
      <Error statusCode={404} />
    </Main>
  );
};

export default Page404;
