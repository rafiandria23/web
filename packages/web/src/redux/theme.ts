import { createSlice } from '@reduxjs/toolkit';

// Types
import type { IThemeReducer, IAction } from '@/types/redux';

// Constants
import { ThemeMode } from '@/constants/theme';

// Initial state
const initialState: IThemeReducer = {
  mode: ThemeMode.SYSTEM,
  scheme: ThemeMode.DARK,
};

// Actual Slice
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode(state, action: IAction<IThemeReducer['mode']>) {
      state.mode = action.payload;
    },
    setScheme(state, action: IAction<IThemeReducer['scheme']>) {
      state.scheme = action.payload;
    },
  },
});

export const { setMode, setScheme } = themeSlice.actions;

export default themeSlice.reducer;
