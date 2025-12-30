"use client";

import React from 'react';
import { Calendar, Award, Heart, Star } from 'lucide-react';

interface EditorSoutenancesSeptembreProps {
    onScrollEnd?: () => void;
}

export const EditorSoutenancesSeptembre = ({ onScrollEnd }: EditorSoutenancesSeptembreProps) => {
    const [currentMedia, setCurrentMedia] = React.useState(0);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    const mediaItems = [
        { caption: 'Dernière soutenance de la promo', emoji: '🎯' },
        { caption: 'Émotion palpable dans la salle', emoji: '😭' },
        { caption: 'Standing ovation', emoji: '👏' },
        { caption: 'Félicitations du jury', emoji: '🎊' },
        { caption: 'Fin d\'un chapitre', emoji: '📖' },
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
                    # Soutenances de Septembre 2025
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Calendar size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Période**</span> : Septembre 2025</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Award size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Statut**</span> : Derniers passages</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Heart size={20} className="text-[#CE9178]" />
                        <span><span className="text-[#CE9178]">**Ambiance**</span> : Émotionnelle & festive</span>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## La clôture académique
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Septembre marque la fin officielle des soutenances de la promotion GI 2025. 
                            Les derniers étudiants passent devant le jury, fermant ainsi un chapitre long 
                            de cinq années. L'émotion est à son comble, les larmes coulent, les sourires 
                            illuminent les visages. C'est la fin d'une ère et le début d'une nouvelle aventure.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Moments emblématiques
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li>La toute dernière soutenance de la promo</li>
                            <li>Standing ovation pour certains passages</li>
                            <li>Remerciements émouvants aux professeurs</li>
                            <li>Larmes de joie et d'accomplissement</li>
                            <li>Photos avec les jurys devenus complices</li>
                            <li>Célébrations improvisées après les passages</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Bilan final
                        </h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-[#2D2D30] rounded">
                                <span>Total soutenances</span>
                                <span className="text-[#4EC9B0] font-bold text-lg">70</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#2D2D30] rounded">
                                <span>Taux de réussite</span>
                                <span className="text-[#4EC9B0] font-bold text-lg">100%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#2D2D30] rounded">
                                <span>Mentions Excellent</span>
                                <span className="text-[#4EC9B0] font-bold text-lg">13</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[#2D2D30] rounded">
                                <span>Mentions Très Bien</span>
                                <span className="text-[#4EC9B0] font-bold text-lg">52</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-5 bg-gradient-to-r from-[#2D2D30] to-[#3C3C3C] border-l-4 border-[#CE9178] rounded">
                        <div className="flex items-start gap-3">
                            <Star size={24} className="text-[#CE9178] mt-1" />
                            <div>
                                <p className="text-[#CCCCCC] font-bold text-lg mb-3">
                                    Le dernier passage
                                </p>
                                <p className="text-[#D4D4D4] italic leading-7">
                                    "Quand le dernier étudiant a terminé sa soutenance, toute l'amphithéâtre 
                                    s'est levée pour applaudir. Ce n'était plus juste une soutenance, c'était 
                                    la célébration collective d'un parcours accompli ensemble. Nous étions tous 
                                    en larmes, professeurs compris. GI 2025 était officiellement diplômée."
                                </p>
                                <p className="text-[#858585] text-sm mt-3">
                                    — Témoignage d'un membre de la promo
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
                
                <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#2D2D30] to-[#1E1E1E]">
                    {mediaItems.map((item, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentMedia ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <div className="w-full h-full flex items-center justify-center p-12">
                                <div className="text-center">
                                    <div className="text-9xl mb-8 animate-pulse">{item.emoji}</div>
                                    <div className="text-[#CCCCCC] text-2xl font-semibold mb-3">{item.caption}</div>
                                    <div className="text-[#858585] text-sm">
                                        Moment {index + 1} / {mediaItems.length}
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
                                        ? 'bg-[#CE9178] w-8' 
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

