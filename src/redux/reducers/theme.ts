import update from 'immutability-helper';

// Types
import { Action, ThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_TYPE } from '@/constants/redux';

const initialState: ThemeReducer = {
  type: 'light',
};

export default function themeReducer(
  state = initialState,
  action: Action,
): ThemeReducer {
  switch (action.type) {
    case SET_THEME_TYPE:
      return update(state, {
        type: {
          $set: (action as Action<ThemeReducer['type']>).payload,
        },
      });

    default:
      return state;
  }
}
