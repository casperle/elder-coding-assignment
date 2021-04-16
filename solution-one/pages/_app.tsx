import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { SnackbarProvider } from '@sharedComponents/Snackbar';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <SnackbarProvider>
      <CssBaseline />
      <Component {...pageProps} />
    </SnackbarProvider>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};
