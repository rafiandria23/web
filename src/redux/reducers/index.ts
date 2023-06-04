import { Reducer, AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

// Types
import { IRootState, IAction } from '@/types/redux';

// Reducers
import themeReducer from './theme';

const reducers: Reducer<IRootState, IAction> = (state, action): IRootState => {
  switch (action.type) {
    case HYDRATE:
      return action.payload as IRootState;

    default:
      return combineReducers<IRootState>({
        theme: themeReducer,
      })(state, action);
  }
};

export default reducers;
