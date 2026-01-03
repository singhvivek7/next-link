"use client";

import { AnimatePresence,motion } from "motion/react";
import { useEffect,useState } from "react";

export const RotatingText = ({
    words,
    className,
}: {
    words: string[];
    className?: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [words.length]);

    return (
        <span className="inline-grid [grid-template-areas:'stack'] text-left">
            {/* Invisible duplicate to hold width of the longest word */}
            <span className={`[grid-area:stack] opacity-0 pointer-events-none ${className}`}>
                {words.slice().sort((a, b) => b.length - a.length)[0]}
            </span>

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={currentIndex}
                    className={`[grid-area:stack] flex ${className}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    {words[currentIndex].split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            transition={{
                                delay: i * 0.05,
                                duration: 0.4,
                                type: "spring",
                                stiffness: 200,
                                damping: 15
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};
