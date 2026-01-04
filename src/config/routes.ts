import type { LucideIcon } from "lucide-react"
import { BarChart3, Home, Link2, Settings, User } from "lucide-react"

/**
 * Navigation Item Configuration
 */
export interface NavItem {
    name: string
    href: string
    icon: LucideIcon
    description?: string
    badge?: string
    disabled?: boolean
    children?: NavItem[]
}

/**
 * Dashboard Navigation Configuration
 */
export const dashboardNav: NavItem[] = [
    {
        name: "Dashboard",
        href: "/dash",
        icon: Home,
        description: "Overview and statistics",
    },
    {
        name: "Links",
        href: "/links",
        icon: Link2,
        description: "Manage your shortened links",
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: BarChart3,
        description: "View detailed analytics",
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Configure your preferences",
    },
]

/**
 * User Menu Configuration
 */
export const userMenuNav: NavItem[] = [
    {
        name: "Profile",
        href: "/profile",
        icon: User,
        description: "Manage your profile",
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        description: "Account settings",
    },
]

/**
 * Application Routes
 */
export const routes = {
    // Public routes
    home: "/",

    // Auth routes
    auth: {
        login: "/login",
        register: "/register",
        logout: "/logout",
    },

    // Dashboard routes
    dashboard: {
        home: "/dash",
        links: "/links",
        analytics: "/analytics",
        settings: "/settings?tab=general",
        profile: "/settings?tab=profile",
    },

    // API routes
    api: {
        auth: {
            login: "/api/v1/auth/login",
            register: "/api/v1/auth/register",
        },
        profile: "/api/v1/profile",
        search: "/api/search",
    },

    // Legal routes
    legal: {
        terms: "/terms",
        privacy: "/privacy",
    },
} as const

/**
 * Search Quick Links Configuration
 */
export const searchQuickLinks = [
    {
        id: "1",
        shortUrl: "Analytics",
        originalUrl: routes.dashboard.analytics,
        clicks: 1234,
        icon: BarChart3,
    },
    {
        id: "2",
        shortUrl: "Links",
        originalUrl: routes.dashboard.links,
        clicks: 856,
        icon: Link2,
    },
    {
        id: "3",
        shortUrl: "Settings",
        originalUrl: routes.dashboard.settings,
        clicks: 432,
        icon: Settings,
    },
]

// Type exports
export type Routes = typeof routes
