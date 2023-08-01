import { memo, FC, ReactNode } from 'react';
import { useTheme, Grid } from '@mui/material';

// Components
import Header from './Header';
import Footer from './Footer';

interface ILayoutProps {
  children: ReactNode;
  header?: boolean;
  elevate?: boolean;
  footer?: boolean;
}

const Layout: FC<ILayoutProps> = ({
  children,
  header = true,
  elevate = false,
  footer = true,
}) => {
  const theme = useTheme();

  return (
    <>
      {header && <Header elevate={elevate} />}

      <Grid
        component='main'
        container
        justifyContent='center'
        alignItems='center'
        sx={{
          '& > :first-of-type': {
            width: '100%',
            height: '100%',
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
            my: theme.spacing(4),
          },
        }}
      >
        {children}
      </Grid>

      {footer && <Footer />}
    </>
  );
};

export default memo(Layout);
