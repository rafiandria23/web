import {
  Reducer,
  CombinedState,
  combineReducers,
  compose,
  createStore,
} from 'redux';

// Types
import { RootState, Action } from '@/types/redux';

// Reducers
import { themeReducer } from './reducers';

const reducers: Reducer<CombinedState<RootState>, Action> = combineReducers<
  RootState,
  Action
>({
  theme: themeReducer,
});

const composeEnhancers = getComposeEnhancers();

const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
    ? composeEnhancers()
    : undefined,
);

export default store;

function getComposeEnhancers(): typeof compose {
  if (typeof window !== 'undefined') {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  return compose;
}
