import Axios from "axios";
import { apiInstance } from "./index";

export function setToken(token: string) {
  Object.assign(apiInstance.defaults.headers, {
    Authorization: token,
  });
}
// export function removeToken() {
//   delete apiInstance.defaults.headers.Authorization;
// }
export async function handleRequest(request: any) {
  return request;
}
export function handleResponse(value: any) {
  return value;
}
export async function handleApiError(error: any) {
  if (Axios.isCancel(error)) {
    throw error;
  }

  console.log(error);

  if (!error.response) {
    throw error;
  }
  if (error.response.status === 401 || error.response.status === 402) {
    throw error;
  } else if (error.response.status === 500) {
    throw error;
  } else {
  }
  throw error;
}
