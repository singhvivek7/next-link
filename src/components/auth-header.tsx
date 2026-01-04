"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export function AuthHeader() {
    const pathname = usePathname()
    const isLogin = pathname === "/login"

    return (
        <header className="relative z-10 w-full border-b border-border/50 backdrop-blur-sm bg-background/80">
            <div className="w-full max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="transition-opacity hover:opacity-80">
                    <Logo className="h-8 w-auto" />
                </Link>

                {/* Right Side - Auth Toggle */}
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        asChild
                    >
                        <Link href={isLogin ? "/register" : "/login"}>
                            {isLogin ? "Sign up" : "Sign in"}
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
