"use client";

import React from 'react';
import { Badge, BadgeGroup } from '@/components/ui/Badge';
import { Camera, Users, Heart } from 'lucide-react';

interface EditorPhotoGroupeProps {
    onScrollEnd?: () => void;
}

export const EditorPhotoGroupe = ({ onScrollEnd }: EditorPhotoGroupeProps) => {
    // Auto-advance to next section after 12 seconds
    React.useEffect(() => {
        if (onScrollEnd) {
            const timer = setTimeout(() => {
                onScrollEnd();
            }, 12000);
            return () => clearTimeout(timer);
        }
    }, [onScrollEnd]);

    return (
        <div className="h-full w-full flex flex-col bg-[#1E1E1E] overflow-hidden">
            {/* Header with badges */}
            <div className="px-8 py-6 bg-[#252526] border-b border-[#3C3C3C] flex-shrink-0">
                <h2 className="text-2xl font-bold text-[#4EC9B0] mb-3">
                    # Photo Officielle de la Promotion GI 2025
                </h2>
                
                {/* Badges */}
                <BadgeGroup>
                    <Badge label="diplômés" value="70" colorScheme="green" />
                    <Badge label="type" value="officielle" colorScheme="blue" />
                    <Badge label="date" value="septembre 2025" colorScheme="red" />
                    <Badge label="lieu" value="Campus ENSPY" colorScheme="gray" />
                </BadgeGroup>
            </div>

            {/* Main Content - Full Image Display */}
            <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-[#1E1E1E] via-[#2A2D2E] to-[#1E1E1E]">
                {/* Photo Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="w-full h-full max-w-6xl max-h-4xl bg-gradient-to-br from-[#2D2D30] to-[#3C3C3C] rounded-xl shadow-2xl border border-[#3C3C3C] flex items-center justify-center relative overflow-hidden">
                        {/* Placeholder Content */}
                        <div className="text-center z-10">
                            <div className="mb-6">
                                <Users size={120} className="mx-auto text-[#007ACC] opacity-50" />
                            </div>
                            <h2 className="text-4xl font-bold text-[#CCCCCC] mb-4">
                                PROMOTION GI 2025
                            </h2>
                            <p className="text-2xl text-[#858585] mb-6">
                                70 Futurs Ingénieurs
                            </p>
                            <div className="flex items-center justify-center gap-2 text-[#CE9178]">
                                <Heart size={24} fill="#CE9178" />
                                <span className="text-lg">ENSPY — Yaoundé, Cameroun</span>
                            </div>
                        </div>

                        {/* Decorative Grid */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="grid grid-cols-10 grid-rows-7 h-full w-full">
                                {Array.from({ length: 70 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="border border-[#007ACC] flex items-center justify-center text-[#007ACC] text-xs"
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Caption */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <div className="bg-black/80 backdrop-blur-sm px-8 py-4 rounded-full border border-[#3C3C3C]">
                        <p className="text-[#CCCCCC] text-center">
                            <span className="text-[#4EC9B0] font-bold">Septembre 2025</span>
                            <span className="mx-3">•</span>
                            <span className="text-[#858585]">Fin d'un parcours, début d'une aventure</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Minimal Footer with Info */}
            <div className="h-12 bg-[#252526] border-t border-[#3C3C3C] flex items-center justify-between px-6 text-[11px] text-[#858585]">
                <div className="flex items-center gap-4">
                    <span>📸 Photo officielle</span>
                    <span>•</span>
                    <span>🎓 70 diplômés</span>
                </div>
                <div>
                    <span>École Nationale Supérieure Polytechnique de Yaoundé</span>
                </div>
            </div>
        </div>
    );
};

