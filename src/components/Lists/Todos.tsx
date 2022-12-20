import { Paper, Stack, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import AllTodos from "./AllTodos";
import CompletedTodos from "./CompletedTodos";
import CurrentTodos from "./CurrentTodos";
import DeletedTodo from "./DeletedTodo";
import classes from "./styles.module.scss";

export const Todos = () => {
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const completedTodo = listTodo.filter((todo) => todo.isDone === true);
  const currentTodo = listTodo.filter(
    (todo) => todo.isDone === false && todo.isDeleted === false
  );
  const deletedTodos = listTodo.filter((todo) => todo.isDeleted === true);
  const [filterValue, setFilterValue] = useState("current");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  useEffect(() => {
    if (completedTodo.length === 0 && filterValue === "completed") {
      setFilterValue("all");
    }
  }, [completedTodo]);

  useEffect(() => {
    if (deletedTodos.length === 0 && filterValue === "trash") {
      setFilterValue("all");
    }
  }, [deletedTodos]);

  useEffect(() => {
    if (currentTodo.length === 0 && filterValue === "current") {
      setFilterValue("all");
    }
  }, [currentTodo]);

  return (
    <Stack alignItems="center" pb={5}>
      <Stack
        alignItems="center"
        mt={5}
        width={{ xs: "300px", sm: "500px", md: "600px", lg: "800px" }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: listTodo.length ? "flex-start" : "center",
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
          {listTodo.length ? (
            <Tabs
              value={filterValue}
              onChange={handleChange}
              sx={{
                padding: "20px 0 40px 0",
                width: {
                  xs: "250px",
                  sm: "500px",
                  md: "600px",
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
                  currentTodo.length
                    ? `Текущие дела (${currentTodo.length})`
                    : "Текущие дела"
                }
                value="current"
                disabled={currentTodo.length > 0 ? false : true}
              />
              <Tab
                label={
                  listTodo.length ? `Все дела (${listTodo.length})` : "Все дела"
                }
                value="all"
              />
              <Tab
                label={
                  completedTodo.length
                    ? `Выполненные дела (${completedTodo.length})`
                    : "Выполненные дела"
                }
                value="completed"
                disabled={completedTodo.length > 0 ? false : true}
              />
              <Tab
                label={
                  deletedTodos.length
                    ? `Корзина (${deletedTodos.length})`
                    : "Корзина"
                }
                value="trash"
                disabled={deletedTodos.length > 0 ? false : true}
              />
            </Tabs>
          ) : null}
          {filterValue === "current" && <CurrentTodos />}
          {filterValue === "all" && <AllTodos />}
          {filterValue === "completed" && <CompletedTodos />}
          {filterValue === "trash" && <DeletedTodo />}
        </Paper>
      </Stack>
    </Stack>
  );
};
