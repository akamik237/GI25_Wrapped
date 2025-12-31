"use client";

import React from 'react';
import { FileCode2, FileText, X } from 'lucide-react';
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
import { EditorCommunion } from "../editor/EditorCommunion";
import { EditorBestMoments } from "../editor/EditorBestMoments";
import { EditorStatusBar } from "../editor/EditorStatusBar";
import { TOP_TENUES_FEMMES, TOP_TENUES_HOMMES, MOMENTS_ICONIQUES } from "@/data/tops";

type LayoutMode = 'code' | 'markdown' | 'extension' | 'terminal';
type CurrentView = 
    | 'main.ts' 
    | 'PromoShoot.md' 
    | 'SortiePromo.md' 
    | 'Entreprises.md'
    | 'Soutenances_Juillet.md'
    | 'Soutenances_Septembre.md'
    | 'Communion_Cadets.md'
    | 'BestMoments.md';

export const SectionIntro = () => {
    const [typedLines, setTypedLines] = React.useState<number>(0);
    const [showTerminal, setShowTerminal] = React.useState(false);
    const [isWrappedStarted, setIsWrappedStarted] = React.useState(false);
    
    // Section tracking
    const [currentSection, setCurrentSection] = React.useState(1); // 1: intro, 2: promo, 3: promo-shoot, 4: sortie
    const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('code');
    const [currentView, setCurrentView] = React.useState<CurrentView>('main.ts');
    const [extensionMode, setExtensionMode] = React.useState<'none' | 'femmes' | 'hommes' | 'moments'>('none');
    const [isTransitioning, setIsTransitioning] = React.useState(false);

    // Code content configuration
    const CODE_LINES = [
        [
            { text: "// GI 2025 WRAPPED | Designed by AKAMIK VIZUALZ & LASHU THIERRY", color: "#6A9955" },
        ],
        [
            { text: "// Type 'run' in the terminal below to start", color: "#6A9955" },
        ],
        [],
        [
            { text: "import", color: "#569CD6" },
            { text: " { ", color: "#D4D4D4" },
            { text: "initWrapped2025", color: "#4EC9B0" },
            { text: " } ", color: "#D4D4D4" },
            { text: "from", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "'./wrapped'", color: "#CE9178" },
            { text: ";", color: "#D4D4D4" },
        ],
        [],
        [
            { text: "await", color: "#569CD6" },
            { text: " ", color: "#D4D4D4" },
            { text: "initWrapped2025", color: "#4EC9B0" },
            { text: "();", color: "#D4D4D4" },
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
            // Special case: sections 1 & 2 are merged in terminal, skip directly to 3
            const nextSection = currentSection === 1 || currentSection === 2 ? 3 : currentSection + 1;
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
                case 9: // Mentions (Terminal) - Evaluation Engine
                    setLayoutMode('terminal');
                    setCurrentView('main.ts');
                    setExtensionMode('none');
                    break;
                case 10: // Top Femmes (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('femmes');
                    break;
                case 11: // Top Hommes (Extension)
                    setLayoutMode('extension');
                    setExtensionMode('hommes');
                    break;
                case 12: // Communion Cadets
                    setLayoutMode('markdown');
                    setCurrentView('Communion_Cadets.md');
                    setExtensionMode('none');
                    break;
                case 13: // Best Moments (Markdown)
                    setLayoutMode('markdown');
                    setCurrentView('BestMoments.md');
                    setExtensionMode('none');
                    break;
                case 14: // Closing (Terminal)
                    setLayoutMode('terminal');
                    setCurrentView('main.ts');
                    setExtensionMode('none');
                    break;
            }
            
            setTimeout(() => {
                setIsTransitioning(false);
            }, 150);
        }, 100);
    }, [currentSection]);

    const handleScrollEnd = () => {
        console.log("Terminal scrolled to end, moving to next section...");
        goToNextSection();
    };

    const showExtensionPanel = extensionMode !== 'none';
    const showTerminalPanel = (showTerminal && currentSection <= 2) || currentSection === 5 || currentSection === 9 || currentSection === 14;
    
    // Terminal size based on section type
    const isFullTerminalSection = currentSection <= 2 || currentSection === 5 || currentSection === 9 || currentSection === 14;
    const terminalSize = isFullTerminalSection
        ? { preferredSize: 700, minSize: 500, maxSize: 900 }  // Full terminal sections - bigger (1, 2, 5, 10, 17)
        : { preferredSize: 400, minSize: 150, maxSize: 600 };  // Regular sections with code
    
    const editorSize = isFullTerminalSection
        ? { minSize: 100, preferredSize: 200 }  // Smaller editor for terminal sections
        : { minSize: 200 };  // Normal editor size

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
                        <Allotment.Pane minSize={320} maxSize={450} preferredSize={380}>
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
                        </Allotment.Pane>
                    )}
                    
                    {/* Main Editor Area */}
                    <Allotment.Pane>
                        <div className={`h-full flex flex-col overflow-hidden transition-opacity duration-150 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                    {/* Tabs Bar - VS Code Style */}
                    <div className="flex items-center h-11 border-b border-[#3C3C3C] bg-[#252526] flex-shrink-0 overflow-x-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                        {/* Overview tab (main.ts) */}
                        <div 
                            className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'main.ts' ? 'bg-[#1E1E1E] border-t-2 border-t-[#00FFFF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                            onClick={() => setCurrentView('main.ts')}
                        >
                            <FileCode2 size={16} className="text-[#519ABA]" />
                            <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">overview.md</span>
                            <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                        </div>
                        
                        {/* PromoShoot.md tab */}
                        {currentSection >= 3 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'PromoShoot.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#00FFFF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('PromoShoot.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">promo-shoot.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* SortiePromo.md tab */}
                        {currentSection >= 4 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'SortiePromo.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#00FFFF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('SortiePromo.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">sortie-promo.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* Entreprises.md tab */}
                        {currentSection >= 6 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'Entreprises.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#00FFFF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('Entreprises.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">entreprises.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* Soutenances Juillet tab */}
                        {currentSection >= 7 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'Soutenances_Juillet.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#00FFFF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('Soutenances_Juillet.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">defenses-july.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* Soutenances Septembre tab */}
                        {currentSection >= 8 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'Soutenances_Septembre.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#FF00FF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('Soutenances_Septembre.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">defenses-sept.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* Communion Cadets tab */}
                        {currentSection >= 12 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'Communion_Cadets.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#CE9178]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('Communion_Cadets.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">communion-cadets.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                        {/* Best Moments tab */}
                        {currentSection >= 13 && (
                            <div 
                                className={`flex items-center gap-2 px-3 h-full border-r border-[#3C3C3C] transition-colors cursor-pointer flex-shrink-0 group ${currentView === 'BestMoments.md' ? 'bg-[#1E1E1E] border-t-2 border-t-[#FF00FF]' : 'bg-[#2D2D30] hover:bg-[#2A2D2E]'}`}
                                onClick={() => setCurrentView('BestMoments.md')}
                            >
                                <FileText size={16} className="text-[#519ABA]" />
                                <span className="text-[14px] text-[#CCCCCC] whitespace-nowrap font-medium">best-moments.md</span>
                                <X size={14} className="text-[#858585] opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            </div>
                        )}

                    </div>

                            {/* Editor Content + Terminal - Vertical Split with Allotment */}
                            <div className="flex-1 min-h-0">
                                <Allotment vertical>
                                    {/* Editor Content Pane */}
                                    <Allotment.Pane 
                                        minSize={editorSize.minSize}
                                        preferredSize={editorSize.preferredSize}
                                    >
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
                                            ) : currentView === 'Communion_Cadets.md' ? (
                                                <EditorCommunion onScrollEnd={handleScrollEnd} />
                                            ) : currentView === 'BestMoments.md' ? (
                                                <EditorBestMoments onScrollEnd={handleScrollEnd} />
                                            ) : null}
                                        </div>
                                    </Allotment.Pane>

                                    {/* Terminal Pane - Conditional and Resizable */}
                                    {showTerminalPanel && (
                                        <Allotment.Pane 
                                            minSize={terminalSize.minSize} 
                                            preferredSize={terminalSize.preferredSize} 
                                            maxSize={terminalSize.maxSize}
                                        >
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
                                                {currentSection === 9 && (
                                                    <EditorTerminalMentions onScrollEnd={handleScrollEnd} />
                                                )}
                                                {currentSection === 14 && (
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

            {/* Debug Button - Skip to Next Section */}
            <button
                onClick={goToNextSection}
                className="fixed bottom-4 right-4 z-50 bg-[#007ACC] hover:bg-[#1177BB] text-white px-4 py-2 rounded-lg shadow-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                title={`Section ${currentSection}/14 - Click to skip to next`}
            >
                ⏭️ Next Section ({currentSection}/14)
            </button>
                </div>
    );
};
