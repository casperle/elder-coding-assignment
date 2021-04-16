import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { SnackbarProvider } from '@sharedComponents/Snackbar';
import { ApplicationContextProvider } from '@context/ApplicationContext';
import { ErrorBoundary } from '@context/ErrorBoundary';
import { ErrorContextProvider } from '@context/ErrorContext';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <ErrorContextProvider>
      <ErrorBoundary>
        <ApplicationContextProvider>
          <SnackbarProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </SnackbarProvider>
        </ApplicationContextProvider>
      </ErrorBoundary>
    </ErrorContextProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
