import { FC, ReactNode, CSSProperties } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// Components
import { Header, Footer } from '@/components';

interface LayoutProps {
  children: ReactNode;
  header?: boolean;
  elevate?: boolean;
  footer?: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  header = true,
  elevate = false,
  footer = true,
}) => {
  const classes = useStyles();

  return (
    <>
      {header && <Header elevate={elevate} />}

      <main className={classes.main}>{children}</main>

      {footer && <Footer />}
    </>
  );
};

export default Layout;

const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      minHeight: '100vh',
      '& > :first-child': {
        paddingTop: Number(theme.mixins.toolbar.minHeight) + theme.spacing(1),
      } as CSSProperties,
      '& > *': {
        padding: theme.spacing(2, 1),
      } as CSSProperties,
    },
  }),
);
