import { FC, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  useMediaQuery,
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
} from '@material-ui/core';
import {
  WbSunny as WbSunnyIcon,
  NightsStay as NightsStayIcon,
  Computer as ComputerIcon,
} from '@material-ui/icons';

// Redux Actions
import { setThemeType } from '@/redux/actions/theme';

// Custom Hooks
import { useThemeReducer } from '@/hooks';

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useThemeReducer();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

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
        dispatch(setThemeType('light'));
        break;

      case 'dark':
        localStorage.setItem('theme', 'dark');
        dispatch(setThemeType('dark'));
        break;

      case 'system':
        localStorage.setItem('theme', 'system');
        if (prefersDarkMode) {
          dispatch(setThemeType('dark'));
        } else {
          dispatch(setThemeType('light'));
        }
        break;

      default:
        localStorage.setItem('theme', 'system');
        if (prefersDarkMode) {
          dispatch(setThemeType('dark'));
        } else {
          dispatch(setThemeType('light'));
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

  return typeof window !== 'undefined' ? (
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

const useStyles = makeStyles((theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }),
);
