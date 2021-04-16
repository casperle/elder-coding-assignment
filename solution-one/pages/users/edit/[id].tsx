import { UserEdit } from '@views/User/Edit';
import { Main } from '@layout/Main';
import { getUserById } from '@api/users';
import { generateErrorProps } from '@utils/generateErrorProps';
import { ErrorPageBoundary } from '@sharedComponents/ErrorPageBoundary';

const UserEditPage = ({ user, notFound, serverError }) => {
  return (
    <ErrorPageBoundary serverError={serverError} notFound={notFound}>
      <Main>
        <UserEdit user={user} />
      </Main>
    </ErrorPageBoundary>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  let user = null;

  try {
    user = await getUserById({ id: params.id });
  } catch (e) {
    return generateErrorProps(e);
  }

  return {
    props: { user },
  };
}

export default UserEditPage;
