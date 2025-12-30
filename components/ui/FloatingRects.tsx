"use client";

import { motion } from "framer-motion";

export const FloatingRects = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute border border-enspy-orange/30 rounded-lg"
                    style={{
                        width: Math.random() * 100 + 50,
                        height: Math.random() * 100 + 50,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                />
            ))}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`sm-${i}`}
                    className="absolute bg-enspy-green/10 rounded-sm"
                    style={{
                        width: Math.random() * 20 + 10,
                        height: Math.random() * 20 + 10,
                        right: `${Math.random() * 100}%`,
                        bottom: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, 30, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.7,
                    }}
                />
            ))}
        </div>
    );
};
