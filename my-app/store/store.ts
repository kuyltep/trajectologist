import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/store/slices/loginSlice";
import selectSlice from "@/store/slices/selectProfession";
import { loginApiSlice } from "@/api/loginApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    selected: selectSlice,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApiSlice.middleware),
});

setupListeners(store.dispatch);
