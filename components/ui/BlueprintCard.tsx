"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlueprintCardProps {
    children: ReactNode;
    className?: string;
    title?: string;
    label?: string; // Top label like "SOUTENANCE..."
}

export const BlueprintCard = ({ children, className, title, label }: BlueprintCardProps) => {
    return (
        <div className={clsx("relative p-6 pt-10", className)}>
            {/* Card Container with Orange Border */}
            <motion.div
                className="absolute inset-0 border-2 border-enspy-orange bg-enspy-beige/50 backdrop-blur-sm rounded-sm"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Corner Accents (The orange/green dots) */}
            <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-enspy-orange z-10" />
            <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-enspy-orange z-10" />
            <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-enspy-green z-10" />
            <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-enspy-green z-10" />

            {/* Label if present */}
            {label && (
                <div className="absolute -top-3 left-4 bg-white px-2 text-xs font-bold text-enspy-green uppercase tracking-widest z-10">
                    {label}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                {title && (
                    <div className="bg-enspy-orange text-white p-4 mb-6 shadow-md text-center">
                        <h3 className="text-2xl md:text-3xl font-display uppercase leading-none">{title}</h3>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};
