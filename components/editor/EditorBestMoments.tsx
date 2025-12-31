"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface EditorBestMomentsProps {
    onScrollEnd?: () => void;
}

export const EditorBestMoments = ({ onScrollEnd }: EditorBestMomentsProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const swiperRef = React.useRef<SwiperType | null>(null);
    const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

    // Media from Bestmoments folder
    const media = [
        { 
            src: "/Bestmoments/photodegroupesortieenjanvier.jpg", 
            caption: "Photo de groupe - Sortie en janvier", 
            isVideo: false 
        },
        { 
            src: "/Bestmoments/diasporareunipourlematchcamerroncotedivoirecan2025.mp4", 
            caption: "Diaspora réunie pour le match Cameroun - Côte d'Ivoire CAN 2025", 
            isVideo: true 
        },
        { 
            src: "/Bestmoments/talentsdedansebikutsialafterdeAbisseguecyntia.mp4", 
            caption: "Talents de danse - Bikutsi à l'after de Abisségué Cynthia", 
            isVideo: true 
        },
        { 
            src: "/Bestmoments/pasdedansederomanesurdumoussiertombola.mp4", 
            caption: "Pas de danse de Romanes sur du Moussier Tombola", 
            isVideo: true 
        },
    ];

    // Control video playback based on current slide
    React.useEffect(() => {
        media.forEach((item, index) => {
            const video = videoRefs.current[index];
            if (video && item.isVideo) {
                if (index === currentSlide) {
                    video.play().catch(err => console.log("Video play error:", err));
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }, [currentSlide]);

    // Handle video end
    const handleVideoEnd = (index: number) => {
        if (swiperRef.current && index < media.length - 1) {
            setTimeout(() => {
                swiperRef.current?.slideNext();
            }, 500);
        }
    };

    // Auto-transition after last slide
    React.useEffect(() => {
        if (currentSlide === media.length - 1 && onScrollEnd) {
            const timer = setTimeout(() => {
                onScrollEnd();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [currentSlide, media.length, onScrollEnd]);

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#FF00FF] mt-6 mb-3">
                    # Best Moments - Les Instants Mémorables
                </h2>
                
                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Instants précieux:</span> Une collection des moments les plus marquants de la promotion GI 2025. Des rires, des danses, des célébrations et des souvenirs inoubliables.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Diversité:</span> De la sortie de promo aux célébrations sportives, en passant par les talents cachés de la promotion.
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
                            return `<span class="${className}" style="background: #FF00FF"></span>`;
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
                        console.log(`🎬 Swiper Best Moments: Slide ${swiper.activeIndex + 1}`);
                    }}
                    className="w-full h-full"
                    style={{ height: '100%' }}
                >
                    {media.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#1E1E1E]">
                                {/* Media Container */}
                                <div className="relative w-full max-w-5xl h-[500px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#FF00FF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#FF00FF]/20">
                                    {item.isVideo ? (
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            src={item.src}
                                            className="max-w-full max-h-full object-contain"
                                            muted
                                            playsInline
                                            onEnded={() => handleVideoEnd(index)}
                                            onCanPlayThrough={() => {
                                                if (index === currentSlide) {
                                                    videoRefs.current[index]?.play().catch(err => 
                                                        console.log("Video play error:", err)
                                                    );
                                                }
                                            }}
                                            onWaiting={() => {
                                                console.log(`Video ${index} is buffering...`);
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.caption}
                                            className="max-w-full max-h-full object-contain"
                                            loading={index <= currentSlide + 1 ? "eager" : "lazy"}
                                            onLoad={() => console.log(`✓ Image ${index + 1} chargée`)}
                                        />
                                    )}
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
            <div className="px-8 py-4 border-t-2 border-[#FF00FF]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#FF00FF] font-mono">
                            <span className="text-[#00FF00]">//</span> Best Moments • GI 2025
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">Mémoires éternelles</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Collection:</span>
                        <span className="inline-flex items-center gap-1 text-[#FF00FF]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF00FF] animate-pulse"></span>
                            {media.length} moments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

