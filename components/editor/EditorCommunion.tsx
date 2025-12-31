"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface EditorCommunionProps {
    onScrollEnd?: () => void;
}

export const EditorCommunion = ({ onScrollEnd }: EditorCommunionProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const swiperRef = React.useRef<SwiperType | null>(null);

    // Images from commucadets folder in numerical order (1-7)
    const images = [
        { src: "/commucadets/1netoyagedelasalledessoutances.jpg", caption: "Nettoyage de la salle des soutenances", isVideo: false },
        { src: "/commucadets/2installationdelaphotodelapromoaulabo.jpg", caption: "Installation de la photo de la promo au labo", isVideo: false },
        { src: "/commucadets/3Mugpourlesenseignants.jpg", caption: "Mug pour les enseignants", isVideo: false },
        { src: "/commucadets/4porteclescutepourlesenseignants.jpg", caption: "Porte-clés cute pour les enseignants", isVideo: false },
        { src: "/commucadets/5Seancebillardauretaulacantine.jpg", caption: "Séance billard au restaurant 'La Cantine'", isVideo: false },
        { src: "/commucadets/6repasbiengarni.jpg", caption: "Repas bien garni", isVideo: false },
        { src: "/commucadets/7Selfieetgrandssourire.jpg", caption: "Selfie et grands sourires", isVideo: false },
    ];

    // Auto-transition after last slide - immediate transition
    React.useEffect(() => {
        if (currentSlide === images.length - 1 && onScrollEnd) {
            const timer = setTimeout(() => {
                onScrollEnd();
            }, 500); // Immediate transition after last image
            return () => clearTimeout(timer);
        }
    }, [currentSlide, images.length, onScrollEnd]);

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#CE9178] mt-6 mb-3">
                    # Communion avec les Cadets - Passage du Flambeau
                </h2>
                
                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Passage de témoin:</span> Événement symbolique entre GI 2025 et GI 2026. Moment de transmission, encouragement et partage d'expériences.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Programme:</span> Discours inspirants, conseils pour les projets, astuces soutenances. Photos et remise symbolique du flambeau GI.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Messages clés:</span> Persévérance, solidarité et excellence. Soutien mutuel et vision d'un réseau d'ingénieurs camerounais.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Continuité:</span> L'esprit GI transcende les promotions. Liens durables créant un réseau solide au-delà de l'ENSPY.
                    </p>
                </div>
            </div>

            {/* Swiper Carousel */}
            <div className="flex-1 overflow-hidden relative bg-[#1E1E1E]">
                <Swiper
                    direction="vertical"
                    modules={[Autoplay, Pagination, Navigation]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: true,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className}" style="background: #CE9178"></span>`;
                        },
                    }}
                    speed={700}
                    allowTouchMove={false}
                    preventInteractionOnTransition={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setCurrentSlide(swiper.activeIndex);
                        console.log(`🎬 Swiper Communion: Slide ${swiper.activeIndex + 1}`);
                    }}
                    className="w-full h-full"
                    style={{ height: '100%' }}
                >
                    {images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#1E1E1E]">
                                {/* Image Container */}
                                <div className="relative w-full max-w-5xl h-[500px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#CE9178] flex items-center justify-center overflow-hidden shadow-lg shadow-[#CE9178]/20">
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="max-w-full max-h-full object-contain"
                                        loading={index <= currentSlide + 1 ? "eager" : "lazy"}
                                        onLoad={() => console.log(`✓ Image ${index + 1} chargée`)}
                                    />
                                </div>

                                {/* Caption */}
                                <div className="mt-6 max-w-5xl w-full">
                                    <p className="text-[#CCCCCC] text-center text-lg font-light italic">
                                        {item.caption}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Footer Archive Note */}
            <div className="px-8 py-4 border-t-2 border-[#CE9178]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#CE9178] font-mono">
                            <span className="text-[#00FF00]">//</span> Passage du flambeau • ENSPY
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">GI 2025 → GI 2026</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Tradition:</span>
                        <span className="inline-flex items-center gap-1 text-[#CE9178]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CE9178] animate-pulse"></span>
                            Continue
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
