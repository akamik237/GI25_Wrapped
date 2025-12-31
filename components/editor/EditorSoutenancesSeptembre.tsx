"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


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
    const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});

    // Videos from soutenances-septembre folder in numerical order (1-15)
    const media: MediaItem[] = [
        { src: "/soutenances-septembre/Recap1.mp4", caption: "Jour 1", isVideo: true },
        { src: "/soutenances-septembre/Recap2.mp4", caption: "Jour 2", isVideo: true },
        { src: "/soutenances-septembre/Recap3.mp4", caption: "Jour 3", isVideo: true },
        { src: "/soutenances-septembre/Recap4.mp4", caption: "Jour 4", isVideo: true },
        { src: "/soutenances-septembre/Recap5.mp4", caption: "Jour 5", isVideo: true },
        { src: "/soutenances-septembre/Recap6.mp4", caption: "Jour 6", isVideo: true },
        { src: "/soutenances-septembre/Recap7.mp4", caption: "Jour 7", isVideo: true },
        { src: "/soutenances-septembre/Recap8.mp4", caption: "Jour 8", isVideo: true },
        { src: "/soutenances-septembre/Recap9.mp4", caption: "Jour 9", isVideo: true },
        { src: "/soutenances-septembre/Recap10.mp4", caption: "Jour 10", isVideo: true },
        { src: "/soutenances-septembre/Recap11.mp4", caption: "Jour 11", isVideo: true },
        { src: "/soutenances-septembre/Recap12.mp4", caption: "Jour 12", isVideo: true },
        { src: "/soutenances-septembre/Recap13.mp4", caption: "Jour 13", isVideo: true },
        { src: "/soutenances-septembre/Recap14.mp4", caption: "Jour 14", isVideo: true },
        { src: "/soutenances-septembre/Recap15.mp4", caption: "Jour 15", isVideo: true },
    ];

    // Handle video playback and autoplay
    React.useEffect(() => {
        const currentMedia = media[currentSlide];

        if (!currentMedia || !swiperRef.current) return;

        if (currentMedia.isVideo) {
            swiperRef.current.autoplay.stop();
            swiperRef.current.allowTouchMove = false; // Disable swipe during video
            setIsVideoPlaying(true);
            
            // Play the current video
            const video = videoRefs.current[currentSlide];
            if (video) {
                video.play().catch(err => {
                    console.warn('Erreur lecture vidéo:', err);
                });
            }
        } else {
            // Pause all videos
            Object.values(videoRefs.current).forEach(video => {
                if (video && !video.paused) {
                    video.pause();
                }
            });
            swiperRef.current.allowTouchMove = true; // Enable swipe for images
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
            console.log('Dernière vidéo (Jour 15) terminée - passage à la section suivante');
            if (onScrollEnd) {
                // Délai plus long pour la vidéo de recap
                setTimeout(() => {
                    onScrollEnd();
                }, 1000);
            }
        } else {
            // Other videos - go to next slide
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
                <h2 className="text-2xl font-bold text-[#FF00FF] mt-6 mb-3">
                    # Soutenances de Septembre 2025
                </h2>
                
                <p className="text-[#CCCCCC] text-sm mb-3">
                    <span className="text-[#569CD6]">Période:</span> Septembre 2025 • <span className="text-[#569CD6]">Candidats:</span> Dernière vague (~25 étudiants)
                </p>
                <p className="text-[#CCCCCC] text-sm mb-2">
                    <span className="text-[#569CD6]">Contexte:</span> Septembre 2025, derniers passages de la promotion GI 2025. Fin d'un long parcours académique intense.
                </p>
                <p className="text-[#CCCCCC] text-sm mb-2">
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
                    speed={700}
                    className="w-full h-full"
                    onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                >
                    {media.map((item, index) => (
                        <SwiperSlide key={index} className="flex flex-col items-center justify-center p-8">
                            <div
                                className="relative w-full max-w-5xl h-[calc(100vh-400px)] min-h-[400px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#FF00FF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#FF00FF]/20 cursor-pointer"
                                onClick={handleSlideClick}
                            >
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
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <img
                                        src={item.src}
                                        alt={item.caption}
                                        className="w-full h-full object-contain"
                                        loading={index <= currentSlide + 1 ? "eager" : "lazy"}
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
                    <span className="text-[#569CD6]">//</span> Archives soutenances Septembre 2025 • ENSPY • Promotion GI 2025
                </p>
            </div>
        </div>
    );
};
