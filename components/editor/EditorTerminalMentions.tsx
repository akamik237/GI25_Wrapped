"use client";

import React from 'react';
import { EditorCursor } from './EditorCursor';

interface EditorTerminalMentionsProps {
    onScrollEnd?: () => void;
}

export const EditorTerminalMentions = ({ onScrollEnd }: EditorTerminalMentionsProps) => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string }>>([]);
    const [isProcessing, setIsProcessing] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const PROMPT = "C:\\GI25\\RESULTS>";

    React.useEffect(() => {
        if (!isProcessing) return;

        const lines = [
            { text: "", delay: 100 },
            { text: "╔════════════════════════════════════════════════╗", color: "#00FFFF", delay: 50 },
            { text: "║    🎓 FINAL EVALUATION ENGINE — GI 2025       ║", color: "#00FFFF", delay: 50 },
            { text: "╚════════════════════════════════════════════════╝", color: "#00FFFF", delay: 50 },
            { text: "", delay: 100 },
            { text: "⚡ LOADING ENSPY GRADING POLICY...", color: "#FF00FF", delay: 200 },
            { text: "[ ✓ ] Policy v2025 loaded", color: "#00FF00", delay: 100 },
            { text: "", delay: 150 },
            { text: "🔍 QUERYING RESULTS DATABASE...", color: "#FF00FF", delay: 200 },
            { text: "> db.soutenances.find({ promo: 'GI_2025' })", color: "#858585", delay: 100 },
            { text: "[ ✓ ] 70 records found", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "📊 COMPUTING FINAL DISTRIBUTION...", color: "#FF00FF", delay: 300 },
            { text: "", delay: 200 },
            { text: "┌─────────── MENTIONS & RÉSULTATS ──────────────┐", color: "#00FFFF", delay: 100 },
            { text: "│                                                │", color: "#00FFFF", delay: 0 },
            { text: "│  🌟 EXCELLENT (E) — 13 étudiants              │", color: "#00FF00", delay: 100 },
            { text: "│     ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 18.6%                  │", color: "#00FF00", delay: 150 },
            { text: "│     • Notes ≥ 16/20                            │", color: "#CCCCCC", delay: 50 },
            { text: "│     • Performance exceptionnelle               │", color: "#CCCCCC", delay: 50 },
            { text: "│                                                │", color: "#00FFFF", delay: 0 },
            { text: "│  ⭐ TRÈS BIEN (TB) — 52 étudiants             │", color: "#00FFFF", delay: 100 },
            { text: "│     ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 74.3%│", color: "#00FFFF", delay: 150 },
            { text: "│     • Notes ≥ 14/20                            │", color: "#CCCCCC", delay: 50 },
            { text: "│     • Très bon niveau technique                │", color: "#CCCCCC", delay: 50 },
            { text: "│                                                │", color: "#00FFFF", delay: 0 },
            { text: "│  ✓ BIEN (B) — 5 étudiants                     │", color: "#FF00FF", delay: 100 },
            { text: "│     ▰▰▰▰▰▰▰ 7.1%                               │", color: "#FF00FF", delay: 150 },
            { text: "│     • Notes ≥ 12/20                            │", color: "#CCCCCC", delay: 50 },
            { text: "│                                                │", color: "#00FFFF", delay: 0 },
            { text: "│  🔒 HUIS CLOS — 1 soutenance                   │", color: "#858585", delay: 100 },
            { text: "│     ▰ Confidentiel                             │", color: "#858585", delay: 150 },
            { text: "│                                                │", color: "#00FFFF", delay: 0 },
            { text: "└────────────────────────────────────────────────┘", color: "#00FFFF", delay: 100 },
            { text: "", delay: 200 },
            { text: "📈 STATISTICS:", color: "#00FFFF", delay: 100 },
            { text: "  TOTAL_CANDIDATES .............. 70", color: "#CCCCCC", delay: 100 },
            { text: "  SUCCESS_RATE .................. 100% ✓", color: "#00FF00", delay: 100 },
            { text: "  AVERAGE_GRADE ................. 14.8/20", color: "#00FFFF", delay: 100 },
            { text: "  EXCELLENCE_RATE ............... 92.9%", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "🔐 RUNNING INTEGRITY_CHECK...", color: "#FF00FF", delay: 300 },
            { text: "> verify_data_integrity()", color: "#858585", delay: 100 },
            { text: "  ✓ No anomalies detected", color: "#00FF00", delay: 100 },
            { text: "  ✓ All records validated", color: "#00FF00", delay: 100 },
            { text: "  ✓ Cross-check passed", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "DATA_INTEGRITY ................. [ ✓ OK ]", color: "#00FF00", delay: 200 },
            { text: "EVALUATION_STATUS .............. [ ✓ COMPLETE ]", color: "#00FF00", delay: 200 },
            { text: "", delay: 300 },
            { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: "#00FFFF", delay: 100 },
            { text: "⬇️  SCROLL DOWN TO CONTINUE", color: "#00FF00", delay: 100 },
        ];

        let index = 0;

        const addLine = () => {
            if (index < lines.length) {
                const line = lines[index];

                setTimeout(() => {
                    setHistory(prev => [...prev, { text: line.text, color: line.color || "#CCCCCC" }]);
                    index++;
                    addLine();
                }, line.delay);
            } else {
                setIsProcessing(false);
            }
        };

        addLine();
    }, []);

    const handleScroll = () => {
        if (!containerRef.current || isProcessing) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;

        if (isAtBottom && onScrollEnd) {
            onScrollEnd();
        }
    };

    return (
        <div className="flex flex-col bg-[#1E1E1E] border-t border-[#3C3C3C]" style={{ height: '65vh', minHeight: '400px' }}>
            <div className="h-9 bg-[#252526] border-b border-[#3C3C3C] flex items-center px-4 text-[13px] text-[#CCCCCC]">
                <span className="mr-4">Terminal</span>
            </div>

            <div
                ref={containerRef}
                className="flex-1 px-4 py-3 font-mono font-semibold text-[13px] leading-[1.45] text-[#CCCCCC] overflow-y-auto cursor-text scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
                onScroll={handleScroll}
            >
                {history.map((line, i) => (
                    <div 
                        key={i} 
                        className="whitespace-pre-wrap mb-[2px] break-words"
                        style={{ color: line.color || "#CCCCCC" }}
                    >
                        {line.text}
                    </div>
                ))}

                {!isProcessing && (
                    <div className="flex items-center mt-4">
                        <span className="text-[#CCCCCC] mr-2 whitespace-nowrap">{PROMPT}</span>
                        <EditorCursor />
                    </div>
                )}
            </div>
        </div>
    );
};

