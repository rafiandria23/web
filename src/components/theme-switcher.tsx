import { FC, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@mui/styles';
import {
  useMediaQuery,
  Theme,
  Tooltip,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  WbSunny as WbSunnyIcon,
  NightsStay as NightsStayIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';

// Redux Actions
import { setThemeMode } from '@/redux/actions/theme';

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [init, setInit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setInit(true);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTheme = (target: 'light' | 'dark' | 'system') => {
    switch (target) {
      case 'light':
        localStorage.setItem('theme', 'light');
        dispatch(setThemeMode('light'));
        break;

      case 'dark':
        localStorage.setItem('theme', 'dark');
        dispatch(setThemeMode('dark'));
        break;

      case 'system':
        localStorage.setItem('theme', 'system');
        if (prefersDarkMode) {
          dispatch(setThemeMode('dark'));
        } else {
          dispatch(setThemeMode('light'));
        }
        break;

      default:
        localStorage.setItem('theme', 'system');
        if (prefersDarkMode) {
          dispatch(setThemeMode('dark'));
        } else {
          dispatch(setThemeMode('light'));
        }
        break;
    }

    handleClose();
  };

  const handleRenderIcon = () => {
    const themeFromLS = localStorage.getItem('theme');

    if (themeFromLS) {
      switch (themeFromLS) {
        case 'light':
          return <WbSunnyIcon className={classes.icon} />;

        case 'dark':
          return <NightsStayIcon className={classes.icon} />;

        case 'system':
          return <ComputerIcon className={classes.icon} />;

        default:
          return null;
      }
    }
  };

  const getSelectedTheme = (target: 'light' | 'dark' | 'system') => {
    const themeFromLS = localStorage.getItem('theme');

    if (themeFromLS === 'light' && target === 'light') {
      return true;
    } else if (themeFromLS === 'dark' && target === 'dark') {
      return true;
    } else if (themeFromLS === 'system' && target === 'system') {
      return true;
    }

    return false;
  };

  return init ? (
    <>
      <Tooltip title='Switch theme'>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'theme-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {handleRenderIcon()}
        </IconButton>
      </Tooltip>

      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='theme-menu' autoFocusItem={open}>
                  <MenuItem
                    onClick={() => handleChangeTheme('light')}
                    selected={getSelectedTheme('light')}
                  >
                    <ListItemIcon>
                      <WbSunnyIcon />
                    </ListItemIcon>
                    <ListItemText primary='Light' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme('dark')}
                    selected={getSelectedTheme('dark')}
                  >
                    <ListItemIcon>
                      <NightsStayIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dark' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme('system')}
                    selected={getSelectedTheme('system')}
                  >
                    <ListItemIcon>
                      <ComputerIcon />
                    </ListItemIcon>
                    <ListItemText primary='System' />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  ) : (
    <></>
  );
};

export default ThemeSwitcher;

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }),
);
