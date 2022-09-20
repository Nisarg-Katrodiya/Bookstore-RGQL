import { apiInstance } from "../../httpClient";

import {
  GET_BOOK_LIST_REQUEST,
  GET_BOOK_LIST_SUCCESS,
  GET_BOOK_LIST_ERROR,
  GET_SINGLE_BOOK_SUCCESS,
  GET_SINGLE_BOOK_REQUEST,
  GET_SINGLE_BOOK_ERROR,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_ERROR,
  UPDATE_BOOK_REQUEST,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_ERROR,
} from '../../utils/constant';

const fetchSingleBookRequest = () => ({ type: GET_SINGLE_BOOK_SUCCESS });
const fetchSingleBookSuccess = (payload: any) => ({ type: GET_SINGLE_BOOK_REQUEST, payload });
const fetchSingleBookFailure = (errors: any) => ({ type: GET_SINGLE_BOOK_ERROR, errors });

export const getSingleBook = (id: string) => async(dispatch: any) =>
  new Promise((resolve: any, reject: any) => {
    dispatch(fetchSingleBookRequest());
    apiInstance
      .get(`product/${id}`)
      .then((res) => {
        dispatch(fetchSingleBookSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(fetchSingleBookFailure(e?.response?.data?.message));
        reject();
      });
  });

const fetchBookListRequest = () => ({ type: GET_BOOK_LIST_REQUEST });
const fetchBookListSuccess = (payload: any) => ({ type: GET_BOOK_LIST_SUCCESS, payload });
const fetchBookListFailure = (message: string) => ({ type: GET_BOOK_LIST_ERROR, message });

export const fetchBook = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(fetchBookListRequest());
    apiInstance
      .get('product/list')
      .then((res) => {
        dispatch(fetchBookListSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(fetchBookListFailure(e?.response?.data?.message));
        reject();
      });
  });

const addBookRequest = () => ({ type: ADD_BOOK_REQUEST });
const addBookSuccess = (payload: any) => ({ type: ADD_BOOK_SUCCESS, payload });
const addBookFailure = (message: string) => ({ type: ADD_BOOK_ERROR, message });

export const addBook = (bookData: any) => (dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(addBookRequest());
    apiInstance
      .post('product', bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(addBookSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(addBookFailure(e?.response?.data?.message));
        reject();
      });
  });

const updateBookRequest = () => ({ type: UPDATE_BOOK_REQUEST });
const updateBookSuccess = (payload: any) => ({ type: UPDATE_BOOK_SUCCESS, payload });
const updateBookFailure = (message: string) => ({ type: UPDATE_BOOK_ERROR, message });

export const updateBook = (bookData: any) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(updateBookRequest());
    apiInstance
      .put(`product/${bookData.id}`, bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(updateBookSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(updateBookFailure(e?.response?.data?.message));
        reject();
      });
  });