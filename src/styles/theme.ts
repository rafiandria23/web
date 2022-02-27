import { createTheme, colors } from '@mui/material';

const defaultTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        color: 'inherit',
      },
    },
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
      },
    },
  },
});

export const light = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      light: colors.blue[300],
      main: colors.blue[500],
      dark: colors.blue[700],
    },
    secondary: {
      light: colors.pink[300],
      main: colors.pink[500],
      dark: colors.pink[700],
    },
  },
});

export const dark = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'dark',
    primary: {
      light: colors.grey[700],
      main: colors.grey[800],
      dark: colors.grey[900],
    },
    secondary: {
      light: colors.pink[300],
      main: colors.pink[500],
      dark: colors.pink[700],
    },
  },
});
