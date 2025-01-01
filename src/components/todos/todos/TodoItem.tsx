import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { Todo } from "../../../models/todo";
import DoneIcon from "@mui/icons-material/Done";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import classes from "./styles/styles.module.scss";

const TodoItem: FC<Todo> = ({ id, title, done }) => {
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
      sx={{
        backgroundColor: done ? "rgba(0,255,0, 0.3)" : "transparent",
      }}
    >
      <Typography
        color="#FFFFFF"
        className={classes.firstUppercaseLetter}
        ml={2}
      >
        {title}
      </Typography>
      <Stack direction="row">
        <Tooltip title="Задача выполнена" placement="top">
          <IconButton
          // onClick={() => {
          //   dispatch(
          //     doneTodo(
          //       data.data.findIndex(
          //         (todo) => todo.title === el.title
          //       )
          //     )
          //   );
          // }}
          >
            <DoneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Удалить задачу" placement="right-start">
          <IconButton
          // onClick={() => {
          //   dispatch(deleteTodo(el.text));
          // }}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default TodoItem;
