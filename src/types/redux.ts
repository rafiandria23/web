import { ThemeMode } from '@/constants/theme';

export interface IAction<T = unknown> {
  type: string;
  payload: T;
}

export interface IRootState {
  theme: IThemeReducer;
}

export interface IThemeReducer {
  mode: ThemeMode;
}
