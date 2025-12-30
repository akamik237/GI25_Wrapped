"use client";

import React from 'react';

export const EditorTerminalClosing = () => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string; className?: string }>>([]);
    const [isClosing, setIsClosing] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!isClosing) return;

        const lines = [
            { text: "", delay: 100 },
            { text: "┌──────────────────────────────────────────────┐", color: "#00FF00", delay: 50 },
            { text: "│         SYSTEM SHUTDOWN SEQUENCE             │", color: "#00FF00", delay: 50 },
            { text: "└──────────────────────────────────────────────┘", color: "#00FF00", delay: 50 },
            { text: "", delay: 200 },
            { text: "FINALIZING GI_2025_WRAPPED...", color: "#CCCCCC", delay: 300 },
            { text: "[ OK ] All sections processed", color: "#00FF00", delay: 200 },
            { text: "[ OK ] 70 stories told", color: "#00FF00", delay: 200 },
            { text: "[ OK ] Memories saved", color: "#00FF00", delay: 200 },
            { text: "", delay: 300 },
            { text: "CLOSING CONNECTIONS...", color: "#CCCCCC", delay: 200 },
            { text: "  → Terminal sessions", color: "#858585", delay: 100 },
            { text: "  → Media streams", color: "#858585", delay: 100 },
            { text: "  → Database connections", color: "#858585", delay: 100 },
            { text: "[ OK ] All connections closed", color: "#00FF00", delay: 200 },
            { text: "", delay: 300 },
            { text: "═══════════════════════════════════════════════", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "           MESSAGE FINAL OFFICIEL", color: "#00FF00", className: "text-center font-bold", delay: 200 },
            { text: "", delay: 200 },
            { text: "═══════════════════════════════════════════════", color: "#00FF00", delay: 100 },
            { text: "", delay: 300 },
            { text: "  La <GI25 /> vous remercie ✨", color: "#CCCCCC", className: "text-center text-lg", delay: 500 },
            { text: "", delay: 300 },
            { text: "  Ensemble, boostons le progrès et repoussons", color: "#CCCCCC", className: "text-center", delay: 200 },
            { text: "  les barrières de l'innovation", color: "#CCCCCC", className: "text-center", delay: 200 },
            { text: "", delay: 500 },
            { text: "═══════════════════════════════════════════════", color: "#00FF00", delay: 100 },
            { text: "", delay: 300 },
            { text: "CRÉDITS:", color: "#00FF00", delay: 200 },
            { text: "", delay: 100 },
            { text: "  Designed & Developed by", color: "#CCCCCC", delay: 100 },
            { text: "  → AKAMIK VIZUALZ", color: "#00FF00", delay: 150 },
            { text: "  → LASHU THIERRY", color: "#00FF00", delay: 150 },
            { text: "", delay: 300 },
            { text: "  École Nationale Supérieure Polytechnique", color: "#858585", delay: 100 },
            { text: "  Yaoundé, Cameroun", color: "#858585", delay: 100 },
            { text: "", delay: 400 },
            { text: "═══════════════════════════════════════════════", color: "#00FF00", delay: 100 },
            { text: "", delay: 300 },
            { text: "EXECUTION_COMPLETE ............. [ OK ]", color: "#00FF00", delay: 200 },
            { text: "MEMORY_FREED ................... [ OK ]", color: "#00FF00", delay: 200 },
            { text: "PROCESS_STATE .................. TERMINATED", color: "#CCCCCC", delay: 200 },
            { text: "", delay: 300 },
            { text: "EXIT CODE: 0", color: "#00FF00", className: "font-bold", delay: 500 },
            { text: "", delay: 300 },
            { text: "───────────────────────────────────────────────", color: "#858585", delay: 100 },
            { text: "GI_2025_WRAPPED v1.0.0", color: "#858585", delay: 100 },
            { text: "© 2025 ENSPY — Tous droits réservés", color: "#858585", delay: 100 },
            { text: "", delay: 500 },
        ];

        let index = 0;

        const addLine = () => {
            if (index < lines.length) {
                const line = lines[index];

                setTimeout(() => {
                    setHistory(prev => [...prev, { 
                        text: line.text, 
                        color: line.color || "#CCCCCC",
                        className: line.className 
                    }]);
                    index++;
                    addLine();
                }, line.delay);
            } else {
                setIsClosing(false);
            }
        };

        addLine();
    }, []);

    return (
        <div className="flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C]" style={{ height: '65vh', minHeight: '400px' }}>
            <div className="h-9 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                <span className="mr-4">Terminal</span>
            </div>

            <div
                ref={containerRef}
                className="flex-1 px-4 py-3 font-mono font-semibold text-[13px] leading-[1.45] text-[#CCCCCC] overflow-y-auto cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className={`whitespace-pre-wrap mb-[2px] break-words ${line.className || ''}`}
                        style={{ color: line.color || "#CCCCCC" }}
                    >
                        {line.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

