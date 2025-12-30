"use client";

import React from 'react';

export type SectionType = 'terminal' | 'markdown' | 'extension';

export interface Section {
    id: number;
    type: SectionType;
    component: string; // 'intro' | 'promo' | 'promo-shoot' | 'sortie' | 'themes' etc.
    title?: string;
    extensionData?: any;
}

export const SECTIONS: Section[] = [
    { id: 1, type: 'terminal', component: 'intro' },
    { id: 2, type: 'terminal', component: 'promo' },
    { id: 3, type: 'markdown', component: 'promo-shoot', title: 'PromoShoot.md' },
    { id: 4, type: 'markdown', component: 'sortie', title: 'SortiePromo.md' },
    { id: 5, type: 'terminal', component: 'themes' },
    { id: 6, type: 'markdown', component: 'entreprises', title: 'Entreprises.md' },
    { id: 7, type: 'markdown', component: 'soutenances-juillet', title: 'Soutenances_Juillet.md' },
    { id: 8, type: 'markdown', component: 'soutenances-septembre', title: 'Soutenances_Septembre.md' },
    { id: 9, type: 'extension', component: 'top-femmes', title: 'Top 5 Tenues Femmes' },
    { id: 10, type: 'terminal', component: 'mentions' },
    { id: 11, type: 'extension', component: 'top-hommes', title: 'Top 5 Tenues Hommes' },
    { id: 12, type: 'extension', component: 'moments', title: 'Moments Iconiques' },
    { id: 13, type: 'markdown', component: 'backstage', title: 'Backstage.md' },
    { id: 14, type: 'markdown', component: 'communion', title: 'Communion_Cadets.md' },
    { id: 15, type: 'markdown', component: 'photo-groupe', title: 'PhotoGroupe.md' },
    { id: 16, type: 'extension', component: 'highlights', title: 'Highlights Finaux' },
    { id: 17, type: 'terminal', component: 'closing' },
];

interface SectionManagerContextType {
    currentSection: number;
    setCurrentSection: (section: number) => void;
    goToNextSection: () => void;
    getSectionInfo: (id: number) => Section | undefined;
    isTransitioning: boolean;
}

const SectionManagerContext = React.createContext<SectionManagerContextType | null>(null);

export const SectionManagerProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentSection, setCurrentSection] = React.useState(1);
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    const goToNextSection = React.useCallback(() => {
        if (currentSection < SECTIONS.length) {
            setIsTransitioning(true);
            
            // Smooth transition delay
            setTimeout(() => {
                setCurrentSection(prev => prev + 1);
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 300);
            }, 200);
        }
    }, [currentSection]);

    const getSectionInfo = React.useCallback((id: number) => {
        return SECTIONS.find(s => s.id === id);
    }, []);

    return (
        <SectionManagerContext.Provider
            value={{
                currentSection,
                setCurrentSection,
                goToNextSection,
                getSectionInfo,
                isTransitioning,
            }}
        >
            {children}
        </SectionManagerContext.Provider>
    );
};

export const useSectionManager = () => {
    const context = React.useContext(SectionManagerContext);
    if (!context) {
        throw new Error('useSectionManager must be used within SectionManagerProvider');
    }
    return context;
};




