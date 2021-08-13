import { Reducer, AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

// Types
import { RootState, Action } from '@/types/redux';

// Reducers
import themeReducer from './theme';

const reducers: Reducer<RootState, AnyAction> = (state, action): RootState => {
  switch (action.type) {
    case HYDRATE:
      return action.payload as RootState;

    default:
      return combineReducers<RootState>({
        theme: themeReducer,
      })(state, action);
  }
};

export default reducers;
