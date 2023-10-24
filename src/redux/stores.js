import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "./slides/authSlide";
import cartReducer from "./slides/CartSlide";
import searchReducer from "./slides/searchSlide"
import productReducer from "./slides/productSlide"

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  search: searchReducer,
  product: productReducer,
});

const persistCartConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"]
}

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["auth", "cart", "search"],
  blacklist: ["products"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
