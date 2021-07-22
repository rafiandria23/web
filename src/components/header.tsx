import { FC, useState, forwardRef, Ref, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Grid,
  Dialog,
  Slide,
  Divider,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LinkedIn as LinkedInLogo,
  GitHub as GitHubLogo,
} from '@material-ui/icons';

const Transition = forwardRef(
  (props: TransitionProps & { children?: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction={`right`} ref={ref} {...props} />;
  },
);
Transition.displayName = 'Transition';

const Header: FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Container className={classes.header} component={`header`}>
      <AppBar>
        <Toolbar variant={`dense`}>
          <IconButton edge={`start`} onClick={handleOpen}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>

          <div className={classes.grow} />

          <Button
            className={classes.hireButton}
            variant={`outlined`}
          >{`Hire me`}</Button>
        </Toolbar>
      </AppBar>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton edge={`start`} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <Grid
          className={classes.wrapper}
          container
          direction={`column`}
          justifyContent={`space-between`}
          alignItems={`stretch`}
          spacing={1}
        >
          <Grid
            item
            container
            direction={`column`}
            justifyContent={`space-between`}
            alignItems={`center`}
          >
            <Grid item>
              <Button
                color={`primary`}
                onClick={() =>
                  router.push({
                    pathname: '/',
                  })
                }
              >
                Home
              </Button>
            </Grid>

            <Grid item>
              <Button
                color={`primary`}
                onClick={() =>
                  router.push({
                    pathname: '/projects',
                  })
                }
              >
                Projects
              </Button>
            </Grid>

            <Grid item>
              <Button
                color={`primary`}
                onClick={() =>
                  router.push({
                    pathname: '/blog',
                  })
                }
              >
                Blog
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>

          <Grid
            item
            container
            direction={`row`}
            justifyContent={`center`}
            alignItems={`center`}
          >
            <Grid item>
              <IconButton
                color={`primary`}
                href={`https://linkedin.com/in/rafiandria23`}
                target={`_blank`}
              >
                <LinkedInLogo />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton
                color={`primary`}
                href={`https://github.com/rafiandria23`}
                target={`_blank`}
              >
                <GitHubLogo />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </Container>
  );
};

export default Header;

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(0, 4),
    },
    header: {
      position: 'fixed',
      zIndex: theme.zIndex.appBar,
    },
    grow: {
      flexGrow: 1,
    },
    menuIcon: {
      color: theme.palette.primary.contrastText,
    },
    title: {
      fontWeight: theme.typography.fontWeightBold,
    },
    hireButton: {
      borderColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.contrastText,
    },
  }),
);
