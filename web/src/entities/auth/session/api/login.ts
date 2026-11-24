import api from "@/shared/lib/axios";
import { setCookie, deleteCookie } from "@/shared/lib/cookie";
import { CSRF_TOKEN_NAME } from "@/shared/api/csrf";
import { IS_LOGGED_IN_COOKIE } from "../model/cookie";

type LoginResponse = {
  headerName: string;
  token: string;
};

export async function login(loginId: string, password: string) {
  const response = await api.post<LoginResponse>("/api/login", {
    loginId,
    password,
  });
  setCookie(CSRF_TOKEN_NAME, response.data.token);
  setCookie(IS_LOGGED_IN_COOKIE, "true");
  return response.data;
}

export async function logout() {
  await api.post("/api/logout");
  deleteCookie(CSRF_TOKEN_NAME);
  deleteCookie(IS_LOGGED_IN_COOKIE);
}
