// Types
import { Action, ThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_TYPE } from '@/constants/redux';

export function setThemeType(
  type: ThemeReducer['type'],
): Action<ThemeReducer['type']> {
  return {
    type: SET_THEME_TYPE,
    payload: type,
  };
}
