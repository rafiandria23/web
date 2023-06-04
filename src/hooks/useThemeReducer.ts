import { useSelector } from 'react-redux';

// Types
import type { IRootState, IThemeReducer } from '@/types/redux';

export default function useThemeReducer(): IThemeReducer {
  return useSelector<IRootState, IThemeReducer>((s) => s.theme);
}
