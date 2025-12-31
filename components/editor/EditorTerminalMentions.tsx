"use client";

import React from 'react';
import { EditorCursor } from './EditorCursor';
import { getTerminalSoundManager } from "@/lib/terminalSounds";

interface EditorTerminalMentionsProps {
    onScrollEnd?: () => void;
}

export const EditorTerminalMentions = ({ onScrollEnd }: EditorTerminalMentionsProps) => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string; className?: string }>>([]);
    const [isProcessing, setIsProcessing] = React.useState(true);
    const hasRunRef = React.useRef(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const onScrollEndRef = React.useRef(onScrollEnd);

    const PROMPT = "C:\\UY1\\ENSPY\\GENIE_INFO\\GI25\\SOUTENANCES> ";

    // Update ref when callback changes
    React.useEffect(() => {
        onScrollEndRef.current = onScrollEnd;
    }, [onScrollEnd]);

    // Auto-scroll during processing
    React.useEffect(() => {
        if (isProcessing && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [isProcessing, history]);

    React.useEffect(() => {
        if (hasRunRef.current) return;
        
        hasRunRef.current = true;

        const runEvaluationSequence = async () => {
            const soundManager = getTerminalSoundManager();
            const addToHistory = (text: string, color?: string, className?: string) => {
                setHistory(prev => [...prev, { text, color, className }]);
                soundManager.playRandomSound();
            };

            // Header with glitch effect
            addToHistory(">>> FINAL_EVALUATION_ENGINE", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));

            // Title with glitch (shorter)
            const glitchTitles = [
                "E̴V̵A̸L̶U̷A̸T̵I̴O̸N̵",
                "EVALUATION",
                "E̵V̸A̴L̵U̸A̴T̸I̴O̸N̵",
                "EVALUATION"
            ];
            
            for (let i = 0; i < 4; i++) {
                addToHistory(glitchTitles[i % glitchTitles.length], i % 2 === 0 ? "#FF00FF" : "#00FFFF");
                soundManager.playOnGlitch();
                await new Promise(r => setTimeout(r, 80));
                if (i < 3) setHistory(prev => prev.slice(0, -1));
            }
            await new Promise(r => setTimeout(r, 150));

            // Loading bar (faster)
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");
            const total = 10;
            setHistory(prev => [...prev, { 
                text: `▓${("░").repeat(total)}▓ LOADING`, 
                color: "#666666" 
            }]);

            for (let i = 1; i <= total; i++) {
                const filled = "█".repeat(i);
                const empty = "░".repeat(total - i);
                const color = i < 4 ? "#FF00FF" : i < 7 ? "#00FFFF" : "#00FF00";

                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { 
                        text: `▓${filled}${empty}▓ ${i === total ? 'COMPLETE' : 'LOADING'}`,
                        color: color
                    };
                    return newHistory;
                });

                soundManager.playOnLoading();
                await new Promise(r => setTimeout(r, 40));
            }

            await new Promise(r => setTimeout(r, 200));

            // System initialization (compact)
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");
            addToHistory("⚡ INITIALIZING...", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));

            const systems = [
                { name: "ENSPY_GRADING_POLICY", status: "v2025", color: "#00FF00" },
                { name: "ACADEMIC_DATABASE", status: "CONNECTED", color: "#00FF00" },
                { name: "AUTHENTICATION", status: "SUCCESS", color: "#00FF00" }
            ];

            for (const sys of systems) {
                addToHistory(`[✓] ${sys.name} ▸ ${sys.status}`, sys.color);
                soundManager.playOnSystemCheck();
                await new Promise(r => setTimeout(r, 100));
            }

            await new Promise(r => setTimeout(r, 200));
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");

            // Query database (compact)
            addToHistory("🔍 QUERYING DATABASE...", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("> db.soutenances.find({ promo: 'GI_2025' })", "#858585");
            await new Promise(r => setTimeout(r, 150));
            addToHistory("[ ✓ ] 70 records | Data verified", "#00FF00");
            await new Promise(r => setTimeout(r, 200));

            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");

            // Total candidates with glitch (smaller)
            const glitch70Frames = ["7̴0̵", "70", "7̵0̸", "70"];
            
            for (let i = 0; i < 4; i++) {
                const frameText = glitch70Frames[i % glitch70Frames.length];
                const frameColor = i % 2 === 0 ? "#FF00FF" : "#00FF00";
                
                if (i === 0) {
                    addToHistory(`         ${frameText}`, frameColor, "text-4xl font-black");
                } else {
                    setHistory(prev => {
                        const newHist = [...prev];
                        newHist[newHist.length - 1] = { 
                            text: `         ${frameText}`, 
                            color: frameColor, 
                            className: "text-4xl font-black" 
                        };
                        return newHist;
                    });
                }
                soundManager.playOnGlitch();
                await new Promise(r => setTimeout(r, 80));
            }
            
            await new Promise(r => setTimeout(r, 150));
            addToHistory("    CANDIDATS ÉVALUÉS", "#CCCCCC", "text-sm tracking-[0.2em]");
            await new Promise(r => setTimeout(r, 200));

            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");

            // Mentions breakdown (compact)
            addToHistory("📊 ANALYZING DISTRIBUTION...", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("[ ✓ ] Processing complete", "#00FF00");
            await new Promise(r => setTimeout(r, 150));

            addToHistory("┌──────────── MENTIONS & RÉSULTATS ────────────┐", "#00FFFF");
            await new Promise(r => setTimeout(r, 100));

            // Excellent (compact)
            addToHistory("│  🌟 EXCELLENT (E) — 13 étudiants (18.6%)     │", "#00FF00");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("│     ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰                      │", "#00FF00");
            await new Promise(r => setTimeout(r, 80));

            // Très Bien (compact)
            addToHistory("│  ⭐ TRÈS BIEN (TB) — 52 étudiants (74.3%)   │", "#00FFFF");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("│     ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰  │", "#00FFFF");
            await new Promise(r => setTimeout(r, 80));

            // Bien (compact)
            addToHistory("│  ✓ BIEN (B) — 5 étudiants (7.1%)            │", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("│     ▰▰▰▰▰▰▰                                    │", "#FF00FF");
            await new Promise(r => setTimeout(r, 80));

            // Huis Clos (compact)
            addToHistory("│  🔒 HUIS CLOS — 1 soutenance                  │", "#858585");
            await new Promise(r => setTimeout(r, 100));

            addToHistory("└───────────────────────────────────────────────┘", "#00FFFF");
            await new Promise(r => setTimeout(r, 150));

            // Statistics (compact)
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FF00");
            addToHistory("📈 STATS:", "#00FFFF", "text-sm font-bold");
            await new Promise(r => setTimeout(r, 100));

            const stats = [
                { label: "TOTAL", value: "70", color: "#CCCCCC" },
                { label: "SUCCESS_RATE", value: "100% ✓", color: "#00FF00" },
                { label: "AVERAGE", value: "14/20", color: "#00FFFF" },
                { label: "EXCELLENCE", value: "92.9%", color: "#00FF00" }
            ];

            for (const stat of stats) {
                const dots = ".".repeat(Math.max(0, 25 - stat.label.length));
                addToHistory(`  ${stat.label} ${dots} ${stat.value}`, stat.color);
                await new Promise(r => setTimeout(r, 60));
            }

            await new Promise(r => setTimeout(r, 150));
            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FF00");

            // Integrity check (compact)
            addToHistory("🔐 INTEGRITY_CHECK...", "#FF00FF");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("  ✓ No anomalies | ✓ Validated | ✓ Verified", "#00FF00");
            await new Promise(r => setTimeout(r, 150));

            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FF00");

            // Final verification (compact)
            addToHistory("✅ VERIFICATION:", "#00FFFF", "text-sm font-bold");
            await new Promise(r => setTimeout(r, 100));
            addToHistory("  DATA_INTEGRITY ......... [ ✓ OK ]", "#00FF00");
            await new Promise(r => setTimeout(r, 80));
            addToHistory("  EVALUATION_STATUS ...... [ ✓ COMPLETE ]", "#00FF00");
            await new Promise(r => setTimeout(r, 80));
            addToHistory("  CERTIFICATION_READY .... [ ✓ YES ]", "#00FF00");
            await new Promise(r => setTimeout(r, 200));

            addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");

            setIsProcessing(false);

            // Auto-transition after 2 seconds
            await new Promise(r => setTimeout(r, 2000));
            if (onScrollEndRef.current) {
                console.log('✓ Evaluation complete - Auto-transition to next section');
                onScrollEndRef.current();
            }
        };

        runEvaluationSequence();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C]"
            style={{ height: '60vh', minHeight: '300px', maxHeight: '600px' }}
        >
            {/* Terminal Tabs (VSCode) */}
            <div className="flex items-center h-10 px-6 bg-[#1E1E1E] border-b border-[#3C3C3C] select-none">
                <div className="flex items-center w-1/2 justify-between text-[13px] font-sans">
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Problems</span>
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Output</span>
                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Debug</span>

                    {/* Active Tab */}
                    <span className="text-white font-medium border-b border-[#3C3C3C] pb-3 -mb-3 cursor-default">
                        Terminal
                    </span>

                    <span className="text-[#CCCCCC]/60 hover:text-[#CCCCCC] transition-colors cursor-pointer">Ports</span>
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={containerRef}
                className="flex-1 px-2 sm:px-4 py-2 sm:py-3 font-mono font-semibold text-[11px] sm:text-[13px] leading-[1.4] sm:leading-[1.45] text-[#D4D4D4] overflow-y-auto overflow-x-hidden cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent break-words"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
                {/* Terminal History */}
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap mb-[2px] break-words ${line.className || ''}`}
                        style={{ 
                            color: line.color || "#D4D4D4",
                            textShadow: (line.className?.includes('text-7xl') || line.className?.includes('text-5xl') || line.className?.includes('text-8xl')) && (line.color === '#00FF00' || line.color === '#FF00FF')
                                ? (line.color === '#00FF00'
                                    ? '0 0 30px rgba(0, 255, 0, 0.9), 0 0 60px rgba(0, 255, 0, 0.5)' 
                                    : '0 0 30px rgba(255, 0, 255, 0.9), 0 0 60px rgba(255, 0, 255, 0.5)')
                                : 'none'
                        }}
                    >
                        {line.text}
                    </div>
                ))}

                {!isProcessing && (
                    <div className="flex items-center">
                        <span className="text-[#D4D4D4] mr-2 whitespace-nowrap">{PROMPT}</span>
                        <EditorCursor />
                    </div>
                )}
            </div>
        </div>
    );
};
