import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { moveToTrash, returnTodo } from "../../reducer/todo.slice";
import classes from "../styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";

const CompletedTodos = () => {
  const dispatch = useAppDispatch();
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const completedTodo = listTodo.filter((todo) => todo.isDone === true);
  if (completedTodo.length) {
    return (
      <Stack>
        {completedTodo.map((el, id) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width={{
                xs: "100%",
                lg: "600px",
              }}
              border="1px solid rgba(235, 217, 217, 1)"
              borderRadius="0 10px 0 10px"
              p="10px"
              mb={2}
              sx={{ backgroundColor: "rgba(0,255,0, 0.3)" }}
              key={`toDoNumber_${id}`}
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
                <Tooltip title="Переместить в корзину" placement="right-start">
                  <IconButton
                    onClick={() => {
                      dispatch(
                        moveToTrash(
                          listTodo.findIndex((todo) => todo.text === el.text)
                        )
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    );
  }
  return null;
};

export default CompletedTodos;
