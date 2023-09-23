import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  CaseReducer,
} from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { productsRequest } from './cartAPI';
import { ICardProps } from '../../components/Card/types';

export interface CartState {
  items: ICardProps[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CartState = {
  items: [],
  status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async () => {
    if (!localStorage.getItem('items')) {
      const res = await productsRequest();

      localStorage.setItem('items', JSON.stringify(res));
      return res;
    }

    return JSON.parse(localStorage.getItem('items') as string);

    // The value we return becomes the `fulfilled` action payload
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addItem: (state, action: PayloadAction<ICardProps>) => {
      const addedItem = action.payload;
      state.items.push(addedItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ICardProps[]>) => {
          state.status = 'idle';
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
