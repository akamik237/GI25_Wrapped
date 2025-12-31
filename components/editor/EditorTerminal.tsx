import React from "react";
import { EditorCursor } from "./EditorCursor";
import { generateAsciiTextSync, ASCII_FONTS, ASCII_ART, GRADUATION_CAP_FRAMES } from "@/lib/ascii";
import { getTerminalSoundManager } from "@/lib/terminalSounds";

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
    const [history, setHistory] = React.useState<TerminalLine[]>([
        { text: "◉ GI 2025 WRAPPED", color: "#00FF00" },
        { text: "" },
        { text: "▸ Type 'run' to jack in", color: "#666666" },
        { text: "" },
    ]);
    const [isBooting, setIsBooting] = React.useState(false);
    const [bootComplete, setBootComplete] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const PROMPT = "C:\\UY1\\ENSPY\\GENIE_INFO\\GI25\\SOUTENANCES> ";

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

    // No scroll detection needed - auto-transition after boot


    const runBootSequence = async () => {
        setIsBooting(true);
        const soundManager = getTerminalSoundManager();
        const addToHistory = (text: string, color?: string, className?: string) => {
            setHistory(prev => [...prev, { text, color, className }]);
            // Play random sound on text addition
            soundManager.playOnTyping();
        };

        // Cyberpunk boot sequence
        addToHistory("");
        soundManager.playOnSystemCheck();
        addToHistory(">>> INIT_WRAPPED_2025", "#FF00FF");
        await new Promise(r => setTimeout(r, 200));

        // ASCII Art - GI 2025
        addToHistory("");
        let asciiGI: string;
        try {
            asciiGI = generateAsciiTextSync('GI 2025', ASCII_FONTS.slant);
        } catch (error) {
            asciiGI = 'GI 2025';
        }
        
        for (const line of asciiGI.split('\n')) {
            addToHistory(line, "#00FFFF");
            await new Promise(r => setTimeout(r, 40));
        }
        await new Promise(r => setTimeout(r, 300));

        // WRAPPED with glitch
        addToHistory("");
        const glitchTitles = [
            "W̴R̵A̸P̶P̷E̸D̵",
            "WRAPPED",
            "W̵R̸A̴P̵P̸E̴D̸",
            "WRAPPED"
        ];
        
        for (let i = 0; i < 6; i++) {
            addToHistory(glitchTitles[i % glitchTitles.length], i % 2 === 0 ? "#FF00FF" : "#00FFFF");
            soundManager.playOnGlitch();
            await new Promise(r => setTimeout(r, 100));
            if (i < 5) setHistory(prev => prev.slice(0, -1));
        }
        await new Promise(r => setTimeout(r, 300));

        // Neon scanline effect
        addToHistory("");
        addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#FF00FF");
        await new Promise(r => setTimeout(r, 150));
        
        
        const total = 15;
        setHistory(prev => [...prev, { 
            text: `▓${("░").repeat(total)}▓ LOADING`, 
            color: "#666666" 
        }]);

        for (let i = 1; i <= total; i++) {
            const filled = "█".repeat(i);
            const empty = "░".repeat(total - i);
            const color = i < 5 ? "#FF00FF" : i < 10 ? "#00FFFF" : "#00FF00";

            setHistory(prev => {
                const newHistory = [...prev];
                newHistory[newHistory.length - 1] = { 
                    text: `▓${filled}${empty}▓ ${i === total ? 'COMPLETE' : 'LOADING'}`,
                    color: color
                };
                return newHistory;
            });

            soundManager.playOnLoading();
            await new Promise(r => setTimeout(r, 60));
        }

        await new Promise(r => setTimeout(r, 400));

        // Credits animation - Designed and Developed by
        addToHistory("");
        addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");
        addToHistory("");
        await new Promise(r => setTimeout(r, 200));
        
        addToHistory("    D E S I G N E D   &   D E V E L O P E D   B Y", "#858585", "text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em]");
        await new Promise(r => setTimeout(r, 500));
        
        addToHistory("");
        // ASCII art version
        addToHistory("  ▀▀█▀▀ █ █ █▀▀ ▄▀█ █▀▄▀█ █ █▀▀ █ █ █ █▀▄ █ █ █ █ █ █ █ █▀▀", "#00FFFF", "text-xs sm:text-base md:text-lg font-black");
        await new Promise(r => setTimeout(r, 150));
        addToHistory("    █   █▀█ ██▄ █▀█ █ ▀ █ █ █▄▄ ▀▄▀ █ █ ▀▄▀ █▄█ █ █▄█ ▄▄█", "#00FFFF", "text-xs sm:text-base md:text-lg font-black");
        await new Promise(r => setTimeout(r, 400));
        
        // AKAMIK VIZUALZ with glitch effect
        addToHistory("");
        const glitchAkamik = [
            "A̴K̵A̸M̶I̷K̸ ̵V̴I̸Z̶U̷A̸L̵Z̴",
            "AKAMIK VIZUALZ",
            "A̵K̸A̴M̵I̸K̴ ̸V̵I̶Z̷U̸A̴L̵Z̸",
            "AKAMIK VIZUALZ"
        ];
        
        for (let i = 0; i < 6; i++) {
            addToHistory(`                 ${glitchAkamik[i % glitchAkamik.length]}`, i % 2 === 0 ? "#FF00FF" : "#00FFFF", "text-xl sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em]");
            await new Promise(r => setTimeout(r, 120));
            if (i < 5) setHistory(prev => prev.slice(0, -1));
        }
        await new Promise(r => setTimeout(r, 600));

        addToHistory("");
        addToHistory("                         &", "#FF00FF", "text-2xl sm:text-3xl font-black");
        await new Promise(r => setTimeout(r, 400));
        
        addToHistory("");
        // ASCII art version
        addToHistory("  ▀█▀ █ █ ██▄ █   ▄▀█ ▄▀▀ █ █ █ █   ▀█▀ █ █ █ ██▄ █▀▄ █▀▄ ▀▄▀", "#00FF00", "text-xs sm:text-base md:text-lg font-black");
        await new Promise(r => setTimeout(r, 150));
        addToHistory("   █  █▀█ ██▄ █▄▄ █▀█ ▄█▄ █▀█ █▄█    █  █▀█ █ ██▄ █▀▄ █▀▄ ▀▄▀", "#00FF00", "text-xs sm:text-base md:text-lg font-black");
        await new Promise(r => setTimeout(r, 400));
        
        // LASHU THIERRY with glitch effect
        addToHistory("");
        const glitchLashu = [
            "L̴A̵S̸H̶U̷ ̸T̵H̴I̸E̶R̷R̸Y̵",
            "LASHU THIERRY",
            "L̵A̸S̴H̵U̸ ̴T̸H̵I̶E̷R̸R̴Y̵",
            "LASHU THIERRY"
        ];
        
        for (let i = 0; i < 6; i++) {
            addToHistory(`                 ${glitchLashu[i % glitchLashu.length]}`, i % 2 === 0 ? "#FF00FF" : "#00FF00", "text-xl sm:text-2xl font-black tracking-[0.2em] sm:tracking-[0.3em]");
            await new Promise(r => setTimeout(r, 120));
            if (i < 5) setHistory(prev => prev.slice(0, -1));
        }
        await new Promise(r => setTimeout(r, 700));
        
        addToHistory("");
        addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF");
        addToHistory("");
        await new Promise(r => setTimeout(r, 500));

        setIsBooting(false);
        setBootComplete(true);
        if (onRun) onRun();

        // Auto-transition to Section 3 (PromoShoot) after 2 seconds
        // Sections 1 & 2 are merged, so we skip directly to section 3
        await new Promise(r => setTimeout(r, 2000));
        if (onScrollEnd) {
            console.log('✓ Boot complete - Auto-transition to PromoShoot (Section 3)');
            onScrollEnd();
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();

        if (!trimmed) {
            setHistory((prev) => [...prev, { text: PROMPT }]);
            return;
        }

        // Echo command to history
        setHistory((prev) => [
            ...prev,
            { text: PROMPT + trimmed, color: "#CCCCCC" }
        ]);

        if (trimmed.toLowerCase() === "run" || trimmed.toLowerCase() === "init_wrapped_2025") {
            if (!isBooting && !bootComplete) {
            setInput("");
            runBootSequence();
            }
            return;
        }

        // Handle other commands or unknown
        setHistory((prev) => [
            ...prev,
            { text: `'${trimmed}' is not recognized as an internal or external command.`, color: "#FF6B6B" },
            { text: `Type 'run' to start the GI25 Wrapped experience.`, color: "#CCCCCC" },
            { text: '', color: "#CCCCCC" }
        ]);
        setInput("");
    };

    return (
        <div
            className={`flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C] ${className || ''}`}
            onClick={() => !isBooting && inputRef.current?.focus()}
            style={{ height: '60vh', minHeight: '300px', maxHeight: '600px' }}
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
                        <span className="text-[#D4D4D4] mr-2 whitespace-nowrap">{PROMPT}</span>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="bg-transparent outline-none border-none flex-1 text-[#D4D4D4]"
                            spellCheck={false}
                            autoComplete="off"
                        />
                        <EditorCursor />
                    </form>
                )}
            </div>
        </div>
    );
};
