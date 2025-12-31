import { useAuth } from "@/lib/helper/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await useAuth();

  if (isAuthenticated) {
    return redirect("/dash");
  }
  return (
    <>
      <header className="h-16 bg-accent">header</header>
      {children}
    </>
  );
}
