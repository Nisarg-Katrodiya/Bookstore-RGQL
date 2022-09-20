import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { applyMiddleware, createStore, compose, AnyAction } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import reducer from "../reducers";
import { persistStore } from "redux-persist";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const storeData = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
  
export const store = persistStore(storeData);
    

/* Types */
export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof reducer>;
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;



export default function setStore() {
  return store;
}

// export default function setStore() {
//   const store = createStore(
//     reducer,
//     composeEnhancers(applyMiddleware(thunk))
//   );

//   persistStore(store);
//   return store;
// }
