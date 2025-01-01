import { Stack, Typography } from "@mui/material";
import { Todo } from "../../../models/todo";
import { FC } from "react";
import TodoItem from "./TodoItem";

const CurrentTodos: FC<{ todos: Todo[] }> = ({ todos }) => {
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
    <Stack pb={5}>
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

export default CurrentTodos;
