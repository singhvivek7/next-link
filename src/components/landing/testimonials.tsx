"use client";

import { motion } from "motion/react";

import { siteConfig } from "@/config/site";

export const Testimonials = () => {
    return (
        <section className="py-24 bg-[#050505] border-b border-white/[0.08]">
            <div className="max-w-[1400px] mx-auto px-6">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-16">
                    Loved by thousands.
                </h2>

                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-y border-white/[0.08]">
                    {siteConfig.testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-10 group hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="flex gap-1 mb-8">
                                {/* Minimalist Star Rating */}
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                                ))}
                            </div>

                            <blockquote className="text-lg md:text-xl font-medium text-white mb-10 leading-relaxed tracking-tight">
                                "{testimonial.quote}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.05] flex items-center justify-center text-white/60 font-mono text-sm">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        {testimonial.author}
                                    </div>
                                    <div className="text-xs text-white/40">
                                        {testimonial.role}, {testimonial.company}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
