import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utils/constants";
import { Options } from "../../types";

export const exercises = createApi({
  reducerPath: "exercises",
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
  }),
  endpoints: (builder) => ({
    getExercises: builder.query<Options[], string>({
      query: () => "exercises",
    }),
  }),
});

export const { useGetExercisesQuery } = exercises;
