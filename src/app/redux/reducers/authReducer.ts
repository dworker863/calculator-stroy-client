import { registration } from './../../api/api';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../commonInterfaces/IUser';
import { login } from '../../api/api';

type TAuthState = {
  auth: boolean;
  username: string;
  phoneNumber: string;
  email?: string | null;
  errorMessage: string;
};

const initialState: TAuthState = {
  auth: false,
  username: '',
  phoneNumber: '',
  email: '',
  errorMessage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      return {
        ...state,
        auth: true,
        username: action.payload.username,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
      };
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      return state;
    },
  },
});

export const auth =
  (user: { phoneNumber: string; password: string }): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateUser = await login(user);

    if (typeof stateUser === 'string') {
      dispatch(setError(stateUser));
    }

    dispatch(setAuth(stateUser));
  };

export const setRegistration =
  (user: IUser): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateUser = await registration(user);

    if (typeof stateUser === 'string') {
      dispatch(setError(stateUser));
    }
  };

export const setLogin =
  (user: { phoneNumber: string; password: string }): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateUser = await login(user);

    if (typeof stateUser === 'string') {
      dispatch(setError(stateUser));
    }

    dispatch(setAuth(stateUser));
  };

export const { setAuth, setError } = authSlice.actions;

export const authReducer = authSlice.reducer;
