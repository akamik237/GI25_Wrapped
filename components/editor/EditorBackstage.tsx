"use client";

import React from 'react';
import { Camera, Clock, Coffee, Users2 } from 'lucide-react';

interface EditorBackstageProps {
    onScrollEnd?: () => void;
}

export const EditorBackstage = ({ onScrollEnd }: EditorBackstageProps) => {
    const [currentImage, setCurrentImage] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    const backstageItems = [
        { caption: 'Répétitions la veille', emoji: '📝', time: 'J-1' },
        { caption: 'Arrivée matinale à l\'ENSPY', emoji: '🌅', time: '07:00' },
        { caption: 'Dernières retouches du diaporama', emoji: '💻', time: '08:30' },
        { caption: 'Moment de concentration', emoji: '🧘', time: '09:00' },
        { caption: 'Soutien des camarades', emoji: '🤝', time: '09:15' },
        { caption: 'Dans les couloirs avant d\'entrer', emoji: '🚪', time: '09:25' },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % backstageItems.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [backstageItems.length]);

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
                    # Backstage — Coulisses des Soutenances
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Camera size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Type**</span> : Moments off-camera</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Clock size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Période**</span> : Juillet - Septembre 2025</span>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## L'envers du décor
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Derrière chaque soutenance réussie se cachent des heures de préparation, de stress, 
                            de répétitions et de moments authentiques. Voici un aperçu de ce que les jurys ne 
                            voient pas : les coulisses où se mêlent nervosité, entraide et détermination.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## La veille
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li>Répétition du discours devant le miroir</li>
                            <li>Vérification minutieuse du diaporama</li>
                            <li>Préparation des tenues (repassage obligatoire !)</li>
                            <li>Appels aux camarades pour des conseils de dernière minute</li>
                            <li>Nuit courte, réveil aux aurores</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Le jour J
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-[#2D2D30] rounded">
                                <Coffee size={18} className="text-[#CE9178] mt-1" />
                                <div>
                                    <span className="text-[#CE9178] font-semibold">07:00</span>
                                    <p className="text-[#D4D4D4] text-sm mt-1">
                                        Arrivée à l'ENSPY. Café serré obligatoire pour calmer les nerfs.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-[#2D2D30] rounded">
                                <Users2 size={18} className="text-[#569CD6] mt-1" />
                                <div>
                                    <span className="text-[#569CD6] font-semibold">08:30</span>
                                    <p className="text-[#D4D4D4] text-sm mt-1">
                                        Retrouvailles avec les camarades. Mots d'encouragement et derniers conseils.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 bg-[#2D2D30] rounded">
                                <Camera size={18} className="text-[#4EC9B0] mt-1" />
                                <div>
                                    <span className="text-[#4EC9B0] font-semibold">09:00</span>
                                    <p className="text-[#D4D4D4] text-sm mt-1">
                                        Photos de groupe avant d'entrer en salle. Sourires forcés mais sincères.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Dans les couloirs
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Les couloirs de l'ENSPY deviennent le théâtre de scènes touchantes : des candidats 
                            qui relisent leurs notes une dernière fois, d'autres qui méditent en silence, certains 
                            qui prient, et toujours cette solidarité incroyable entre camarades qui attendent leur 
                            tour ou viennent soutenir les autres.
                        </p>
                    </div>

                    <div className="mt-8 p-4 bg-[#2D2D30] border-l-4 border-[#569CD6] rounded">
                        <p className="text-[#D4D4D4] italic">
                            "Les meilleurs moments ne sont pas forcément sur scène. C'est dans les coulisses, 
                            quand on se serre les coudes, qu'on se rappelle qu'on est une vraie famille."
                        </p>
                        <p className="text-[#858585] text-sm mt-2">
                            — Un membre de GI 2025
                        </p>
                    </div>
                </div>
            </div>

            {/* Preview - Backstage Timeline */}
            <div className="w-1/2 bg-[#1E1E1E] border-l border-[#3C3C3C] flex flex-col">
                <div className="h-10 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                    <span>TIMELINE BACKSTAGE</span>
                </div>
                
                <div className="flex-1 relative overflow-hidden">
                    {backstageItems.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentImage ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-[#1E1E1E] to-[#2D2D30] flex items-center justify-center p-12">
                                <div className="text-center max-w-md">
                                    <div className="inline-block px-4 py-2 bg-[#007ACC] rounded-full mb-6">
                                        <span className="text-white font-bold text-sm">{item.time}</span>
                                    </div>
                                    <div className="text-9xl mb-6">{item.emoji}</div>
                                    <div className="text-[#CCCCCC] text-2xl font-semibold mb-3">{item.caption}</div>
                                    <div className="text-[#858585] text-sm">
                                        Moment {index + 1} / {backstageItems.length}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                        {backstageItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentImage 
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

