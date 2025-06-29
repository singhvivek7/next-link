"use server";

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { removeCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export const handleLogout = async () => {
  await removeCookie(AUTH_COOKIE_NAME);
  return redirect("/login");
};
