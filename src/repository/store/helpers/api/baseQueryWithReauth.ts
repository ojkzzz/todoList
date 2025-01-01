import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { JWT_TOKENS_KEYS } from "../../../../libs/constants/tokens";
import { BASE_API_URL } from "../../../../libs/constants/http";
import { login, logout } from "../../auth/slice/auth.slice";

const prepareHeaders = (headers: any) => {
  const access_token = sessionStorage.getItem(JWT_TOKENS_KEYS.ACCESS_TOKEN);
  if (access_token) {
    headers.set("Authorization", `Bearer ${access_token}`);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  prepareHeaders: prepareHeaders,
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refresh_token = sessionStorage.getItem(JWT_TOKENS_KEYS.REFRESH_TOKEN);
    const refreshResult: any = await baseQuery(
      {
        url: `${BASE_API_URL}/auth/refresh`,
        method: "POST",
        headers: {
          "Authorization-Refresh": `Bearer ${refresh_token}`,
        },
      },
      api,
      extraOptions
    );

    if (refreshResult.data && refreshResult.data.message) {
      const { access_token, refresh_token } = refreshResult.data.message;
      sessionStorage.setItem(JWT_TOKENS_KEYS.ACCESS_TOKEN, access_token);
      sessionStorage.setItem(JWT_TOKENS_KEYS.REFRESH_TOKEN, refresh_token);

      api.dispatch(login());
      result = await baseQuery(args, api, extraOptions);
    } else {
      sessionStorage.removeItem(JWT_TOKENS_KEYS.ACCESS_TOKEN);
      sessionStorage.removeItem(JWT_TOKENS_KEYS.REFRESH_TOKEN);

      api.dispatch(logout());
    }
  }
  return result;
};
