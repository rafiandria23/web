import { createTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

export const light = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: colors.blue[300],
      main: colors.blue[500],
      dark: colors.red[700],
    },
  },
});

export const dark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      light: colors.grey[700],
      main: colors.grey[800],
      dark: colors.grey[900],
    },
  },
});
