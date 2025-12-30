"use client";

import React from 'react';
import { entreprisesData } from '@/data/entreprises';
import { EditorCursor } from './EditorCursor';

interface EditorEntreprisesProps {
    onScrollEnd?: () => void;
}

export const EditorEntreprises = ({ onScrollEnd }: EditorEntreprisesProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [displayedLines, setDisplayedLines] = React.useState<number>(0);
    const [isComplete, setIsComplete] = React.useState(false);
    const hasRunRef = React.useRef(false);

    const companies = entreprisesData.companies;

    // Build JS code lines
    const jsLines = [
        { text: "// entreprises_accueil.js", color: "#6A9955" },
        { text: "// Liste des structures d'accueil - Promotion GI 2025", color: "#6A9955" },
        { text: "", color: "#D4D4D4" },
        { text: "const entreprises = {", color: "#D4D4D4" },
        { text: `  total: ${entreprisesData.stats.total},`, color: "#D4D4D4" },
        { text: `  secteurPublic: ${entreprisesData.stats.secteurPublic},`, color: "#D4D4D4" },
        { text: `  secteurPrive: ${entreprisesData.stats.secteurPrive},`, color: "#D4D4D4" },
        { text: "  liste: [", color: "#D4D4D4" },
    ];

    // Add companies
    companies.forEach((company, index) => {
        const isLast = index === companies.length - 1;
        jsLines.push({ 
            text: `    "${company}"${isLast ? '' : ','}`, 
            color: "#CE9178" 
        });
    });

    jsLines.push({ text: "  ]", color: "#D4D4D4" });
    jsLines.push({ text: "};", color: "#D4D4D4" });
    jsLines.push({ text: "", color: "#D4D4D4" });
    jsLines.push({ text: "export default entreprises;", color: "#C586C0" });
    jsLines.push({ text: "", color: "#D4D4D4" });
    jsLines.push({ text: "// Analyse terminée ✓", color: "#6A9955" });

    // Typing animation - display lines rapidly
    React.useEffect(() => {
        if (hasRunRef.current) return;
        hasRunRef.current = true;

        let currentLine = 0;
        const typeLine = () => {
            if (currentLine < jsLines.length) {
                setDisplayedLines(currentLine + 1);
                currentLine++;
                // Slower for header lines (0-7), faster for companies
                const delay = currentLine < 8 ? 150 : 80; // 150ms for header, 80ms per company
                setTimeout(typeLine, delay);
            } else {
                setIsComplete(true);
                // Auto-transition after 5 seconds
                setTimeout(() => {
                    if (onScrollEnd) {
                        onScrollEnd();
                    }
                }, 5000);
            }
        };

        typeLine();
    }, [jsLines.length, onScrollEnd]);

    // Auto-scroll to bottom as lines appear
    React.useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [displayedLines]);

    return (
        <div 
            ref={containerRef}
            className="h-full w-full bg-[#1E1E1E] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent"
        >
            {/* Code Editor Content */}
            <div className="py-4 font-mono text-[14px]" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                {jsLines.slice(0, displayedLines).map((line, index) => (
                    <div key={index} className="flex items-start px-4">
                        {/* Line number */}
                        <span className="text-[#858585] text-xs mr-6 select-none w-8 text-right flex-shrink-0">
                            {index + 1}
                        </span>
                        {/* Code content */}
                        <span 
                            className="whitespace-pre-wrap break-words flex-1"
                            style={{ color: line.color }}
                        >
                            {line.text}
                        </span>
                    </div>
                ))}
                
                {/* Typing cursor */}
                {!isComplete && displayedLines > 0 && (
                    <div className="flex items-start px-4">
                        <span className="text-[#858585] text-xs mr-6 select-none w-8 text-right flex-shrink-0">
                            {displayedLines + 1}
                        </span>
                        <EditorCursor />
                    </div>
                )}
            </div>
        </div>
    );
};

