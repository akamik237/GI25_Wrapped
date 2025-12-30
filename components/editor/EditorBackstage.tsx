"use client";

import React from 'react';
import { Badge, BadgeGroup } from '@/components/ui/Badge';

interface EditorBackstageProps {
    onScrollEnd?: () => void;
}

export const EditorBackstage = ({ onScrollEnd }: EditorBackstageProps) => {
    const hasRunRef = React.useRef(false);

    // Auto-transition after delay
    React.useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        const timer = setTimeout(() => {
            if (onScrollEnd) {
                onScrollEnd();
            }
        }, 8000); // 8 seconds to read

        return () => clearTimeout(timer);
    }, [onScrollEnd]);

    return (
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden h-full w-full">
            {/* Header with badges and detailed info */}
            <div className="px-8 py-6 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#FFA500] mb-3">
                    # Backstage - Coulisses des Soutenances
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="type" value="off-camera" colorScheme="orange" />
                    <Badge label="moments" value="authentiques" colorScheme="blue" />
                    <Badge label="période" value="juillet-sept" colorScheme="red" />
                    <Badge label="esprit" value="solidarité" colorScheme="green" />
                </BadgeGroup>

                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">L'envers du décor:</span> Derrière chaque soutenance, des heures de préparation, stress et répétitions. Coulisses où nervosité et entraide se mêlent.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">La veille:</span> Répétitions devant le miroir, vérification du diaporama, préparation des tenues. Nuit courte, réveil aux aurores.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Le jour J:</span> Arrivée matinale, café serré, retrouvailles et encouragements. Photos de groupe avant d'entrer en salle.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Dans les couloirs:</span> Candidats relisant leurs notes, méditant, priant. Solidarité incroyable entre camarades qui se soutiennent mutuellement.
                    </p>
                </div>
            </div>

            {/* Central Content Area */}
            <div className="flex-1 flex items-center justify-center p-12 overflow-hidden">
                <div className="max-w-4xl w-full">
                    {/* Large Emoji with animation */}
                    <div className="text-center mb-8">
                        <div className="text-9xl mb-6">🎬</div>
                        <h3 className="text-3xl font-bold text-[#FFA500] mb-4">Les Coulisses</h3>
                    </div>

                    {/* Quote Block */}
                    <div className="p-8 bg-gradient-to-br from-[#2D2D30] to-[#1E1E1E] border-2 border-[#FFA500] rounded-lg shadow-2xl shadow-[#FFA500]/20">
                        <p className="text-[#CCCCCC] text-xl leading-relaxed italic mb-4">
                            "Les meilleurs moments ne sont pas sur scène. Dans les coulisses, quand on se serre les coudes, on se rappelle qu'on est une vraie famille."
                        </p>
                        <p className="text-[#858585] text-sm text-right">
                            — Membre GI 2025
                        </p>
                    </div>

                    {/* Timeline Cards */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="p-4 bg-[#FF00FF]/10 border border-[#FF00FF] rounded-lg text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <div className="text-xs text-[#FF00FF] font-bold mb-1">J-1</div>
                            <div className="text-xs text-[#CCCCCC]">Répétitions</div>
                        </div>
                        <div className="p-4 bg-[#00FFFF]/10 border border-[#00FFFF] rounded-lg text-center">
                            <div className="text-4xl mb-2">☕</div>
                            <div className="text-xs text-[#00FFFF] font-bold mb-1">07:00</div>
                            <div className="text-xs text-[#CCCCCC]">Arrivée ENSPY</div>
                        </div>
                        <div className="p-4 bg-[#00FF00]/10 border border-[#00FF00] rounded-lg text-center">
                            <div className="text-4xl mb-2">🤝</div>
                            <div className="text-xs text-[#00FF00] font-bold mb-1">08:30</div>
                            <div className="text-xs text-[#CCCCCC]">Soutien mutuel</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Archive Note */}
            <div className="px-8 py-4 border-t-2 border-[#FFA500]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#FFA500] font-mono">
                            <span className="text-[#00FF00]">//</span> Backstage • ENSPY
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">Juillet-Septembre 2025</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Moments:</span>
                        <span className="inline-flex items-center gap-1 text-[#FFA500]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FFA500] animate-pulse"></span>
                            Authentiques
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

