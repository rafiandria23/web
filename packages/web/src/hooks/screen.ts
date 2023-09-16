import { useTheme, useMediaQuery } from '@mui/material';

// Constants
import { ScreenSize } from '@/constants/screen';

export function useScreenSize(): ScreenSize {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.up('xs'));
  const isLarge = useMediaQuery(theme.breakpoints.up('xl'));

  if (isLarge) return ScreenSize.LARGE;
  if (isSmall) return ScreenSize.SMALL;

  return ScreenSize.SMALL;
}
