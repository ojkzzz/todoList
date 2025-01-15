import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { Todo } from "../../../models/todo";
import DoneIcon from "@mui/icons-material/Done";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import classes from "./styles/styles.module.scss";

interface Props extends Todo {
  handleChangeStatus: () => void;
  handleDelete: () => void;
}

const TodoItem: FC<Props> = ({
  title,
  done,
  handleChangeStatus,
  handleDelete,
}) => {
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
        {!done && (
          <Tooltip title="Задача выполнена" placement="top">
            <IconButton onClick={handleChangeStatus}>
              <DoneIcon />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="Удалить задачу" placement="right-start">
          <IconButton onClick={handleDelete}>
            <RemoveCircleIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default TodoItem;
