"use client";

import { motion } from "motion/react";
import { Copy, Check, ArrowRight, Link as LinkIcon, Activity } from "lucide-react";
import { UrlShortener } from "./url-shortener";
import { siteConfig } from "@/config/site";
import { RotatingText } from "./rotating-text";

// ... inside Hero component ...

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-6 md:pt-48 md:pb-32 border-b border-white/[0.08] bg-[#050505]">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="flex flex-col items-center text-center">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 px-3 py-1 border border-white/[0.08] bg-white/[0.02] mb-8"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[11px] font-mono font-medium text-white/70 uppercase tracking-wider">
                            {siteConfig.hero.badge}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8"
                    >
                        {siteConfig.hero.titlePrefix}
                        <br />
                        <RotatingText
                            words={siteConfig.hero.rotatingWords}
                            className="text-white/40"
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 font-light leading-relaxed whitespace-pre-line"
                    >
                        {siteConfig.hero.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-full max-w-2xl"
                    >
                        <UrlShortener />
                    </motion.div>

                    {/* Trusted By - Minimal text only */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-24 pt-8 border-t border-white/[0.08] w-full max-w-3xl"
                    >
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-mono mb-6">
                            Powering links for
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
                            {siteConfig.hero.trustedBy.map((company) => (
                                <span
                                    key={company}
                                    className="text-sm font-semibold text-white/40 hover:text-white transition-colors cursor-default tracking-wide"
                                >
                                    {company}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Technical Grid Background (Overlay) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />
        </section>
    );
};
