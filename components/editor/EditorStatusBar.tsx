import React from 'react';
import { GitBranch, AlertCircle, Wifi } from 'lucide-react';

interface EditorStatusBarProps {
    branch?: string;
    line?: number;
    column?: number;
    language?: string;
    encoding?: string;
}

export const EditorStatusBar = ({ 
    branch = 'master', 
    line = 1, 
    column = 1, 
    language = 'TypeScript',
    encoding = 'UTF-8'
}: EditorStatusBarProps) => {
    return (
        <div className="h-6 bg-[#007ACC] text-white flex items-center justify-between px-2 text-[12px] select-none">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Git Branch */}
                <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    <GitBranch size={14} />
                    <span>{branch}</span>
                </div>

                {/* Errors/Warnings */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        <AlertCircle size={14} />
                        <span>0</span>
                    </div>
                    <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        <AlertCircle size={12} />
                        <span>0</span>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Connection Status */}
                <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    <Wifi size={14} />
                    <span>Connected</span>
                </div>

                {/* Line/Column */}
                <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    Ln {line}, Col {column}
                </div>

                {/* Encoding */}
                <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    {encoding}
                </div>

                {/* Language */}
                <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    {language}
                </div>

                {/* Notification Bell */}
                <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                    <AlertCircle size={16} />
                </div>
            </div>
        </div>
    );
};

