import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { servicesReducer } from './reducers/servicesReducer';

export const store = configureStore({
  reducer: {
    servicesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
