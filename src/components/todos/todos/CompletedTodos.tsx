import { Stack } from "@mui/material";
import { FC } from "react";
import { Todo } from "../../../models/todo";
import TodoItem from "./TodoItem";

const CompletedTodos: FC<{ todos: Todo[] }> = ({ todos }) => {
  if (todos.length) {
    return (
      <Stack>
        {todos.map((el) => (
          <TodoItem key={el.id} {...el} />
        ))}
      </Stack>
    );
  }
  return null;
};

export default CompletedTodos;
