export const modifyUsersStats = (usersStats) => {
  return usersStats && Array.isArray(usersStats)
    ? usersStats.map((userScore) => ({
        ...userScore,
        // Added because of the MUI data grid
        id: userScore.userId,
      }))
    : null;
};
