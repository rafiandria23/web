import { memo, FC, ReactNode } from 'react';
import { useTheme, Grid } from '@mui/material';

// Components
import { Header, Footer } from '@/components';

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
            pt: `calc(${Number(
              theme.mixins.toolbar.minHeight,
            )}px + ${theme.spacing(2)})`,
            [theme.breakpoints.down('sm')]: {
              pt: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(4)})`,
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
