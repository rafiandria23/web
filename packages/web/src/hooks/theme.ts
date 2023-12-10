import { useMediaQuery } from '@mui/material';

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
