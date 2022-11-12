import { fetchServices } from './../../api/api';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../commonInterfaces/IServices';

export type TServiceState = {
  services: IService[];
};

export const initialState: TServiceState = {
  services: [],
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
      return state;
    },
  },
});

export const getServices = (): AppThunk => async (dispatch) => {
  const services = await fetchServices();
  dispatch(setServices(services));
};

export const { setServices } = servicesSlice.actions;

export const servicesReducer = servicesSlice.reducer;
