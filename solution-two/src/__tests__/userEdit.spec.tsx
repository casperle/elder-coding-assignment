require('dotenv').config();

import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, waitFor, screen, userEvent, act, fireEvent } from '../../test-utils';
import { UserEdit } from '../../src/views/User/Edit';

import { usersResponse } from './userEdit.mocks';

function makeRandomText(length) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

describe('User profile tests', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter');

  const server = setupServer(
    rest.get(`${process.env.API_URL}/users/:userId`, (req, res, ctx) => {
      return res(ctx.json(usersResponse));
    }),

    rest.put(`${process.env.API_URL}/users/:userId`, (req, res, ctx) => {
      return res(ctx.json(usersResponse));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('loads the edit form with pre-filled values', async () => {
    render(<UserEdit />);

    await waitFor(() => screen.findByText(usersResponse.name, { exact: false }), { timeout: 3000 });

    expect(screen.getByPlaceholderText('Username')).toHaveValue(usersResponse.username);
    expect(screen.getByPlaceholderText('Name')).toHaveValue(usersResponse.name);
    expect(screen.getByPlaceholderText('Email')).toHaveValue(usersResponse.email);
  });

  test('shows error messages for invalid input data', async () => {
    render(<UserEdit />);

    await waitFor(() => screen.findByText(usersResponse.name, { exact: false }), { timeout: 3000 });

    const usernameInput = screen.getByPlaceholderText('Username');
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByText('Save').parentElement;

    fireEvent.change(usernameInput, { target: { value: makeRandomText(150) } });
    fireEvent.change(nameInput, { target: { value: makeRandomText(150) } });
    fireEvent.change(emailInput, { target: { value: makeRandomText(10) } });

    userEvent.click(submitButton);

    await waitFor(() => screen.getAllByText('The maximum length is 128 characters'));

    expect(screen.getAllByText('The maximum length is 128 characters')).toHaveLength(2);
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  test('shows success snackbar when saved', async () => {
    useRouter.mockImplementationOnce(() => ({
      push: () => {},
    }));

    render(<UserEdit />);

    await waitFor(() => screen.findByText(usersResponse.name, { exact: false }), { timeout: 3000 });

    const usernameInput = screen.getByPlaceholderText('Username');
    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByText('Save').parentElement;

    fireEvent.change(usernameInput, { target: { value: makeRandomText(10) } });
    fireEvent.change(nameInput, { target: { value: makeRandomText(10) } });
    fireEvent.change(emailInput, { target: { value: 'test@test.test' } });

    userEvent.click(submitButton);

    await waitFor(() => screen.getByText('User successfully updated.'));

    expect(screen.getByText('User successfully updated.')).toBeInTheDocument();
  });
});
