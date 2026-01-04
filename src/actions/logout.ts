"use server";

import { redirect } from "next/navigation";

import { AUTH_COOKIE_NAME } from "@/app/constant/auth.constant";
import { removeCookie } from "@/lib/helper/auth";

export const handleLogout = async (redirectTo?: string) => {
  await removeCookie(AUTH_COOKIE_NAME);
  if (redirectTo) {
    return redirect(`/login?next=${encodeURIComponent(redirectTo)}`);
  }
  return redirect("/login");
};
