import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "../../../../libs/constants/http";
import { SuccessResponse } from "../../../../libs/types/successResponse";

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation<
      SuccessResponse<Tokens>,
      { login: string; password: string }
    >({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
