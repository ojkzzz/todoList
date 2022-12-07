import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducer/todo.slice";

const store = configureStore({ reducer: { todoReducer } });

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
