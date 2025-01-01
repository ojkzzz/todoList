import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "../../helpers/api/baseQueryWithReauth";
import { BASE_API_URL } from "../../../../libs/constants/http";
import { SuccessResponse } from "../../../../libs/types/successResponse";
import { Todo } from "../../../../models/todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllTodos: builder.query<SuccessResponse<Todo[]>, void>({
      query: () => `${BASE_API_URL}/tasks`,
    }),
  }),
});

export const { useLazyGetAllTodosQuery } = todoApi;
