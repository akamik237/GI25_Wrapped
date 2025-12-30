"use client";

import { motion } from "framer-motion";

export const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-enspy-paper pointer-events-none">
            {/* Small Grid (Millimeter paper style) */}
            <div
                className="absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "linear-gradient(#052e1f 0.5px, transparent 0.5px), linear-gradient(90deg, #052e1f 0.5px, transparent 0.5px)",
                    backgroundSize: "20px 20px",
                }}
            />

            {/* Major Grid */}
            <div
                className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage:
                        "linear-gradient(#0B7A4A 1px, transparent 1px), linear-gradient(90deg, #0B7A4A 1px, transparent 1px)",
                    backgroundSize: "100px 100px",
                }}
            />
        </div>
    );
};
