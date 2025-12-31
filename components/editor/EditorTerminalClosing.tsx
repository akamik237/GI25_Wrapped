"use client";

import React from 'react';
import { generateAsciiTextSync, ASCII_FONTS } from "@/lib/ascii";
import { getTerminalSoundManager } from "@/lib/terminalSounds";

export const EditorTerminalClosing = () => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string; className?: string }>>([]);
    const [isClosing, setIsClosing] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const hasRunRef = React.useRef(false);

    React.useEffect(() => {
        if (!isClosing || hasRunRef.current) return;
        hasRunRef.current = true;

        const soundManager = getTerminalSoundManager();
        const addToHistory = async (text: string, color?: string, className?: string, delay: number = 100) => {
            await new Promise(r => setTimeout(r, delay));
            setHistory(prev => [...prev, { text, color, className }]);
            soundManager.playOnTyping();
        };

        const runClosingSequence = async () => {
            // ASCII Art - WRAPPED
            await addToHistory("", undefined, undefined, 200);
            soundManager.playOnSystemCheck();
            
            let asciiWrapped: string;
            try {
                asciiWrapped = generateAsciiTextSync('WRAPPED', ASCII_FONTS.slant);
            } catch (error) {
                asciiWrapped = 'WRAPPED';
            }
            
            for (const line of asciiWrapped.split('\n')) {
                await addToHistory(line, "#FF00FF", "text-xs sm:text-base md:text-lg", 40);
            }
            await addToHistory("", undefined, undefined, 300);

            // Glitch effect - brief visual effect only
            const glitchTitles = [
                "W̴R̵A̸P̶P̷E̸D̵",
                "WRAPPED",
                "W̵R̸A̴P̵P̸E̴D̸",
                "WRAPPED"
            ];
            
            for (let i = 0; i < 4; i++) {
                await addToHistory(glitchTitles[i % glitchTitles.length], i % 2 === 0 ? "#FF00FF" : "#00FFFF", undefined, 100);
                soundManager.playOnGlitch();
                // Remove previous glitch line to create animation effect
                if (i < 3) {
                    setHistory(prev => prev.slice(0, -1));
                }
            }
            // Remove final glitch line, keeping only ASCII art
            setHistory(prev => prev.slice(0, -1));
            await addToHistory("", undefined, undefined, 300);

            // Final message
            await addToHistory("  La <GI25 /> vous remercie ✨", "#CCCCCC", "text-center text-lg", 300);
            await addToHistory("", undefined, undefined, 200);
            await addToHistory("  GI25, Ensemble, toujours plus fort....", "#00FF00", "text-center text-lg font-bold", 300);
            await addToHistory("", undefined, undefined, 400);

            // Transition to GI26
            await addToHistory("▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓", "#00FFFF", undefined, 200);
            await addToHistory("", undefined, undefined, 200);
            
            // ASCII Art - Welcome GI26
            let asciiWelcome: string;
            try {
                asciiWelcome = generateAsciiTextSync('WELCOME', ASCII_FONTS.slant);
            } catch (error) {
                asciiWelcome = 'WELCOME';
            }
            
            for (const line of asciiWelcome.split('\n')) {
                await addToHistory(line, "#00FFFF", "text-xs sm:text-base md:text-lg", 40);
            }
            await addToHistory("", undefined, undefined, 200);

            // GI26 ASCII
            let asciiGI26: string;
            try {
                asciiGI26 = generateAsciiTextSync('GI 2026', ASCII_FONTS.slant);
            } catch (error) {
                asciiGI26 = 'GI 2026';
            }
            
            for (const line of asciiGI26.split('\n')) {
                await addToHistory(line, "#00FF00", "text-xs sm:text-base md:text-lg", 40);
            }
            await addToHistory("", undefined, undefined, 300);

            // Final line
            await addToHistory("EXIT CODE: 0", "#00FF00", "font-bold", 500);
            await addToHistory("", undefined, undefined, 200);

            // COSO GI25 label
            await addToHistory("═══════════════════════════════", "#858585", undefined, 100);
            await addToHistory("", undefined, undefined, 100);
            await addToHistory("         COSO GI25", "#FF00FF", "text-center font-bold text-lg", 300);
            await addToHistory("", undefined, undefined, 300);

            setIsClosing(false);
        };

        runClosingSequence();
    }, [isClosing]);

    // Auto-scroll during closing
    React.useEffect(() => {
        if (isClosing && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [isClosing, history]);

    return (
        <div className="flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C]" style={{ height: '65vh', minHeight: '400px' }}>
            <div className="h-9 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                <span className="mr-4">Terminal</span>
            </div>

            <div
                ref={containerRef}
                className="flex-1 px-4 py-3 font-mono font-semibold text-[13px] leading-[1.45] text-[#D4D4D4] overflow-y-auto cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap mb-[2px] break-words ${line.className || ''}`}
                        style={{ color: line.color || "#D4D4D4" }}
                    >
                        {line.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

