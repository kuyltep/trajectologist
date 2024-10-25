import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/store/slices/loginSlice";
import selectSlice from "@/store/slices/selectProfession";
import { loginApiSlice } from "@/api/loginApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { selectApiSlice } from "@/api/selectedApiSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    selected: selectSlice,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    [selectApiSlice.reducerPath]: selectApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApiSlice.middleware)
      .concat(selectApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
