import '@fontsource/roboto';
import '@/styles/global.scss';

import { useEffect, useMemo } from 'react';
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { Theme } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { SnackbarKey } from 'notistack';
import { SnackbarProvider } from 'notistack';

// Types
import type { IPageInitialProps } from '@/types/page';

// Constnats
import { ThemeMode } from '@/constants/theme';

// Utils
import * as gtag from '@/utils/gtag';

// Redux
import { wrapper, persistor } from '@/redux';

// Custom Hooks
import { useThemeState, usePrefersDarkMode } from '@/hooks/theme';

// Styles
import { LightTheme, DarkTheme } from '@/styles/theme';

// Components
import { SnackbarAction } from '@/components/shared/snackbar';

// Pages
import ErrorPage from './_error';

const App: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps<IPageInitialProps>
> = ({ Component, pageProps }) => {
  const router = useRouter();
  const { mode } = useThemeState();
  const prefersDarkMode = usePrefersDarkMode();

  const handleRouteChange = (url: string) => {
    gtag.pageview(url);
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const theme = useMemo<Theme>(() => {
    if (!mode || mode === ThemeMode.SYSTEM) {
      return prefersDarkMode ? DarkTheme : LightTheme;
    }

    return mode === ThemeMode.LIGHT ? LightTheme : DarkTheme;
  }, [mode, prefersDarkMode]);

  const handleSnackbarAction = (key: SnackbarKey) => {
    return <SnackbarAction key={key} />;
  };

  return (
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider action={handleSnackbarAction}>
          <DefaultSeo
            titleTemplate='%s | rafiandria23.tech'
            openGraph={{
              type: 'website',
              locale: 'en_US',
              url: 'https://rafiandria23.tech',
            }}
          />
          {pageProps.errorStatus ? (
            <ErrorPage
              statusCode={pageProps.errorStatus}
              title={pageProps.errorMessage}
            />
          ) : (
            <Component {...pageProps} />
          )}
        </SnackbarProvider>
      </ThemeProvider>
    </PersistGate>
  );
};

const WrappedApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps<IPageInitialProps>
> = ({ ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

export default WrappedApp;

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
