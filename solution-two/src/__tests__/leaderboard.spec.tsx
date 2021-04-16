require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, waitFor, screen, fireEvent } from '../../test-utils';
import { Leaderboard } from '../../src/views/Home/Leaderboard';

import {
  defaultLeaderboardResponse,
  sortedByAverageLeaderboardResponse,
  sortedByWinsLeaderboardResponse,
  usersResponse,
} from './leaderboard.mocks';

describe('Leaderboard tests', () => {
  const server = setupServer(
    rest.get(`${process.env.API_URL}/leaderboard`, (req, res, ctx) => {
      const sortBy = req.url.searchParams.get('_sort');
      const order = req.url.searchParams.get('_order');

      if (sortBy === 'wins' && order === 'asc') {
        return res(ctx.json(sortedByWinsLeaderboardResponse));
      }

      if (sortBy === 'averageScore' && order === 'asc') {
        return res(ctx.json(sortedByAverageLeaderboardResponse));
      }

      return res(ctx.json(defaultLeaderboardResponse));
    }),

    rest.get(`${process.env.API_URL}/users`, (req, res, ctx) => {
      const userIds = req.url.searchParams.getAll('id[]');

      return res(
        ctx.json(
          usersResponse.filter((user) => {
            return userIds.includes(`${user.id}`);
          }),
        ),
      );
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('loads and displays user stats with one deleted user', async () => {
    render(<Leaderboard />);

    const { userId } = defaultLeaderboardResponse[0];
    const user = usersResponse.find((user) => user.id === userId);

    await waitFor(() => screen.getByText(user.name));

    expect(screen.getByText(user.name)).toBeInTheDocument();
    expect(screen.getByText('Deleted User')).toBeInTheDocument();
  });

  test('loads and displays sorted user stats by wins', async () => {
    render(<Leaderboard />);

    const { userId } = defaultLeaderboardResponse[0];
    const user = usersResponse.find((user) => user.id === userId);

    await waitFor(() => screen.getByText(user.name));

    const sortByWinsButton = screen.getByText('Number of wins');

    fireEvent.click(sortByWinsButton);

    const { userId: winsUserId } = sortedByWinsLeaderboardResponse[0];
    const winsUser = usersResponse.find((user) => user.id === winsUserId);

    await waitFor(() => screen.getByText(winsUser.name));

    expect(screen.getByText(winsUser.name)).toBeInTheDocument();
  });

  test('loads and displays sorted user stats by average score', async () => {
    render(<Leaderboard />);

    const { userId } = defaultLeaderboardResponse[0];
    const user = usersResponse.find((user) => user.id === userId);

    await waitFor(() => screen.getByText(user.name));

    const sortByWinsButton = screen.getByText('Average score');

    fireEvent.click(sortByWinsButton);

    const { userId: averageScoreUserId } = sortedByAverageLeaderboardResponse[0];
    const averageScoreUser = usersResponse.find((user) => user.id === averageScoreUserId);

    await waitFor(() => screen.getByText(averageScoreUser.name));

    expect(screen.getByText(averageScoreUser.name)).toBeInTheDocument();
  });

  test('handles 500 server error', async () => {
    server.use(
      rest.get(`${process.env.API_URL}/leaderboard`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<Leaderboard />);

    await waitFor(() => screen.findByTestId('snackbar-component'));

    expect(screen.getByTestId('snackbar-component')).toBeVisible();
    expect(screen.getByTestId('snackbar-component')).toHaveTextContent(/Request failed with status code 500/gm);
  });
});
