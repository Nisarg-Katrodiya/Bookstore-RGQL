import { apiInstance } from "../../httpClient";

import {
  GET_CART_LIST_REQUEST,
  GET_CART_LIST_SUCCESS,
  GET_CART_LIST_ERROR,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_CART_ERROR,
} from '../../utils/constant';

const fetchCartRequest = () => ({ type: GET_CART_LIST_REQUEST });
const fetchCartSuccess = (payload: any) => ({ type: GET_CART_LIST_SUCCESS, payload});
const fetchCartFailure = (errors: any) => ({ type: GET_CART_LIST_ERROR, errors });

export const fetchCart = () => async(dispatch: any) =>
  new Promise((resolve: any, reject: any) => {
    dispatch(fetchCartRequest());
    apiInstance
      .get('cart')
      .then((res) => {
        dispatch(fetchCartSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(fetchCartFailure(e?.response?.data?.message));
        reject();
      });
  });

const addToCartRequest = () => ({ type: ADD_CART_REQUEST });
const addToCartSuccess = (payload: any) => ({ type: ADD_CART_SUCCESS, payload });
const addToCartFailure = (message: string) => ({ type: ADD_CART_ERROR, message });

type cartDataType = {
  productId: string,
  quantity: number
}

export const addToCart = (params: cartDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(addToCartRequest());
    apiInstance
      .put('cart', params)
      .then((res) => {
        dispatch(addToCartSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(addToCartFailure(e?.response?.data?.message));
        reject();
      });
  });

const clearCartRequest = () => ({ type: CLEAR_CART_REQUEST });
const clearCartSuccess = (payload: any) => ({ type: CLEAR_CART_SUCCESS, payload });
const clearCartFailure = (message: string) => ({ type: CLEAR_CART_ERROR, message });

export const clearCart = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(clearCartRequest());
    apiInstance
      .delete('cart/empty-cart')
      .then((res) => {
        dispatch(clearCartSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(clearCartFailure(e?.response?.data?.message));
        reject();
      });
  });