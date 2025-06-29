"use server";

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { setCookie } from "@/lib/auth";
import { axiosInstance } from "@/lib/request";
import { LoginSchema } from "@/lib/validation";

export const handleLogin = async (loginForm: LoginSchema) => {
  try {
    const { data } = await axiosInstance.post("api/v1/login", loginForm);
    await setCookie(AUTH_COOKIE_NAME, data.data?.token);
    return;
  } catch (err: any) {
    throw new Error(err.response.data.message);
  }
};
