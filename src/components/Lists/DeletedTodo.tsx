import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteTodo, returnTodo } from "../../reducer/todo.slice";
import classes from "../styles.module.scss";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import UndoIcon from "@mui/icons-material/Undo";

const DeletedTodo = () => {
  const dispatch = useAppDispatch();
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const trashedTodos = listTodo.filter((todo) => todo.isDeleted === true);
  if (trashedTodos.length) {
    return (
      <Stack>
        {trashedTodos.map((el, id) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={{
              xs: "200px",
              sm: "400px",
              md: "500px",
              lg: "600px",
            }}
            border="1px solid rgba(235, 217, 217, 1)"
            borderRadius="0 10px 0 10px"
            p="10px"
            mb={2}
            sx={{ backgroundColor: "rgba(255,51,51, 0.3)" }}
            key={`deletedToDoNumber_${id}`}
          >
            <Typography
              color="#FFFFFF"
              className={classes.firstUppercaseLetter}
              ml={2}
            >
              {el.text}
            </Typography>
            <Stack direction="row">
              <Tooltip title="Вернуть задачу" placement="top">
                <IconButton
                  onClick={() => {
                    dispatch(
                      returnTodo(
                        listTodo.findIndex((todo) => todo.text === el.text)
                      )
                    );
                  }}
                >
                  <UndoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить задачу" placement="right-start">
                <IconButton
                  onClick={() => {
                    dispatch(deleteTodo(el.text));
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        ))}
      </Stack>
    );
  }
  return null;
};

export default DeletedTodo;
