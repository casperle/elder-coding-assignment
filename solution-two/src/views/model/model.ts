export interface IHighestScore {
  score: number;
  against: number;
}

export interface ILeaderboardApiUserScore {
  userId: number;
  wins: number;
  losses: number;
  highestScore: IHighestScore;
  averageScore: number;
}

export interface IUsersApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserScore extends ILeaderboardApiUserScore {
  id: number;
}

export interface IUserApiQueryParams {
  id: number[];
}

export interface IGameScore {
  memberId: number;
  score: number;
}

export interface IGamesApiGame {
  id: number;
  scores: IGameScore[];
  winnerId: number;
  createdAt: string;
}

export interface IUserHighestScore {
  againstUser: string;
  date: string;
  score: number;
}

export interface IUserProfileData {
  user: IUsersApiUser;
  userGames: IGamesApiGame[];
  userScore: ILeaderboardApiUserScore;
  userHighestScore: IUserHighestScore;
}
