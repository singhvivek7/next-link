import axios from "axios";

import { env } from "@/config/env";

export const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
