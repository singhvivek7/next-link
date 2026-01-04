import { redirect } from "next/navigation";

import { useAuth } from "@/lib/helper/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await useAuth();

  if (isAuthenticated) {
    return redirect("/dash");
  }
  return children;
}
