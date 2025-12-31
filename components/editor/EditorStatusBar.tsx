import React from 'react';
import { GitBranch, AlertCircle, Wifi, AlertTriangle } from 'lucide-react';

interface EditorStatusBarProps {
    branch?: string;
    line?: number;
    column?: number;
    language?: string;
    encoding?: string;
    onNextSection?: () => void;
    onPreviousSection?: () => void;
    currentSection?: number;
    totalSections?: number;
}

export const EditorStatusBar = ({ 
    branch = 'master', 
    line = 1, 
    column = 1, 
    language = 'TypeScript',
    encoding = 'UTF-8',
    onNextSection,
    onPreviousSection,
    currentSection,
    totalSections
}: EditorStatusBarProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-6 flex items-center z-50">
           
            {/* Main Status Bar */}
            <div className="flex-1 h-6 bg-[#007ACC] text-white flex items-center justify-between px-2 text-[12px] select-none overflow-x-auto">
                {/* Left Section */}
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

                    {/* Git Branch */}
                    <div className="hidden sm:flex items-center gap-1.5 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">
                        <GitBranch size={13} />
                        <span className="text-[12px]">{branch}</span>
                    </div>

                    {/* Errors/Warnings */}
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">
                            <AlertTriangle size={13} />
                            <span className="text-[12px]">0</span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    {/* Navigation Buttons */}
                    {currentSection !== undefined && totalSections !== undefined && (
                        <div className="flex items-center gap-1">
                            {/* Previous Button */}
                            {onPreviousSection && currentSection > 1 && (
                                <button
                                    onClick={onPreviousSection}
                                    className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1 font-semibold whitespace-nowrap"
                                    title={`Section ${currentSection - 1}/${totalSections} - Click to go to previous`}
                                >
                                    <span>⏮️</span>
                                    <span className="hidden sm:inline">Prev</span>
                                </button>
                            )}
                            
                            {/* Section Counter */}
                            <div className="px-2 py-0.5 text-[12px]">
                                {currentSection}/{totalSections}
                            </div>
                            
                            {/* Next Button */}
                            {onNextSection && currentSection < totalSections && (
                                <button
                                    onClick={onNextSection}
                                    className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer flex items-center gap-1 font-semibold whitespace-nowrap"
                                    title={`Section ${currentSection + 1}/${totalSections} - Click to skip to next`}
                                >
                                    <span className="hidden sm:inline">Next</span>
                                    <span>⏭️</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Line/Column */}
                    <div className="hidden sm:flex items-center hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        Ln {line}, Col {column}
                    </div>

                    {/* Encoding */}
                    <div className="hidden md:flex items-center hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        {encoding}
                    </div>

                    {/* Notification Bell */}
                    <div className="hidden sm:flex items-center hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        <AlertCircle size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

