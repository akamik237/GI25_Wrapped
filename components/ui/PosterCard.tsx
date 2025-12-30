"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PosterCardProps {
    children: ReactNode;
    className?: string;
    variant?: "outline" | "filled" | "dark";
    title?: string;
}

export const PosterCard = ({ children, className, variant = "outline", title }: PosterCardProps) => {
    return (
        <motion.div
            className={clsx(
                "relative rounded-[2rem] p-6 md:p-8 overflow-hidden",
                variant === "outline" && "border-2 border-enspy-green bg-transparent",
                variant === "filled" && "bg-enspy-paper shadow-xl border-2 border-enspy-orange/20",
                variant === "dark" && "bg-enspy-dark text-white",
                className
            )}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Decorative Corner Accents for Outline variant */}
            {variant === "outline" && (
                <>
                    <div className="absolute top-4 left-4 w-2 h-2 bg-enspy-orange rounded-full" />
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-enspy-green rounded-full" />
                </>
            )}

            {title && (
                <h3 className={clsx(
                    "text-3xl font-display uppercase mb-6 text-center leading-none",
                    variant === "dark" ? "text-enspy-lime" : "text-enspy-dark"
                )}>
                    {title}
                </h3>
            )}

            {children}
        </motion.div>
    );
};
