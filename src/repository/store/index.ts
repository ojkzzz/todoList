import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/slice/todo.slice";
import authReducer from "./auth/slice/auth.slice";
import { authApi } from "./auth/api/auth.api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { todoApi } from "./todo/api/todo.api";

const store = configureStore({
  reducer: {
    todoReducer,
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, todoApi.middleware),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
