"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

interface CarouselProps {
    children: React.ReactNode;
    className?: string;
}

export const Carousel = ({ children, className }: CarouselProps) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div className={clsx("relative w-full overflow-hidden", className)}>
            <motion.div
                ref={ref}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 md:px-12 py-4"
                whileTap={{ cursor: "grabbing" }}
            >
                {children}
            </motion.div>

            {/* Fade gradients for visual cue */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-enspy-beige/90 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-enspy-beige/90 to-transparent pointer-events-none" />
        </div>
    );
};

export const CarouselItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            className={clsx("shrink-0 snap-center", className)}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-10%" }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.div>
    );
};
