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

interface EditorSoutenancesJuilletProps {
    onScrollEnd?: () => void;
}

interface MediaItem {
    src: string;
    caption: string;
    isVideo: boolean;
}

export const EditorSoutenancesJuillet = ({ onScrollEnd }: EditorSoutenancesJuilletProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const swiperRef = React.useRef<any>(null);

    const media: MediaItem[] = [
        { src: "/soutenances-juillet/Recap_1.mp4", caption: "Jour 1 - Première journée de soutenances", isVideo: true },
        { src: "/soutenances-juillet/Recap_2.mp4", caption: "Jour 2 - Défenses et présentations", isVideo: true },
        { src: "/soutenances-juillet/Recap_3.mp4", caption: "Jour 3 - Soutenances en série", isVideo: true },
        { src: "/soutenances-juillet/Recap_4.mp4", caption: "Jour 4 - Passages devant le jury", isVideo: true },
        { src: "/soutenances-juillet/Recap_5.mp4", caption: "Jour 5 - Derniers passages de juillet", isVideo: true },
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
            swiperRef.current.allowTouchMove = true; // Enable swipe for images
            swiperRef.current.autoplay.start();
            setIsVideoPlaying(false);
        }
    }, [currentSlide, media]);

    // Handle video end callback
    const handleVideoEnd = () => {
        console.log(`✓ Vidéo ${currentSlide + 1} terminée`);
        if (swiperRef.current) {
            swiperRef.current.allowTouchMove = true; // Re-enable swipe
        }

        if (currentSlide === media.length - 1) {
            if (onScrollEnd) {
                setTimeout(() => onScrollEnd(), 2000); // 2s delay for last video
            }
        } else {
            setIsVideoPlaying(false);
            swiperRef.current?.slideNext();
        }
    };

    const handleSlideClick = () => {
        const currentMedia = media[currentSlide];
        if (currentMedia.isVideo) {
            console.log("⏸ Vidéo en cours, attendez la fin");
            return;
        }
        // For images, allow manual advance
        swiperRef.current?.slideNext();
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C]">
                <h2 className="text-2xl font-bold text-[#00FFFF] mb-3">
                    # Soutenances de Juillet 2025
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="candidats" value="~45" colorScheme="green" />
                    <Badge label="taux réussite" value="100%" colorScheme="green" />
                    <Badge label="durée moyenne" value="45 min" colorScheme="blue" />
                    <Badge label="période" value="juillet 2025" colorScheme="red" />
                </BadgeGroup>
                
                <p className="text-[#CCCCCC] text-sm mb-3">
                    <span className="text-[#569CD6]">Période:</span> Juillet 2025 • <span className="text-[#569CD6]">Candidats:</span> Première vague (~45 étudiants)
                </p>
                <p className="text-[#CCCCCC] text-sm mb-2">
                    <span className="text-[#569CD6]">Contexte:</span> Lancement officiel des soutenances. Premiers étudiants devant le jury après des mois de stage et rédaction.
                </p>
                <p className="text-[#CCCCCC] text-sm mb-2">
                    <span className="text-[#569CD6]">Ambiance:</span> Excitation et appréhension. Dernière épreuve avant le diplôme d'ingénieur. Présentations d'environ 45 minutes.
                </p>
                <p className="text-[#CCCCCC] text-sm">
                    <span className="text-[#569CD6]">Résultats:</span> 100% de réussite. Premières mentions Très Bien et Excellent. Soutien remarquable entre camarades.
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
                    speed={700}
                    className="w-full h-full"
                    onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                >
                    {media.map((item, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center justify-center p-8">
                            <div
                                className="relative w-full max-w-5xl h-[calc(100vh-400px)] min-h-[400px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#00FFFF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#00FFFF]/20 cursor-pointer"
                                onClick={handleSlideClick}
                            >
                                {item.isVideo ? (
                                    <ReactPlayer
                                        url={item.src}
                                        playing={index === currentSlide && isVideoPlaying}
                                        onEnded={handleVideoEnd}
                                        onReady={() => console.log(`✓ Vidéo ${index + 1} chargée`)}
                                        width="100%"
                                        height="100%"
                                        style={{ width: '100%', height: '100%' }}
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
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            console.error(`Error loading image: ${item.src}`);
                                            e.currentTarget.src = 'https://via.placeholder.com/800x450?text=Image+Non+Trouvée';
                                        }}
                                    />
                                )}
                            </div>

                            {/* Caption */}
                            <div className="mt-6 max-w-4xl w-full">
                                <div className="flex items-center justify-center gap-4 p-4 bg-[#252526] border border-[#3C3C3C] rounded-lg">
                                    <p className="text-[#CCCCCC] text-lg flex-1 text-center italic">
                                        {item.caption}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Footer Archive Note */}
            <div className="px-8 py-4 border-t border-[#3C3C3C] bg-[#252526]">
                <p className="text-[#6A9955] text-xs italic text-center">
                    <span className="text-[#569CD6]">//</span> Archives soutenances Juillet 2025 • ENSPY • Promotion GI 2025
                </p>
            </div>
        </div>
    );
};

