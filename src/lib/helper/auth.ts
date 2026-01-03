"use server";

import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { IJwtPayload } from "@/app/types/auth.type";

export const setCookie = async (key: string, value: string) => {
  (await cookies()).set(key, value);
};

export const removeCookie = async (key: string) => {
  (await cookies()).delete(key);
};

export const useAuth = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return {
      isAuthenticated: false,
    };
  }

  if (typeof token !== "string") {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const tokenData = decode(token) as IJwtPayload;
    return {
      isAuthenticated: true,
      tokenData,
    };
  } catch {
    return {
      isAuthenticated: false,
    };
  }
};
