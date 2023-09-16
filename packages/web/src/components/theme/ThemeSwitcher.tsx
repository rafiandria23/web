'use client';

import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { IconButtonProps } from '@mui/material';
import {
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
  LightModeOutlined as LightModeIcon,
  DarkModeOutlined as DarkModeIcon,
  ComputerOutlined as SystemModeIcon,
} from '@mui/icons-material';

// Constants
import { ThemeMode } from '@/constants/theme';

// Hooks
import { usePrefersDarkMode } from '@/hooks/theme';

export interface IThemeSwitcherProps {
  mode: ThemeMode;
  edge?: IconButtonProps['edge'];
  onChange: (target: ThemeMode) => void;
}

const ThemeSwitcher: FC<IThemeSwitcherProps> = ({ mode, edge, onChange }) => {
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
    onChange(target);
    handleClose();
  };

  const handleRenderIcon = () => {
    switch (mode) {
      case ThemeMode.LIGHT:
        return <LightModeIcon />;

      case ThemeMode.DARK:
        return <DarkModeIcon />;

      case ThemeMode.SYSTEM:
        return prefersDarkMode ? <DarkModeIcon /> : <LightModeIcon />;

      default:
        return null;
    }
  };

  const getSelectedTheme = (target: ThemeMode) => {
    return mode === target;
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'theme-menu' : undefined}
        aria-haspopup='true'
        edge={edge}
        onClick={handleOpen}
      >
        {handleRenderIcon()}
      </IconButton>

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
                      <LightModeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Light' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme(ThemeMode.DARK)}
                    selected={getSelectedTheme(ThemeMode.DARK)}
                  >
                    <ListItemIcon>
                      <DarkModeIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dark' />
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleChangeTheme(ThemeMode.SYSTEM)}
                    selected={getSelectedTheme(ThemeMode.SYSTEM)}
                  >
                    <ListItemIcon>
                      <SystemModeIcon />
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

export default ThemeSwitcher;
