"use client";

import { motion } from "framer-motion";

interface SquiggleProps {
    type?: "loop" | "wave" | "line";
    className?: string;
    color?: string;
}

export const Squiggle = ({ type = "wave", className, color = "#0B7A4A" }: SquiggleProps) => {
    const paths = {
        wave: "M10 50 Q 50 10 90 50 T 170 50 T 250 50",
        loop: "M10 50 C 40 10 60 10 90 50 S 140 90 170 50 S 220 10 250 50",
        line: "M10 50 L 250 50",
    };

    return (
        <svg
            viewBox="0 0 260 100"
            fill="none"
            className={className}
            preserveAspectRatio="none"
        >
            <motion.path
                d={paths[type]}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </svg>
    );
};
