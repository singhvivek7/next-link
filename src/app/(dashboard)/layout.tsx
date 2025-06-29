import { useAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ThemeProvider from "@/providers/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = await useAuth();

  if (!isAuthenticated) {
    return redirect("/register");
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
