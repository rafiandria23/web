import '@fontsource/roboto';
import '@/styles/global.scss';

import { useEffect, useCallback, useMemo, createRef } from 'react';
import { NextComponentType } from 'next';
import NextApp, { AppContext, AppInitialProps, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { useDispatch } from 'react-redux';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery, CssBaseline, IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { SnackbarProvider, SnackbarKey, SnackbarAction } from 'notistack';

// Types
import { PageInitialProps } from '@/types';

// Utils
import * as gtag from '@/utils/gtag';

// Redux
import { wrapper } from '@/redux';
import { setThemeType } from '@/redux/actions/theme';

// Custom Hooks
import { useThemeReducer } from '@/hooks';

// Styles
import { light, dark } from '@/styles/theme';

// Pages
import ErrorPage from './_error';

const App: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps<PageInitialProps>
> = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useThemeReducer();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const notistackRef = createRef<SnackbarProvider>();

  const handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };

  const checkThemeConfigInLS = useCallback(() => {
    const themeFromLS = localStorage.getItem('theme');

    if (!themeFromLS) {
      localStorage.setItem('theme', 'system');
    } else {
      switch (themeFromLS) {
        case 'light':
          dispatch(setThemeType('light'));
          break;

        case 'dark':
          dispatch(setThemeType('dark'));
          break;

        case 'system':
          if (prefersDarkMode) {
            dispatch(setThemeType('dark'));
          } else {
            dispatch(setThemeType('light'));
          }
          break;

        default:
          localStorage.setItem('theme', 'system');
          break;
      }
    }
  }, [dispatch, prefersDarkMode]);

  useEffect(() => {
    checkThemeConfigInLS();
    window.addEventListener('storage', checkThemeConfigInLS);
    return () => {
      window.removeEventListener('storage', checkThemeConfigInLS);
    };
  }, [checkThemeConfigInLS]);

  useEffect(() => {
    const themeFromLS = localStorage.getItem('theme');

    if (themeFromLS === 'system') {
      if (prefersDarkMode) {
        dispatch(setThemeType('dark'));
      } else {
        dispatch(setThemeType('light'));
      }
    }
  }, [dispatch, prefersDarkMode]);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const muiTheme = useMemo(
    () => (theme.type === 'light' ? light : dark),
    [theme],
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
    <MuiThemeProvider theme={muiTheme}>
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
          }}
        />
        {handleRender()}
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default wrapper.withRedux(App);

App.getInitialProps = async (appCtx) => {
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
