require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import moment from 'moment';

import { render, screen, fireEvent } from '../../test-utils';
import { UserProfileGames } from '../../src/views/User/Profile/Games';

import { gamesResponse } from './userProfile.mocks';

describe('User profile games tests', () => {
  test('displays users profile games', async () => {
    render(<UserProfileGames userGames={gamesResponse} />);

    const gameDate = moment(gamesResponse[0].createdAt).format('HH:mm DD.MM.YYYY');

    expect(screen.getAllByText(gameDate)).toHaveLength(5);
  });

  test('navigates to the next page of user games', async () => {
    // Creating global variable as js-dom has no support for the scrollTo
    // and the material ui data grid is using it internally
    window.HTMLElement.prototype.scrollTo = function () {};

    render(<UserProfileGames userGames={gamesResponse} />);

    const nextPageButton = screen.getByTitle('Next page');

    fireEvent.click(nextPageButton);

    const gameDate = moment(gamesResponse[0].createdAt).format('HH:mm DD.MM.YYYY');

    expect(screen.getAllByText(gameDate)).toHaveLength(3);
  });
});
