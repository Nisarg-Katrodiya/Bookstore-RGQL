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
} from "../../utils/constant";
const initialState = {
  fetching: false,
  bookList: [],
  bookData: [],
  error: {},
};

export const Book = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_BOOK_LIST_REQUEST: return { ...state, fetching: true, };
    case GET_BOOK_LIST_SUCCESS: return { ...state, bookList: action.payload, fetching: false, };
    case GET_BOOK_LIST_ERROR: return { ...state, fetching: false, error: action.payload, };

    case GET_SINGLE_BOOK_SUCCESS: return { ...state, fetching: true, };
    case GET_SINGLE_BOOK_REQUEST: return { ...state, bookData: action.payload, fetching: false, };
    case GET_SINGLE_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };

    case ADD_BOOK_REQUEST: return { ...state, fetching: true, };
    case ADD_BOOK_SUCCESS: return { ...state, bookData: action.payload, fetching: false, };
    case ADD_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };

    case UPDATE_BOOK_REQUEST: return { ...state, fetching: true, };
    case UPDATE_BOOK_SUCCESS: return { ...state, bookData: action.payload, fetching: false, };
    case UPDATE_BOOK_ERROR: return { ...state, fetching: false, error: action.payload, };

    default: return state;
  }
};
