export interface IAction<T = unknown> {
  type: string;
  payload: T;
}

export interface IRootState {
  theme: ThemeReducer;
}

export interface IThemeReducer {
  mode: 'light' | 'dark';
}
