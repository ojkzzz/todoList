import {
  Alert,
  CircularProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import AllTodos from "./AllTodos";
import CompletedTodos from "./CompletedTodos";
import CurrentTodos from "./CurrentTodos";
import classes from "./styles/styles.module.scss";
import { useLazyGetAllTodosQuery } from "../../../repository/store/todo/api/todo.api";

const Todos = () => {
  const [trigger, { data, isLoading, error }] = useLazyGetAllTodosQuery();
  useEffect(() => {
    trigger()
      .unwrap()
      .then((_res) => {})
      .catch((_err) => {});
  }, []);

  const allTodos = useMemo(() => (data ? data.data : []), [data]);
  const completedTodos = useMemo(
    () => (data ? data.data.filter((todo) => todo.done === true) : []),
    [data]
  );
  const currentTodos = useMemo(
    () =>
      data
        ? data.data.filter((todo) => todo.done === false && todo.done === false)
        : [],
    [data]
  );

  const [filterValue, setFilterValue] = useState("current");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilterValue(newValue);
  };

  useEffect(() => {
    if (completedTodos.length === 0 && filterValue === "completed") {
      setFilterValue("all");
    } else if (currentTodos.length === 0 && filterValue === "current") {
      setFilterValue("all");
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
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
            {data?.data.length ? (
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
                    data.data.length
                      ? `Все дела (${data.data.length})`
                      : "Все дела"
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
            {filterValue === "current" && <CurrentTodos todos={currentTodos} />}
            {filterValue === "all" && <AllTodos todos={allTodos} />}
            {filterValue === "completed" && (
              <CompletedTodos todos={completedTodos} />
            )}
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
