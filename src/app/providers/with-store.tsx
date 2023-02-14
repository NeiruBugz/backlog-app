import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { gameReducer, searchReducer, userReducer, filterReducer } from '@entities';


export const rootReducer = combineReducers({
  gameReducer,
  searchReducer,
  userReducer,
  filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// eslint-disable-next-line react/display-name
const withStore = (component: () => JSX.Element) => () => <Provider store={store}>{component()}</Provider>;

export { withStore };
