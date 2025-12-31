"use client";

import React from 'react';
import { EditorCursor } from './EditorCursor';
import { getTerminalSoundManager } from "@/lib/terminalSounds";

interface EditorTerminalThemesProps {
    onScrollEnd?: () => void;
}

export const EditorTerminalThemes = ({ onScrollEnd }: EditorTerminalThemesProps) => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string; className?: string }>>([]);
    const [isAnalyzing, setIsAnalyzing] = React.useState(true);
    const hasRunRef = React.useRef(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const onScrollEndRef = React.useRef(onScrollEnd);

    const PROMPT = "C:\\UY1\\ENSPY\\GENIE_INFO\\GI25\\SOUTENANCES>";

    // Update ref when callback changes
    React.useEffect(() => {
        onScrollEndRef.current = onScrollEnd;
    }, [onScrollEnd]);

    React.useEffect(() => {
        if (hasRunRef.current) return;
        
        hasRunRef.current = true;

        const runAnalysis = async () => {
            const soundManager = getTerminalSoundManager();
            const addToHistory = (text: string, color?: string, className?: string) => {
                setHistory(prev => [...prev, { text, color, className }]);
                soundManager.playRandomSound();
            };

            // Header
            addToHistory(">>> PROJECT_ANALYSIS_INITIATED", "#FF00FF");
            await new Promise(r => setTimeout(r, 200));
            
            addToHistory("");
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");
            addToHistory("");
            await new Promise(r => setTimeout(r, 150));

            // System checks
            const systems = [
                { name: "DATABASE.CONNECT", color: "#00FFFF" },
                { name: "QUERY.ENGINE", color: "#00FFFF" },
                { name: "ANALYTICS.CORE", color: "#00FFFF" }
            ];

            for (const sys of systems) {
                addToHistory(`[◉] ${sys.name}`, "#666666");
                await new Promise(r => setTimeout(r, 200));
                setHistory(prev => {
                    const newHist = [...prev];
                    newHist[newHist.length - 1] = { 
                        text: `[✓] ${sys.name} ▸ ONLINE`, 
                        color: sys.color 
                    };
                    return newHist;
                });
                soundManager.playOnSystemCheck();
            }
            
            await new Promise(r => setTimeout(r, 400));
            addToHistory("");
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");
            addToHistory("");
            await new Promise(r => setTimeout(r, 200));

            // Total projects in big ASCII with glitch effect
            const glitch70Frames = [
                "7̴0̵",
                "70",
                "7̵0̸",
                "70"
            ];
            
            for (let i = 0; i < 6; i++) {
                const frameText = glitch70Frames[i % glitch70Frames.length];
                const frameColor = i % 2 === 0 ? "#FF00FF" : "#00FF00"; // Magenta/Green glitch
                
                if (i === 0) {
                    addToHistory(`                 ${frameText}`, frameColor, "text-7xl font-black");
                } else {
                    setHistory(prev => {
                        const newHist = [...prev];
                        newHist[newHist.length - 1] = { 
                            text: `                 ${frameText}`, 
                            color: frameColor, 
                            className: "text-7xl font-black" 
                        };
                        return newHist;
                    });
                }
                await new Promise(r => setTimeout(r, 120));
            }
            
            await new Promise(r => setTimeout(r, 300));
            addToHistory("         PROJETS ANALYSÉS", "#CCCCCC", "text-lg tracking-[0.3em]");
            await new Promise(r => setTimeout(r, 400));

            addToHistory("");
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");
            addToHistory("");
            await new Promise(r => setTimeout(r, 200));

            // Themes breakdown
            const themes = [
                { name: "DÉVELOPPEMENT", count: 46, color: "#00FF00" },
                { name: "INTELLIGENCE ARTIFICIELLE", count: 12, color: "#00FFFF" },
                { name: "DEVOPS / CLOUD", count: 6, color: "#FF00FF" },
                { name: "SÉCURITÉ", count: 3, color: "#00FF00" },
                { name: "IoT / SYSTÈME / BD", count: 3, color: "#00FFFF" }
            ];

            addToHistory("RÉPARTITION THÉMATIQUE:", "#CCCCCC", "text-base font-bold");
            await new Promise(r => setTimeout(r, 200));
            addToHistory("");

            for (const theme of themes) {
                const barLength = Math.floor(theme.count / 2);
                const bar = "█".repeat(barLength);
                
                addToHistory(`  ${theme.name}`, "#CCCCCC");
                await new Promise(r => setTimeout(r, 100));
                
                // Glitch effect on numbers
                const glitchFrames = [
                    `${theme.count}̴`,
                    `${theme.count}`,
                    `${theme.count}̵`,
                    `${theme.count}`
                ];
                
                for (let i = 0; i < 4; i++) {
                    const frameText = glitchFrames[i % glitchFrames.length];
                    const frameColor = i % 2 === 0 ? (theme.color === "#00FF00" ? "#00FFFF" : "#FF00FF") : theme.color;
                    
                    if (i === 0) {
                        addToHistory(`  ${bar} ${frameText}`, frameColor, "text-base font-bold");
                    } else {
                        setHistory(prev => {
                            const newHist = [...prev];
                            newHist[newHist.length - 1] = { 
                                text: `  ${bar} ${frameText}`, 
                                color: frameColor, 
                                className: "text-base font-bold" 
                            };
                            return newHist;
                        });
                    }
                    soundManager.playOnGlitch();
                    await new Promise(r => setTimeout(r, 100));
                }
                
                addToHistory("");
                await new Promise(r => setTimeout(r, 100));
            }

            await new Promise(r => setTimeout(r, 300));
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FF00");
            addToHistory("");
            await new Promise(r => setTimeout(r, 200));

            // Stats
            addToHistory("[✓] DOMINANT_FIELD ............ DÉVELOPPEMENT", "#00FFFF");
            await new Promise(r => setTimeout(r, 150));
            addToHistory("[✓] DIVERSITY_INDEX ........... EXCELLENT", "#00FFFF");
            await new Promise(r => setTimeout(r, 150));
            addToHistory("[✓] INNOVATION_LEVEL .......... TRÈS ÉLEVÉ", "#00FFFF");
            await new Promise(r => setTimeout(r, 300));

            addToHistory("");
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FF00");
            addToHistory("");
            await new Promise(r => setTimeout(r, 200));

            addToHistory("ANALYSIS COMPLETE ✓", "#00FF00", "text-xl font-bold");
            addToHistory("");

            setIsAnalyzing(false);

            // Auto-transition after 8 seconds (increased from 5)
            await new Promise(r => setTimeout(r, 8000));
            if (onScrollEndRef.current) {
                console.log('✓ Themes analysis complete - Auto-transition to next section');
                onScrollEndRef.current();
            }
        };

        runAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Auto-scroll during analysis
    React.useEffect(() => {
        if (isAnalyzing && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [isAnalyzing, history]);

    return (
        <div className="flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C]" style={{ height: '100%' }}>
            {/* Terminal Tabs */}
            <div className="flex items-center h-10 px-6 bg-[#1E1E1E] border-b border-[#3C3C3C] select-none">
                <div className="flex items-center w-1/2 justify-between text-[13px] font-sans">
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Problems</span>
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Output</span>
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Debug</span>
                    <span className="text-white font-medium border-b-2 border-[#00FFFF] pb-3 -mb-3 cursor-default">Terminal</span>
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Ports</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={containerRef}
                className="flex-1 px-2 sm:px-4 py-3 font-mono font-semibold text-[11px] sm:text-[13px] leading-[1.4] sm:leading-[1.45] text-[#D4D4D4] overflow-y-auto overflow-x-hidden cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent break-words"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap mb-[2px] break-words ${line.className || ''}`}
                        style={{ 
                            color: line.color || "#D4D4D4",
                            textShadow: line.className?.includes('text-7xl') 
                                ? (line.color === '#00FF00' 
                                    ? '0 0 30px rgba(0, 255, 0, 0.9), 0 0 60px rgba(0, 255, 0, 0.5)' 
                                    : line.color === '#FF00FF'
                                    ? '0 0 30px rgba(255, 0, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.5)'
                                    : line.color === '#00FFFF'
                                    ? '0 0 30px rgba(0, 255, 255, 0.9), 0 0 60px rgba(0, 255, 255, 0.5)'
                                    : 'none')
                                : 'none'
                        }}
                    >
                        {line.text}
                    </div>
                ))}

                {!isAnalyzing && (
                    <div className="flex items-center mt-4">
                        <span className="text-[#D4D4D4] mr-2 whitespace-nowrap">{PROMPT}</span>
                        <EditorCursor />
                    </div>
                )}
            </div>
        </div>
    );
};

