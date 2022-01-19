export interface Action<T = unknown> {
  type: string;
  payload: T;
}

export interface RootState {
  theme: ThemeReducer;
}

export interface ThemeReducer {
  mode: 'light' | 'dark';
}
