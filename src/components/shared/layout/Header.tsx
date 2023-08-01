import type { ReactElement, Ref, FC } from 'react';
import { forwardRef, useState, useCallback, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import NextLink from 'next/link';
import type { TransitionProps } from '@mui/material/transitions';
import {
  useTheme,
  useScrollTrigger,
  Slide,
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
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

// Redux
import { setMode as setThemeMode } from '@/redux/theme';

// Custom Hooks
import { useThemeState } from '@/hooks/theme';

// Components
import type { IThemeSwitcherProps } from '@/components/shared/theme/ThemeSwitcher';
import { ThemeSwitcher } from '@/components/shared/theme';

const HeaderTransition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction='right' ref={ref} {...props} />
  ),
);
HeaderTransition.displayName = 'HeaderTransition';

export interface IHeaderProps {
  elevate?: boolean;
}

const Header: FC<IHeaderProps> = ({ elevate = false }) => {
  const dispatch = useDispatch();
  const { mode } = useThemeState();
  const theme = useTheme();
  const scrollTriggered = useScrollTrigger({
    disableHysteresis: true,
  });
  const [open, setOpen] = useState<boolean>(false);

  const calculatedElevation = useMemo(() => {
    if (elevate) {
      return scrollTriggered ? 4 : 0;
    }

    return undefined;
  }, [elevate, scrollTriggered]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleChangeTheme = useCallback<IThemeSwitcherProps['onChange']>(
    (target) => {
      dispatch(setThemeMode(target));
    },
    [dispatch],
  );

  return (
    <>
      <AppBar
        position='fixed'
        elevation={calculatedElevation}
        sx={{
          ...(elevate &&
            !scrollTriggered && {
              bgcolor: 'transparent',
            }),
        }}
      >
        <Container component='header'>
          <Toolbar>
            <Hidden xlUp>
              <IconButton
                edge='start'
                onClick={handleOpen}
                sx={{
                  mr: theme.spacing(2),
                }}
              >
                <MenuIcon
                  sx={{
                    color: theme.palette.primary.contrastText,
                  }}
                />
              </IconButton>

              <NextLink href='/' passHref>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  rafiandria23.tech
                </Typography>
              </NextLink>

              <div
                style={{
                  flexGrow: 1,
                }}
              />

              <ThemeSwitcher mode={mode} onChange={handleChangeTheme} />
            </Hidden>

            <Hidden xlDown>
              <NextLink href='/' passHref>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: theme.typography.fontWeightBold,
                  }}
                >
                  rafiandria23.tech
                </Typography>
              </NextLink>

              <ThemeSwitcher mode={mode} onChange={handleChangeTheme} />

              <div
                style={{
                  flexGrow: 1,
                }}
              />

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
                <LinkedInIcon />
              </IconButton>

              <IconButton
                href='https://github.com/rafiandria23'
                target='_blank'
              >
                <GitHubIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={HeaderTransition}
      >
        <Toolbar>
          <IconButton edge='start' onClick={handleClose}>
            <CloseIcon />
          </IconButton>

          <div
            style={{
              flexGrow: 1,
            }}
          />
        </Toolbar>

        <Grid
          container
          direction='column'
          justifyContent='space-between'
          alignItems='stretch'
          sx={{
            p: theme.spacing(0, 4),
            '& > *': {
              m: theme.spacing(1, 0),
            },
          }}
        >
          <Grid
            item
            container
            direction='column'
            justifyContent='space-between'
            alignItems='stretch'
          >
            <Grid item>
              <NextLink href='/' passHref>
                <Button fullWidth variant='text'>
                  Home
                </Button>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href='/projects' passHref>
                <Button fullWidth variant='text'>
                  Projects
                </Button>
              </NextLink>
            </Grid>

            <Grid item>
              <NextLink href='/blog' passHref>
                <Button fullWidth variant='text'>
                  Blog
                </Button>
              </NextLink>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item>
              <ButtonGroup variant='text'>
                <IconButton
                  href='https://linkedin.com/in/rafiandria23'
                  target='_blank'
                >
                  <LinkedInIcon />
                </IconButton>

                <IconButton
                  href='https://github.com/rafiandria23'
                  target='_blank'
                >
                  <GitHubIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default memo(Header);
