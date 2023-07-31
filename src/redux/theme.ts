import { createSlice } from '@reduxjs/toolkit';

// Types
import type { IThemeReducer, IAction } from '@/types/redux';

// Constants
import { ThemeMode } from '@/constants/theme';

// Initial state
const initialState: IThemeReducer = {
  mode: ThemeMode.SYSTEM,
};

// Actual Slice
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode(state, action: IAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;
