import '@fontsource/roboto';
import '@/styles/global.scss';

import { createRef, RefObject } from 'react';
import NextApp from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import { SnackbarProvider, SnackbarKey, SnackbarAction } from 'notistack';

// Styles
import { theme } from '@/styles';

export default class App extends NextApp {
  private notistackRef: RefObject<SnackbarProvider> = createRef();

  handleCloseSnackbar = (key: SnackbarKey) => {
    this.notistackRef.current?.closeSnackbar(key);
  };

  render() {
    const { Component, pageProps } = this.props;

    const snackbarAction: SnackbarAction = (key) => (
      <IconButton
        color={`inherit`}
        onClick={() => this.handleCloseSnackbar(key)}
      >
        <CloseOutlined />
      </IconButton>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          ref={this.notistackRef}
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
          <Component {...pageProps} />
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}
