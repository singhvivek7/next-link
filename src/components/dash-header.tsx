import Link from "next/link";
import { Button } from "./ui/button";
import { handleLogout } from "@/actions/logout";
import ThemeSelection from "./theme-selection";

export default function DashHeader() {
  return (
    <header className="bg-muted">
      <nav className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <Link href="/">
          <h1 className="text-3xl font-bold text-primary font-secondary">
            NextURL
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeSelection />
          <Button asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
