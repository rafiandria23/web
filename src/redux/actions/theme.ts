// Types
import { Action, ThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_MODE } from '@/constants/redux';

export function setThemeMode(
  type: ThemeReducer['mode'],
): Action<ThemeReducer['mode']> {
  return {
    type: SET_THEME_MODE,
    payload: type,
  };
}
