"use client";

import { Link2 } from "lucide-react";

import { siteConfig } from "@/config/site";

export const Footer = () => {
    return (
        <footer className="py-20 bg-[#050505] border-t border-white/[0.08] text-sm">
            <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-white" />
                        <span className="font-bold text-white">{siteConfig.name}</span>
                    </div>
                </div>

                {[
                    { title: "Product", items: ["Features", "Pricing", "API", "Changelog"] },
                    { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
                    { title: "Legal", items: ["Privacy", "Terms", "Security"] },
                ].map((col) => (
                    <div key={col.title}>
                        <h4 className="font-semibold text-white mb-6">{col.title}</h4>
                        <ul className="space-y-4">
                            {col.items.map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-white/50 hover:text-white transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="max-w-[1400px] mx-auto px-6 mt-20 pt-8 border-t border-white/[0.08] flex items-center justify-between text-white/30 text-xs">
                <p>© 2025</p>
                <div className="flex gap-4">
                    <span>System Status: Operational</span>
                    <span>v2.4.1</span>
                </div>
            </div>
        </footer>
    );
};
