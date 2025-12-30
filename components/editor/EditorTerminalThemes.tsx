"use client";

import React from 'react';
import { EditorCursor } from './EditorCursor';

interface EditorTerminalThemesProps {
    onScrollEnd?: () => void;
}

export const EditorTerminalThemes = ({ onScrollEnd }: EditorTerminalThemesProps) => {
    const [history, setHistory] = React.useState<Array<{ text: string; color?: string; className?: string }>>([]);
    const [isAnalyzing, setIsAnalyzing] = React.useState(true);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const PROMPT = "C:\\GI25\\ANALYSIS>";

    React.useEffect(() => {
        if (!isAnalyzing) return;

        const lines = [
            { text: "", delay: 100 },
            { text: "┌────────────────────────────────────────────┐", color: "#00FF00", delay: 50 },
            { text: "│         THEMATIC ANALYSIS MODULE          │", color: "#00FF00", delay: 50 },
            { text: "└────────────────────────────────────────────┘", color: "#00FF00", delay: 50 },
            { text: "", delay: 100 },
            { text: "INITIALIZING PROJECT ANALYZER...", color: "#CCCCCC", delay: 200 },
            { text: "SOURCE: 70 ACADEMIC PROJECTS", color: "#CCCCCC", delay: 100 },
            { text: "PERIOD: 2024-2025", color: "#CCCCCC", delay: 100 },
            { text: "", delay: 200 },
            { text: "SCANNING DATABASE...", color: "#00FF00", delay: 300 },
            { text: "> db.projects.aggregate({ category: themes })", color: "#858585", delay: 100 },
            { text: "[ OK ]", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "┌─ THEMATIC DISTRIBUTION ─────────────────┐", color: "#00FF00", delay: 100 },
            { text: "│", color: "#00FF00", delay: 0 },
            { text: "│  DEV (Development)                       │", color: "#CCCCCC", delay: 50 },
            { text: "│  ████████████████████████████████ 46    │", color: "#00FF00", delay: 150 },
            { text: "│                                          │", color: "#00FF00", delay: 0 },
            { text: "│  IA (Intelligence Artificielle)          │", color: "#CCCCCC", delay: 50 },
            { text: "│  ████████ 12                             │", color: "#00FF00", delay: 150 },
            { text: "│                                          │", color: "#00FF00", delay: 0 },
            { text: "│  DEVOPS / CLOUD                          │", color: "#CCCCCC", delay: 50 },
            { text: "│  ████ 6                                  │", color: "#00FF00", delay: 150 },
            { text: "│                                          │", color: "#00FF00", delay: 0 },
            { text: "│  SÉCURITÉ                                │", color: "#CCCCCC", delay: 50 },
            { text: "│  ██ 3                                    │", color: "#00FF00", delay: 150 },
            { text: "│                                          │", color: "#00FF00", delay: 0 },
            { text: "│  IoT / SYSTÈME / BD                      │", color: "#CCCCCC", delay: 50 },
            { text: "│  █ 1 each                                │", color: "#00FF00", delay: 150 },
            { text: "│                                          │", color: "#00FF00", delay: 0 },
            { text: "└──────────────────────────────────────────┘", color: "#00FF00", delay: 100 },
            { text: "", delay: 200 },
            { text: "DOMINANT_FIELD ................ DEVELOPMENT", color: "#CCCCCC", delay: 100 },
            { text: "DIVERSITY_INDEX ............... HIGH", color: "#CCCCCC", delay: 100 },
            { text: "INNOVATION_LEVEL .............. EXCELLENT", color: "#CCCCCC", delay: 100 },
            { text: "", delay: 200 },
            { text: "ANALYSIS_STATUS ............... [ COMPLETE ]", color: "#00FF00", delay: 200 },
            { text: "", delay: 300 },
            { text: "─────────────────────────────────────────────", color: "#00FF00", delay: 100 },
            { text: "SCROLL DOWN TO CONTINUE ↓", color: "#00FF00", delay: 100 },
        ];

        let index = 0;
        let totalDelay = 0;

        const addLine = () => {
            if (index < lines.length) {
                const line = lines[index];
                totalDelay += line.delay || 0;

                setTimeout(() => {
                    setHistory(prev => [...prev, { text: line.text, color: line.color || "#CCCCCC" }]);
                    index++;
                    addLine();
                }, line.delay);
            } else {
                setIsAnalyzing(false);
            }
        };

        addLine();
    }, []);

    const handleScroll = () => {
        if (!containerRef.current || isAnalyzing) return;

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

                {!isAnalyzing && (
                    <div className="flex items-center mt-4">
                        <span className="text-[#CCCCCC] mr-2 whitespace-nowrap">{PROMPT}</span>
                        <EditorCursor />
                    </div>
                )}
            </div>
        </div>
    );
};

