"use client"

import { useQueryClient } from "@tanstack/react-query";
import { Bell, LogOut, Menu, Plus, Search, Settings, Sparkles, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"

import { handleLogout } from "@/actions/logout"
import { CreateLinkDialog } from "@/components/dashboard/create-link-dialog"
import { SearchDialog } from "@/components/dashboard/search-dialog"
import { UpgradeDialog } from "@/components/dashboard/upgrade-dialog"
import { ThemePicker } from "@/components/theme-picker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { routes } from "@/config/routes"
import { useProfile } from "@/hooks/use-profile"

interface DashboardHeaderProps {
  onMenuClick: () => void
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

import { UPGRADE_GRADIENT_STYLES } from "@/lib/constant/ui.constant"

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false)
  const [createLinkOpen, setCreateLinkOpen] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)
  const { data: profile } = useProfile()

  const userInitials = profile?.data?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U"

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="w-full px-6 flex items-center gap-4 justify-between">
          {/* Left Section - Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-none"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Center - Search Button */}
          <Button
            onClick={() => setSearchOpen(true)}
            className="flex-1 max-w-xs flex items-center gap-2 h-9 px-3 rounded-none bg-muted/30 border border-primary/50 hover:bg-muted/50 transition-colors text-sm text-foreground/60"
          >
            <Search className="h-4 w-4" />
            <span>Search links...</span>
            <kbd className="ml-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded-none border border-border bg-primary px-1.5 font-mono text-[10px] font-medium text-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Upgrade Button */}
            <Button size="sm" className={`hidden sm:flex gap-2 rounded-none ${UPGRADE_GRADIENT_STYLES} border-0 hover:opacity-90 transition-opacity`} onClick={() => setUpgradeOpen(true)}>
              <Sparkles className="h-4 w-4" />
              <span>Upgrade</span>
            </Button>

            {/* Create New Link Button */}
            <Button size="sm" className="hidden sm:flex gap-2 rounded-none" onClick={() => setCreateLinkOpen(true)}>
              <Plus className="h-4 w-4" />
              <span>New Link</span>
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-none">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="default"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center"
                  >
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rounded-none">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">New link created</span>
                      <span className="ml-auto text-xs text-muted-foreground">2m ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your link "example.com" has been shortened
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-2 w-2 rounded-full bg-muted" />
                      <span className="text-sm font-medium">Link clicked</span>
                      <span className="ml-auto text-xs text-muted-foreground">1h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Someone clicked your link from Twitter
                    </p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="flex items-center gap-2 w-full">
                      <div className="h-2 w-2 rounded-full bg-muted" />
                      <span className="text-sm font-medium">Monthly report ready</span>
                      <span className="ml-auto text-xs text-muted-foreground">3h ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your analytics report for December is ready
                    </p>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center text-primary">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Picker */}
            <ThemePicker />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-none p-0">
                  <Avatar className="h-9 w-9 rounded-none">
                    <AvatarImage src={profile?.data?.avatar} alt={profile?.data?.name || "User"} />
                    <AvatarFallback className="rounded-none bg-primary text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-none" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {profile?.data?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {profile?.data?.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={routes.dashboard.profile} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={routes.dashboard.settings} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={async () => {
                    queryClient.clear();
                    await handleLogout(pathname);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Create Link Dialog */}
      <CreateLinkDialog open={createLinkOpen} onOpenChange={setCreateLinkOpen} />

      {/* Upgrade Dialog */}
      <UpgradeDialog open={upgradeOpen} onOpenChange={setUpgradeOpen} user={{ name: profile?.data?.name, email: profile?.data?.email }} />
    </>
  )
}
