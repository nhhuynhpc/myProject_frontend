import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "./slides/authSlide";
import cartReducer from "./slides/cartSlide";
import searchReducer from "./slides/searchSlide"
import productReducer from "./slides/productSlide"
import orderManagerReducer from "./slides/orderManagerSlide"

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  search: searchReducer,
  product: productReducer,
  orderManager: orderManagerReducer, 
});

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["auth", "cart", "search"],
  blacklist: ["products", "orders"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
