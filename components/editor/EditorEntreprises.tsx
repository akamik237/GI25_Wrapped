"use client";

import React from 'react';
import { Building2, MapPin, Users, Briefcase } from 'lucide-react';

interface EditorEntreprisesProps {
    onScrollEnd?: () => void;
}

export const EditorEntreprises = ({ onScrollEnd }: EditorEntreprisesProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    const entreprises = [
        "MTN Cameroon", "Orange Cameroon", "Nexttel", "Camtel", "BEAC", "MINPOSTEL",
        "MINESEC", "MINEPAT", "Banque Atlantique", "Afriland First Bank", "BICEC",
        "Société Générale Cameroun", "Ecobank", "UBA", "Standard Chartered Bank",
        "CNPS", "Chanas Assurance", "AXA Assurance", "Allianz Cameroun", "SUNU Assurances",
        "Bolloré Transport & Logistics", "CAMRAIL", "Aéroports du Cameroun", "SONARA",
        "SNH", "AES Sonel", "ENEO Cameroon", "ARSEL", "CamWater", "CDE",
        "Douala International Terminal", "APMT Douala", "CDC", "PAMOL", "SOCAPALM",
        "SAF CACAO", "Diageo Cameroon", "SABC", "ALUCAM", "Dangote Cement",
        "CICAM", "Les Brasseries du Cameroun", "TRADEX", "Total Energies Cameroun",
        "PETROLEX", "RAZEL"
    ];

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
            {/* Markdown Content (Left Side) */}
            <div ref={contentRef} className="w-1/2 overflow-y-auto p-8 font-mono text-[14px] text-[#CCCCCC] scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                <h1 className="text-3xl font-bold text-[#4EC9B0] mb-6">
                    # Entreprises d'Accueil
                </h1>

                <div className="space-y-4 leading-relaxed">
                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Building2 size={20} className="text-[#569CD6]" />
                        <span className="text-[#569CD6]">**Total**</span> : {entreprises.length} entreprises partenaires
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <MapPin size={20} className="text-[#569CD6]" />
                        <span className="text-[#569CD6]">**Zones**</span> : Douala, Yaoundé, Régions
                    </div>

                    <div className="flex items-center gap-3 text-[#D4D4D4]">
                        <Users size={20} className="text-[#569CD6]" />
                        <span className="text-[#569CD6]">**Étudiants**</span> : 70 stagiaires placés
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## À propos
                        </h2>
                        <p className="text-[#D4D4D4] leading-7">
                            La promotion GI 2025 a eu l'opportunité de collaborer avec les plus grandes 
                            entreprises et institutions du Cameroun. Ces stages de fin d'études ont permis 
                            aux étudiants d'appliquer leurs compétences techniques dans des environnements 
                            professionnels variés, allant des télécommunications à la finance, en passant 
                            par l'énergie et l'administration publique.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold text-[#4EC9B0] mb-4">
                            ## Secteurs représentés
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-[#D4D4D4]">
                            <li><span className="text-[#CE9178]">Télécommunications</span> - MTN, Orange, Nexttel, Camtel</li>
                            <li><span className="text-[#CE9178]">Banque & Finance</span> - BEAC, Afriland, BICEC, Société Générale</li>
                            <li><span className="text-[#CE9178]">Assurances</span> - AXA, Chanas, Allianz, SUNU</li>
                            <li><span className="text-[#CE9178]">Énergie</span> - ENEO, AES Sonel, SONARA, Total</li>
                            <li><span className="text-[#CE9178]">Transport & Logistique</span> - Bolloré, CAMRAIL, DIT</li>
                            <li><span className="text-[#CE9178]">Agro-industrie</span> - CDC, PAMOL, SOCAPALM, SAF CACAO</li>
                            <li><span className="text-[#CE9178]">Administration</span> - MINPOSTEL, MINESEC, MINEPAT</li>
                        </ul>
                    </div>

                    <div className="mt-8 p-4 bg-[#2D2D30] border-l-4 border-[#4EC9B0] rounded">
                        <p className="text-[#D4D4D4] italic">
                            "Ces partenariats témoignent de la confiance que les entreprises camerounaises 
                            accordent à la formation d'excellence dispensée à l'ENSPY."
                        </p>
                    </div>
                </div>
            </div>

            {/* Preview (Right Side) - Liste scrollable */}
            <div className="w-1/2 bg-[#1E1E1E] border-l border-[#3C3C3C] flex flex-col">
                <div className="h-10 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                    <Briefcase size={14} className="mr-2" />
                    <span>LISTE DES ENTREPRISES</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                    <div className="grid grid-cols-1 gap-3">
                        {entreprises.map((entreprise, index) => (
                            <div 
                                key={index}
                                className="bg-[#2D2D30] hover:bg-[#3C3C3C] p-4 rounded-lg border border-[#3C3C3C] transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#007ACC] rounded flex items-center justify-center text-white font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="text-[#CCCCCC] font-medium group-hover:text-white transition-colors">
                                            {entreprise}
                                        </span>
                                    </div>
                                    <Building2 size={18} className="text-[#858585] group-hover:text-[#007ACC] transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

