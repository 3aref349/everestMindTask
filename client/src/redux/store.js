import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./auth";
import  articleReducer from "./articles"
import categoryReducer from "./categories"
import tagReducer from "./tags"
import   subReducer from "./subcategories"
import productReducer from "./orders"
import cartReducer from './carts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles : articleReducer,
    categories:categoryReducer,
    tags:tagReducer,
    subs:subReducer,
    products:productReducer,
    carts:cartReducer
  },
  middleware: [...getDefaultMiddleware()],
});
