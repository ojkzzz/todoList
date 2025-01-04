import {
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";

import classes from "./styles/styles.module.scss";
import {
  useChangeStatusTodoMutation,
  useDeleteTodoMutation,
  useLazyGetAllTodosQuery,
} from "../../../repository/store/todo/api/todo.api";
import TodoItem from "./TodoItem";
import { Todo } from "../../../models/todo";
import { toast } from "react-toastify";

const Todos = () => {
  const [trigger, { data, isLoading, error }] = useLazyGetAllTodosQuery();
  useEffect(() => {
    trigger()
      .unwrap()
      .then((_res) => {})
      .catch((_err) => {});
  }, []);

  const [todos, setTodos] = useState<Todo[]>([]);

  const allTodos = useMemo(() => (data ? data.data : []), [data]);
  const completedTodos = useMemo(
    () => (data ? data.data.filter((todo) => todo.done === true) : []),
    [data]
  );
  const currentTodos = useMemo(
    () => (data ? data.data.filter((todo) => todo.done === false) : []),
    [data]
  );

  const [filterValue, setFilterValue] = useState("all");
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  useEffect(() => {
    if (completedTodos.length === 0 && filterValue === "completed") {
      setFilterValue("all");
    } else if (currentTodos.length === 0 && filterValue === "current") {
      setFilterValue("all");
    }
    if (data) {
      setTodos(data.data);
      setFilterValue("all");
    }
  }, [data]);

  useEffect(() => {
    if (filterValue === "all") {
      setTodos(allTodos);
    } else if (filterValue === "current") {
      setTodos(currentTodos);
    } else if (filterValue === "completed") {
      setTodos(completedTodos);
    }
  }, [filterValue]);

  const [changeStatus, { isLoading: _isLoadingChangingStatus }] =
    useChangeStatusTodoMutation();

  const [deleteTodo, { isLoading: _isLoadingDeletingTodo }] =
    useDeleteTodoMutation();

  const handleDelete = (todo: Todo) => {
    deleteTodo({ id: todo.id })
      .unwrap()
      .then((_res) => {
        toast.success("Задача успешно удалена!");
      })
      .catch((err) => {
        toast.error(err.data.message || "Что-то пошло не так...");
      });
  };

  const handleChangeStatus = (todo: Todo) => {
    changeStatus({ ...todo, done: !todo.done })
      .unwrap()
      .then((_res) => {
        toast.success("Статус успещно изменен!");
      })
      .catch((err) => {
        toast.error(err.data.message || "Что-то пошло не так...");
      });
  };

  if (isLoading)
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: "40px",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  if (data)
    return (
      <Stack alignItems="center" pb={5}>
        <Stack
          alignItems="center"
          mt={5}
          width={{ xs: "95%", sm: "500px", md: "600px", lg: "800px" }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: data?.data.length ? "flex-start" : "center",
              width: "100%",
              minHeight: "20vh",
              padding: "20px",
              background: "rgba(235, 217, 217, 0.4)",
              backdropFilter: "blur(6.6px)",
              WebkitBackdropFilter: "blur(6.6px)",
              border: "1px solid rgba(235, 217, 217, 0.5)",
              borderRadius: "20px",
            }}
            elevation={3}
          >
            {todos.length ? (
              <Tabs
                value={filterValue}
                onChange={handleChange}
                sx={{
                  padding: "20px 0 40px 0",
                  width: {
                    xs: "100%",
                    lg: "auto",
                  },
                }}
                variant="scrollable"
                allowScrollButtonsMobile={true}
                textColor="inherit"
                className={classes.tabs}
              >
                <Tab
                  label={
                    currentTodos.length
                      ? `Текущие дела (${currentTodos.length})`
                      : "Текущие дела"
                  }
                  value="current"
                  disabled={currentTodos.length > 0 ? false : true}
                />
                <Tab
                  label={
                    todos.length ? `Все дела (${todos.length})` : "Все дела"
                  }
                  value="all"
                />
                <Tab
                  label={
                    completedTodos.length
                      ? `Выполненные дела (${completedTodos.length})`
                      : "Выполненные дела"
                  }
                  value="completed"
                  disabled={completedTodos.length > 0 ? false : true}
                />
              </Tabs>
            ) : null}
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                handleDelete={() => handleDelete(todo)}
                handleChangeStatus={() => handleChangeStatus(todo)}
              />
            ))}
          </Paper>
        </Stack>
      </Stack>
    );
  if (error)
    return (
      <Alert
        //@ts-ignore
        title={
          //@ts-ignore
          "data" in error && "error" in error.data
            ? error.data
            : "Что-то пошло не так"
        }
      />
    );
  return null;
};

export default memo(Todos);
