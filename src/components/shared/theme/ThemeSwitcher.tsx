import { memo, FC, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, createStyles } from '@mui/styles';
import {
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

// Constants
import { ThemeMode } from '@/constants/theme';

// Redux
import { setThemeMode } from '@/redux/theme';

// Custom Hooks
import { useThemeState, usePrefersDarkMode } from '@/hooks/theme';

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { mode } = useThemeState();
  const prefersDarkMode = usePrefersDarkMode();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTheme = (target: ThemeMode) => {
    dispatch(setThemeMode(target));
    handleClose();
  };

  const handleRenderIcon = () => {
    switch (mode) {
      case ThemeMode.LIGHT:
        return <WbSunnyIcon className={classes.icon} />;

      case ThemeMode.DARK:
        return <NightsStayIcon className={classes.icon} />;

      case ThemeMode.SYSTEM:
        return prefersDarkMode ? (
          <NightsStayIcon className={classes.icon} />
        ) : (
          <WbSunnyIcon className={classes.icon} />
        );

      default:
        return null;
    }
  };

  const getSelectedTheme = (target: ThemeMode) => {
    return mode === target;
  };

  return (
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
                    onClick={() => handleChangeTheme(ThemeMode.LIGHT)}
                    selected={getSelectedTheme(ThemeMode.LIGHT)}
                  >
                    <ListItemIcon>
                      <WbSunnyIcon />
                    </ListItemIcon>
                    <ListItemText primary='Light' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme(ThemeMode.DARK)}
                    selected={getSelectedTheme(ThemeMode.DARK)}
                  >
                    <ListItemIcon>
                      <NightsStayIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dark' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme(ThemeMode.SYSTEM)}
                    selected={getSelectedTheme(ThemeMode.SYSTEM)}
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
  );
};

export default memo(ThemeSwitcher);

const useStyles = makeStyles<Theme>((theme) =>
  createStyles({
    icon: {
      color: theme.palette.primary.contrastText,
    },
  }),
);
