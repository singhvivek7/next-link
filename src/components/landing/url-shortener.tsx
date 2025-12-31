"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Copy,
    ExternalLink,
    Trash2,
    Command,
    ArrowRight,
    Link as LinkIcon
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { handleShortUrl } from "@/actions/short-url";

interface HistoryItem {
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: number;
}

export const UrlShortener = () => {
    const [currentUrl, setCurrentUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [isShortening, setIsShortening] = useState(false);
    const [history, setHistory] = useState<HistoryItem[]>([]);

    useEffect(() => {
        const savedHistory = localStorage.getItem("urlHistory");
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const saveToHistory = (original: string, short: string) => {
        const newItem: HistoryItem = {
            id: crypto.randomUUID(),
            originalUrl: original,
            shortUrl: short,
            createdAt: Date.now(),
        };
        const newHistory = [newItem, ...history].slice(0, 5); // Conserve space
        setHistory(newHistory);
        localStorage.setItem("urlHistory", JSON.stringify(newHistory));
    };

    const deleteFromHistory = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        toast("Delete from history?", {
            action: {
                label: "Confirm",
                onClick: () => {
                    setHistory((current) => {
                        const newHistory = current.filter((item) => item.id !== id);
                        localStorage.setItem("urlHistory", JSON.stringify(newHistory));
                        return newHistory;
                    });
                    toast.success("Entry removed");
                },
            },
            cancel: { label: "Cancel", onClick: () => { } },
        });
    };

    const handleShortenUrl = useCallback(async () => {
        if (!currentUrl) {
            toast.error("Please enter a URL");
            return;
        }

        try {
            new URL(currentUrl.startsWith("http") ? currentUrl : `https://${currentUrl}`);
        } catch {
            toast.error("Invalid URL format");
            return;
        }

        setIsShortening(true);
        try {
            const { data } = await handleShortUrl({ url: currentUrl });
            const short = `${window.location.origin}/${data.short_url}`;
            setShortenedUrl(short);
            saveToHistory(currentUrl, short);
            toast.success("Link generated");
        } catch (err: any) {
            toast.error(err.message || "Error processing request");
        }
        setIsShortening(false);
    }, [currentUrl, history]);

    const copyToClipboard = useCallback(async (text: string) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
        } catch {
            toast.error("Failed to copy");
        }
    }, []);

    return (
        <div className="w-full">
            {/* Main Input Block - Sharp, Industrial, No-Round */}
            <div className="flex items-stretch border border-white/[0.15] bg-[#050505] hover:border-white/[0.3] transition-colors">
                <div className="flex items-center justify-center px-5 border-r border-white/[0.15] text-white/40">
                    <LinkIcon className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleShortenUrl()}
                    placeholder="paste.link/here"
                    className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/20 font-medium px-4 h-16 rounded-none focus:bg-white/[0.02] transition-colors"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                />
                <Button
                    onClick={handleShortenUrl}
                    disabled={isShortening}
                    variant="default"
                    className="h-auto rounded-none px-8 font-semibold bg-white text-black hover:bg-white/90 border-l border-white/[0.15] min-w-[120px]"
                >
                    {isShortening ? "Processing..." : "Shorten"}
                </Button>
            </div>

            {/* Results & History Stack */}
            <div className="mt-8 space-y-4">
                {/* Active Result Card */}
                <AnimatePresence>
                    {shortenedUrl && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#050505] border border-white/[0.15] p-6 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <a
                                    href={shortenedUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="font-mono text-emerald-400 hover:underline truncate text-lg"
                                >
                                    {shortenedUrl}
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => copyToClipboard(shortenedUrl)}
                                    className="p-2 border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* History List */}
                {history.length > 0 && (
                    <div className="border border-white/[0.08] divide-y divide-white/[0.08]">
                        <div className="bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-widest text-white/40 font-mono">
                            Recent Activity
                        </div>
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#050505] hover:bg-white/[0.02] transition-colors"
                            >
                                {/* Redirect URL - Left */}
                                <div className="sm:w-[30%] min-w-0">
                                    <div className="font-mono text-sm text-white/90 truncate cursor-pointer hover:text-white transition-colors" onClick={() => copyToClipboard(item.shortUrl)}>
                                        {item.shortUrl.replace(/^https?:\/\//, "")}
                                    </div>
                                </div>

                                {/* Original URL - Center */}
                                <div className="sm:flex-1 w-full min-w-0 sm:text-center">
                                    <div className="text-xs text-white/30 truncate" title={item.originalUrl}>
                                        {item.originalUrl}
                                    </div>
                                </div>

                                {/* Actions - Right */}
                                <div className="flex items-center justify-end gap-2 sm:w-[20%] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => copyToClipboard(item.shortUrl)}
                                        className="cursor-pointer p-2 border border-white/5 hover:border-white/20 text-white/30 hover:text-white transition-colors"
                                        title="Copy Link"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={(e) => deleteFromHistory(item.id, e)}
                                        className="cursor-pointer p-2 border border-white/5 hover:border-red-500/30 text-white/30 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
