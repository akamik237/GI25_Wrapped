"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Badge, BadgeGroup } from '@/components/ui/Badge';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

interface EditorSortiePromoProps {
    onScrollEnd?: () => void;
}

export const EditorSortiePromo = ({ onScrollEnd }: EditorSortiePromoProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const swiperRef = React.useRef<SwiperType | null>(null);
    const videoRefs = React.useRef<{[key: number]: HTMLVideoElement | null}>({});

    // Images/Videos for carousel - Your actual media
    const media = [
        { src: "/promo-sortie/photo_1.jpg", caption: "Moments de détente et cohésion", isVideo: false },
        { src: "/promo-sortie/video_2.MP4", caption: "Activités de groupe", isVideo: true },
        { src: "/promo-sortie/video_3.MOV", caption: "Rires et complicité", isVideo: true },
        { src: "/promo-sortie/photo_4.jpg", caption: "Souvenirs inoubliables", isVideo: false },
        { src: "/promo-sortie/recap_sortie.mp4", caption: "Récapitulatif de la sortie", isVideo: true },
    ];

    // Handle video playback and slide change
    React.useEffect(() => {
        const currentMedia = media[currentSlide];
        
        if (!currentMedia || !swiperRef.current) return;
        
        if (currentMedia.isVideo) {
            swiperRef.current.autoplay.stop();
            
            const videoElement = videoRefs.current[currentSlide];
            if (videoElement) {
                videoElement.currentTime = 0;
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => console.log('Lecture vidéo bloquée:', error));
                }
                
                const handleVideoEnd = () => {
                    console.log(`✓ Vidéo ${currentSlide + 1} terminée`);
                    
                    if (currentSlide === media.length - 1) {
                        if (onScrollEnd) {
                            setTimeout(() => onScrollEnd(), 2000);
                        }
                    } else {
                        swiperRef.current?.slideNext();
                    }
                };
                
                videoElement.addEventListener('ended', handleVideoEnd);
                return () => {
                    videoElement.removeEventListener('ended', handleVideoEnd);
                    videoElement.pause();
                };
            }
        } else {
            swiperRef.current.autoplay.start();
        }
    }, [currentSlide, media, onScrollEnd]);

    // Trigger next section after last slide (only for images, videos handle it themselves)
    React.useEffect(() => {
        const lastMedia = media[media.length - 1];
        if (currentSlide === media.length - 1 && !lastMedia.isVideo && onScrollEnd) {
            const timer = setTimeout(() => {
                onScrollEnd();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [currentSlide, media, onScrollEnd]);

    const handleSlideClick = () => {
        // Don't allow skipping during video playback
        const currentMedia = media[currentSlide];
        if (currentMedia?.isVideo) {
            const videoElement = videoRefs.current[currentSlide];
            if (videoElement && !videoElement.paused && !videoElement.ended) {
                // Video is playing, don't skip
                console.log('⏸ Vidéo en cours, attendez la fin');
                return;
            }
        }
        
        // Allow navigation for images or finished videos
        if (currentSlide < media.length - 1) {
            swiperRef.current?.slideNext();
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with badges and detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#00FFFF] mb-3">
                    # Sortie de la Promotion - Moment de Cohésion
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="participants" value="70" colorScheme="green" />
                    <Badge label="type" value="détente" colorScheme="blue" />
                    <Badge label="souvenirs" value="200+" colorScheme="red" />
                    <Badge label="durée" value="journée complète" colorScheme="orange" />
                    <Badge label="ambiance" value="conviviale" colorScheme="gray" />
                </BadgeGroup>

                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Contexte:</span> Sortie collective en février 2025 avant la période intensive des soutenances pour renforcer les liens d'amitié.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Objectifs:</span> Moment de détente après les mois de stage. Créer des souvenirs positifs avant l'épreuve finale des soutenances.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Activités:</span> Moments spontanés, rires partagés, jeux et activités de groupe. Photos et vidéos capturant l'esprit d'équipe de la promotion.
                    </p>
                </div>
            </div>

            {/* Swiper Carousel */}
            <div className="flex-1 overflow-hidden relative bg-[#1E1E1E]">
                <Swiper
                    direction="vertical"
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                        waitForTransition: true,
                    }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className}" style="background: #00FFFF"></span>`;
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
                        console.log(`🎬 Swiper Sortie: Slide ${swiper.activeIndex + 1}`);
                    }}
                    className="w-full h-full"
                    style={{ height: '100%' }}
                >
                    {media.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full flex flex-col items-center justify-center p-8 cursor-pointer bg-[#1E1E1E]"
                                onClick={handleSlideClick}
                            >
                                {/* Image/Video Container */}
                                <div className="relative w-full max-w-5xl h-[500px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#00FFFF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#00FFFF]/20">
                                    {item.isVideo ? (
                                        <video
                                            ref={(el) => { videoRefs.current[index] = el; }}
                                            src={item.src}
                                            className="max-w-full max-h-full object-contain"
                                            playsInline
                                            controls={false}
                                            onLoadedMetadata={() => console.log(`✓ Vidéo ${index + 1} chargée`)}
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.caption}
                                            className="max-w-full max-h-full object-contain"
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

            {/* Footer Archive Note with Stats */}
            <div className="px-8 py-4 border-t-2 border-[#00FFFF]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#00FFFF] font-mono">
                            <span className="text-[#00FF00]">//</span> Sortie promotion GI 2025
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">Février 2025</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Mood:</span>
                        <span className="inline-flex items-center gap-1 text-[#FF00FF]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF00FF] animate-pulse"></span>
                            Convivial
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

