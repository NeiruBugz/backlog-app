import { useDispatch, useSelector } from 'react-redux';

import type { store, rootReducer } from 'app/providers/with-store';
import type { TypedUseSelectorHook } from 'react-redux';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;