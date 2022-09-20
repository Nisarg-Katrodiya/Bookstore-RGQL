import {
  GET_CART_LIST_REQUEST,
  GET_CART_LIST_SUCCESS,
  GET_CART_LIST_ERROR,
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_ERROR,
} from "../../utils/constant";

const initialState = {
  fetching: false,
  cart: {},
  totalProduct: 0,
  error: {},
};

export const Cart = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CART_LIST_REQUEST: return { ...state, fetching: true, };
    case GET_CART_LIST_SUCCESS: return { ...state, cart: action.payload, totalProduct: action.payload?.items?.length || 0, fetching: false, };
    case GET_CART_LIST_ERROR: return { ...state, fetching: false, error: action.payload, };

    case ADD_CART_REQUEST: return { ...state, fetching: true, };
    case ADD_CART_SUCCESS: return { ...state, cart: action.payload, totalProduct: action.payload?.items?.length || 0, fetching: false, };
    case ADD_CART_ERROR: return { ...state, fetching: false, error: action.payload, };

    default: return state;
  }
};
