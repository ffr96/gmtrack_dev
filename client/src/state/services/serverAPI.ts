import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "utils/constants";
import {
  Exercises,
  Options as ExercisesOptions,
  TrainingLog,
  User,
  Weight,
} from "types";
import { RootState } from "../store";
import { buildUrlQuery } from "utils/functionUtils";

export interface LoginRequest {
  username: string;
  password: string;
}

type filterOptions = {
  name?: string;
  from?: string;
  to?: string;
};

export const serverAPI = createApi({
  tagTypes: ["Weight", "Logs", "SingleLog"],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      if (state.user) {
        headers.set("authorization", `bearer ${state.user.token}`);
      }
      return headers;
    },
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    getExercises: builder.query<ExercisesOptions[], void>({
      query: () => "exercises",
    }),
    getWeight: builder.query<
      Weight[],
      { id?: string; page?: number; filter?: filterOptions }
    >({
      query: ({ id, page, filter }) => ({
        url: `users/${id}/weight?${buildUrlQuery(page, filter)}`,
      }),
      providesTags: ["Weight"],
      transformResponse: (response: Weight[]) => {
        return response;
      },
    }),
    submitWeight: builder.mutation<Weight, { id: string; body: Weight }>({
      query: ({ id, body }) => ({
        url: `users/${id}/weight`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Weight"],
    }),
    getLogs: builder.query<
      TrainingLog[],
      { id: string | undefined; page?: number }
    >({
      query: ({ id, page }) => ({
        url: `users/${id}/logs?${page === undefined ? "" : `page=${page}`}`,
      }),
      providesTags: ["Logs"],
      transformResponse: (response: TrainingLog[]) => {
        return response;
      },
    }),
    getLogById: builder.query<TrainingLog, { logID: string; userID: string }>({
      query: ({ logID, userID }) => `users/${userID}/logs/${logID}`,
      transformResponse: (response: TrainingLog) => {
        return response;
      },
      providesTags: ["SingleLog"],
    }),
    submitLogs: builder.mutation<
      TrainingLog,
      { id: string; body: Omit<TrainingLog, "id"> }
    >({
      query: ({ id, body }) => ({
        url: `users/${id}/logs`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["Logs"],
    }),
    submitExercise: builder.mutation<
      Exercises,
      { userId: string; id: string; body: Exercises }
    >({
      query: ({ id, userId, body }) => ({
        url: `users/${userId}/logs/${id}`,
        body: body,
        method: "POST",
      }),
      invalidatesTags: ["Logs", "SingleLog"],
    }),
    deleteLog: builder.mutation<
      void,
      { id: string | undefined; userId: string }
    >({
      query: ({ id, userId }) => ({
        url: `users/${userId}/logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs"],
    }),
    login: builder.mutation<User, LoginRequest>({
      query: (credentials) => ({
        url: `/login`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetWeightQuery,
  useSubmitWeightMutation,
  useGetLogsQuery,
  useGetLogByIdQuery,
  useSubmitExerciseMutation,
  useSubmitLogsMutation,
  useDeleteLogMutation,
  useLoginMutation,
} = serverAPI;
