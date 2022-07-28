import { FC, useState, forwardRef, Ref, ReactElement } from 'react';
import NextLink from 'next/link';
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

// Components
import { ThemeSwitcher } from '@/components';

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
  const theme = useTheme();
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
        position='fixed'
        elevation={elevate ? (scrollTriggered ? 4 : 0) : undefined}
        sx={{
          ...(elevate &&
            !scrollTriggered && {
              bgcolor: 'transparent',
            }),
        }}
      >
        <Container>
          <Toolbar sx={{ pl: 0, pr: 0 }}>
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
                rafiandria23.me
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
                rafiandria23.me
              </Typography>

              <ThemeSwitcher />

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
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color={theme.palette.mode === 'light' ? 'primary' : undefined}
            onClick={handleClose}
          >
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
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item>
              <ButtonGroup
                variant='text'
                color={theme.palette.mode === 'light' ? 'primary' : undefined}
              >
                <IconButton
                  href='https://linkedin.com/in/rafiandria23'
                  target='_blank'
                  color={theme.palette.mode === 'light' ? 'primary' : undefined}
                >
                  <LinkedInLogo />
                </IconButton>

                <IconButton
                  href='https://github.com/rafiandria23'
                  target='_blank'
                  color={theme.palette.mode === 'light' ? 'primary' : undefined}
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
