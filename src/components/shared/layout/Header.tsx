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
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
} from '@mui/material';
import {
  MenuOutlined as MenuIcon,
  CloseOutlined as CloseIcon,
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
  const [dialogVisible, setDialogVisibility] = useState<boolean>(false);

  const calculatedElevation = useMemo(() => {
    if (elevate) {
      return scrollTriggered ? 4 : 0;
    }

    return undefined;
  }, [elevate, scrollTriggered]);

  const handleDialogVisibility = useCallback(() => {
    setDialogVisibility(!dialogVisible);
  }, [dialogVisible, setDialogVisibility]);

  const handleChangeTheme = useCallback<IThemeSwitcherProps['onChange']>(
    (target) => {
      dispatch(setThemeMode(target));
    },
    [dispatch],
  );

  return (
    <>
      <AppBar
        component='header'
        position='fixed'
        elevation={calculatedElevation}
        sx={{
          ...(elevate &&
            !scrollTriggered && {
              bgcolor: 'transparent',
            }),
        }}
      >
        <Toolbar component={Container}>
          <Hidden xlUp>
            <IconButton
              edge='start'
              onClick={handleDialogVisibility}
              sx={{
                mr: theme.spacing(2),
              }}
            >
              {dialogVisible ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <NextLink href='/' passHref>
              <Typography variant='h6'>rafiandria23.tech</Typography>
            </NextLink>

            <Box flexGrow={1} />

            <ThemeSwitcher mode={mode} onChange={handleChangeTheme} />
          </Hidden>

          <Hidden xlDown>
            <NextLink href='/' passHref>
              <Typography variant='h6'>rafiandria23.tech</Typography>
            </NextLink>

            <ThemeSwitcher mode={mode} onChange={handleChangeTheme} />

            <div
              style={{
                flexGrow: 1,
              }}
            />

            <Button LinkComponent={NextLink} href='/' variant='text'>
              Home
            </Button>
            <Button LinkComponent={NextLink} href='/projects' variant='text'>
              Projects
            </Button>
            <Button LinkComponent={NextLink} href='/blog' variant='text'>
              Blog
            </Button>

            <IconButton
              LinkComponent={NextLink}
              href='https://linkedin.com/in/rafiandria23'
              target='_blank'
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              LinkComponent={NextLink}
              href='https://github.com/rafiandria23'
              target='_blank'
            >
              <GitHubIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Dialog
        TransitionComponent={HeaderTransition}
        fullScreen
        open={dialogVisible}
        onClick={handleDialogVisibility}
        sx={{
          zIndex: theme.zIndex.appBar - 1,
          mt: `${Number(theme.mixins.toolbar.minHeight)}px`,
        }}
      >
        <Stack component={Container} pt={theme.spacing(4)} spacing={2}>
          <Button LinkComponent={NextLink} href='/' fullWidth variant='text'>
            Home
          </Button>

          <Button
            LinkComponent={NextLink}
            href='/projects'
            fullWidth
            variant='text'
          >
            Projects
          </Button>

          <Button
            LinkComponent={NextLink}
            href='/blog'
            fullWidth
            variant='text'
          >
            Blog
          </Button>

          <Stack direction='row' justifyContent='center' spacing={2}>
            <IconButton
              LinkComponent={NextLink}
              href='https://linkedin.com/in/rafiandria23'
              target='_blank'
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              LinkComponent={NextLink}
              href='https://github.com/rafiandria23'
              target='_blank'
            >
              <GitHubIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Dialog>
    </>
  );
};

export default memo(Header);
