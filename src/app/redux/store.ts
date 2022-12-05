import { materialsReducer } from './reducers/materialsReducer';
import { cartReducer } from './reducers/cartReducer';
import { authReducer } from './reducers/authReducer';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { servicesReducer } from './reducers/servicesReducer';

export const store = configureStore({
  reducer: {
    servicesReducer,
    materialsReducer,
    authReducer,
    cartReducer,
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
