import { memo, FC, ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import { useTheme, Stack } from '@mui/material';

// Components
import Header from './Header';
import Footer from './Footer';

interface ILayoutProps {
  children: ReactNode;
  header?: boolean;
  elevate?: boolean;
  footer?: boolean;
}

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const Layout: FC<ILayoutProps> = ({
  children,
  header = true,
  elevate = false,
  footer = true,
}) => {
  const theme = useTheme();

  return (
    // Migrate this!
    <body className={roboto.className}>
      {header && <Header elevate={elevate} />}

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

      {footer && <Footer />}
    </body>
  );
};

export default memo(Layout);
