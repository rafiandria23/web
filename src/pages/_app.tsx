// Global Styles
import '@/styles/global.scss';

import { useMemo } from 'react';
import type { NextComponentType } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import NextApp from 'next/app';
import { DefaultSeo } from 'next-seo';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { Theme } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { SnackbarKey } from 'notistack';
import { SnackbarProvider } from 'notistack';

// Types
import type { IPageProps } from '@/types/page';

// Constants
import { AppConfig } from '@/constants/app';
import { ThemeMode } from '@/constants/theme';

// Redux
import { wrapper, persistor } from '@/redux';

// Hooks
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
  AppProps<IPageProps>
> = ({ Component, pageProps }) => {
  const { mode } = useThemeState();
  const prefersDarkMode = usePrefersDarkMode();

  const theme = useMemo<Theme>(() => {
    switch (mode) {
      case ThemeMode.LIGHT:
        return LightTheme;
      case ThemeMode.DARK:
        return DarkTheme;
      case ThemeMode.SYSTEM:
      default:
        return prefersDarkMode ? DarkTheme : LightTheme;
    }
  }, [mode, prefersDarkMode]);

  const handleSnackbarAction = (key: SnackbarKey) => {
    return <SnackbarAction key={key} />;
  };

  return (
    <>
      <DefaultSeo
        titleTemplate='%s | rafiandria23.tech'
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://rafiandria23.tech',
        }}
      />

      <GoogleAnalytics
        gaMeasurementId={AppConfig.GA_MEASUREMENT_ID}
        strategy='worker'
        trackPageViews
      />

      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider action={handleSnackbarAction}>
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
    </>
  );
};

const WrappedApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps<IPageProps>
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
