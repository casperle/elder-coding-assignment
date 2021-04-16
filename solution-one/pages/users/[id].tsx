import { UserProfile } from '@views/User/Profile';
import { Main } from '@layout/Main';
import { generateErrorProps } from '@utils/generateErrorProps';
import { ErrorPageBoundary } from '@sharedComponents/ErrorPageBoundary';
import { getUserById } from '@api/users';
import { getUserScoreById } from '@api/leaderboard';
import { getUserWinGamesById } from '@api/games';

const UserProfilePage = ({ user, userScore, userGames, userHighestScore, notFound, serverError }) => {
  return (
    <ErrorPageBoundary serverError={serverError} notFound={notFound}>
      <Main>
        <UserProfile user={user} userScore={userScore} userHighestScore={userHighestScore} userGames={userGames} />
      </Main>
    </ErrorPageBoundary>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  let user = null;
  let usersStats = null;
  let userHighestScore = null;
  let userGames = null;

  const promises = [
    getUserById({ id: params.id }),
    getUserScoreById({ id: params.id }),
    getUserWinGamesById({ id: params.id }),
  ];

  try {
    [user, usersStats, userGames] = await Promise.all(promises);
  } catch (e) {
    return generateErrorProps(e);
  }

  const { highestScore } = usersStats[0];
  const { against } = highestScore;

  // This means that the user has not played any game yet
  if (against && userGames?.length) {
    try {
      const game = userGames.find((game) => {
        return game.scores.some((score) => score.score === highestScore.score && score.memberId === Number(params.id));
      });

      // UserId can be null
      const againstUser = await getUserById({ id: against });

      userHighestScore = {
        againstUser: againstUser.name,
        date: game.createdAt,
        score: highestScore.score,
      };
    } catch (e) {}
  }

  return {
    props: { user, userScore: usersStats[0], userHighestScore, userGames },
  };
}

export default UserProfilePage;
