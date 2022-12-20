import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { doneTodo, moveToTrash } from "../../reducer/todo.slice";
import classes from "../styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

const CurrentTodos = () => {
  const dispatch = useAppDispatch();
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const currentTodos = listTodo.filter(
    (todo) => todo.isDone === false && todo.isDeleted === false
  );
  if (currentTodos.length) {
    return (
      <Stack>
        {currentTodos.map((el, id) => (
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
            key={`currentToDoNumber_${id}`}
          >
            <Typography
              color="#FFFFFF"
              className={classes.firstUppercaseLetter}
              ml={2}
            >
              {el.text}
            </Typography>
            <Stack direction="row">
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
        ))}
      </Stack>
    );
  }
  return (
    <Stack pb={5}>
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

export default CurrentTodos;
