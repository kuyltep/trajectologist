import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetRegisterUser,
  IGetUserData,
  ILogin,
  IRegister,
} from "./types/ILogin";
import { RootState } from "@/store/store";

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
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } =
  loginApiSlice;
