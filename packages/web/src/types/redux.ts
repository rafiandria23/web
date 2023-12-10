// Constants
import { ThemeMode } from '@/constants/theme';

export interface IAction<T = unknown> {
  type: string;
  payload: T;
}

export interface IThemeReducer {
  mode: ThemeMode;
  scheme: Exclude<ThemeMode, ThemeMode.SYSTEM>;
}
