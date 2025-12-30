"use client";

import React from 'react';
import { Flame, Users, GraduationCap, ArrowRight } from 'lucide-react';

interface EditorCommunionProps {
    onScrollEnd?: () => void;
}

export const EditorCommunion = ({ onScrollEnd }: EditorCommunionProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

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
                    # Communion avec les Cadets
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Flame size={20} className="text-[#CE9178]" />
                        <span><span className="text-[#CE9178]">**Symbolique**</span> : Passage du flambeau</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Users size={20} className="text-[#569CD6]" />
                        <span><span className="text-[#569CD6]">**Participants**</span> : GI 2025 & GI 2026</span>
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <GraduationCap size={20} className="text-[#4EC9B0]" />
                        <span><span className="text-[#4EC9B0]">**Lieu**</span> : ENSPY Campus</span>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Le passage de témoin
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Avant de quitter définitivement les bancs de l'ENSPY, la promotion GI 2025 a organisé 
                            un événement symbolique avec les cadets de GI 2026. Un moment de transmission, 
                            d'encouragement et de partage d'expériences. Les anciens deviennent mentors, 
                            les jeunes héritent du flambeau.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Au programme
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li>Discours inspirants des aînés</li>
                            <li>Conseils pour réussir les projets de fin d'études</li>
                            <li>Partage d'anecdotes sur les stages</li>
                            <li>Astuces pour les soutenances</li>
                            <li>Photos cérémoniales ensemble</li>
                            <li>Remise symbolique du "flambeau GI"</li>
                        </ul>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Messages clés
                        </h2>
                        <div className="space-y-3">
                            <div className="p-4 bg-[#2D2D30] rounded-lg border-l-4 border-[#569CD6]">
                                <p className="text-[#569CD6] font-semibold mb-2">💪 Persévérance</p>
                                <p className="text-[#D4D4D4] text-sm">
                                    "Le chemin est long et difficile, mais chaque obstacle vous rend plus fort. 
                                    N'abandonnez jamais."
                                </p>
                            </div>

                            <div className="p-4 bg-[#2D2D30] rounded-lg border-l-4 border-[#4EC9B0]">
                                <p className="text-[#4EC9B0] font-semibold mb-2">🤝 Solidarité</p>
                                <p className="text-[#D4D4D4] text-sm">
                                    "Votre promotion est votre famille. Soutenez-vous mutuellement, 
                                    partagez vos connaissances."
                                </p>
                            </div>

                            <div className="p-4 bg-[#2D2D30] rounded-lg border-l-4 border-[#CE9178]">
                                <p className="text-[#CE9178] font-semibold mb-2">🎯 Excellence</p>
                                <p className="text-[#D4D4D4] text-sm">
                                    "Visez toujours l'excellence. Ce n'est pas juste pour les notes, 
                                    c'est pour devenir les meilleurs dans vos domaines."
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## La continuité
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            Cet événement symbolise bien plus qu'un simple au revoir. C'est la confirmation 
                            que l'esprit GI transcende les promotions. Les liens créés entre aînés et cadets 
                            perdurent bien au-delà de l'ENSPY, créant un réseau solide d'ingénieurs camerounais.
                        </p>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-r from-[#2D2D30] to-[#3C3C3C] rounded-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-[#569CD6] rounded-full flex items-center justify-center">
                                <ArrowRight size={24} className="text-white" />
                            </div>
                            <div>
                                <p className="text-[#CCCCCC] font-bold text-lg">Le flambeau continue</p>
                                <p className="text-[#858585] text-sm">GI 2025 → GI 2026 → ...</p>
                            </div>
                        </div>
                        <p className="text-[#D4D4D4] italic">
                            "Aujourd'hui vous êtes les successeurs, demain vous serez les mentors. 
                            Honorez ce flambeau, faites-nous fiers."
                        </p>
                    </div>
                </div>
            </div>

            {/* Preview - Symbolic Visual */}
            <div className="w-1/2 bg-[#1E1E1E] border-l border-[#3C3C3C] flex flex-col">
                <div className="h-10 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                    <span>PASSAGE DU FLAMBEAU</span>
                </div>
                
                <div className="flex-1 bg-gradient-to-br from-[#1E1E1E] via-[#2D2D30] to-[#1E1E1E] flex items-center justify-center p-12">
                    <div className="text-center">
                        <div className="mb-12">
                            <div className="flex items-center justify-center gap-8">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-[#569CD6] to-[#4EC9B0] rounded-full flex items-center justify-center mb-4">
                                        <GraduationCap size={64} className="text-white" />
                                    </div>
                                    <p className="text-[#CCCCCC] font-bold text-xl">GI 2025</p>
                                    <p className="text-[#858585] text-sm">Les Anciens</p>
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                    <Flame size={48} className="text-[#CE9178] animate-pulse" />
                                    <ArrowRight size={32} className="text-[#CE9178]" />
                                </div>

                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-[#CE9178] to-[#F0AD4E] rounded-full flex items-center justify-center mb-4">
                                        <Users size={64} className="text-white" />
                                    </div>
                                    <p className="text-[#CCCCCC] font-bold text-xl">GI 2026</p>
                                    <p className="text-[#858585] text-sm">Les Cadets</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 max-w-md mx-auto">
                            <p className="text-[#CCCCCC] text-lg mb-4 font-semibold">
                                "Le flambeau de l'excellence se transmet"
                            </p>
                            <p className="text-[#858585] text-sm">
                                Une tradition qui unit les générations d'ingénieurs ENSPY
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

