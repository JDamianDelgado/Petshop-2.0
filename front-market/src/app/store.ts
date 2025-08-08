"use client";
import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, registerReducer } from "../features/auth/authSlice";
import { cartProductReducer, cartViewReducer } from "@/features/cart/cartSlice";
import { productReducer } from "@/features/products/productSlice";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    cartProduct: cartProductReducer,
    cartView: cartViewReducer,
    authLogin: loginReducer,
    authRegister: registerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
