'use client';

import { memo, FC, ReactNode } from 'react';
import { useTheme, Stack } from '@mui/material';

// Components
import Header from './Header';
import Footer from './Footer';

export interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Header />

      <Stack
        component='main'
        sx={{
          '& > :first-of-type': {
            mb: theme.spacing(4),
            pt: {
              xs: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(4)})`,
              xl: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(8)})`,
            },
          },
          '& > *:not(:first-of-type)': {
            mb: theme.spacing(4),
          },
          '& > *': {
            width: '100%',
            height: '100%',
            py: {
              xs: theme.spacing(4),
              xl: theme.spacing(8),
            },
          },
          overflowX: 'hidden',
        }}
      >
        {children}
      </Stack>

      <Footer />
    </>
  );
};

export default memo(Layout);
