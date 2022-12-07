import { Alert, Typography } from "@mui/material";
import { useAppSelector } from "../../hooks/hooks";

import { alertHidden, alertVisible } from "./alertStyles";

const AlertCustom = () => {
  const isVisible = useAppSelector((state) => state.todoReducer.isVisibleAlert);
  return (
    <Alert sx={isVisible ? alertVisible : alertHidden} severity="error">
      <Typography>Нельзя добавить больше 10-ти дел</Typography>
      <Typography>Вначале закончите текущие</Typography>
    </Alert>
  );
};

export default AlertCustom;
