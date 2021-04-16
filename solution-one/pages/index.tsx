import { Leaderboard } from '@views/Home/Leaderboard';
import { Main } from '@layout/Main';
import { getUsersStats, USERS_STATS_DEFAULT_SORTING } from '@api/leaderboard';
import { modifyUsersStats } from '@views/Home/modifiers';
import { generateErrorProps } from '@utils/generateErrorProps';
import { ErrorPageBoundary } from '@sharedComponents/ErrorPageBoundary';

const HomePage = ({ usersStats, serverError, notFound }) => {
  return (
    <ErrorPageBoundary serverError={serverError} notFound={notFound}>
      <Main>
        <Leaderboard usersStats={usersStats} />
      </Main>
    </ErrorPageBoundary>
  );
};

export async function getServerSideProps() {
  let usersStats = null;

  try {
    usersStats = await getUsersStats(USERS_STATS_DEFAULT_SORTING);
  } catch (e) {
    return generateErrorProps(e);
  }

  return {
    props: { usersStats: modifyUsersStats(usersStats) },
  };
}

export default HomePage;
