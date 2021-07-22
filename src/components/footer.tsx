import { FC } from 'react';
import { colors, Link } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const Footer: FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footerWrapper}>
      <section className={classes.leftSection}>
        <Link className={classes.navLink} href='/'>
          &copy; 2020 Adam Rafiandri.
        </Link>
      </section>
      <section className={classes.centerSection}>
        <nav className={classes.navWrapper}>
          <Link className={classes.navLink} href='/about'>
            About
          </Link>
          <Link className={classes.navLink} href='/projects'>
            Projects
          </Link>
          <Link className={classes.navLink} href='/blog'>
            Blog
          </Link>
        </nav>
      </section>
    </footer>
  );
};

export default Footer;

const useStyles = makeStyles((theme) =>
  createStyles({
    footerWrapper: {
      background: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '1.6rem 2rem',
    },
    leftSection: {
      float: 'left',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
    },
    centerSection: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
    },
    navWrapper: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    navLink: {
      textDecoration: 'none',
      display: 'flex',
      lineHeight: 1,
      fontSize: '1.1rem',
      textTransform: 'uppercase',
      color: colors.grey[50],
      transition: 'color .5s ease',
      margin: '0 1rem',
      '&:hover': {
        color: colors.grey[300],
      },
    },
    logo: {
      width: '2rem',
      height: '2rem',
    },
  }),
);
