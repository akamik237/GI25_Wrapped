"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Badge, BadgeGroup } from '@/components/ui/Badge';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface EditorPromoShootProps {
    onScrollEnd?: () => void;
}

export const EditorPromoShoot = ({ onScrollEnd }: EditorPromoShootProps) => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const swiperRef = React.useRef<SwiperType | null>(null);
    const videoRefs = React.useRef<{[key: number]: HTMLVideoElement | null}>({});

    // Images/Videos for carousel - Videos first and last
    const images = [
        { src: "/promo-shoot/videophotodelapromo1.MOV", caption: "Séance photo de la promotion", isVideo: true },
        { src: "/promo-shoot/photo_2025-12-30_15-03-18.jpg", caption: "Vue d'ensemble - Promotion GI 2025", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-12-51.jpg", caption: "Portrait collectif officiel", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-13-08.jpg", caption: "Moments de cohésion", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-13-10.jpg", caption: "Esprit d'équipe", isVideo: false },
        { src: "/promo-shoot/photo_2025-12-30_16-13-14.jpg", caption: "Ambiance conviviale", isVideo: false },
        { src: "/promo-shoot/Recap_photodelapromo.mp4", caption: "Récapitulatif de la journée photo", isVideo: true },
    ];

    // Handle video playback and slide change
    React.useEffect(() => {
        const currentImage = images[currentSlide];
        
        if (!currentImage || !swiperRef.current) return;
        
        if (currentImage.isVideo) {
            // Stop autoplay for videos
            swiperRef.current.autoplay.stop();
            
            const videoElement = videoRefs.current[currentSlide];
            if (videoElement) {
                // Reset video to start
                videoElement.currentTime = 0;
                
                // Play video
                const playPromise = videoElement.play();
                if (playPromise !== undefined) {
                    playPromise.catch((error) => {
                        console.log('Lecture vidéo bloquée:', error);
                    });
                }
                
                // Listen for video end
                const handleVideoEnd = () => {
                    console.log(`✓ Vidéo ${currentSlide + 1} terminée`);
                    
                    if (currentSlide === images.length - 1) {
                        // Last video - trigger next section
                        console.log('Dernière vidéo - passage à la section suivante');
                        if (onScrollEnd) {
                            setTimeout(() => {
                                onScrollEnd();
                            }, 2000);
                        }
                    } else {
                        // Move to next slide
                        console.log('Passage à la slide suivante');
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
            // Resume autoplay for images
            console.log(`Image ${currentSlide + 1} - autoplay actif`);
            swiperRef.current.autoplay.start();
        }
    }, [currentSlide, images, onScrollEnd]);

    const handleSlideClick = () => {
        // Don't allow skipping during video playback
        const currentImage = images[currentSlide];
        if (currentImage?.isVideo) {
            const videoElement = videoRefs.current[currentSlide];
            if (videoElement && !videoElement.paused && !videoElement.ended) {
                // Video is playing, don't skip
                console.log('⏸ Vidéo en cours, attendez la fin');
                return;
            }
        }
        
        // Allow navigation for images or finished videos
        if (currentSlide < images.length - 1) {
            swiperRef.current?.slideNext();
        }
    };

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with badges and detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#00FFFF] mb-3">
                    # Séance Photo Officielle - Promotion GI 2025
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="participants" value="70" colorScheme="green" />
                    <Badge label="photos" value="120+" colorScheme="blue" />
                    <Badge label="vidéos" value="15" colorScheme="red" />
                    <Badge label="durée" value="4h" colorScheme="orange" />
                    <Badge label="lieu" value="Campus ENSPY" colorScheme="gray" />
                </BadgeGroup>

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
                                            ref={(el) => { videoRefs.current[index] = el; }}
                                            src={image.src}
                                            className="max-w-full max-h-full object-contain"
                                            playsInline
                                            controls={false}
                                            onLoadedMetadata={() => console.log(`✓ Vidéo ${index + 1} chargée`)}
                                        />
                                    ) : (
                                        <img
                                            src={image.src}
                                            alt={image.caption}
                                            className="max-w-full max-h-full object-contain"
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

