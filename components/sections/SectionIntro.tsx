"use client";

import React from 'react';
import { FileCode2, FileText } from 'lucide-react';
import { Allotment } from "allotment";
import { EditorSidebar } from "../editor/EditorSidebar";
import { EditorExtensions } from "../editor/EditorExtensions";
import { EditorBreadcrumb } from "../editor/EditorBreadcrumb";
import { EditorLine } from "../editor/EditorLine";
import { EditorTerminal } from "../editor/EditorTerminal";
import { EditorTerminalThemes } from "../editor/EditorTerminalThemes";
import { EditorTerminalMentions } from "../editor/EditorTerminalMentions";
import { EditorTerminalClosing } from "../editor/EditorTerminalClosing";
import { EditorPromoShoot } from "../editor/EditorPromoShoot";
import { EditorSortiePromo } from "../editor/EditorSortiePromo";
import { EditorEntreprises } from "../editor/EditorEntreprises";
import { EditorSoutenancesJuillet } from "../editor/EditorSoutenancesJuillet";
import { EditorSoutenancesSeptembre } from "../editor/EditorSoutenancesSeptembre";
import { EditorBackstage } from "../editor/EditorBackstage";
import { EditorCommunion } from "../editor/EditorCommunion";
import { EditorPhotoGroupe } from "../editor/EditorPhotoGroupe";
import { EditorStatusBar } from "../editor/EditorStatusBar";
import { TOP_TENUES_FEMMES, TOP_TENUES_HOMMES, MOMENTS_ICONIQUES, HIGHLIGHTS_FINAUX } from "@/data/tops";

type LayoutMode = 'code' | 'markdown' | 'extension' | 'terminal';
type CurrentView = 
    | 'main.ts' 
    | 'PromoShoot.md' 
    | 'SortiePromo.md' 
    | 'Entreprises.md'
    | 'Soutenances_Juillet.md'
    | 'Soutenances_Septembre.md'
    | 'Backstage.md'
    | 'Communion_Cadets.md'
    | 'PhotoGroupe.md';

