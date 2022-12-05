import {
  fetchServices,
  postService,
  patchService,
  deleteService,
} from './../../api/api';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../commonInterfaces/IService';
import { TLoading } from '../../commonInterfaces/TLoading';

interface IServiceState {
  loading: TLoading;
  services: IService[];
  serviceError: string;
}

const initialState: IServiceState = {
  loading: 'succeeded',
  services: [],
  serviceError: '',
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
      return state;
    },
    setServicesLoading: (state, action: PayloadAction<TLoading>) => {
      state.loading = action.payload;
      return state;
    },
    setServicesError: (state, action: PayloadAction<string>) => {
      state.serviceError = action.payload;
      return state;
    },
  },
});

export const getServices =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(setServicesLoading('pending'));
    const services = await fetchServices();

    if (typeof services === 'string') {
      dispatch(setServicesLoading('failed'));
      dispatch(setServicesError(services));
    } else {
      dispatch(setServicesLoading('succeeded'));
      dispatch(setServices(services));
    }
  };

export const addService =
  (service: IService): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateService = await postService(service);

    if (typeof stateService === 'string') {
      dispatch(setServicesError(stateService));
    } else {
      dispatch(getServices());
    }
  };

export const changeService =
  (id: number | undefined, service: IService): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateService = await patchService(id, service);

    if (typeof stateService === 'string') {
      dispatch(setServicesError(stateService));
    } else {
      dispatch(getServices());
    }
  };

export const removeService =
  (id: number | undefined): AppThunk =>
  async (dispatch): Promise<void> => {
    const response = await deleteService(id);

    if (typeof response === 'string') {
      dispatch(setServicesError(response));
    } else {
      dispatch(getServices());
    }
  };

export const { setServices, setServicesLoading, setServicesError } =
  servicesSlice.actions;

export const servicesReducer = servicesSlice.reducer;
