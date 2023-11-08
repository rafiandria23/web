'use client';

import type { FC, ReactNode } from 'react';
import { memo, useState, useMemo, useCallback } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { CacheProvider } from '@emotion/react';
import type { Options as CacheOptions } from '@emotion/cache';
import createCache from '@emotion/cache';
import type { Theme } from '@mui/material';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { SnackbarKey } from 'notistack';
import { SnackbarProvider } from 'notistack';

// Constants
import { ThemeMode } from '@/constants/theme';

// Redux
import { setScheme } from '@/redux/theme';

// Hooks
import { useThemeState, usePrefersDarkMode } from '@/hooks/theme';

// Themes
import { LightTheme, DarkTheme } from '@/styles/theme';

// Components
import { SnackbarAction } from '@/components/snackbar';

export interface IThemeRegistryProps {
  options: CacheOptions;
  children: ReactNode;
}

const ThemeRegistry: FC<IThemeRegistryProps> = ({ options, children }) => {
  const dispatch = useDispatch();
  const { mode } = useThemeState();
  const prefersDarkMode = usePrefersDarkMode();
  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options);
    cache.compat = true;

    const prevInsert = cache.insert;

    let inserted: string[] = [];

    cache.insert = (...args) => {
      const serialized = args[1];

      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }

      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;

      inserted = [];

      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();

    if (names.length === 0) {
      return null;
    }

    let styles = '';

    for (const name of names) {
      styles += cache.inserted[name];
    }

    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });

  const theme = useMemo<Theme>(() => {
    let finalTheme = DarkTheme;
    let finalScheme = ThemeMode.DARK;

    switch (mode) {
      case ThemeMode.DARK:
        break;
      case ThemeMode.LIGHT:
        finalTheme = LightTheme;
        finalScheme = ThemeMode.LIGHT;
        break;
      case ThemeMode.SYSTEM:
      default:
        finalTheme = prefersDarkMode ? DarkTheme : LightTheme;
        finalScheme = prefersDarkMode ? ThemeMode.DARK : ThemeMode.LIGHT;
        break;
    }

    dispatch(setScheme(finalScheme));

    return finalTheme;
  }, [dispatch, mode, prefersDarkMode]);

  const handleSnackbarAction = useCallback((key: SnackbarKey) => {
    return <SnackbarAction key={key} />;
  }, []);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <SnackbarProvider action={handleSnackbarAction}>
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default memo(ThemeRegistry);
