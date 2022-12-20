import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  deleteTodo,
  doneTodo,
  moveToTrash,
  returnTodo,
} from "../../reducer/todo.slice";
import classes from "../styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const AllTodos = () => {
  const dispatch = useAppDispatch();
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  if (listTodo.length) {
    return (
      <Stack>
        {listTodo.map((el, id) => {
          return (
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
              sx={{
                backgroundColor: el.isDone
                  ? "rgba(0,255,0, 0.3)"
                  : el.isDeleted
                  ? "rgba(255,51,51, 0.3)"
                  : "transparent",
              }}
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
                {el.isDone || el.isDeleted ? (
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
                ) : (
                  <Tooltip title="Задача выполнена" placement="top">
                    <IconButton
                      onClick={() => {
                        dispatch(
                          doneTodo(
                            listTodo.findIndex((todo) => todo.text === el.text)
                          )
                        );
                      }}
                    >
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {el.isDeleted ? (
                  <Tooltip title="Удалить задачу" placement="right-start">
                    <IconButton
                      onClick={() => {
                        dispatch(deleteTodo(el.text));
                      }}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Переместить в корзину"
                    placement="right-start"
                  >
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
                )}
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    );
  }
  return (
    <Stack textAlign={"center"}>
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

export default AllTodos;
