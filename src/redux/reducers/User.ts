import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "../../utils/constant";
const initialState = {
  fetching: false,
  user: {},
  token: '',
  error: {},
};

export const User = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: return { ...state, fetching: true, };
    case LOGIN_USER_SUCCESS: return { ...state, user: action.payload, token: action.payload.token, fetching: false,};
    case LOGIN_USER_ERROR: return { ...state, fetching: false, error: action.payload, };

    default: return state;
  }
};
