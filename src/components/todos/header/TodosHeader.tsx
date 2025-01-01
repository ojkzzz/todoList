import { Button, Paper, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useAppDispatch, useAppSelector } from "../../../libs/hooks";
import { ChangeEvent, memo, useState } from "react";
import {
  addTodo,
  makeAlertHidden,
  makeAlertVisible,
} from "../../../repository/store/todo/slice/todo.slice";
import classes from "./styles/styles.module.scss";
import { logout } from "../../../repository/store/auth/slice/auth.slice";

const TodosHeader = () => {
  const [text, setText] = useState("");
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const currentTodo = listTodo.filter(
    (todo: any) => todo.isDeleted === false && todo.isDone === false
  );
  const dispatch = useAppDispatch();

  const hasDoubles = listTodo.some((el: any) => el.text === text.trim());

  const handleAddTodo = () => {
    if (currentTodo.length === 10) {
      dispatch(makeAlertVisible());
      setTimeout(() => {
        dispatch(makeAlertHidden());
      }, 3000);
      return;
    }
    if (text !== "" && !hasDoubles) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleExit = () => {
    dispatch(logout());
  };

  const handleTodoText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitDeal = (e: any) => {
    e.preventDefault();
    handleAddTodo();
  };

  return (
    <form className={classes.form} onSubmit={submitDeal}>
      <Stack
        width={{ xs: "85%", sm: "500px", md: "600px", lg: "800px" }}
        mt={5}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={50}
      >
        <Paper
          sx={{
            padding: "20px",
            width: "100%",
            background: "rgba(235, 217, 217, 0.4)",
            backdropFilter: "blur(6.6px)",
            WebkitBackdropFilter: "blur(6.6px)",
            border: "1px solid rgba(235, 217, 217, 0.5)",
            borderRadius: "20px",
          }}
          elevation={3}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={"10px"}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTodo}
              sx={{
                // width: window.innerWidth < 601 ? "204px" : "auto",
                backgroundColor: "rgb(10%, 46%, 82%, 0.6)",
              }}
            >
              {window.innerWidth <= 600 ? "Добавить дело" : "Добавить"}
            </Button>
            <TextField
              id="todoField"
              label="Пополните список дел"
              variant="standard"
              value={text}
              onChange={handleTodoText}
              sx={{ alignItems: "center" }}
              InputLabelProps={{
                style: { color: "rgb(224,224,224)" },
              }}
              InputProps={{
                style: {
                  color: "rgb(255,255,255)",
                },
              }}
            />
            <Button
              variant="contained"
              color="error"
              endIcon={<ClearAllIcon />}
              onClick={handleExit}
              sx={{ backgroundColor: "rgb(83%, 18%, 18%, 0.6);" }}
            >
              Выйти
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </form>
  );
};

export default memo(TodosHeader);
