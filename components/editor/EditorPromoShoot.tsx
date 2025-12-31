"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface EditorPromoShootProps {
    onScrollEnd?: () => void;
}

export const EditorPromoShoot = ({ onScrollEnd }: EditorPromoShootProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const swiperRef = React.useRef<SwiperType | null>(null);
    const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});

    // Images/Videos for carousel - Toutes les images d'abord, puis vidéos, recap en dernier
    const images = [
        // Toutes les images d'abord
        { src: "/promo-shoot/photo_2025-12-30_15-03-18.jpg", caption: "Les Garçons - GI 2025", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-12-51.jpg", caption: "Dernier coup de pinceau", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-13-14.jpg", caption: "Admirez l'élégance", isVideo: false },
        { src: "/promo-shoot/lecomitedorganisation.jpg", caption: "Le comité d'organisation", isVideo: false },
        { src: "/promo-shoot/lesfillesdelapromo.jpg", caption: "Les filles de la promotion", isVideo: false },
        { src: "/promo-shoot/MBREyespourledroneetlepresidentducomite.jpg", caption: "MBR Eyes pour les drones", isVideo: false },
        { src: "/promo-shoot/photodeBelleNIckel.jpg", caption: "Photo Indiv", isVideo: false },
        { src: "/promo-shoot/photodelaTresoriereAmirah.jpg", caption: "Photo Indiv", isVideo: false },
        { src: "/promo-shoot/photodeYanBelinga.jpg", caption: "Photo Indiv", isVideo: false },
        { src: "/promo-shoot/selfiedegroupe.jpg", caption: "Selfie de groupe", isVideo: false },
        { src: "/promo-shoot/thephotographers.jpg", caption: "Les photographes", isVideo: false },
        // Puis les vidéos (sauf le recap)
        { src: "/promo-shoot/videophotodelapromo1.MOV", caption: "Petit Défilé", isVideo: true },
        { src: "/promo-shoot/drone.mp4", caption: "Vue aérienne - Drone de la séance photo", isVideo: true },
        { src: "/promo-shoot/videosdesprofs.MOV", caption: "Arrivée des enseignants", isVideo: true },
        // Recap en dernier
        { src: "/promo-shoot/Recap_photodelapromo.mp4", caption: "Récapitulatif de la journée photo", isVideo: true },
    ];

    // Handle video playback and autoplay
    React.useEffect(() => {
        const currentImage = images[currentSlide];
        
        if (!currentImage || !swiperRef.current) return;
        
        if (currentImage.isVideo) {
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
            console.log(`Image ${currentSlide + 1} - autoplay actif`);
            swiperRef.current.autoplay.start();
            setIsVideoPlaying(false);
        }
    }, [currentSlide, images]);

    // Handle video end callback
    const handleVideoEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        const currentTime = video.currentTime;
        const duration = video.duration;
        
        console.log(`✓ Vidéo ${currentSlide + 1} terminée - Temps: ${currentTime.toFixed(2)}s / ${duration.toFixed(2)}s`);
        
        // Pour la vidéo de recap (dernière), s'assurer qu'elle est vraiment terminée
        if (currentSlide === images.length - 1) {
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
            // Move to next slide
            console.log('Passage à la slide suivante');
            setIsVideoPlaying(false);
            swiperRef.current?.slideNext();
        }
    };

    const handleSlideClick = () => {
        // Don't allow skipping during video playback
        const currentImage = images[currentSlide];
        if (currentImage?.isVideo && isVideoPlaying) {
            // Video is playing, don't skip
            console.log('⏸ Vidéo en cours, attendez la fin');
            return;
        }
        
        // Allow navigation for images or finished videos
        if (currentSlide < images.length - 1) {
            swiperRef.current?.slideNext();
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#00FFFF] mt-6 mb-3">
                    # Séance Photo Officielle - Promotion GI 2025
                </h2>
                

                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Contexte:</span> Séance photo officielle en janvier 2025 sur le campus ENSPY. Événement marquant l'unité de la promotion avant les soutenances.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Objectifs:</span> Immortaliser ce moment historique à travers des portraits collectifs et individuels pour les archives officielles de l'école.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Déroulement:</span> Photos de groupe formelles, portraits individuels et clichés spontanés. Une équipe professionnelle a documenté chaque instant de la journée.
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
                        console.log(`🎬 Swiper PromoShoot: Slide ${swiper.activeIndex + 1}`);
                    }}
                    className="w-full h-full"
                    style={{ height: '100%' }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full flex flex-col items-center justify-center p-8 cursor-pointer bg-[#1E1E1E]"
                                onClick={handleSlideClick}
                            >
                                {/* Image/Video Container */}
                                <div className="relative w-full max-w-5xl h-[500px] bg-gradient-to-br from-[#252526] to-[#1E1E1E] rounded-lg border-2 border-[#00FFFF] flex items-center justify-center overflow-hidden shadow-lg shadow-[#00FFFF]/20">
                                    {image.isVideo ? (
                                        <video
                                            ref={(el) => {
                                                videoRefs.current[index] = el;
                                            }}
                                            src={image.src}
                                            className="w-full h-full object-contain"
                                            playsInline
                                            preload="auto"
                                            onEnded={handleVideoEnd}
                                            onLoadedData={() => {
                                                const video = videoRefs.current[index];
                                                if (video) {
                                                    console.log(`✓ Vidéo ${index + 1} chargée - Durée: ${video.duration.toFixed(2)}s`);
                                                }
                                            }}
                                            onTimeUpdate={(e) => {
                                                // Pour debug: afficher la progression de la vidéo de recap
                                                if (index === images.length - 1) {
                                                    const video = e.currentTarget;
                                                    const progress = (video.currentTime / video.duration) * 100;
                                                    if (progress > 90) {
                                                        console.log(`Recap vidéo: ${progress.toFixed(1)}% - ${video.currentTime.toFixed(2)}s / ${video.duration.toFixed(2)}s`);
                                                    }
                                                }
                                            }}
                                            onWaiting={(e) => {
                                                // Si la vidéo attend du contenu, ne pas déclencher onEnded
                                                console.log(`Vidéo ${index + 1} en attente de chargement...`);
                                            }}
                                            onCanPlayThrough={(e) => {
                                                // Vidéo complètement chargée et prête à jouer
                                                const video = e.currentTarget;
                                                console.log(`Vidéo ${index + 1} prête - Durée complète: ${video.duration.toFixed(2)}s`);
                                            }}
                                            onError={(e) => {
                                                console.error(`Erreur vidéo ${index + 1}:`, e);
                                            }}
                                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                                        />
                                    ) : (
                                        <img
                                            src={image.src}
                                            alt={image.caption}
                                            className="max-w-full max-h-full object-contain"
                                            loading={index <= currentSlide + 1 ? "eager" : "lazy"}
                                            onLoad={() => console.log(`✓ Image ${index + 1} chargée`)}
                                        />
                                    )}
                                </div>

                                {/* Caption */}
                                <div className="mt-6 max-w-5xl w-full">
                                    <p className="text-[#CCCCCC] text-center text-lg font-light italic">
                                        {image.caption}
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
                            <span className="text-[#00FF00]">//</span> Archives officielles ENSPY
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">Janvier 2025</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Status:</span>
                        <span className="inline-flex items-center gap-1 text-[#00FF00]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF00] animate-pulse"></span>
                            Archivé
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

