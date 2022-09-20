import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';

import Book from "./Book";
import Cart from "./Cart";
// import { User } from "./User";

// const config = {
//   key: "primary",
//   storage,
//   keyPrefix: 'book-'
// };

const state = combineReducers({
  Book,
  Cart,
  // User,
});

// export default persistCombineReducers(config, state);
export default state;
