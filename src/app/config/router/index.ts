import { LoginPage, TodoPage } from "../../../pages";

export const ROUTER = {
  PUBLIC_ROUTES: [
    {
      path: "/login",
      Component: LoginPage,
    },
  ],
  PRIVATE_ROUTES: [
    {
      path: "/todo",
      Component: TodoPage,
    },
  ],
};
