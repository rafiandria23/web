export interface Action<T = unknown> {
  type: string;
  payload: T;
}

export interface RootState {
  theme: ThemeReducer;
}

export interface ThemeReducer {
  type: 'light' | 'dark';
}
