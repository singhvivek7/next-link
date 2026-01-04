"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { handleLogout } from "@/actions/logout";
import { siteConfig } from "@/config/site";

import ThemeSelection from "./theme-selection";
import { Button } from "./ui/button";

export default function DashHeader() {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  return (
    <header className="bg-muted">
      <nav className="flex items-center justify-between max-w-7xl mx-auto h-16">
        <Link href="/" className="flex items-center gap-2">
          {siteConfig.logos.light && siteConfig.logos.dark ? (
            <>
              <Image src={siteConfig.logos.light} alt={siteConfig.name} width={140} height={40} className="dark:hidden block" />
              <Image src={siteConfig.logos.dark} alt={siteConfig.name} width={140} height={40} className="hidden dark:block" />
              <h1 className="sr-only">{siteConfig.name}</h1>
            </>
          ) : (
            <h1 className="text-xl font-bold">{siteConfig.name}</h1>
          )}
        </Link>


        <div className="flex items-center gap-4">
          <ThemeSelection />
          <Button asChild>
            <Link href="/profile">Profile</Link>
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={async () => {
              queryClient.clear();
              await handleLogout(pathname);
            }}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
