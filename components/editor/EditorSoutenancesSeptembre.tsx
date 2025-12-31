"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Badge, BadgeGroup } from '@/components/ui/Badge';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import ReactPlayer dynamically for better performance
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface EditorSoutenancesSeptembreProps {
    onScrollEnd?: () => void;
}

interface MediaItem {
    src: string;
    caption: string;
    isVideo: boolean;
}

export const EditorSoutenancesSeptembre = ({ onScrollEnd }: EditorSoutenancesSeptembreProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const swiperRef = React.useRef<any>(null);

    const media: MediaItem[] = [
        { src: "/soutenances-septembre/Recap1.mp4", caption: "Jour 1 - Reprise des soutenances en septembre", isVideo: true },
        { src: "/soutenances-septembre/Recap2.mp4", caption: "Jour 2 - Derniers passages avant diplôme", isVideo: true },
        { src: "/soutenances-septembre/Recap3.mp4", caption: "Jour 3 - Sessions continues de défenses", isVideo: true },
        { src: "/soutenances-septembre/Recap4.mp4", caption: "Jour 4 - Présentations devant jury", isVideo: true },
        { src: "/soutenances-septembre/Recap5.mp4", caption: "Jour 5 - Soutenances du matin", isVideo: true },
        { src: "/soutenances-septembre/Recap6.mp4", caption: "Jour 6 - Défenses de l'après-midi", isVideo: true },
        { src: "/soutenances-septembre/Recap7.mp4", caption: "Jour 7 - Semaine de soutenances", isVideo: true },
        { src: "/soutenances-septembre/Recap8.mp4", caption: "Jour 8 - Suite des passages", isVideo: true },
        { src: "/soutenances-septembre/Recap9.mp4", caption: "Jour 9 - Approche de la fin", isVideo: true },
        { src: "/soutenances-septembre/Recap10.mp4", caption: "Jour 10 - Dernière ligne droite", isVideo: true },
        { src: "/soutenances-septembre/Recap11.mp4", caption: "Jour 11 - Soutenances finales", isVideo: true },
        { src: "/soutenances-septembre/Recap12.mp4", caption: "Jour 12 - Ultimes présentations", isVideo: true },
        { src: "/soutenances-septembre/Recap13.mp4", caption: "Jour 13 - Avant-dernière journée", isVideo: true },
        { src: "/soutenances-septembre/Recap14.mp4", caption: "Jour 14 - Derniers candidats", isVideo: true },
        { src: "/soutenances-septembre/Recap15.mp4", caption: "Jour 15 - Clôture et célébration finale", isVideo: true },
    ];

    // Handle video playback and slide change
    // Handle video playback and autoplay
    React.useEffect(() => {
        const currentMedia = media[currentSlide];

        if (!currentMedia || !swiperRef.current) return;

        if (currentMedia.isVideo) {
            swiperRef.current.autoplay.stop();
            swiperRef.current.allowTouchMove = false; // Disable swipe during video
            setIsVideoPlaying(true);
        } else {
            swiperRef.current.autoplay.start();
            swiperRef.current.allowTouchMove = true;
            setIsVideoPlaying(false);
        }
    }, [currentSlide, media.length]);

    // Handle video end callback
    const handleVideoEnd = () => {
        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = true; // Re-enable swipe
            
            if (currentSlide < media.length - 1) {
                setIsVideoPlaying(false);
                swiperRef.current.slideNext();
            } else {
                // Last video ended, wait 2 seconds then call onScrollEnd
                setTimeout(() => {
                    if (onScrollEnd) {
                        onScrollEnd();
                    }
                }, 2000);
            }
        }
    };

    const handleSlideChange = (swiper: any) => {
        setCurrentSlide(swiper.activeIndex);
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#FF00FF] mb-2">
                    # Soutenances de Septembre 2025
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="passages" value="~25" colorScheme="red" />
                    <Badge label="taux réussite" value="100%" colorScheme="green" />
                    <Badge label="mentions E" value="13" colorScheme="green" />
                    <Badge label="mentions TB" value="52" colorScheme="blue" />
                    <Badge label="ambiance" value="festive" colorScheme="orange" />
                </BadgeGroup>
                
                <p className="text-[#CCCCCC] text-sm mb-3">
                    <span className="text-[#569CD6]">Contexte:</span> Septembre 2025, derniers passages de la promotion GI 2025. Fin d'un long parcours académique intense.
                </p>
                <p className="text-[#CCCCCC] text-sm mb-3">
                    <span className="text-[#569CD6]">Objectifs:</span> Finaliser les évaluations. Célébrer les réussites collectives. Préparer l'avenir professionnel des diplômés.
                </p>
                <p className="text-[#CCCCCC] text-sm">
                    <span className="text-[#569CD6]">Déroulement:</span> Émotions intenses, félicitations chaleureuses. Un chapitre se ferme, un autre s'ouvre.
                </p>
            </div>

            {/* Swiper Carousel */}
            <div className="flex-1 relative overflow-hidden bg-[#1E1E1E] min-h-[calc(100vh-250px)]">
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    direction="vertical"
                    slidesPerView={1}
                    spaceBetween={0}
                    mousewheel={true}
                    pagination={{
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
                        },
                    }}
                    modules={[Pagination, Autoplay, EffectFade]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={handleSlideChange}
                    className="h-full w-full"
                >
                    {media.map((item, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center bg-[#1E1E1E]">
                            <div className="w-full h-full flex flex-col">
                                {/* Media Container */}
                                <div className="flex-1 flex items-center justify-center p-4 bg-black/50">
                                    {item.isVideo ? (
                                        <ReactPlayer
                                            url={item.src}
                                            playing={index === currentSlide && isVideoPlaying}
                                            onEnded={handleVideoEnd}
                                            onReady={() => console.log(`✓ Vidéo ${index + 1} chargée`)}
                                            width="100%"
                                            height="100%"
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                            config={{
                                                file: {
                                                    attributes: {
                                                        playsInline: true,
                                                        controlsList: 'nodownload',
                                                        disablePictureInPicture: true,
                                                    }
                                                }
                                            }}
                                            volume={1}
                                            muted={false}
                                            controls={false}
                                            playsinline
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.caption}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    )}
                                </div>

                                {/* Caption */}
                                <div className="px-6 py-4 bg-[#252526] border-t border-[#3C3C3C]">
                                    <p className="text-[#CCCCCC] text-sm text-center">
                                        {item.caption}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t-2 border-[#FF00FF]/30 bg-[#252526] flex-shrink-0">
                <p className="text-[#FF00FF] text-sm text-center font-mono">
                    <span className="text-[#00FF00] animate-pulse">//</span> Clôture académique • ENSPY • GI 2025
                </p>
            </div>
        </div>
    );
};

