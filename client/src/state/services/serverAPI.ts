import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/constants";
import { Options as Exercises, Weight } from "../../types";
import { RootState } from "../store";

export const serverAPI = createApi({
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      console.log(state.user?.token);
      if (state.user) {
        headers.set("authorization", `bearer ${state.user.token}`);
      }
      return headers;
    },
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    getExercises: builder.query<Exercises[], void>({
      query: () => "exercises",
    }),
    getWeight: builder.query<Weight[], string | undefined>({
      query: (id) => ({ url: `users/${id}/weight` }),
    }),
    submitWeight: builder.mutation<Weight, { id: string; body: Weight }>({
      query: ({ id, body }) => ({
        url: `users/${id}/weight`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useGetWeightQuery,
  useSubmitWeightMutation,
} = serverAPI;
