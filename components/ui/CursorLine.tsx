"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface CursorLineProps {
    className?: string; // Additional positioning classes
    vertical?: boolean;
}

export const CursorLine = ({ className, vertical = false }: CursorLineProps) => {
    return (
        <div className={clsx("absolute pointer-events-none z-0", className)}>
            <svg
                width={vertical ? "2" : "100%"}
                height={vertical ? "100%" : "2"}
                viewBox={vertical ? "0 0 2 100" : "0 0 100 2"}
                className="overflow-visible"
                preserveAspectRatio="none"
            >
                <motion.line
                    x1="0"
                    y1="0"
                    x2={vertical ? "0" : "100%"}
                    y2={vertical ? "100%" : "0"}
                    stroke="#F08A1A"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
            {/* Endpoint Rect */}
            <motion.div
                className="absolute bg-enspy-green w-2 h-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
                style={
                    vertical
                        ? { bottom: 0, left: "-3px" }
                        : { right: 0, top: "-3px" }
                }
            />
        </div>
    );
};
