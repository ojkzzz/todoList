import { Button, Paper, Stack, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useLoginMutation } from "../../repository/store/auth/api/auth.api";
import { JWT_TOKENS_KEYS } from "../../libs/constants/tokens";
import { useAppDispatch } from "../../libs/hooks";
import { login } from "../../repository/store/auth/slice/auth.slice";

const LoginPage = () => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [trigerLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: { login: string; password: string } = {
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    };

    trigerLogin(data)
      .unwrap()
      .then((res) => {
        sessionStorage.setItem(
          JWT_TOKENS_KEYS.ACCESS_TOKEN,
          res.data.access_token
        );
        sessionStorage.setItem(
          JWT_TOKENS_KEYS.REFRESH_TOKEN,
          res.data.refresh_token
        );
        dispatch(login());
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Stack
      sx={{
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          gap: "12px",
        }}
        elevation={5}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          name="login"
          label="Логин"
          variant="standard"
          error={error}
        />
        <TextField
          name="password"
          label="Пароль"
          variant="standard"
          type="password"
          error={error}
        />
        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          sx={{ mt: "18px" }}
        >
          Войти
        </Button>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
