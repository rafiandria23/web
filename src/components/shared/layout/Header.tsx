import type { FC, Ref, ReactElement } from 'react';
import { useState, useCallback, useMemo, forwardRef, memo } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import {
  useTheme,
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
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';

// Components
import { ThemeSwitcher } from '@/components/shared/theme';

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction='right' ref={ref} {...props} />
  ),
);
Transition.displayName = 'Transition';

export interface IHeaderProps {
  elevate?: boolean;
}

const Header: FC<IHeaderProps> = ({ elevate = false }) => {
  const router = useRouter();
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

  const handleNavigate = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router],
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
        <Container>
          <Toolbar color='inherit'>
            <Hidden smUp>
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

              <Typography
                variant='h6'
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                rafiandria23.tech
              </Typography>

              <div
                style={{
                  flexGrow: 1,
                }}
              />

              <ThemeSwitcher />
            </Hidden>

            <Hidden smDown>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                rafiandria23.tech
              </Typography>

              <ThemeSwitcher />

              <div
                style={{
                  flexGrow: 1,
                }}
              />

              <Button variant='text' onClick={() => handleNavigate('/')}>
                Home
              </Button>

              <Button
                variant='text'
                onClick={() => handleNavigate('/projects')}
              >
                Projects
              </Button>

              <Button variant='text' onClick={() => handleNavigate('/blog')}>
                Blog
              </Button>

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
        TransitionComponent={Transition}
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
              <Button
                fullWidth
                variant='text'
                onClick={() => handleNavigate('/')}
              >
                Home
              </Button>
            </Grid>

            <Grid item>
              <Button
                fullWidth
                variant='text'
                onClick={() => handleNavigate('/projects')}
              >
                Projects
              </Button>
            </Grid>

            <Grid item>
              <Button
                fullWidth
                variant='text'
                onClick={() => handleNavigate('/blog')}
              >
                Blog
              </Button>
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
              <ButtonGroup>
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
