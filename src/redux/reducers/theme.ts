import update from 'immutability-helper';

// Types
import { IAction, IThemeReducer } from '@/types/redux';

// Constants
import { SET_THEME_MODE } from '@/constants/redux';

const initialState: IThemeReducer = {
  mode: 'light',
};

export default function themeReducer(
  state = initialState,
  action: IAction,
): IThemeReducer {
  switch (action.type) {
    case SET_THEME_MODE:
      return update(state, {
        mode: {
          $set: (action as IAction<IThemeReducer['mode']>).payload,
        },
      });

    default:
      return state;
  }
}
