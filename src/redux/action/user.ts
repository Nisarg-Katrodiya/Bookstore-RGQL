import { setUserSession } from "../../utils/common";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../utils/constant';

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (payload: any) => ({ type: LOGIN_USER_SUCCESS, payload });
const loginUserFailure = (message: string) => ({ type: LOGIN_USER_ERROR, message });

type userDataType = {
  id?: string,
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  role: string,
  token?: string,
}

export const setLoginUser = (params: userDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    try {
      dispatch(loginUserRequest());
      setUserSession(params?.token, params?.id, params.email, params);
      dispatch(loginUserSuccess(params));
      resolve();
    }
    catch(error: any) {
      dispatch(loginUserFailure(error.message));
      reject();
    }
  });

const clearUserSuccess = (payload: any = {}) => ({ type: LOGIN_USER_SUCCESS, payload });

export const clearUser = () => async(dispatch: any) => {
  dispatch(clearUserSuccess({}));
}