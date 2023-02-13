import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { gameReducer, searchReducer, userReducer, filterReducer } from '@entities';

const rootReducer = combineReducers({
  gameReducer,
  searchReducer,
  userReducer,
  filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line react/display-name
const withStore = (component: () => JSX.Element) => () => {
  return <Provider store={store}>{component()}</Provider>;
};

export { withStore };
