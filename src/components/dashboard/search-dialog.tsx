"use client"

import { Link2, Search, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { searchQuickLinks } from "@/config/routes"
import { cn } from "@/lib/utils"

interface SearchDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<typeof searchQuickLinks>([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const router = useRouter()

    // Get current list (either recent links or search results)
    const currentList = query ? results : searchQuickLinks

    // Reset selected index when list changes
    useEffect(() => {
        setSelectedIndex(0)
    }, [query, results.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault()
                    setSelectedIndex((prev) =>
                        prev < currentList.length - 1 ? prev + 1 : prev
                    )
                    break
                case "ArrowUp":
                    e.preventDefault()
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
                    break
                case "Enter":
                    e.preventDefault()
                    if (currentList[selectedIndex]) {
                        handleSelect(currentList[selectedIndex])
                    }
                    break
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, selectedIndex, currentList])

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        setIsSearching(true)
        const timer = setTimeout(async () => {
            try {
                // TODO: Replace with actual API call
                // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                // const data = await response.json()

                // Mock search - filter recent links
                const filtered = searchQuickLinks.filter(
                    (link) =>
                        link.shortUrl.toLowerCase().includes(query.toLowerCase()) ||
                        link.originalUrl.toLowerCase().includes(query.toLowerCase())
                )
                setResults(filtered)
            } catch (error) {
                console.error("Search error:", error)
                setResults([])
            } finally {
                setIsSearching(false)
            }
        }, 400)

        return () => clearTimeout(timer)
    }, [query])

    const handleSelect = (link: typeof searchQuickLinks[0]) => {
        // TODO: Navigate to link details or copy to clipboard
        router.push(link.originalUrl)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl p-0 rounded-none gap-0">
                <DialogHeader className="px-4 pt-4 pb-0 sr-only">
                    <DialogTitle>Search Links</DialogTitle>
                </DialogHeader>

                {/* Search Input */}
                <div className="relative border-b border-border">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search links..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="h-14 pl-12 pr-4 border-0 rounded-none focus-visible:ring-0 text-base"
                        autoFocus
                    />
                </div>

                {/* Results */}
                <div className="max-h-[400px] overflow-y-auto">
                    {!query && (
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-3">
                                <TrendingUp className="h-4 w-4" />
                                Top Links
                            </div>
                            <div className="space-y-1">
                                {searchQuickLinks.map((link, index) => (
                                    <Button
                                        key={link.id}
                                        variant="ghost"
                                        onClick={() => handleSelect(link)}
                                        className={cn(
                                            "w-full flex items-center justify-start gap-3 h-auto p-3 rounded-none transition-colors",
                                            !query && selectedIndex === index
                                                ? "bg-accent"
                                                : "hover:bg-accent"
                                        )}
                                    >
                                        <div className="shrink-0 w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center">
                                            <Link2 className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-foreground">
                                                    {link.shortUrl}
                                                </span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {link.clicks.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {link.originalUrl}
                                            </p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {query && isSearching && (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            Searching...
                        </div>
                    )}

                    {query && !isSearching && results.length > 0 && (
                        <div className="p-4">
                            <div className="text-sm font-medium text-muted-foreground mb-3">
                                {results.length} result{results.length !== 1 ? "s" : ""}
                            </div>
                            <div className="space-y-1">
                                {results.map((link, index) => (
                                    <Button
                                        key={link.id}
                                        variant="ghost"
                                        onClick={() => handleSelect(link)}
                                        className={cn(
                                            "w-full flex items-center justify-start gap-3 h-auto p-3 rounded-none transition-colors",
                                            query && selectedIndex === index ? "bg-muted" : "hover:bg-muted"
                                        )}
                                    >
                                        <div className="shrink-0 w-8 h-8 rounded-none bg-primary/10 flex items-center justify-center">
                                            <Link2 className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-foreground">
                                                    /{link.shortUrl}
                                                </span>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {link.clicks.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {link.originalUrl}
                                            </p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {query && !isSearching && results.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-sm text-muted-foreground">No links found</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Try searching with different keywords
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <kbd className="px-1.5 py-0.5 rounded-none border border-border bg-muted font-mono">
                            ↑↓
                        </kbd>
                        <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <kbd className="px-1.5 py-0.5 rounded-none border border-border bg-muted font-mono">
                            ↵
                        </kbd>
                        <span>Select</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <kbd className="px-1.5 py-0.5 rounded-none border border-border bg-muted font-mono">
                            esc
                        </kbd>
                        <span>Close</span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
