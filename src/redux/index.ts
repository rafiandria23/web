import { Store, AnyAction, compose, createStore } from 'redux';
import { MakeStore, createWrapper } from 'next-redux-wrapper';

// Types
import { RootState } from '@/types/redux';

// Reducers
import reducers from './reducers';

const composeEnhancers = getComposeEnhancers();

const store = createStore(
  reducers,
  process.env.NODE_ENV !== 'production' ? composeEnhancers() : undefined,
);

const makeStore: MakeStore<Store<RootState, AnyAction>> = () => store;

export const wrapper = createWrapper(makeStore);

export default store;

function getComposeEnhancers(): typeof compose {
  if (typeof window !== 'undefined') {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  return compose;
}
