import { fetchServices, postService, patchService } from './../../api/api';
import { AppThunk } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../commonInterfaces/IService';

type TLoading = 'pending' | 'succeeded' | 'failed';

type TServiceState = {
  loading: TLoading;
  services: IService[];
  errorMessage: string;
};

const initialState: TServiceState = {
  services: [],
  loading: 'succeeded',
  errorMessage: '',
};

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setServices: (state, action: PayloadAction<IService[]>) => {
      state.services = action.payload;
      return state;
    },
    setLoading: (state, action: PayloadAction<TLoading>) => {
      state.loading = action.payload;
      return state;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      return state;
    },
  },
});

export const getServices =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(setLoading('pending'));
    const services = await fetchServices();

    if (typeof services === 'string') {
      dispatch(setLoading('failed'));
      dispatch(setError(services));
    }

    dispatch(setLoading('succeeded'));
    dispatch(setServices(services));
  };

export const addService =
  (service: IService): AppThunk =>
  async (dispatch): Promise<void> => {
    console.log(localStorage.getItem('token'));

    const stateService = await postService(service);

    if (typeof stateService === 'string') {
      console.log(11);

      dispatch(setError(stateService));
    }

    dispatch(getServices());
  };

export const changeService =
  (fields: any): AppThunk =>
  async (dispatch): Promise<void> => {
    const service = await patchService(fields);

    if (typeof service === 'string') {
      dispatch(setError(service));
    }

    dispatch(getServices());
  };

export const { setServices, setLoading, setError } = servicesSlice.actions;

export const servicesReducer = servicesSlice.reducer;
