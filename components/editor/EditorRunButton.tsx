"use client";

import { motion } from "framer-motion";

export const EditorRunButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="mt-8 flex items-center justify-center gap-3 px-10 py-4 bg-enspy-accent text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow font-sans"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" />
            </svg>
            RUN WRAPPED
        </motion.button>
    );
};
