import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { productsRequest, categoriesRequest } from './cartAPI';
import { ICardProps } from '../../components/Card/types';

export interface CartState {
  products: ICardProps[];
  cartItems: ICardProps[];
  categories: string[];
  status: 'idle' | 'loading' | 'failed';
  filters: IFilters;
}

interface IFilters {
  selectedCategories?: string[];
  price?: number;
  rating?: number;
}

const initialState: CartState = {
  products: [],
  cartItems: [],
  categories: [],
  filters: {
    selectedCategories: [],
    price: 0,
    rating: 0,
  } as IFilters,
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
    } else {
      return JSON.parse(localStorage.getItem('items') as string);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'cart/fetchCategories',
  async () => {
    if (!localStorage.getItem('cats')) {
      const res = await categoriesRequest();

      localStorage.setItem('cats', JSON.stringify(res));
      return res;
    } else {
      return JSON.parse(localStorage.getItem('cats') as string);
    }

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
      state.cartItems.push(addedItem);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== action.payload;
      });
    },
    setFilters: (state, action: PayloadAction<any>) => {
      const typeOfFilter = Object.keys(action.payload)[0] as keyof IFilters;
      if (typeOfFilter === 'selectedCategories') {
        const selectedCat: string = action.payload[typeOfFilter];

        if (!state.filters.selectedCategories?.includes(selectedCat)) {
          state.filters.selectedCategories?.push(selectedCat);
        } else {
          state.filters.selectedCategories =
            state.filters.selectedCategories.filter(
              (item) => item !== selectedCat
            );
        }
      } else {
        state.filters[typeOfFilter] = action.payload[typeOfFilter];
      }
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
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categories = action.payload;
        }
      );
  },
});

export const { addItem, removeItem, setFilters } = cartSlice.actions;

export const products = (state: RootState) => state.cart.products;
export const cartItems = (state: RootState) => state.cart.cartItems;
export const categories = (state: RootState) => state.cart.categories;
export const filters = (state: RootState) => state.cart.filters;

export default cartSlice.reducer;
