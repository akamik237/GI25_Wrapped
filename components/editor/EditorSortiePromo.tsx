"use client";

import React from 'react';

interface EditorSortiePromoProps {
    onScrollEnd?: () => void;
}

export const EditorSortiePromo = ({ onScrollEnd }: EditorSortiePromoProps) => {
    const [currentImage, setCurrentImage] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    const images = [
        { src: '/images/sortie-1.jpg', caption: 'Moment de détente à la plage' },
        { src: '/images/sortie-2.jpg', caption: 'Cohésion de groupe' },
        { src: '/images/sortie-3.jpg', caption: 'Souvenirs inoubliables' },
        { src: '/images/sortie-4.jpg', caption: 'Rires et complicité' },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Detect scroll to end
    React.useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current || hasScrolledToEnd) return;

            const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

            if (isAtBottom && !hasScrolledToEnd) {
                setHasScrolledToEnd(true);
                if (onScrollEnd) {
                    setTimeout(() => {
                        onScrollEnd();
                    }, 5000); // Wait 5 seconds before moving to next section
                }
            }
        };

        const element = contentRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, [hasScrolledToEnd, onScrollEnd]);

    return (
        <div className="h-full w-full flex bg-[#1E1E1E] overflow-hidden">
            {/* Markdown Content (Left Side) */}
            <div ref={contentRef} className="w-1/2 overflow-y-auto p-8 font-mono text-[14px] text-[#CCCCCC] scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                <h1 className="text-3xl font-bold text-[#4EC9B0] mb-6">
                    # Sortie de la Promotion
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <p className="text-[#D4D4D4]">
                        <span className="text-[#569CD6]">**Mois**</span> : Février 2025
                    </p>

                    <p className="text-[#D4D4D4]">
                        <span className="text-[#569CD6]">**Objectif**</span> : Cohésion et détente
                    </p>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-3">
                            ## À propos
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Avant le rush des soutenances, la promotion GI 2025 s'est offert un moment de 
                            respiration collective. Une journée de cohésion où les futurs ingénieurs ont pu 
                            renforcer leurs liens, partager des rires et créer des souvenirs en dehors du 
                            cadre académique strict de l'ENSPY.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-3">
                            ## Moments forts
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li>Activités de team building</li>
                            <li>Repas convivial en bord de mer</li>
                            <li>Moments spontanés et authentiques</li>
                            <li>Renforcement des liens interpersonnels</li>
                        </ul>
                    </div>

                    <div className="mt-6 p-4 bg-[#2D2D30] border-l-4 border-[#4EC9B0] rounded">
                        <p className="text-[#D4D4D4] italic">
                            "Ces moments de détente sont essentiels dans un parcours aussi intense. 
                            Ils nous rappellent que nous sommes avant tout une famille académique."
                        </p>
                        <p className="text-[#858585] text-sm mt-2">
                            — Un membre de la promo GI 2025
                        </p>
                    </div>
                </div>
            </div>

            {/* Markdown Preview (Right Side) - Image Carousel */}
            <div className="w-1/2 bg-[#1E1E1E] border-l border-[#3C3C3C] flex flex-col">
                <div className="h-10 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                    <span>PREVIEW</span>
                </div>
                
                <div className="flex-1 relative overflow-hidden">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-[#1E1E1E] to-[#2D2D30] flex items-center justify-center p-8">
                                {/* Placeholder for images */}
                                <div className="w-full h-full max-w-2xl max-h-2xl bg-[#3C3C3C] rounded-lg flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">📸</div>
                                            <div className="text-[#CCCCCC] text-lg font-semibold">{image.caption}</div>
                                            <div className="text-[#858585] text-sm mt-2">Image {index + 1} / {images.length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImage 
                                        ? 'bg-[#007ACC] w-6' 
                                        : 'bg-[#858585] hover:bg-[#CCCCCC]'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

