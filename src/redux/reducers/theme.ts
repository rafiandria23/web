import update from 'immutability-helper';

// Types
import { Action, ThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_MODE } from '@/constants/redux';

const initialState: ThemeReducer = {
  mode: 'light',
};

export default function themeReducer(
  state = initialState,
  action: Action,
): ThemeReducer {
  switch (action.type) {
    case SET_THEME_MODE:
      return update(state, {
        mode: {
          $set: (action as Action<ThemeReducer['mode']>).payload,
        },
      });

    default:
      return state;
  }
}
