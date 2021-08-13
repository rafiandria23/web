import { useSelector } from 'react-redux';

// Types
import { RootState, ThemeReducer } from '@/types/redux';

export default function useThemeReducer(): ThemeReducer {
  return useSelector<RootState, ThemeReducer>((s) => s.theme);
}
