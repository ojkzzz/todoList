import { Button, Paper, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ChangeEvent, memo, useState } from "react";
import {
  addTodo,
  makeAlertHidden,
  makeAlertVisible,
  resetTodo,
} from "../reducer/todo.slice";
import classes from "./styles.module.scss";
import AlertCustom from "./Alert/Alert";

const Header = () => {
  const [text, setText] = useState("");
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const dispatch = useAppDispatch();

  const handleAddTodo = () => {
    if (listTodo.length === 10) {
      dispatch(makeAlertVisible());
      setTimeout(() => {
        dispatch(makeAlertHidden());
      }, 3000);
      return;
    }
    if (text !== "") {
      dispatch(addTodo(text));
      setText("");
    }
  };

  const handleResetTodo = () => {
    dispatch(resetTodo());
  };

  const handleTodoText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitDeal = (e: any) => {
    e.preventDefault();
    handleAddTodo();
  };

  const MemoizedAlert = memo(AlertCustom);
  return (
    <form className={classes.form} onSubmit={submitDeal}>
      <Stack
        width={{ xs: "300px", sm: "500px", md: "600px", lg: "800px" }}
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
            gap="10px"
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTodo}
              sx={{
                width: window.innerWidth < 601 ? "204px" : "auto",
                backgroundColor: "rgb(10%, 46%, 82%, 0.6)",
              }}
            >
              Добавить дело
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
              onClick={handleResetTodo}
              sx={{ backgroundColor: "rgb(83%, 18%, 18%, 0.6);" }}
            >
              Сбросить список
            </Button>
          </Stack>
        </Paper>
      </Stack>
      <MemoizedAlert />
    </form>
  );
};

export default Header;
