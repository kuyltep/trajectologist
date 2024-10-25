import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetRegisterUser, ILogin, IRegister } from "./types/ILogin";

export const loginApiSlice = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3010/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string; userId: string }, ILogin>({
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = loginApiSlice;
