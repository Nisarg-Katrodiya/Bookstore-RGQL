import { apiInstance } from "../../httpClient";
import { setUserSession } from "../../utils/common";
import {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from '../../utils/constant';

const createUserRequest = () => ({ type: CREATE_USER_REQUEST });
const createUserSuccess = (payload: any) => ({ type: CREATE_USER_SUCCESS, payload });
const createUserFailure = (message: string) => ({ type: CREATE_USER_ERROR, message });

type userDataType = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}

export const createUser = (params: userDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(createUserRequest());
    apiInstance
      .post('user', params)
      .then((res) => {
        console.log("🚀 ~ file: user.ts ~ line 27 ~ .then ~ res.data.data", res.data.data)
        dispatch(createUserSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(createUserFailure(e?.response?.data?.message));
        reject();
      });
  });

const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (payload: any) => ({ type: LOGIN_USER_SUCCESS, payload });
const loginUserFailure = (message: string) => ({ type: LOGIN_USER_ERROR, message });

type loginDataType = {
  email: string,
  password: string,
}

export const loginUser = (params: loginDataType) => async(dispatch: any) => 
  new Promise((resolve: any, reject: any) => {
    dispatch(loginUserRequest());
    apiInstance
      .post('auth/login', params)
      .then((res) => {
        console.log("🚀 ~ file: user.ts ~ line 27 ~ .then ~ res.data.data", res.data.data)
        setUserSession(res.data.data.token, res.data.data.id, res.data.data.email, res.data.data);
        dispatch(loginUserSuccess(res.data.data));
        resolve(res.data.data);
      })
      .catch((e) => {
        dispatch(loginUserFailure(e?.response?.data?.message));
        reject();
      });
  });

const clearUserSuccess = (payload: any = {}) => ({ type: LOGIN_USER_SUCCESS, payload });

export const clearUser = () => async(dispatch: any) => {
  dispatch(clearUserSuccess({}));
}