import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import { apiInstance } from "../../httpClient";
import { cartDataType } from '../../types/cart';

export interface CounterState {
  fetching: boolean,
  cart: any,
  totalProduct: number,
  error: any,
}

const initialState = {
  fetching: false,
  cart: {},
  totalProduct: 0,
  error: {},
};

export const commonEntityAdapter: any = createEntityAdapter({
  selectId: (student: any) => student.id
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    // Loading 
    fetchCart(state) {
      state.fetching = true;
    },

    // FETCH CART
    getCart(state, action) {
      state.fetching = false;
      state.cart = action.payload;
      state.totalProduct = action.payload?.items?.length;
    },
    
    // FETCH CART
    clearCart(state, action) {
      state.fetching = false;
      state.cart = {};
      state.totalProduct = 0;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addCart.fulfilled, (state, { payload }) => {
        state.fetching = false;
        console.log('state of book in extra reducer', payload.bookList);
        commonEntityAdapter.setAll(state, payload.bookList);
      })
      .addCase(addCart.rejected, (state) => {
          state.fetching = false;
      })
  }
})

export default cartSlice.reducer;


export const addCart = createAsyncThunk('cart/addCart', async (data: cartDataType) => {
  try {
      const student: any = addToCart(data);
      if (student) return student.data;
  } catch (error) {
      console.log(error);
  }
});

export const addToCart = (params: cartDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(cartSlice.actions.fetchCart());
    apiInstance
      .put('cart', params)
      .then((res) => {
        dispatch(cartSlice.actions.getCart(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(cartSlice.actions.hasError(e));
        reject();
      });
  });

export const getCart = () => async(dispatch: any) =>
  new Promise((resolve: any, reject: any) => {
    dispatch(cartSlice.actions.fetchCart());
    apiInstance
      .get('cart')
      .then((res) => {
        dispatch(cartSlice.actions.getCart(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(cartSlice.actions.hasError(e));
        reject();
      });
  });

export const clearCart = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(cartSlice.actions.fetchCart());
    apiInstance
      .delete('cart/empty-cart')
      .then((res) => {
        dispatch(cartSlice.actions.clearCart(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(cartSlice.actions.hasError(e));
        reject();
      });
  });