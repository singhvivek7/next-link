"use client";

import { motion } from "motion/react";
import {
    Zap,
    BarChart3,
    Shield,
    Palette,
    Code2,
    Globe,
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Global Edge Network",
        description: "Requests are routed to the nearest edge location for sub-50ms latency worldwide.",
    },
    {
        icon: BarChart3,
        title: "Real-time Telemetry",
        description: "Live stream of click events with granular data on device, location, and OS.",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "SOC 2 Type II compliant infrastructure with SSO enforcement and audit logs.",
    },
    {
        icon: Palette,
        title: "Domain Management",
        description: "Connect unlimited custom domains with automatic SSL provisioning and renewal.",
    },
    {
        icon: Code2,
        title: "Robust API",
        description: "Programmatic access to all features via our typed REST API and SDKs.",
    },
    {
        icon: Globe,
        title: "Smart Routing",
        description: "Dynamically redirect traffic based on geolocation, language, or device type.",
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-[#050505] border-b border-white/[0.08]">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.08] border border-white/[0.08]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-10 bg-[#050505] hover:bg-[#0A0A0B] transition-colors"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-6 text-white/80 group-hover:text-white group-hover:border-white/10 transition-colors">
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
