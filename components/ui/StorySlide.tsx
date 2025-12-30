"use client";

import clsx from "clsx";
import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface StorySlideProps extends HTMLMotionProps<"section"> {
    children: ReactNode;
    className?: string;
    id?: string;
}

export const StorySlide = ({ children, className, id, ...props }: StorySlideProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "relative w-full h-dvh flex flex-col items-center justify-center snap-center shrink-0 overflow-hidden",
                "px-6 py-12 md:px-12",
                className
            )}
            {...props}
        >
            {children}
        </motion.section>
    );
};
