import { FC, ReactNode } from 'react';
import { Toolbar } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Components
import { Header, Footer } from '@/components';

interface LayoutProps {
  children: ReactNode;
  header?: boolean;
  footer?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  header = true,
  footer = true,
}) => {
  const classes = useStyles();

  return (
    <>
      {header && (
        <>
          <Header />
          <Toolbar variant={`dense`} />
        </>
      )}

      <main className={classes.main}>{children}</main>

      {footer && <Footer />}
    </>
  );
};

export default Layout;

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      minHeight: '100vh',
    },
  }),
);
