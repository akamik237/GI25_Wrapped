import React from 'react';
import { Files, Search, GitBranch, Bug, Blocks, UserCircle, Settings } from 'lucide-react';

export const EditorSidebar = () => {
    return (
        <div className="w-12 bg-[#333333] border-r border-[#3C3C3C] flex flex-col items-center py-3 gap-4 h-full">
            {/* Files Icon - Active */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-white hover:text-white border-l-2 border-white transition-colors">
                <Files size={24} strokeWidth={1.5} />
            </button>

            {/* Search Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <Search size={24} strokeWidth={1.5} />
            </button>

            {/* Source Control (Git) Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <GitBranch size={24} strokeWidth={1.5} />
            </button>

            {/* Debug Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <Bug size={24} strokeWidth={1.5} />
            </button>

            {/* Extensions Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <Blocks size={24} strokeWidth={1.5} />
            </button>

            <div className="flex-1" />

            {/* Account Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <UserCircle size={24} strokeWidth={1.5} />
            </button>

            {/* Settings Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors">
                <Settings size={24} strokeWidth={1.5} />
            </button>
        </div>
    );
};
