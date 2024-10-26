import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "@/store/slices/loginSlice";
import selectSlice from "@/store/slices/selectSlice";
import userSlice from "@/store/slices/userSile";
import { loginApiSlice } from "@/api/loginApiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { selectApiSlice } from "@/api/selectedApiSlice";
import { userDataApiSlice } from "@/api/userDataApiSlice";
export const store = configureStore({
  reducer: {
    login: loginSlice,
    user: userSlice,
    selected: selectSlice,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    [userDataApiSlice.reducerPath]: userDataApiSlice.reducer,
    [selectApiSlice.reducerPath]: selectApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loginApiSlice.middleware)
      .concat(selectApiSlice.middleware)
      .concat(userDataApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
