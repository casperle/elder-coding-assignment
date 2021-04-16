import React from 'react';
import { render } from '@testing-library/react';

import { SnackbarProvider } from '@sharedComponents/Snackbar';
import { ApplicationContextProvider } from '@context/ApplicationContext';
import { ErrorContextProvider } from '@context/ErrorContext';

const AllTheProviders = ({ children }) => {
  return (
    <ErrorContextProvider>
      <ApplicationContextProvider>
        <SnackbarProvider> {children}</SnackbarProvider>
      </ApplicationContextProvider>
    </ErrorContextProvider>
  );
};

const customRender = (ui, options = {}) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

// override render method
export { customRender as render };
