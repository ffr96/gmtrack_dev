import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "utils/constants";
import {
  Exercises,
  Options as ExercisesOptions,
  TrainingLog,
  Weight,
} from "types";
import { RootState } from "../store";

export const serverAPI = createApi({
  tagTypes: ["Weight", "Logs"],
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
    getWeight: builder.query<Weight[], string | undefined>({
      query: (id) => ({ url: `users/${id}/weight` }),
      providesTags: ["Weight"],
    }),
    submitWeight: builder.mutation<Weight, { id: string; body: Weight }>({
      query: ({ id, body }) => ({
        url: `users/${id}/weight`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Weight"],
    }),
    getLogs: builder.query<TrainingLog[], string | undefined>({
      query: (id) => ({ url: `users/${id}/logs` }),
      providesTags: ["Logs"],
      transformResponse: (response: TrainingLog[]) => {
        return response.reverse();
      },
    }),
    getLogById: builder.query<TrainingLog, { logID: string; userID: string }>({
      query: ({ logID, userID }) => `users/${userID}/logs/${logID}`,
      transformResponse: (response: TrainingLog) => {
        return response;
      },
    }),
    submitLogs: builder.mutation<
      TrainingLog,
      { id: string; body: TrainingLog }
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
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetWeightQuery,
  useSubmitWeightMutation,
  useGetLogsQuery,
  useGetLogByIdQuery,
  useSubmitLogsMutation,
} = serverAPI;
