import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { accountSlice } from "../features/pages/account/accountSlice";
import postSlice from "../features/pages/posts/postSlice";

export const store = configureStore({
    reducer:{
        account:accountSlice.reducer,
        posts :postSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const UseAppDispatch = ()=> useDispatch<AppDispatch>();
export const UseAppSelector:TypedUseSelectorHook<RootState> = useSelector;