import { FC, useState, forwardRef, Ref, ReactElement } from 'react';
import NextLink from 'next/link';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useTheme,
  Theme,
  Container,
  Hidden,
  AppBar,
  Toolbar,
  Typography,
  ButtonGroup,
  Button,
  IconButton,
  Grid,
  Dialog,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LinkedIn as LinkedInLogo,
  GitHub as GitHubLogo,
} from '@mui/icons-material';
import clsx from 'clsx';

// Components
import { ThemeSwitcher } from '@/components';

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction={`right`} ref={ref} {...props} />;
  },
);
Transition.displayName = 'Transition';

export interface HeaderProps {
  elevate?: boolean;
}

const Header: FC<HeaderProps> = ({ elevate = false }) => {
  const theme = useTheme();
  const classes = useStyles();
  const scrollTriggered = useScrollTrigger({
    disableHysteresis: true,
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        className={clsx({
          [classes.transparentHeader]: elevate && !scrollTriggered,
        })}
        position='fixed'
        elevation={elevate ? (scrollTriggered ? 4 : 0) : undefined}
      >
        <Container>
          <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Hidden smUp>
              <IconButton
                className={classes.menuButton}
                edge={`start`}
                onClick={handleOpen}
              >
                <MenuIcon className={classes.menuIcon} />
              </IconButton>

              <Typography className={classes.title} variant='h6'>
                rafiandria23.me
              </Typography>

              <div className={classes.grow} />

              {/* <Button
            variant={`outlined`}
            style={{
              borderColor: theme.palette.primary.contrastText,
              color: theme.palette.primary.contrastText,
            }}
          >{`Hire me`}</Button> */}

              <ThemeSwitcher />
            </Hidden>

            <Hidden xsDown>
              <Typography className={classes.title} variant='h6'>
                rafiandria23.me
              </Typography>

              <ThemeSwitcher />

              <div className={classes.grow} />

              <NextLink href='/' passHref>
                <Button variant='text'>Home</Button>
              </NextLink>

              <NextLink href='/projects' passHref>
                <Button variant='text'>Projects</Button>
              </NextLink>

              <NextLink href='/blog' passHref>
                <Button variant='text'>Blog</Button>
              </NextLink>

              <IconButton
                href='https://linkedin.com/in/rafiandria23'
                target='_blank'
              >
                <LinkedInLogo />
              </IconButton>

              <IconButton
                href='https://github.com/rafiandria23'
                target='_blank'
              >
                <GitHubLogo />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        className={classes.menu}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge={`start`}
            color={theme.palette.mode === 'light' ? 'primary' : undefined}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          <div className={classes.grow} />

          {/* <Button
            variant={`outlined`}
            color={theme.palette.mode === 'light' ? 'primary' : undefined}
            style={{
              borderColor:
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
              color:
                theme.palette.mode === 'light'
                  ? theme.palette.primary.main
                  : theme.palette.primary.contrastText,
            }}
          >
            Hire Me
          </Button> */}
        </Toolbar>

        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`space-between`}
          alignItems={`stretch`}
        >
          <Grid
            item
            container
            direction={`column`}
            justifyContent={`space-between`}
            alignItems={`stretch`}
          >
            <Grid item>
              <NextLink href='/' passHref>
                <Button
                  fullWidth
                  variant='text'
                  color={theme.palette.mode === 'light' ? 'primary' : undefined}
                >
                  Home
                </Button>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href='/projects' passHref>
                <Button
                  fullWidth
                  variant='text'
                  color={theme.palette.mode === 'light' ? 'primary' : undefined}
                >
                  Projects
                </Button>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href='/blog' passHref>
                <Button
                  fullWidth
                  variant='text'
                  color={theme.palette.mode === 'light' ? 'primary' : undefined}
                >
                  Blog
                </Button>
              </NextLink>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Grid item>
              <ButtonGroup
                variant='text'
                color={theme.palette.mode === 'light' ? 'primary' : undefined}
              >
                <IconButton
                  href='https://linkedin.com/in/rafiandria23'
                  target='_blank'
                >
                  <LinkedInLogo />
                </IconButton>

                <IconButton
                  href='https://github.com/rafiandria23'
                  target='_blank'
                >
                  <GitHubLogo />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default Header;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(0, 4),
      '& > *': {
        margin: theme.spacing(1, 0),
      },
    },
    transparentHeader: {
      backgroundColor: 'transparent',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuIcon: {
      color: theme.palette.primary.contrastText,
    },
    menu: {},
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
  }),
);
