import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { BASE_API_URL } from "libs/constants/http";
import { SuccessResponse } from "libs/types/successResponse";
import { Todo } from "models/todo";
import { baseQueryWithReauth } from "repository/store/helpers/api/baseQueryWithReauth";

const API_URL = `${BASE_API_URL}/tasks`;

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["todoList"],
  endpoints: (builder) => ({
    getAllTodos: builder.query<SuccessResponse<Todo[]>, void>({
      query: () => API_URL,
      providesTags: ["todoList"],
    }),
    changeStatusTodo: builder.mutation<any, Todo>({
      query: (body) => ({
        url: API_URL,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["todoList"],
    }),
    deleteTodo: builder.mutation<any, { id: number }>({
      query: (body) => ({
        url: API_URL,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["todoList"],
    }),
    createTodo: builder.mutation<any, { title: string }>({
      query: (body) => ({
        url: API_URL,
        method: "POST",
        body,
      }),
      invalidatesTags: ["todoList"],
    }),
  }),
});

export const {
  useLazyGetAllTodosQuery,
  useChangeStatusTodoMutation,
  useDeleteTodoMutation,
  useCreateTodoMutation,
} = todoApi;
