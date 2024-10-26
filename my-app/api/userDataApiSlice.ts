import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IGetRegisterUser,
  ILogin,
  IRegister,
  IUserCompetency,
  IUserCompetencyAll,
} from "./types/ILogin";
import {
  ICompetency,
  IUpdateUserCompetency,
  IUpdateUserStep,
  IUserStep,
  IUserStepAll,
} from "./types/ICompetency";
import { IProfession, IProfessionAllInfo } from "./types/IProfession";
import { ISelectProfession } from "./types/ISelectProfession";
import { RootState } from "@/store/store";
import {
  setActiveCompetency,
  setActiveStep,
  setProfession,
} from "@/store/slices/userSile";

export const userDataApiSlice = createApi({
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
  reducerPath: "userDataApi",
  endpoints: (builder) => ({
    getAllCompetenciesForProfession: builder.query<
      IUserCompetency[],
      { id: string }
    >({
      query: (data) => ({
        url: `/competency/profession/${data.id}`,
        method: "GET",
      }),
    }),
    getAllProfessionInfo: builder.query<IProfessionAllInfo, { id: string }>({
      query: (data) => ({
        url: `/profession/${data.id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // onQueryStarted для обновления store
        try {
          const { data: profession } = await queryFulfilled;
          dispatch(setProfession(profession));
        } catch (error) {
          console.error("Ошибка обновления компетенции в store:", error);
        }
      },
    }),
    getCompetencyById: builder.query<IUserCompetencyAll, { id: string }>({
      query: (data) => ({
        url: `/competency/${data.id}`,
        method: "GET",
        providesTags: (result, error, arg) => [
          { type: "Competency", id: arg.id },
        ],
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // onQueryStarted для обновления store
        try {
          const { data: updatedCompetency } = await queryFulfilled;
          dispatch(setActiveCompetency(updatedCompetency)); // Обновляем store после успешного запроса
        } catch (error) {
          // Обработка ошибки, если нужно
          console.error("Ошибка обновления компетенции в store:", error);
        }
      },
    }),
    getStepsForCompetency: builder.query<IUserStep[], { id: string }>({
      query: (data) => ({
        url: `/step/competency/${data.id}`,
        method: "GET",
      }),
    }),
    getStepAllInfo: builder.query<IUserStepAll, { id: string }>({
      query: (data) => ({
        url: `/step/${data.id}`,
        method: "GET",
        providesTags: (result, error, arg) => [{ type: "Step", id: arg.id }],
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // onQueryStarted для обновления store
        try {
          const { data: updatedStep } = await queryFulfilled;
          dispatch(setActiveStep(updatedStep));
        } catch (error) {
          // Обработка ошибки, если нужно
          console.error("Ошибка обновления компетенции в store:", error);
        }
      },
    }),
    updateUserStep: builder.mutation<IUserStep, IUpdateUserStep>({
      query: (data) => ({
        url: "/step/user",
        method: "PATCH",
        body: data,
        invalidatesTags: (result, error, arg) => [{ type: "Step", id: arg.id }],
      }),
    }),
    updateUserCompetency: builder.mutation<
      IUserCompetency,
      IUpdateUserCompetency
    >({
      query: (data) => ({
        url: `/competency/update/${data.id}`,
        method: "PATCH",
        body: { is_completed: data.is_completed },
        invalidatesTags: (result, error, arg) => [
          { type: "Competency", id: arg.id },
        ],
      }),
    }),
  }),
});

export const {
  useGetAllCompetenciesForProfessionQuery,
  useGetCompetencyByIdQuery,
  useGetStepAllInfoQuery,
  useGetStepsForCompetencyQuery,
  useUpdateUserCompetencyMutation,
  useUpdateUserStepMutation,
  useGetAllProfessionInfoQuery,
} = userDataApiSlice;
