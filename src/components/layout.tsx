import { FC, ReactNode, CSSProperties } from 'react';
import { useTheme, Container, SxProps } from '@mui/material';

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

      <Container
        component='main'
        sx={{
          minHeight: '100vh',
          p: 0,
          '& > :first-child': {
            pt: `calc(${Number(
              theme.mixins.toolbar.minHeight,
            )}px + ${theme.spacing(2)})`,
            [theme.breakpoints.down('sm')]: {
              pt: `calc(${Number(
                theme.mixins.toolbar.minHeight,
              )}px + ${theme.spacing(4)})`,
            },
          },
        }}
      >
        {children}
      </Container>

      {footer && <Footer />}
    </>
  );
};

export default Layout;
