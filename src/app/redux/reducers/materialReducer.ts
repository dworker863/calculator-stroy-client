import {
  fetchMaterials,
  postMaterial,
  patchMaterial,
  deleteMaterial,
} from './../../api/api';
import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { TLoading } from './../../commonInterfaces/TLoading';
import { IMaterial } from '../../commonInterfaces/IMaterial';
import { AppThunk } from '../store';

interface IMaterialState {
  loading: TLoading;
  materials: IMaterial[];
  materialError: string;
}

const initialState: IMaterialState = {
  loading: 'succeeded',
  materials: [],
  materialError: '',
};

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    setMaterials: (state, action: PayloadAction<IMaterial[]>) => {
      state.materials = action.payload;
      return state;
    },
    setMaterialsError: (state, action: PayloadAction<string>) => {
      state.materialError = action.payload;
      return state;
    },
    setMaterialsLoading: (state, action: PayloadAction<TLoading>) => {
      state.loading = action.payload;
      return state;
    },
  },
});

export const getMaterials =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    dispatch(setMaterialsLoading('pending'));
    const materials = await fetchMaterials();

    if (typeof materials === 'string') {
      dispatch(setMaterialsLoading('failed'));
      dispatch(setMaterialsError('materials'));
    } else {
      dispatch(setMaterialsLoading('succeeded'));
      dispatch(setMaterials(materials));
    }
  };

export const addMaterial =
  (material: IMaterial): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateMaterial = await postMaterial(material);

    if (typeof stateMaterial === 'string') {
      dispatch(setMaterialsError(stateMaterial));
    } else {
      dispatch(getMaterials());
    }
  };

export const changeMaterial =
  (id: number | undefined, material: IMaterial): AppThunk =>
  async (dispatch): Promise<void> => {
    const stateMaterial = await patchMaterial(id, material);

    if (typeof stateMaterial === 'string') {
      dispatch(setMaterialsError(stateMaterial));
    } else {
      dispatch(getMaterials());
    }
  };

export const removeMaterial =
  (id: number | undefined): AppThunk =>
  async (dispatch): Promise<void> => {
    const material = await deleteMaterial(id);

    if (typeof material === 'string') {
      dispatch(setMaterialsError(material));
    } else {
      dispatch(getMaterials());
    }
  };

export const { setMaterials, setMaterialsError, setMaterialsLoading } =
  materialsSlice.actions;

export const materialReducer = materialsSlice.reducer;
