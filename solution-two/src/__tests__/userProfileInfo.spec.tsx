require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';

import { render, screen } from '../../test-utils';
import { UserProfileMainInfo } from '../../src/views/User/Profile/MainInfo';

import { leaderboardResponse, usersResponse, gamesResponse } from './userProfile.mocks';

describe('User profile main info tests', () => {
  test('displays users profile main info', async () => {
    render(<UserProfileMainInfo user={usersResponse} userGames={gamesResponse} userScore={leaderboardResponse[0]} />);

    expect(screen.getByText(usersResponse.name)).toBeInTheDocument();
    expect(screen.getByText(`Average score: ${leaderboardResponse[0].averageScore}`)).toBeInTheDocument();
  });
});
