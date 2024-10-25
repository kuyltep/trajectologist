import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetRegisterUser, ILogin, IRegister } from "./types/ILogin";
import { ICompetency } from "./types/ICompetency";
import { IProfession, IProfessionAllInfo } from "./types/IProfession";
import { ISelectProfession } from "./types/ISelectProfession";
import { RootState } from "@/store/store";

export const selectApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3010",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).login.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  reducerPath: "selectApi",
  endpoints: (builder) => ({
    getAllCompetencies: builder.query<ICompetency[], null>({
      query: () => ({
        url: "/competency/list",
        method: "GET",
      }),
    }),
    postPotencialUserProfessions: builder.mutation<
      IProfession[],
      ISelectProfession
    >({
      query: (data) => ({
        url: "/profession/user-profession",
        method: "POST",
        body: data,
      }),
    }),
    getProfessionAllInfo: builder.query<IProfessionAllInfo, { id: string }>({
      query: (data) => ({
        url: `/profession/${data.id}`,
        method: "GET",
      }),
    }),
    postSelectUserProfession: builder.mutation<
      IProfession,
      { profession_id: string }
    >({
      query: (data) => ({
        url: "/profession/select",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCompetenciesQuery,
  useGetProfessionAllInfoQuery,
  usePostPotencialUserProfessionsMutation,
  usePostSelectUserProfessionMutation,
} = selectApiSlice;
