"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Image, Video } from "lucide-react";

interface MediaHolderProps {
    className?: string;
    type?: "image" | "video";
    label?: string;
}

export const MediaHolder = ({ className, type = "image", label }: MediaHolderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                "relative rounded-xl overflow-hidden bg-white/5 border-2 border-dashed border-enspy-orange/30 backdrop-blur-sm flex items-center justify-center group",
                className
            )}
        >
            <div className="text-enspy-green/40 flex flex-col items-center gap-2">
                {type === "image" ? <Image size={48} /> : <Video size={48} />}
                <span className="font-condensed uppercase tracking-wider text-sm opacity-70">
                    {label || (type === "image" ? "Image Placeholder" : "Video Placeholder")}
                </span>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-enspy-green" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-enspy-green" />

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-enspy-green/0 group-hover:bg-enspy-green/5 transition-colors duration-300" />
        </motion.div>
    );
};
