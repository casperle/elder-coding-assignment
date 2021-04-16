export const getUserHighestScoreStructure = async ({ userId, highestScore, against, userGames, usersRequest }) => {
  let userHighestScore = null;

  // Check if the user already played some game
  if (against && userGames?.length) {
    const game = userGames.find((game) => {
      return game.scores.some((score) => {
        return score.score === highestScore && score.memberId === userId;
      });
    });

    const againstUserResponse = await usersRequest({ url: `${against}` });

    // The request can fail as the use may not exists or there is no matched game
    if (againstUserResponse.status === 200 && game) {
      userHighestScore = {
        againstUser: againstUserResponse.data.name,
        date: game.createdAt,
        score: highestScore,
      };
    }
  }

  return userHighestScore;
};
