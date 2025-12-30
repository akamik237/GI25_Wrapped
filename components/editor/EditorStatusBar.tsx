import React from 'react';
import { GitBranch, AlertCircle, Wifi, AlertTriangle } from 'lucide-react';

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
        <div className="h-6 flex items-center">
           
            {/* Main Status Bar */}
            <div className="flex-1 h-6 bg-[#007ACC] text-white flex items-center justify-between px-2 text-[12px] select-none">
                {/* Left Section */}
                <div className="flex items-center gap-3">

                    {/* Git Branch */}
                    <div className="flex items-center gap-1.5 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">
                        <GitBranch size={13} />
                        <span className="text-[12px]">{branch}</span>
                    </div>

                    {/* Errors/Warnings */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 hover:bg-white/10 px-1.5 py-0.5 rounded cursor-pointer">
                            <AlertTriangle size={13} />
                            <span className="text-[12px]">0</span>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-1">
                    {/* Line/Column */}
                    <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        Ln {line}, Col {column}
                    </div>

                    {/* Encoding */}
                    <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        {encoding}
                    </div>

                    {/* Notification Bell */}
                    <div className="hover:bg-white/10 px-2 py-0.5 rounded cursor-pointer">
                        <AlertCircle size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

