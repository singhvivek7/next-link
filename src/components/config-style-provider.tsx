"use client";

import { siteConfig } from "@/config/site";

export function ConfigStyleProvider() {
    if (!siteConfig.theme?.cssVars) return null;

    const { cssVars } = siteConfig.theme;

    // Manual mapping to ensure exact matches with Tailwind expectations
    const styles = {
        "--background": cssVars.background,
        "--foreground": cssVars.foreground,
        "--card": cssVars.card,
        "--card-foreground": cssVars.cardForeground,
        "--popover": cssVars.popover,
        "--popover-foreground": cssVars.popoverForeground,
        "--primary": cssVars.primary,
        "--primary-foreground": cssVars.primaryForeground,
        "--secondary": cssVars.secondary,
        "--secondary-foreground": cssVars.secondaryForeground,
        "--muted": cssVars.muted,
        "--muted-foreground": cssVars.mutedForeground,
        "--accent": cssVars.accent,
        "--accent-foreground": cssVars.accentForeground,
        "--destructive": cssVars.destructive,
        "--destructive-foreground": cssVars.destructiveForeground,
        "--border": cssVars.border,
        "--input": cssVars.input,
        "--ring": cssVars.ring,
        "--radius": cssVars.radius,
    } as React.CSSProperties;

    return (
        <style jsx global>{`
      :root {
        --background: ${cssVars.background};
        --foreground: ${cssVars.foreground};
        --card: ${cssVars.card};
        --card-foreground: ${cssVars.cardForeground};
        --popover: ${cssVars.popover};
        --popover-foreground: ${cssVars.popoverForeground};
        --primary: ${cssVars.primary};
        --primary-foreground: ${cssVars.primaryForeground};
        --secondary: ${cssVars.secondary};
        --secondary-foreground: ${cssVars.secondaryForeground};
        --muted: ${cssVars.muted};
        --muted-foreground: ${cssVars.mutedForeground};
        --accent: ${cssVars.accent};
        --accent-foreground: ${cssVars.accentForeground};
        --destructive: ${cssVars.destructive};
        --destructive-foreground: ${cssVars.destructiveForeground};
        --border: ${cssVars.border};
        --input: ${cssVars.input};
        --ring: ${cssVars.ring};
        --radius: ${cssVars.radius};
      }
    `}</style>
    );
}
