import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import { apiInstance } from "../../httpClient";

export interface CounterState {
  fetching: boolean,
  bookList: any[],
  bookData: any[],
  error: any,
}

const initialState: CounterState = {
  fetching: false,
  bookList: [],
  bookData: [],
  error: {},
};

export const addBooks = createAsyncThunk('book/addBook', async (data) => {
  try {
      const student: any = addBook(data);
      if (student) return student.data;
  } catch (error) {
      console.log(error);
  }
});

export const commonEntityAdapter: any = createEntityAdapter({
  selectId: (student: any) => student.id
});

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBooks.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addBooks.fulfilled, (state, { payload }) => {
        state.fetching = false;
        console.log('state of book in extra reducer', payload.bookList);
        commonEntityAdapter.setAll(state, payload.bookList);
      })
      .addCase(addBooks.rejected, (state) => {
          state.fetching = false;
      })
  }
})

export default bookSlice.reducer;

export const getSingleBook = (id: string) => async(dispatch: any) =>
  new Promise((resolve: any, reject: any) => {
    apiInstance
      .get(`product/${id}`)
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((e) => {
        reject();
      });
  });

export const fetchBook = () => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    apiInstance
      .get('product/list')
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((e) => {
        reject();
      });
  });

  export const addBook = (bookData: any) => (dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    apiInstance
      .post('product', bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((e) => {
        reject();
      });
  });

  export const updateBook = (bookData: any) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    apiInstance
      .put(`product/${bookData.id}`, bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((e) => {
        reject();
      });
  });