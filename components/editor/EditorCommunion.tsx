"use client";

import React from 'react';
import { Badge, BadgeGroup } from '@/components/ui/Badge';

interface EditorCommunionProps {
    onScrollEnd?: () => void;
}

export const EditorCommunion = ({ onScrollEnd }: EditorCommunionProps) => {
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
                <h2 className="text-2xl font-bold text-[#CE9178] mb-3">
                    # Communion avec les Cadets - Passage du Flambeau
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="type" value="symbolique" colorScheme="orange" />
                    <Badge label="flambeau" value="transmission" colorScheme="red" />
                    <Badge label="promotions" value="GI 2025 → 2026" colorScheme="blue" />
                    <Badge label="lieu" value="Campus ENSPY" colorScheme="gray" />
                </BadgeGroup>

                {/* Detailed Description */}
                <div className="space-y-3 text-[#CCCCCC] text-sm leading-relaxed">
                    <p>
                        <span className="text-[#569CD6] font-semibold">Passage de témoin:</span> Événement symbolique entre GI 2025 et GI 2026. Moment de transmission, encouragement et partage d'expériences.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Programme:</span> Discours inspirants, conseils pour les projets, astuces soutenances. Photos et remise symbolique du flambeau GI.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Messages clés:</span> Persévérance, solidarité et excellence. Soutien mutuel et vision d'un réseau d'ingénieurs camerounais.
                    </p>
                    <p>
                        <span className="text-[#569CD6] font-semibold">Continuité:</span> L'esprit GI transcende les promotions. Liens durables créant un réseau solide au-delà de l'ENSPY.
                    </p>
                </div>
            </div>

            {/* Central Content Area */}
            <div className="flex-1 flex items-center justify-center p-12 overflow-hidden">
                <div className="max-w-4xl w-full">
                    {/* Torch passing visual */}
                    <div className="flex items-center justify-center gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-[#569CD6] to-[#4EC9B0] rounded-full flex items-center justify-center mb-4">
                                <div className="text-5xl">🎓</div>
                            </div>
                            <p className="text-[#CCCCCC] font-bold text-xl">GI 2025</p>
                            <p className="text-[#858585] text-sm">Les Anciens</p>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-6xl animate-pulse">🔥</div>
                            <div className="text-4xl text-[#CE9178]">→</div>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-[#CE9178] to-[#FFA500] rounded-full flex items-center justify-center mb-4">
                                <div className="text-5xl">👥</div>
                            </div>
                            <p className="text-[#CCCCCC] font-bold text-xl">GI 2026</p>
                            <p className="text-[#858585] text-sm">Les Cadets</p>
                        </div>
                    </div>

                    {/* Quote Block */}
                    <div className="p-8 bg-gradient-to-br from-[#2D2D30] to-[#1E1E1E] border-2 border-[#CE9178] rounded-lg shadow-2xl shadow-[#CE9178]/20">
                        <p className="text-[#CCCCCC] text-xl leading-relaxed italic mb-4 text-center">
                            "Aujourd'hui successeurs, demain mentors. Honorez ce flambeau, faites-nous fiers. L'excellence se transmet."
                        </p>
                        <p className="text-[#858585] text-sm text-center">
                            — Message aux cadets
                        </p>
                    </div>

                    {/* Value Cards */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="p-4 bg-[#569CD6]/10 border border-[#569CD6] rounded-lg text-center">
                            <div className="text-3xl mb-2">💪</div>
                            <div className="text-xs text-[#569CD6] font-bold">Persévérance</div>
                        </div>
                        <div className="p-4 bg-[#4EC9B0]/10 border border-[#4EC9B0] rounded-lg text-center">
                            <div className="text-3xl mb-2">🤝</div>
                            <div className="text-xs text-[#4EC9B0] font-bold">Solidarité</div>
                        </div>
                        <div className="p-4 bg-[#CE9178]/10 border border-[#CE9178] rounded-lg text-center">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="text-xs text-[#CE9178] font-bold">Excellence</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Archive Note */}
            <div className="px-8 py-4 border-t-2 border-[#CE9178]/30 bg-[#252526] flex-shrink-0">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                        <span className="text-[#CE9178] font-mono">
                            <span className="text-[#00FF00]">//</span> Passage du flambeau • ENSPY
                        </span>
                        <span className="text-[#858585]">|</span>
                        <span className="text-[#CCCCCC]">GI 2025 → GI 2026</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#858585]">Tradition:</span>
                        <span className="inline-flex items-center gap-1 text-[#CE9178]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#CE9178] animate-pulse"></span>
                            Continue
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
