"use client";

import React from 'react';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';

interface EditorSoutenancesJuilletProps {
    onScrollEnd?: () => void;
}

export const EditorSoutenancesJuillet = ({ onScrollEnd }: EditorSoutenancesJuilletProps) => {
    const [currentMedia, setCurrentMedia] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    const mediaItems = [
        { type: 'image', caption: 'Première soutenance de juillet', emoji: '🎓' },
        { type: 'image', caption: 'Présentation devant le jury', emoji: '👨‍🏫' },
        { type: 'image', caption: 'Démonstration technique', emoji: '💻' },
        { type: 'video', caption: 'Moment de félicitations', emoji: '🎉' },
        { type: 'image', caption: 'Applaudissements du public', emoji: '👏' },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMedia((prev) => (prev + 1) % mediaItems.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [mediaItems.length]);

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
                    }, 5000);
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
            {/* Markdown Content */}
            <div ref={contentRef} className="w-1/2 overflow-y-auto p-8 font-mono text-[14px] text-[#CCCCCC] scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                <h1 className="text-3xl font-bold text-[#4EC9B0] mb-6">
                    # Soutenances de Juillet 2025
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Calendar size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Période**</span> : Juillet 2025</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Users size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Candidats**</span> : Première vague</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Clock size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Durée**</span> : 2 semaines intensives</span>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Le début de la fin
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Juillet marque le lancement officiel des soutenances de fin d'études de la promotion 
                            GI 2025. Après des mois de stage et de rédaction, les premiers étudiants se présentent 
                            devant le jury pour défendre leurs travaux. L'atmosphère est chargée d'excitation et 
                            d'appréhension, mais aussi de fierté.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Moments clés
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li>Première soutenance de la promotion</li>
                            <li>Présentations techniques impressionnantes</li>
                            <li>Questions pointues du jury</li>
                            <li>Démonstrations live des projets</li>
                            <li>Premières mentions "Excellent"</li>
                            <li>Ambiance de soutien entre camarades</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Statistiques
                        </h2>
                        <div className="space-y-2 text-[#D4D4D4]">
                            <div className="flex justify-between">
                                <span>Soutenances réalisées</span>
                                <span className="text-[#4EC9B0] font-bold">~45</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taux de réussite</span>
                                <span className="text-[#4EC9B0] font-bold">100%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Durée moyenne</span>
                                <span className="text-[#4EC9B0] font-bold">45 min</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-[#2D2D30] border-l-4 border-[#569CD6] rounded">
                        <div className="flex items-start gap-3">
                            <Trophy size={20} className="text-[#569CD6] mt-1" />
                            <div>
                                <p className="text-[#D4D4D4] font-semibold mb-2">
                                    Tension & Réussite
                                </p>
                                <p className="text-[#D4D4D4] italic text-sm">
                                    "C'est un mélange de stress et d'excitation. Tu sais que c'est la dernière 
                                    épreuve avant de devenir ingénieur. Tout le travail de cinq ans se joue ici."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview - Media Carousel */}
            <div className="w-1/2 bg-[#1E1E1E] border-l border-[#3C3C3C] flex flex-col">
                <div className="h-10 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                    <span>PREVIEW</span>
                </div>
                
                <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#1E1E1E] to-[#2D2D30]">
                    {mediaItems.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentMedia ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="w-full h-full flex items-center justify-center p-12">
                                <div className="text-center">
                                    <div className="text-8xl mb-6">{item.emoji}</div>
                                    <div className="text-[#CCCCCC] text-xl font-semibold mb-2">{item.caption}</div>
                                    <div className="text-[#858585] text-sm">
                                        {item.type === 'video' ? '🎥 Vidéo' : '📸 Photo'} {index + 1} / {mediaItems.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Dots */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                        {mediaItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentMedia(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentMedia 
                                        ? 'bg-[#007ACC] w-8' 
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

