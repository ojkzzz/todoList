import { Button, Paper, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { ChangeEvent, memo, useState } from "react";
import classes from "./styles/styles.module.scss";
import { toast } from "react-toastify";
import { logout } from "repository/store/auth/slice/auth.slice";
import { useAppDispatch } from "libs/hooks";
import { useCreateTodoMutation } from "repository/store/todo/api/todo.api";

const defaultValues = {
  title: "",
};

const TodosHeader = () => {
  const [state, setState] = useState(defaultValues);

  const handleExit = () => {
    dispatch(logout());
  };
  const dispatch = useAppDispatch();

  const handleChangeStateValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTodo(state)
      .unwrap()
      .then((_res) => {
        toast.success("Задача успешно создана");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ошибка создания новой задачи");
      });
  };
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
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
              type="submit"
              disabled={isLoading}
              sx={{
                backgroundColor: "rgb(10%, 46%, 82%, 0.6)",
              }}
            >
              {window.innerWidth <= 600 ? "Добавить дело" : "Добавить"}
            </Button>
            <TextField
              name="title"
              label="Пополните список дел"
              variant="standard"
              value={state["title"]}
              onChange={handleChangeStateValue}
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
