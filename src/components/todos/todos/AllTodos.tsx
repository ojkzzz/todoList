import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Todo } from "../../../models/todo";
import TodoItem from "./TodoItem";

const AllTodos: FC<{ todos: Todo[] }> = ({ todos }) => {
  if (todos.length) {
    return (
      <Stack>
        {todos.map((el) => (
          <TodoItem key={el.id} {...el} />
        ))}
      </Stack>
    );
  }
  return (
    <Stack textAlign={"center"}>
      <Typography
        color="#FFFFFF"
        variant="subtitle2"
        fontWeight="bold"
        gutterBottom
      >
        Список дел пока ещё пуст
      </Typography>
      <Typography color="#FFFFFF" variant="subtitle1" fontWeight="bold">
        Самое время его пополнить!
      </Typography>
    </Stack>
  );
};

export default AllTodos;
