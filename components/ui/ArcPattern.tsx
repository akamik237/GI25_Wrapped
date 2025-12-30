"use client";

import { motion } from "framer-motion";

export const ArcPattern = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                {[1, 2, 3].map((i) => (
                    <motion.circle
                        key={i}
                        cx="200"
                        cy="0"
                        r={i * 40}
                        stroke="#F08A1A"
                        strokeWidth="20"
                        strokeDasharray="100 200" // Dashed effect from image
                        initial={{ opacity: 0, rotate: -90 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: i * 0.2, duration: 1 }}
                    />
                ))}
            </svg>
        </div>
    );
};
