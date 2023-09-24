import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { productsRequest, categoriesRequest } from './cartAPI';
import { ICardProps } from '../../components/Card/types';

export interface CartState {
  products: ICardProps[];
  cartItems: ICardProps[];
  categories: string[];
  filters: IFilters;
  status: 'idle' | 'loading' | 'failed';
  filteredProducts?: ICardProps[];
}

interface IFilters {
  selectedCategories?: string[];
  price?: number;
  rating?: number;
}

interface IFilterPayload {
  selectedCategories?: string;
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
  }
);

//TODO: fix setfilters payload type
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
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
    setFilters: (state, action: PayloadAction<IFilterPayload>) => {
      const typeOfFilter = Object.keys(action.payload)[0] as keyof IFilters;
      if (typeOfFilter === 'selectedCategories') {
        const selectedCat = action.payload[typeOfFilter] as string;

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
    setFilteredItems: (state, action: PayloadAction<ICardProps[]>) => {
      state.filteredProducts = action.payload;
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

          if (!state.filteredProducts) {
            state.filteredProducts = action.payload;
          }
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

export const { addItem, removeItem, setFilters, setFilteredItems } =
  cartSlice.actions;

export const filterProducts = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const { selectedCategories, price, rating } = state.cart.filters;
  const { products } = state.cart;

  const filteredProducts = products.filter((item) => {
    if (selectedCategories?.length) {
      if (
        !selectedCategories?.every((cat) => {
          return item.category === cat;
        })
      ) {
        return false;
      }
    }

    if (price) {
      if (item.price > price) {
        return false;
      }
    }

    if (rating) {
      if (item.rating.rate < rating) {
        return false;
      }
    }

    return true;
  });

  dispatch(setFilteredItems(filteredProducts));
};

export const products = (state: RootState) => state.cart.products;
export const filteredProducts = (state: RootState) =>
  state.cart.filteredProducts;
export const cartItems = (state: RootState) => state.cart.cartItems;
export const categories = (state: RootState) => state.cart.categories;
export const filters = (state: RootState) => state.cart.filters;

export default cartSlice.reducer;
