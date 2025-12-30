import React from "react";
import { EditorCursor } from "./EditorCursor";
import { generateAsciiTextSync, ASCII_FONTS, ASCII_ART } from "@/lib/ascii";

interface EditorTerminalProps {
    className?: string;
    onRun?: () => void;
    onScrollEnd?: () => void;
}

interface TerminalLine {
    text: string;
    color?: string;
    className?: string;
}

export const EditorTerminal = ({ className = "", onRun, onScrollEnd }: EditorTerminalProps) => {
    const [input, setInput] = React.useState("");
    const [history, setHistory] = React.useState<TerminalLine[]>([]);
    const [isBooting, setIsBooting] = React.useState(false);
    const [bootComplete, setBootComplete] = React.useState(false);
    const [registryRevealed, setRegistryRevealed] = React.useState(false);
    const [showStartPrompt, setShowStartPrompt] = React.useState(true);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const PROMPT = "C:\\UY1\\ENSPY\\GENIE_INFO\\SOUTENANCES> ";

    // Auto-focus input unless booting
    React.useEffect(() => {
        if (!isBooting) {
            inputRef.current?.focus();
        }
    }, [isBooting, history]);

    // Auto-scroll during boot to follow the animation
    React.useEffect(() => {
        if (isBooting && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [isBooting, history]);

    // Detect scroll to end
    React.useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || isBooting) return;

            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

            // Trigger onScrollEnd when scrolled near bottom (95%)
            if (scrollPercentage >= 0.95 && onScrollEnd) {
                onScrollEnd();
            }
        };

            const container = containerRef.current;
        if (container && !isBooting) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [isBooting, onScrollEnd]);

    // Handle scroll detection for registry reveal
    const handleScroll = React.useCallback(() => {
        if (!containerRef.current || !bootComplete || registryRevealed) return;

        const { scrollTop } = containerRef.current;

        // Reveal registry when user scrolls down even a little bit (more than 50px)
        if (scrollTop > 50) {
            setRegistryRevealed(true);
        }
    }, [bootComplete, registryRevealed]);

    // Attach scroll listener only after boot completes and with a delay
    React.useEffect(() => {
        if (!bootComplete) return;

        // Add a delay before enabling scroll detection
        const enableDelay = setTimeout(() => {
            const container = containerRef.current;
            if (container) {
                container.addEventListener('scroll', handleScroll);
                
                return () => container.removeEventListener('scroll', handleScroll);
            }
        }, 1000); // 1 second delay before enabling scroll detection

        return () => clearTimeout(enableDelay);
    }, [bootComplete, handleScroll]);

    const runBootSequence = async () => {
        setIsBooting(true);
        setHistory([]); // Clear history
        const addToHistory = (text: string, color?: string, className?: string) => 
            setHistory(prev => [...prev, { text, color, className }]);

        // Initial Windows-like terminal prompt
        addToHistory("Microsoft Windows [Version 10.0.19045.3693]", "#CCCCCC");
        addToHistory("(c) Microsoft Corporation. All rights reserved.", "#CCCCCC");
        addToHistory("");
        addToHistory("// Designed & Developed by AKAMIK VIZUALZ & LASHU THIERRY", "#00FF00");
        addToHistory("");
        await new Promise(r => setTimeout(r, 300));

        // Initial command executed
        addToHistory(">>> INIT_WRAPPED_2025", "#00FF00");
        await new Promise(r => setTimeout(r, 300));

        // ASCII Art Header - GI 2025 et WRAPPED séparés
        addToHistory("");
        addToHistory("");
        
        // Première ligne: GI 2025
        let asciiGI: string;
        try {
            asciiGI = generateAsciiTextSync('GI 2025', ASCII_FONTS.slant);
        } catch (error) {
            asciiGI = 'GI 2025';
        }
        
        for (const line of asciiGI.split('\n')) {
            addToHistory(line, "#00FF00");
            await new Promise(r => setTimeout(r, 50));
        }
        
        addToHistory("");
        
        // Deuxième ligne: WRAPPED
        let asciiWrapped: string;
        try {
            asciiWrapped = ASCII_ART.WRAPPED_SLANT;
        } catch (error) {
            asciiWrapped = 'WRAPPED';
        }
        
        for (const line of asciiWrapped.split('\n')) {
            addToHistory(line, "#00FF00");
            await new Promise(r => setTimeout(r, 50));
        }
        
        addToHistory("");
        addToHistory("═══════════════════════════════════════════════════════════════════════════", "#00FF00");
        addToHistory("");
        await new Promise(r => setTimeout(r, 600));

        // System authentication
        addToHistory("");
        addToHistory("[✓] AUTHENTICATING...", "#00FF00");
        await new Promise(r => setTimeout(r, 200));
        addToHistory("[✓] USER: ENSPY_ADMIN", "#00FF00");
        await new Promise(r => setTimeout(r, 300));

        // System checks
        addToHistory("");
        addToHistory(">>> SYSTEM_BOOT", "#00FF00");
        await new Promise(r => setTimeout(r, 200));
        
        const checks = [
            "[■] core.boot.loader.......... OK",
            "[■] core.database............. OK",
            "[■] core.media................ OK"
        ];

        for (const check of checks) {
            addToHistory(check, "#CCCCCC");
            await new Promise(r => setTimeout(r, 100));
        }

        // Simplified progress bar
        addToHistory("");
        addToHistory(">>> LOADING...", "#00FF00");
        const total = 15;
        
        setHistory(prev => [...prev, { 
            text: `[${("░").repeat(total)}] 0%`, 
            color: "#CCCCCC" 
        }]);

        for (let i = 1; i <= total; i++) {
            const filled = "█".repeat(i);
            const empty = "░".repeat(total - i);
            const percentage = Math.round((i / total) * 100);

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = { 
                    text: `[${filled}${empty}] ${percentage}%`,
                    color: percentage === 100 ? "#00FF00" : "#CCCCCC"
                };
                return newHistory;
            });

            await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 400));

        // System ready
        addToHistory("");
        addToHistory("");
        addToHistory("╔═══════════════════════════════════════════════════════════╗", "#00FF00");
        addToHistory("║                                                           ║", "#00FF00");
        addToHistory("║              >>> SYSTEM READY <<<                         ║", "#00FF00");
        addToHistory("║                                                           ║", "#00FF00");
        addToHistory("╚═══════════════════════════════════════════════════════════╝", "#00FF00");
        addToHistory("");
        addToHistory("  STATUS ........................ [ ONLINE ]               ", "#00FF00");
        addToHistory("  ALL SYSTEMS .................... [ GO ]                  ", "#00FF00");
        addToHistory("");
        addToHistory("");
        addToHistory("  SESSION_ID .................... GI_2025_WRAPPED          ", "#CCCCCC");
        addToHistory("  ENVIRONMENT ................... PRODUCTION               ", "#CCCCCC");
        addToHistory("");
        addToHistory("");
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        addToHistory("", "#CCCCCC");
        addToHistory("        Press ENTER or SCROLL DOWN to access registry      ", "#00FF00", "text-base font-bold animate-pulse");
        addToHistory("", "#CCCCCC");
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        addToHistory("");
        addToHistory("");

        setIsBooting(false);
        setBootComplete(true);
        if (onRun) onRun();
    };

    // Registry reveal animation - PROGRESSIVE display
    const revealRegistry = React.useCallback(async () => {
        setIsBooting(true); // Block input during animation
        
        // Clear history and start fresh
        setHistory([]);
        
        // Scroll to top
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }

        const addToHistory = (text: string, color?: string, className?: string) => 
            setHistory(prev => [...prev, { text, color, className }]);

        // Header
        addToHistory("");
        addToHistory("");
        await new Promise(r => setTimeout(r, 200));
        
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("              >>> ACCESSING PROMOTION REGISTRY <<<             ", "#00FF00");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        await new Promise(r => setTimeout(r, 300));
        
        addToHistory("");
        addToHistory("");
        
        // ASCII Title
        let asciiTitle: string;
        try {
            asciiTitle = generateAsciiTextSync('GI 2025', ASCII_FONTS.slant);
        } catch (error) {
            asciiTitle = 'GI 2025';
        }
        
        for (const line of asciiTitle.split('\n')) {
            addToHistory(line, "#00FF00");
            await new Promise(r => setTimeout(r, 40));
        }
        
        await new Promise(r => setTimeout(r, 300));
        addToHistory("");
        addToHistory("");
        
        // Info Box
        addToHistory("  ┌─────────────────────────────────────────────────────┐", "#00FF00");
        await new Promise(r => setTimeout(r, 50));
        addToHistory("  │  PROGRAM CODE           GI                          │", "#CCCCCC");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("  │  PROMOTION YEAR         2025                        │", "#CCCCCC");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("  │  SESSION TYPE           FINAL DEFENSES              │", "#CCCCCC");
        await new Promise(r => setTimeout(r, 50));
        addToHistory("  └─────────────────────────────────────────────────────┘", "#00FF00");
        await new Promise(r => setTimeout(r, 300));
        
        addToHistory("");
        addToHistory("");
        addToHistory("");
        
        // Database Query
        addToHistory("  DATABASE QUERY:                                         ", "#858585");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("    db.promotions.find({ code: 'GI_2025' })              ", "#858585");
        await new Promise(r => setTimeout(r, 400));
        addToHistory("");
        addToHistory("  QUERY STATUS ......................... [ OK ]           ", "#00FF00");
        await new Promise(r => setTimeout(r, 300));
        
        addToHistory("");
        addToHistory("");
        addToHistory("");
        
        // Records Section
        addToHistory("╔══════════════════════ RECORDS ═══════════════════════════╗", "#00FF00");
        await new Promise(r => setTimeout(r, 100));
        addToHistory("║                                                          ║", "#00FF00");
        addToHistory("║    TOTAL_DEFENSES:                                      ║", "#CCCCCC");
        await new Promise(r => setTimeout(r, 200));
        addToHistory("║                                                          ║", "#00FF00");
        
        // Number 70
        for (const line of ASCII_ART.NUMBER_70.split('\n')) {
            addToHistory(`║    ${line.padEnd(52)}║`, "#00FF00", "font-bold");
            await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, 200));
        
        addToHistory("║                                                          ║", "#00FF00");
        addToHistory("║    CONFIDENTIAL:                                        ║", "#CCCCCC");
        await new Promise(r => setTimeout(r, 200));
        addToHistory("║                                                          ║", "#00FF00");
        
        // Number 1
        for (const line of ASCII_ART.NUMBER_1.split('\n')) {
            addToHistory(`║    ${line.padEnd(52)}║`, "#00FF00", "font-bold");
            await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, 200));
        
        addToHistory("║                                                          ║", "#00FF00");
        addToHistory("║    PUBLIC:                                              ║", "#CCCCCC");
        await new Promise(r => setTimeout(r, 200));
        addToHistory("║                                                          ║", "#00FF00");
        
        // Number 69
        for (const line of ASCII_ART.NUMBER_69.split('\n')) {
            addToHistory(`║    ${line.padEnd(52)}║`, "#00FF00", "font-bold");
            await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, 200));
        
        addToHistory("║                                                          ║", "#00FF00");
        addToHistory("╚══════════════════════════════════════════════════════════╝", "#00FF00");
        await new Promise(r => setTimeout(r, 300));
        
        addToHistory("");
        addToHistory("");
        addToHistory("");
        
        // Final Status
        addToHistory("  DATA INTEGRITY CHECK ................... [ OK ]         ", "#00FF00");
        await new Promise(r => setTimeout(r, 150));
        addToHistory("  REGISTRY STATUS ........................ LOADED          ", "#00FF00");
        await new Promise(r => setTimeout(r, 300));
        
        addToHistory("");
        addToHistory("");
        addToHistory("");
        addToHistory("");
        addToHistory("");
        
        // Continue message
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        addToHistory("", "#CCCCCC");
        addToHistory("           ▼▼▼  SCROLL DOWN TO CONTINUE  ▼▼▼              ", "#00FF00", "text-xl font-bold");
        addToHistory("", "#CCCCCC");
        addToHistory("═══════════════════════════════════════════════════════════", "#00FF00");
        addToHistory("");
        addToHistory("");
        
        // Add spacing for scroll
        for (let i = 0; i < 25; i++) {
            addToHistory("");
        }
        
        setIsBooting(false);
    }, []);

    // Trigger registry reveal when user scrolls
    React.useEffect(() => {
        if (registryRevealed) {
            revealRegistry();
        }
    }, [registryRevealed, revealRegistry]);

    // Pas d'auto-scroll pour Section 2 - l'utilisateur contrôle le scroll

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();

        // If boot is complete but registry not revealed, reveal it on Enter (even empty)
        if (bootComplete && !registryRevealed) {
            setRegistryRevealed(true);
            setInput("");
            return;
        }

        // If showing start prompt and user presses enter (even empty), start boot
        if (showStartPrompt && !isBooting) {
            setShowStartPrompt(false);
            setInput("");
            runBootSequence();
            return;
        }

        if (!trimmed) {
            setHistory((prev) => [...prev, { text: PROMPT }]);
            return;
        }

        if (trimmed.toLowerCase() === "run" || trimmed.toLowerCase() === "init_wrapped_2025" || trimmed.toLowerCase() === "start") {
            if (!isBooting && !bootComplete) {
                setShowStartPrompt(false);
                setInput("");
                runBootSequence();
            }
            return;
        }

        // Handle other commands or unknown
        setHistory((prev) => [
            ...prev,
            { text: PROMPT + trimmed, color: "#CCCCCC" },
            { text: `[ERROR] COMMAND_NOT_FOUND: '${trimmed}'`, color: "#00FF00" },
            { text: `[!] ACCESS_DENIED`, color: "#00FF00" },
            { text: '', color: "#CCCCCC" }
        ]);
        setInput("");
    };

    return (
        <div
            className={`flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C] ${className || ''}`}
            onClick={() => !isBooting && inputRef.current?.focus()}
            style={{ height: '65vh', minHeight: '400px' }}
        >
            {/* ===================== */}
            {/* Terminal Tabs (VSCode) */}
            {/* ===================== */}
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

            {/* ================= */}
            {/* Terminal Content  */}
            {/* ================= */}
            <div
                ref={containerRef}
                className="flex-1 px-4 py-3 font-mono font-semibold text-[13px] leading-[1.45] text-[#D4D4D4] overflow-y-auto cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
                {/* Start Screen */}
                {showStartPrompt && !isBooting && (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="space-y-6">
                            <div className="text-[#00FF00] text-6xl font-black mb-8 animate-pulse">
                                GI 2025 WRAPPED
                            </div>
                            <div className="text-[#CCCCCC] text-xl mb-4">
                                Experience the Year in Review
                            </div>
                            <div className="border-2 border-[#00FF00] rounded-lg p-6 bg-[#1E1E1E]/50 backdrop-blur-sm">
                                <div className="text-[#00FF00] text-lg mb-3 font-bold">
                                    ▶ PRESS ENTER TO START
                                </div>
                                <div className="text-[#858585] text-sm">
                                    or type "start" and press Enter
                                </div>
                            </div>
                            <div className="text-[#858585] text-xs mt-8">
                                Designed & Developed by AKAMIK VIZUALZ & LASHU THIERRY
                            </div>
                        </div>
                    </div>
                )}

                {/* Terminal History */}
                {!showStartPrompt && history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap mb-[2px] break-words ${line.className || ''}`}
                        style={{ 
                            color: line.color || "#D4D4D4",
                            textShadow: (line.className?.includes('text-7xl') || line.className?.includes('text-5xl') || line.className?.includes('text-8xl')) && line.color === '#00FF00' 
                                ? '0 0 30px rgba(0, 255, 0, 0.9), 0 0 60px rgba(0, 255, 0, 0.5)' 
                                : 'none'
                        }}
                    >
                        {line.text}
                    </div>
                ))}

                {!isBooting && (
                    <form onSubmit={handleSubmit} className="flex items-center">
                        {!showStartPrompt && (
                            <span className="text-[#D4D4D4] mr-2 whitespace-nowrap">{PROMPT}</span>
                        )}
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`bg-transparent outline-none border-none flex-1 text-[#D4D4D4] ${showStartPrompt ? 'opacity-0' : ''}`}
                            spellCheck={false}
                            autoComplete="off"
                        />
                        {!showStartPrompt && <EditorCursor />}
                    </form>
                )}
            </div>
        </div>
    );
};
