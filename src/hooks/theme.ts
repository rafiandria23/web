import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

// Types
import type { IRootState, IThemeReducer } from '@/types/redux';

export function useThemeState(): IThemeReducer {
  return useSelector<IRootState, IThemeReducer>((s) => s.theme);
}

export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
