import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IService } from '../../commonInterfaces/IService';

interface ICartState {
  cartServices: IService[];
  sum: number;
}

const initialState: ICartState = {
  cartServices: [],
  sum: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartService: (state, action: PayloadAction<IService>) => {
      if (
        state.cartServices.some(
          (service) => service?.name === action.payload.name,
        )
      ) {
        return state;
      }

      state.cartServices.push(action.payload);
      return state;
    },
    removeCartService: (state, action: PayloadAction<string>) => {
      state.cartServices = state.cartServices.filter(
        (service) => service.name !== action.payload,
      );
      return state;
    },

    setSum: (state) => {
      return {
        ...state,
        sum: state.cartServices.reduce(
          (sum, service) => (sum += service?.price),
          0,
        ),
      };
    },
  },
});

export const { setCartService, setSum, removeCartService } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
