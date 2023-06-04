import type { IAction, IThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_MODE } from '@/constants/redux';

export function setThemeMode(
  type: IThemeReducer['mode'],
): IAction<IThemeReducer['mode']> {
  return {
    type: SET_THEME_MODE,
    payload: type,
  };
}
