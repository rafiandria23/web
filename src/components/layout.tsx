import { FC, ReactNode, CSSProperties } from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material';

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

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    main: {
      minHeight: '100vh',
      '& > :first-child': {
        paddingTop:
          `${Number(theme.mixins.toolbar.minHeight)}px` + theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          paddingTop:
            `${Number(theme.mixins.toolbar.minHeight)}px` + theme.spacing(4),
        } as CSSProperties,
      } as CSSProperties,
      '& > *': {
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(2, 4),
        } as CSSProperties,
      } as CSSProperties,
    },
  }),
);
