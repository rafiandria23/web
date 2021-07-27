import '@fontsource/roboto';
import '@/styles/global.scss';

import { useEffect, useMemo, createRef } from 'react';
import NextApp, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery, CssBaseline, IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { SnackbarProvider, SnackbarKey, SnackbarAction } from 'notistack';

// Types
import { PageInitialProps } from '@/types';

// Utils
import * as gtag from '@/utils/gtag';

// Redux
import store from '@/redux';
import { setThemeType } from '@/redux/actions/theme';

// Styles
import { light, dark } from '@/styles/theme';

// Pages
import ErrorPage from './_error';

export default function App({
  Component,
  pageProps,
}: AppProps<PageInitialProps>) {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const notistackRef = createRef<SnackbarProvider>();

  const handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    if (prefersDarkMode && store.getState().theme.type !== 'dark') {
      store.dispatch(setThemeType('dark'));
    } else if (!prefersDarkMode && store.getState().theme.type !== 'light') {
      store.dispatch(setThemeType('light'));
    }
  }, [prefersDarkMode]);

  const theme = useMemo(
    () => (prefersDarkMode ? dark : light),
    [prefersDarkMode],
  );

  const handleCloseSnackbar = (key: SnackbarKey) => {
    notistackRef.current?.closeSnackbar(key);
  };

  const snackbarAction: SnackbarAction = (key) => (
    <IconButton color={`inherit`} onClick={() => handleCloseSnackbar(key)}>
      <CloseOutlined />
    </IconButton>
  );

  const handleRender = () => {
    if (pageProps.errorStatus) {
      return (
        <ErrorPage
          statusCode={pageProps.errorStatus}
          title={pageProps.statusMessage}
        />
      );
    }

    return <Component {...pageProps} />;
  };

  return (
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          ref={notistackRef}
          maxSnack={1}
          autoHideDuration={3000}
          action={snackbarAction}
        >
          <DefaultSeo
            titleTemplate='%s | rafiandria23.me'
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://rafiandria23.me',
              site_name: 'Adam Rafiandri',
            }}
            twitter={{
              handle: '@handle',
              site: '@site',
              cardType: 'summary_large_image',
            }}
          />
          {handleRender()}
        </SnackbarProvider>
      </MuiThemeProvider>
    </ReduxProvider>
  );
}

App.getInitialProps = async (appCtx: AppContext) => {
  const { res } = appCtx.ctx;

  const appProps = await NextApp.getInitialProps(appCtx);

  if (appProps.pageProps.errorStatus && res) {
    res.statusCode = appProps.pageProps.errorStatus;

    if (appProps.pageProps.errorMessage) {
      res.statusMessage = appProps.pageProps.errorMessage;
    }
  }

  return {
    ...appProps,
  };
};
