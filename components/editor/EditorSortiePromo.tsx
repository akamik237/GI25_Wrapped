"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface EditorSortiePromoProps {
    onScrollEnd?: () => void;
}

export const EditorSortiePromo = ({ onScrollEnd }: EditorSortiePromoProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const swiperRef = React.useRef<SwiperType | null>(null);
    const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});

    // Images/Videos for carousel - All media from promo-sortie folder in numerical order (1-9)
    const media = [
        { src: "/promo-sortie/1Enroute.jpg", caption: "En route vers la sortie", isVideo: false },
        { src: "/promo-sortie/2ArrivééHotelUnited.mp4", caption: "Arrivée à l'hôtel United", isVideo: true },
        { src: "/promo-sortie/3Babyfoot.jpg", caption: "Moments de détente au babyfoot", isVideo: false },
        { src: "/promo-sortie/4Formationsdeequipesdehand.jpg", caption: "Formation des équipes de handball", isVideo: false },
        { src: "/promo-sortie/5Echauffementspourlehandballmatch.MOV", caption: "Échauffements pour le match de handball", isVideo: true },
        { src: "/promo-sortie/6swiimingtime.jpg", caption: "Temps de natation et détente", isVideo: false },
        { src: "/promo-sortie/7LashuenmodePheplhs.jpg", caption: "Lashu en mode Michael Phelps - Champion de natation", isVideo: false },
        { src: "/promo-sortie/8Fourrires...jpg", caption: "Fous rires et complicité", isVideo: false },
        { src: "/promo-sortie/9recap_sortie.mp4", caption: "Récapitulatif de la sortie promotion", isVideo: true },
    ];

    // Handle video playback and autoplay
    React.useEffect(() => {
        const currentMedia = media[currentSlide];
        
        if (!currentMedia || !swiperRef.current) return;
        
        if (currentMedia.isVideo) {
            // Stop autoplay for videos
            swiperRef.current.autoplay.stop();
            setIsVideoPlaying(true);
            
            // Play the current video
            const video = videoRefs.current[currentSlide];
            if (video) {
                video.play().catch(err => {
                    console.warn('Erreur lecture vidéo:', err);
                });
            }
        } else {
            // Pause all videos when showing images
            Object.values(videoRefs.current).forEach(video => {
                if (video && !video.paused) {
                    video.pause();
                }
            });
            // Resume autoplay for images
            swiperRef.current.autoplay.start();
            setIsVideoPlaying(false);
        }
    }, [currentSlide, media]);

    // Handle video end callback
    const handleVideoEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const currentTime = video.currentTime;
        const duration = video.duration;
        
        console.log(`✓ Vidéo ${currentSlide + 1} terminée - Temps: ${currentTime.toFixed(2)}s / ${duration.toFixed(2)}s`);
        
        // Pour la vidéo de recap (dernière), s'assurer qu'elle est vraiment terminée
        if (currentSlide === media.length - 1) {
            // Vérifier que la vidéo a vraiment atteint la fin (à 0.1s près)
            if (duration > 0 && Math.abs(currentTime - duration) > 0.1) {
                console.warn('Recap vidéo pas encore à la fin, attente...');
                // Forcer la vidéo à aller jusqu'au bout
                video.currentTime = duration;
                return;
            }
            
            // Last video (recap) - trigger next section after a longer delay
            console.log('Dernière vidéo (Recap) terminée - passage à la section suivante');
            if (onScrollEnd) {
                // Délai plus long pour la vidéo de recap
                setTimeout(() => {
                    onScrollEnd();
                }, 3000);
            }
        } else {
            // Other videos - go to next slide
            setIsVideoPlaying(false);
            swiperRef.current?.slideNext();
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#00FFFF] mt-6 mb-3">
                    # Sortie de la Promotion - Moment de Cohésion
                </h2>
                
                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Contexte:</span> Sortie collective en janvier 2025 avant la période intensive des soutenances pour renforcer les liens d'amitié.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Objectifs:</span> Moment de détente après les mois de stage. Créer des souvenirs positifs avant l'épreuve finale des soutenances.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Activités:</span> Babyfoot, handball, natation, moments de détente et fous rires. Photos et vidéos capturant l'esprit d'équipe de la promotion.
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
                            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#1E1E1E]">
                                {/* Image/Video Container */}
                                <div className="relative w-full max-w-5xl h-[500px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#00FFFF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#00FFFF]/20">
                                    {item.isVideo ? (
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            src={item.src}
                                            className="w-full h-full object-contain"
                                            playsInline
                                            preload="auto"
                                            onEnded={handleVideoEnd}
                                            onCanPlayThrough={() => console.log(`✓ Vidéo ${index + 1} prête`)}
                                            onWaiting={() => console.log(`⏳ Vidéo ${index + 1} en chargement...`)}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
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

            {/* Footer Archive Note with Stats */}
            <div className="px-8 py-4 border-t-2 border-[#00FFFF]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#00FFFF] font-mono">
                            <span className="text-[#00FF00]">//</span> Sortie promotion GI 2025
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">Janvier 2025</span>
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

