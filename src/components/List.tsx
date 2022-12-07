import { IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { todoIsDone } from "../reducer/todo.slice";
import classes from "./styles.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";

export const List = () => {
  const listTodo = useAppSelector((state) => state.todoReducer.list);
  const dispatch = useAppDispatch();

  return (
    <Stack alignItems="center" pb={5}>
      <Stack
        alignItems="center"
        mt={5}
        width={{ xs: "300px", sm: "500px", md: "600px", lg: "800px" }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            minHeight: "50vh",
            padding: "20px",
            background: "rgba(235, 217, 217, 0.4)",
            backdropFilter: "blur(6.6px)",
            WebkitBackdropFilter: "blur(6.6px)",
            border: "1px solid rgba(235, 217, 217, 0.5)",
            borderRadius: "20px",
          }}
          elevation={3}
        >
          {listTodo.length ? (
            listTodo.map((el, id) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width={{ xs: "200px", sm: "400px", md: "500px", lg: "600px" }}
                border="1px solid rgba(235, 217, 217, 1)"
                borderRadius="0 10px 0 10px"
                p="10px"
                mb={2}
                key={`toDoNumber_${id}`}
              >
                <Typography
                  color="#FFFFFF"
                  className={classes.firstUppercaseLetter}
                >
                  {el}
                </Typography>
                <Tooltip title="Удалить задачу" placement="right-start">
                  <IconButton
                    onClick={() => {
                      dispatch(todoIsDone(el));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))
          ) : (
            <>
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
            </>
          )}
        </Paper>
      </Stack>
    </Stack>
  );
};
