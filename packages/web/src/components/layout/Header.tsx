'use client';

import type { ReactElement, Ref, FC } from 'react';
import { forwardRef, memo, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import NextLink from 'next/link';
import type { TransitionProps } from '@mui/material/transitions';
import {
  useTheme,
  useScrollTrigger,
  Slide,
  Container,
  AppBar,
  Toolbar,
  Stack,
  Box,
  Button,
  IconButton,
  Dialog,
  // Divider,
} from '@mui/material';
import {
  MenuOutlined as MenuIcon,
  CloseOutlined as CloseIcon,
  // LinkedIn as LinkedInIcon,
  // GitHub as GitHubIcon,
} from '@mui/icons-material';

// Constants
import { ScreenSize } from '@/constants/screen';

// Redux
import { setMode as setThemeMode } from '@/redux/theme';

// Hooks
import { useScreenSize } from '@/hooks/screen';
import { useThemeState } from '@/hooks/theme';

// Components
import type { IThemeSwitcherProps } from '@/components/theme/ThemeSwitcher';
import { ThemeSwitcher } from '@/components/theme';

const HeaderTransition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction='right' ref={ref} {...props} />
  ),
);
HeaderTransition.displayName = 'HeaderTransition';

const Header: FC = () => {
  const dispatch = useDispatch();
  const { mode } = useThemeState();
  const theme = useTheme();
  const screenSize = useScreenSize();
  const scrollTriggered = useScrollTrigger({
    disableHysteresis: true,
  });
  const [dialogVisible, setDialogVisibility] = useState<boolean>(false);

  const handleDialogVisibility = useCallback(() => {
    setDialogVisibility(!dialogVisible);
  }, [dialogVisible, setDialogVisibility]);

  const handleChangeTheme = useCallback<IThemeSwitcherProps['onChange']>(
    (target) => {
      dispatch(setThemeMode(target));
    },
    [dispatch],
  );

  const calculatedElevation = useMemo(() => {
    return scrollTriggered || dialogVisible ? 6 : 0;
  }, [scrollTriggered, dialogVisible]);

  return (
    <>
      <AppBar
        component='header'
        position='fixed'
        elevation={calculatedElevation}
        sx={{
          ...(!(scrollTriggered || dialogVisible) && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <Toolbar
          component={Container}
          sx={{
            alignItems: 'center',
          }}
        >
          {screenSize === ScreenSize.SMALL && (
            <>
              <IconButton edge='start' onClick={handleDialogVisibility}>
                {dialogVisible ? <CloseIcon /> : <MenuIcon />}
              </IconButton>

              <Button
                LinkComponent={NextLink}
                variant='text'
                href='/'
                sx={{
                  textTransform: 'none',
                }}
              >
                rafiandria23
              </Button>

              <Box flexGrow={1} />

              <ThemeSwitcher
                mode={mode}
                edge='end'
                onChange={handleChangeTheme}
              />
            </>
          )}

          {screenSize === ScreenSize.LARGE && (
            <>
              <Button
                LinkComponent={NextLink}
                variant='text'
                href='/'
                sx={{
                  textTransform: 'none',
                }}
              >
                rafiandria23
              </Button>

              {/* <Button LinkComponent={NextLink} variant='text' href='/about'>
                About
              </Button> */}

              <Button LinkComponent={NextLink} variant='text' href='/projects'>
                Projects
              </Button>

              <Button LinkComponent={NextLink} variant='text' href='/blog'>
                Blog
              </Button>

              <Box flexGrow={1} />

              {/* <IconButton
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
              </IconButton> */}

              <ThemeSwitcher
                mode={mode}
                edge='end'
                onChange={handleChangeTheme}
              />
            </>
          )}
        </Toolbar>
      </AppBar>

      <Dialog
        TransitionComponent={HeaderTransition}
        keepMounted
        fullScreen
        fullWidth
        open={dialogVisible}
        onClick={handleDialogVisibility}
        sx={{
          zIndex: theme.zIndex.appBar - 1,
          mt: `${Number(theme.mixins.toolbar.minHeight)}px`,
        }}
      >
        <Stack component={Container} pt={theme.spacing(4)} spacing={2}>
          <Button
            LinkComponent={NextLink}
            variant='text'
            href='/about'
            fullWidth
          >
            About
          </Button>

          <Button
            LinkComponent={NextLink}
            variant='text'
            href='/projects'
            fullWidth
          >
            Projects
          </Button>

          <Button
            LinkComponent={NextLink}
            variant='text'
            href='/blog'
            fullWidth
          >
            Blog
          </Button>

          {/* <Stack
            direction='row'
            justifyContent='center'
            spacing={2}
            divider={<Divider orientation='vertical' flexItem />}
          >
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
          </Stack> */}
        </Stack>
      </Dialog>
    </>
  );
};

export default memo(Header);
