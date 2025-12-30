"use client";

import React from 'react';

interface EditorPromoShootProps {
    onScrollEnd?: () => void;
}

export const EditorPromoShoot = ({ onScrollEnd }: EditorPromoShootProps) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Images for carousel
    const images = [
        { src: "/promo-shoot/photo1.jpg", caption: "Vue d'ensemble - Promotion GI 2025" },
        { src: "/promo-shoot/photo2.jpg", caption: "Portrait collectif officiel" },
        { src: "/promo-shoot/photo3.jpg", caption: "Moments de cohésion" },
        { src: "/promo-shoot/photo4.jpg", caption: "Esprit d'équipe" },
        { src: "/promo-shoot/photo5.jpg", caption: "Ambiance conviviale" },
    ];

    // Auto-play carousel vertically
    React.useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, images.length]);

    // Detect when user has seen all images (trigger next section after last image + 10s)
    React.useEffect(() => {
        if (currentImageIndex === images.length - 1 && onScrollEnd) {
            const timer = setTimeout(() => {
                onScrollEnd();
            }, 10000); // Wait 10 seconds on the last image before moving to next section
            return () => clearTimeout(timer);
        }
    }, [currentImageIndex, images.length, onScrollEnd]);

    const handleImageClick = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    return (
        <div ref={containerRef} className="flex-1 flex flex-col bg-[#1E1E1E] overflow-y-auto">
            {/* Header with minimal info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C]">
                <h2 className="text-2xl font-bold text-[#4EC9B0] mb-2">
                    # Séance Photo Officielle
                </h2>
                <p className="text-[#CCCCCC] text-sm mb-1">
                    <span className="text-[#569CD6]">Date:</span> Janvier 2025
                </p>
                <p className="text-[#CCCCCC] text-sm mb-1">
                    <span className="text-[#569CD6]">Lieu:</span> Campus ENSPY, Université de Yaoundé I
                </p>
                <p className="text-[#CCCCCC] text-sm">
                    <span className="text-[#569CD6]">Participants:</span> 70 étudiants • Promotion GI 2025
                </p>
            </div>

            {/* Vertical Auto Carousel */}
            <div className="flex-1 overflow-hidden relative">
                <div 
                    className="absolute inset-0 transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateY(-${currentImageIndex * 100}%)`
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="h-screen w-full flex flex-col items-center justify-center p-8 cursor-pointer"
                            onClick={handleImageClick}
                        >
                            {/* Image Container */}
                            <div className="relative w-full max-w-4xl h-[70vh] bg-gradient-to-br from-[#1E1E1E] to-[#252526] rounded-lg border border-[#3C3C3C] flex items-center justify-center overflow-hidden">
                                {/* Placeholder for actual image */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <svg className="w-32 h-32 mx-auto mb-6 text-[#4EC9B0] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[#858585] text-sm">
                                            [{image.src}]
                                        </p>
                                    </div>
                                </div>

                                {/* Auto-play indicator */}
                                {isAutoPlaying && (
                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#1E1E1E]/80 px-3 py-2 rounded-full border border-[#00FF00]">
                                        <div className="w-2 h-2 bg-[#00FF00] rounded-full animate-pulse" />
                                        <span className="text-[#00FF00] text-xs font-mono">AUTO</span>
                                    </div>
                                )}
                            </div>

                            {/* Caption */}
                            <div className="mt-6 max-w-4xl w-full">
                                <div className="flex items-center gap-4 p-4 bg-[#252526] border border-[#3C3C3C] rounded-lg">
                                    <svg className="w-5 h-5 text-[#00FF00] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <p className="text-[#CCCCCC] text-lg flex-1">
                                        {image.caption}
                                    </p>
                                    <span className="text-[#858585] text-sm font-mono">
                                        {index + 1}/{images.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Indicators - Vertical */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setCurrentImageIndex(idx);
                                setIsAutoPlaying(false);
                            }}
                            className={`w-2 rounded-full transition-all ${
                                idx === currentImageIndex
                                    ? 'h-12 bg-[#00FF00]'
                                    : 'h-2 bg-[#3C3C3C] hover:bg-[#858585]'
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Control Hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                    <p className="text-[#858585] text-xs">
                        {isAutoPlaying ? 'Cliquez pour mettre en pause' : 'Cliquez pour reprendre'}
                    </p>
                </div>
            </div>

            {/* Footer Archive Note */}
            <div className="px-8 py-4 border-t border-[#3C3C3C] bg-[#252526]">
                <p className="text-[#6A9955] text-xs italic text-center">
                    <span className="text-[#569CD6]">//</span> Document d'archive officiel • ENSPY • Promotion GI 2025
                </p>
            </div>
        </div>
    );
};

