"use client";
import { configureStore } from "@reduxjs/toolkit";
import {
  forgotPasswordReducer,
  loginReducer,
  registerReducer,
} from "../../features/auth/authSlice";
import { cartProductReducer, cartViewReducer } from "@/features/cart/cartSlice";
import { productReducer } from "@/features/products/productSlice";
import { carrouselReducer } from "@/features/carrousel/carrouselSlice";

export const store = configureStore({
  reducer: {
    productReducer: productReducer,
    cartProduct: cartProductReducer,
    cartView: cartViewReducer,
    authLogin: loginReducer,
    authRegister: registerReducer,
    authForgot: forgotPasswordReducer,
    carrouselReducer: carrouselReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