export const SectionIntro = () => {
    const [typedLines, setTypedLines] = React.useState<number>(0);
    const [showTerminal, setShowTerminal] = React.useState(false);
    const [isWrappedStarted, setIsWrappedStarted] = React.useState(false);
    
    // Section tracking
    const [currentSection, setCurrentSection] = React.useState(1); // 1: intro, 2: promo, 3: promo-shoot, 4: sortie
    const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('code');
    const [currentView, setCurrentView] = React.useState<CurrentView>('main.ts');
    const [extensionMode, setExtensionMode] = React.useState<'none' | 'femmes' | 'hommes' | 'moments' | 'highlights'>('none');
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    // Code content configuration
    const CODE_LINES = [
        [
            { text: "     import", color: "#569CD6" },
            { text: " { ", color: "#D4D4D4" },
            { text: "runWrapped", color: "#D4D4D4" },
            { text: " } ", color: "#D4D4D4" },
            { text: "from", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "'./.system'", color: "#CE9178" },
            { text: ";", color: "#D4D4D4" },
        ],
        [], // empty line
        [
            { text: "     export", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "async", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "function", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "main", color: "#DCDCAA" },
            { text: "() {", color: "#D4D4D4" },
        ],
        [
            { text: "  ", color: "#D4D4D4" },
            { text: "    console", color: "#D4D4D4" },
            { text: ".", color: "#D4D4D4" },
            { text: "log", color: "#DCDCAA" },
            { text: "(", color: "#D4D4D4" },
            { text: "'[SYSTEM] Type \"run\" or \"INIT_WRAPPED_2025\" to begin...'", color: "#CE9178" },
            { text: ");", color: "#D4D4D4" },
        ],
        [],
        [
            { text: "  ", color: "#D4D4D4" },
            { text: "    // Waiting for user interaction...", color: "#6A9955" },
        ],
        [
            { text: "  ", color: "#D4D4D4" },
            { text: "     await", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "runWrapped", color: "#D4D4D4" },
            { text: "();", color: "#D4D4D4" },
        ],
        [
            { text: "     }", color: "#D4D4D4" },
        ]
    ];

    React.useEffect(() => {
        if (typedLines < CODE_LINES.length) {
            const timeout = setTimeout(() => {
                setTypedLines(prev => prev + 1);
            }, 100); // Adjust typing speed here (ms per line)
            return () => clearTimeout(timeout);
        } else {
            // Typing finished, show terminal
            const timeout = setTimeout(() => {
                setShowTerminal(true);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [typedLines]);

    const handleRun = () => {
        setIsWrappedStarted(true);
        console.log("Starting Wrapper...");
    };

    // Transition to next section
    const goToNextSection = React.useCallback(() => {
        setIsTransitioning(true);
        
        setTimeout(() => {
            const nextSection = currentSection + 1;
            setCurrentSection(nextSection);
            
            // Update layout based on section
            switch (nextSection) {
                case 3: // PromoShoot.md
                    setLayoutMode('markdown');
                    setCurrentView('PromoShoot.md');
                    setExtensionMode('none');
                    break;
                case 4: // SortiePromo.md
                    setLayoutMode('markdown');
                    setCurrentView('SortiePromo.md');
                    setExtensionMode('none');
                    break;
                case 5: // Themes (Terminal)
                    setLayoutMode('terminal');
                    setCurrentView('main.ts');
                    setExtensionMode('none');
                    break;
                case 6: // Entreprises.md
                    setLayoutMode('markdown');
                    setCurrentView('Entreprises.md');
                    setExtensionMode('none');
                    break;
                case 7: // Soutenances Juillet
                    setLayoutMode('markdown');
                    setCurrentView('Soutenances_Juillet.md');
                    setExtensionMode('none');
                    break;
                case 8: // Soutenances Septembre
                    setLayoutMode('markdown');
                    setCurrentView('Soutenances_Septembre.md');
                    setExtensionMode('none');
                    break;
                case 9: // Top Femmes (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('femmes');
                    break;
                case 10: // Mentions (Terminal)
                    setLayoutMode('terminal');
                    setCurrentView('main.ts');
                    setExtensionMode('none');
                    break;
                case 11: // Top Hommes (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('hommes');
                    break;
                case 12: // Moments Iconiques (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('moments');
                    break;
                case 13: // Backstage
                    setLayoutMode('markdown');
                    setCurrentView('Backstage.md');
                    setExtensionMode('none');
                    break;
                case 14: // Communion
                    setLayoutMode('markdown');
                    setCurrentView('Communion_Cadets.md');
                    setExtensionMode('none');
                    break;
                case 15: // Photo Groupe
                    setLayoutMode('markdown');
                    setCurrentView('PhotoGroupe.md');
                    setExtensionMode('none');
                    break;
                case 16: // Highlights (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('highlights');
                    break;
                case 17: // Closing (Terminal)
                    setLayoutMode('terminal');
                    setCurrentView('main.ts');
                    setExtensionMode('none');
                    break;
            }
            
            setTimeout(() => {
                setIsTransitioning(false);
            }, 300);
        }, 200);
    }, [currentSection]);

    const handleScrollEnd = () => {
        console.log("Terminal scrolled to end, moving to next section...");
        goToNextSection();
    };

    const showExtensionPanel = extensionMode !== 'none';
    const showTerminalPanel = (showTerminal && currentSection <= 2) || currentSection === 5 || currentSection === 10 || currentSection === 17;

    return (
        <div className="h-full w-full flex flex-col bg-[#1E1E1E]">
            {/* Main Content */}
            <div className="flex-1 flex min-h-0">
                {/* Activity Bar (Icons Sidebar) - Fixed */}
                <EditorSidebar />
                
                {/* Allotment: Extensions Panel + Main Editor Area */}
                <Allotment className="flex-1">
                    {/* Extensions Panel - Conditional */}
                    {showExtensionPanel && (
                        <Allotment.Pane minSize={250} maxSize={350} preferredSize={280}>
                            {extensionMode === 'femmes' && (
                                <EditorExtensions 
                                    title="Top 5 Tenues Femmes" 
                                    items={TOP_TENUES_FEMMES}
                                    onScrollEnd={handleScrollEnd}
                                />
                            )}
                            {extensionMode === 'hommes' && (
                                <EditorExtensions 
                                    title="Top 5 Tenues Hommes" 
                                    items={TOP_TENUES_HOMMES}
                                    onScrollEnd={handleScrollEnd}
                                />
                            )}
                            {extensionMode === 'moments' && (
                                <EditorExtensions 
                                    title="Moments Iconiques" 
                                    items={MOMENTS_ICONIQUES}
                                    onScrollEnd={handleScrollEnd}
                                />
                            )}
                            {extensionMode === 'highlights' && (
                                <EditorExtensions 
                                    title="Highlights Finaux" 
                                    items={HIGHLIGHTS_FINAUX}
                                    onScrollEnd={handleScrollEnd}
                                />
                            )}
                        </Allotment.Pane>
                    )}
                    
                    {/* Main Editor Area */}
                    <Allotment.Pane>
                        <div className={`h-full flex flex-col overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                    {/* Tabs Bar */}
                    <div className="flex items-center h-9 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0">
                        {/* main.ts tab */}
                        <div 
                            className={`flex items-center px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer ${currentView === 'main.ts' ? 'bg-[#1E1E1E]' : 'bg-[#2D2D30]'}`}
                            onClick={() => setCurrentView('main.ts')}
                        >
                            <FileCode2 size={16} className="mr-2 text-[#519ABA]" />
                            <span className="text-[13px] text-[#CCCCCC]">main.ts</span>
                            {currentView === 'main.ts' && <span className="ml-2 text-white text-xs">●</span>}
                        </div>
                        
                        {/* PromoShoot.md tab */}
                        {currentSection >= 3 && (
                            <div 
                                className={`flex items-center px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer ${currentView === 'PromoShoot.md' ? 'bg-[#1E1E1E]' : 'bg-[#2D2D30]'}`}
                                onClick={() => setCurrentView('PromoShoot.md')}
                            >
                                <FileText size={16} className="mr-2 text-[#519ABA]" />
                                <span className="text-[13px] text-[#CCCCCC]">PromoShoot.md</span>
                                {currentView === 'PromoShoot.md' && <span className="ml-2 text-white text-xs">●</span>}
                            </div>
                        )}

                        {/* SortiePromo.md tab */}
                        {currentSection >= 4 && (
                            <div 
                                className={`flex items-center px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer ${currentView === 'SortiePromo.md' ? 'bg-[#1E1E1E]' : 'bg-[#2D2D30]'}`}
                                onClick={() => setCurrentView('SortiePromo.md')}
                            >
                                <FileText size={16} className="mr-2 text-[#519ABA]" />
                                <span className="text-[13px] text-[#CCCCCC]">SortiePromo.md</span>
                                {currentView === 'SortiePromo.md' && <span className="ml-2 text-white text-xs">●</span>}
                            </div>
                        )}
                    </div>

                            {/* Breadcrumb */}
                            <div className="flex-shrink-0">
                                {currentView === 'main.ts' && <EditorBreadcrumb path={['GI25_WRAPPED', 'main.ts']} />}
                                {currentView === 'PromoShoot.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'PromoShoot.md']} />}
                                {currentView === 'SortiePromo.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'SortiePromo.md']} />}
                                {currentView === 'Entreprises.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'Entreprises.md']} />}
                                {currentView === 'Soutenances_Juillet.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'Soutenances_Juillet.md']} />}
                                {currentView === 'Soutenances_Septembre.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'Soutenances_Septembre.md']} />}
                                {currentView === 'Backstage.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'Backstage.md']} />}
                                {currentView === 'Communion_Cadets.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'Communion_Cadets.md']} />}
                                {currentView === 'PhotoGroupe.md' && <EditorBreadcrumb path={['GI25_WRAPPED', 'docs', 'PhotoGroupe.md']} />}
                            </div>

                            {/* Editor Content + Terminal - Vertical Split with Allotment */}
                            <div className="flex-1 min-h-0">
                                <Allotment vertical>
                                    {/* Editor Content Pane */}
                                    <Allotment.Pane minSize={200}>
                                        <div className="h-full overflow-hidden bg-[#1E1E1E]">
                                            {currentView === 'main.ts' ? (
                                                /* Code Editor */
                                                <div className="h-full overflow-y-auto bg-[#1E1E1E]">
                                                    <div className="py-4 font-mono text-[14px]">
                                                        {CODE_LINES.map((lineTokens, index) => (
                                                            <EditorLine key={index} number={index + 1}>
                                                                {index < typedLines && (
                                                                    <>
                                                                        {lineTokens.map((token, tIndex) => (
                                                                            <span key={tIndex} style={{ color: token.color }}>
                                                                                {token.text}
                                                                            </span>
                                                                        ))}
                                                                    </>
                                                                )}
                                                            </EditorLine>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : currentView === 'PromoShoot.md' ? (
                                                <EditorPromoShoot onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'SortiePromo.md' ? (
                                                <EditorSortiePromo onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'Entreprises.md' ? (
                                                <EditorEntreprises onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'Soutenances_Juillet.md' ? (
                                                <EditorSoutenancesJuillet onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'Soutenances_Septembre.md' ? (
                                                <EditorSoutenancesSeptembre onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'Backstage.md' ? (
                                                <EditorBackstage onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'Communion_Cadets.md' ? (
                                                <EditorCommunion onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'PhotoGroupe.md' ? (
                                                <EditorPhotoGroupe onScrollEnd={handleScrollEnd} />
                                            ) : null}
                                        </div>
                                    </Allotment.Pane>

                                    {/* Terminal Pane - Conditional and Resizable */}
                                    {showTerminalPanel && (
                                        <Allotment.Pane minSize={150} preferredSize={400} maxSize={600}>
                                            <div className="h-full">
                                                {showTerminal && currentSection <= 2 && (
                                                    <EditorTerminal
                                                        onRun={handleRun}
                                                        onScrollEnd={handleScrollEnd}
                                                    />
                                                )}
                                                {currentSection === 5 && (
                                                    <EditorTerminalThemes onScrollEnd={handleScrollEnd} />
                                                )}
                                                {currentSection === 10 && (
                                                    <EditorTerminalMentions onScrollEnd={handleScrollEnd} />
                                                )}
                                                {currentSection === 17 && (
                                                    <EditorTerminalClosing />
                                                )}
                                            </div>
                                        </Allotment.Pane>
                                    )}
                                </Allotment>
                            </div>
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </div>

            {/* Status Bar */}
            <EditorStatusBar 
                branch="GI25_Wrapped"
                line={typedLines}
                column={1}
                language={currentView === 'main.ts' ? "TypeScript" : "Markdown"}
                encoding="UTF-8"
            />
        </div>
    );
};
