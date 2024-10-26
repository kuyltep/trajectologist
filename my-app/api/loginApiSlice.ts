import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetRegisterUser,
  IGetUserData,
  ILogin,
  IRegister,
} from "./types/ILogin";
import { RootState } from "@/store/store";
import { setUser } from "@/store/slices/loginSlice";

export const loginApiSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3010/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).login.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string; userId: string; professionId: string | null },
      ILogin
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<IGetRegisterUser, IRegister>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query<IGetUserData, null>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // onQueryStarted для обновления store
        try {
          const { data: user } = await queryFulfilled;
          console.log(user);
          dispatch(setUser(user));
        } catch (error) {
          console.error("Ошибка обновления компетенции в store:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  loginApiSlice;
