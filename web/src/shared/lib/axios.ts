import axios from "axios";
import { CSRF_TOKEN_NAME } from "@/shared/api/csrf";

const api = axios.create();
api.defaults.baseURL = "http://localhost:34962";
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.withCredentials = true;
api.defaults.xsrfCookieName = CSRF_TOKEN_NAME;
api.defaults.xsrfHeaderName = CSRF_TOKEN_NAME;

export default api;
