"use server";

import { decode } from "jsonwebtoken";
import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { IJwtPayload } from "@/app/types/auth.type";
import { env } from "@/config/env";

import { decryptData, encryptData } from "./storage";

const cookieSecret = env.JWT_SECRET || "next-link-cookie-secret";

export const setCookie = async (key: string, value: string) => {
  const encryptedValue = encryptData(value, cookieSecret);
  (await cookies()).set(key, encryptedValue);
};

export const removeCookie = async (key: string) => {
  (await cookies()).delete(key);
};

export const useAuth = async () => {
  const cookieStore = await cookies();

  const encryptedToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!encryptedToken) {
    return {
      isAuthenticated: false,
    };
  }

  const token = decryptData(encryptedToken, cookieSecret);

  if (!token || typeof token !== "string") {
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
