import { createSlice } from "@reduxjs/toolkit";
import { JWT_TOKENS_KEYS } from "../../../../libs/constants/tokens";

const getDefaultAuthState = (): boolean => {
  const access_token = sessionStorage.getItem(JWT_TOKENS_KEYS.ACCESS_TOKEN);
  return Boolean(access_token);
};

const initialState = {
  auth: getDefaultAuthState(),
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state) => {
      state.auth = true;
    },
    logout: (state) => {
      state.auth = false;
      sessionStorage.removeItem(JWT_TOKENS_KEYS.ACCESS_TOKEN);
      sessionStorage.removeItem(JWT_TOKENS_KEYS.REFRESH_TOKEN);
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
