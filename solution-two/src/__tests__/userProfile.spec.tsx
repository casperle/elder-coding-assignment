require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, waitFor, screen } from '../../test-utils';
import { UserProfile } from '../../src/views/User/Profile';

import { leaderboardResponse, usersResponse, usersAgainstResponse, gamesResponse } from './userProfile.mocks';

describe('User edit tests', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  const server = setupServer(
    rest.get(`${process.env.API_URL}/leaderboard`, (req, res, ctx) => {
      return res(ctx.json(leaderboardResponse));
    }),

    rest.get(`${process.env.API_URL}/users/:userId`, (req, res, ctx) => {
      const { userId } = req.params;

      if (userId === '28') {
        return res(ctx.json(usersAgainstResponse));
      }

      if (userId === '19') {
        return res(ctx.json(usersResponse));
      }
    }),

    rest.get(`${process.env.API_URL}/games`, (req, res, ctx) => {
      return res(ctx.json(gamesResponse));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('loads and displays user profile', async () => {
    useRouter.mockImplementationOnce(() => ({
      query: { id: 19 },
    }));

    render(<UserProfile />);

    await waitFor(() => screen.findByText(usersResponse.name, { exact: false }), { timeout: 3000 });

    expect(screen.getByText(usersResponse.name, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(usersAgainstResponse.name, { exact: false })).toBeInTheDocument();
    expect(screen.getByText('User score', { exact: false })).toBeInTheDocument();
  });

  test('shows 404 page if user not found', async () => {
    server.use(
      rest.get(`${process.env.API_URL}/users/:id`, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    render(<UserProfile />);

    await waitFor(() => screen.findByText('Not Found', { exact: false }), { timeout: 3000 });

    expect(screen.getByText('Not Found', { exact: false })).toBeInTheDocument();
  });

  test('shows 500 page if internal server error happens', async () => {
    server.use(
      rest.get(`${process.env.API_URL}/users/:id`, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    render(<UserProfile />);

    await waitFor(() => screen.findByText('Internal Server Error', { exact: false }), { timeout: 3000 });

    expect(screen.getByText('Internal Server Error', { exact: false })).toBeInTheDocument();
  });
});
