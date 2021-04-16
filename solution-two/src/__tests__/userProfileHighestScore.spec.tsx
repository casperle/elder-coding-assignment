require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import moment from 'moment';

import { render, screen } from '../../test-utils';
import { UserProfileHighestScore } from '../../src/views/User/Profile/HighestScore';

import { userHighestScore } from './userProfile.mocks';

describe('User profile highest score tests', () => {
  test('displays user highest score', async () => {
    render(<UserProfileHighestScore userHighestScore={userHighestScore} />);

    const gameDate = moment(userHighestScore.date).format('HH:mm DD.MM.YYYY');

    expect(screen.getByText(userHighestScore.againstUser, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(gameDate, { exact: false })).toBeInTheDocument();
  });
});
