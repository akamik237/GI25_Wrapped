import React from 'react';
import { ChevronRight, ChevronDown, File, Folder, FileCode, FileJson, FileText } from 'lucide-react';

export const EditorFileExplorer = () => {
    const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
        new Set(['GI25_WRAPPED', 'app', 'components', 'public'])
    );

    const toggleFolder = (folder: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(folder)) {
                newSet.delete(folder);
            } else {
                newSet.add(folder);
            }
            return newSet;
        });
    };

    return (
        <div className="w-64 bg-[#252526] border-r border-[#3C3C3C] flex flex-col h-full text-[#CCCCCC] text-[13px]">
            {/* Header */}
            <div className="px-4 py-3 text-[11px] text-[#CCCCCC] uppercase tracking-wider border-b border-[#3C3C3C] flex items-center justify-between">
                <span>Explorer</span>
                <div className="flex items-center gap-1">
                    <button className="hover:bg-[#2A2D2E] p-1 rounded" title="New File">
                        <File size={14} />
                    </button>
                    <button className="hover:bg-[#2A2D2E] p-1 rounded" title="New Folder">
                        <Folder size={14} />
                    </button>
                    <button className="hover:bg-[#2A2D2E] p-1 rounded" title="Refresh">
                        <ChevronRight size={14} className="rotate-180" />
                    </button>
                    <button className="hover:bg-[#2A2D2E] p-1 rounded" title="Collapse All">
                        <ChevronDown size={14} className="rotate-180" />
                    </button>
                </div>
            </div>

            {/* Project Name */}
            <div className="px-2 py-1.5 flex items-center justify-between hover:bg-[#2A2D2E] cursor-pointer">
                <div className="flex items-center gap-1">
                    <ChevronDown size={14} className="text-[#CCCCCC]" />
                    <span className="font-semibold">GI25_WRAPPED</span>
                </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                {/* next folder */}
                <div className="ml-4">
                <div 
                    className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer"
                    onClick={() => toggleFolder('next')}
                >
                    {expandedFolders.has('next') ? (
                        <ChevronDown size={12} />
                    ) : (
                        <ChevronRight size={12} />
                    )}
                    <Folder size={14} className="text-[#DCAD60]" />
                    <span>next</span>
                </div>
                </div>

                {/* app folder */}
                <div className="ml-4">
                    <div 
                        className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer"
                        onClick={() => toggleFolder('app')}
                    >
                        {expandedFolders.has('app') ? (
                            <ChevronDown size={12} />
                        ) : (
                            <ChevronRight size={12} />
                        )}
                        <Folder size={14} className="text-[#DCAD60]" />
                        <span>app</span>
                    </div>
                </div>

                {/* components folder */}
                <div className="ml-4">
                    <div 
                        className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer"
                        onClick={() => toggleFolder('components')}
                    >
                        {expandedFolders.has('components') ? (
                            <ChevronDown size={12} />
                        ) : (
                            <ChevronRight size={12} />
                        )}
                        <Folder size={14} className="text-[#DCAD60]" />
                        <span>components</span>
                    </div>
                    {expandedFolders.has('components') && (
                        <div className="ml-6">
                            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                                <Folder size={14} className="text-[#DCAD60]" />
                                <span>editor</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                                <Folder size={14} className="text-[#DCAD60]" />
                                <span>sections</span>
                            </div>
                            <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                                <Folder size={14} className="text-[#DCAD60]" />
                                <span>ui</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* node_modules folder */}
                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer text-[#858585]">
                        <ChevronRight size={12} />
                        <Folder size={14} className="text-[#858585]" />
                        <span>node_modules</span>
                    </div>
                </div>

                {/* public folder */}
                <div className="ml-4">
                    <div 
                        className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer"
                        onClick={() => toggleFolder('public')}
                    >
                        {expandedFolders.has('public') ? (
                            <ChevronDown size={12} />
                        ) : (
                            <ChevronRight size={12} />
                        )}
                        <Folder size={14} className="text-[#DCAD60]" />
                        <span>public</span>
                    </div>
                </div>

                {/* .gitignore file */}
                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer text-[#858585]">
                        <span className="w-3"></span>
                        <File size={14} className="text-[#858585]" />
                        <span>.gitignore</span>
                    </div>
                </div>

                {/* Config files */}
                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#FEC346]" />
                        <span className="text-[#FEC346]">eslint.config.mjs</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#66B0FF]" />
                        <span className="text-[#66B0FF]">next-env.d.ts</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#66B0FF]" />
                        <span className="text-[#66B0FF]">next.config.ts</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#FEC346]" />
                        <span className="text-[#FEC346]">package-lock.json</span>
                        <span className="ml-1 text-[11px]">M</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#FEC346]" />
                        <span className="text-[#FEC346]">package.json</span>
                        <span className="ml-1 text-[11px]">M</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#FEC346]" />
                        <span className="text-[#FEC346]">postcss.config.mjs</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileText size={14} className="text-[#4EC9B0]" />
                        <span>README.md</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileText size={14} className="text-[#4EC9B0]" />
                        <span className="text-[#4EC9B0]">stats_gi.md</span>
                        <span className="ml-1 text-[11px] text-[#4EC9B0]">U</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#66B0FF]" />
                        <span className="text-[#66B0FF]">tailwind.config.ts</span>
                        <span className="ml-1 text-[11px] text-[#66B0FF]">U</span>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] cursor-pointer">
                        <span className="w-3"></span>
                        <FileCode size={14} className="text-[#FEC346]" />
                        <span className="text-[#FEC346]">tsconfig.json</span>
                    </div>
                </div>
            </div>

            {/* Outline/Timeline sections at bottom */}
            <div className="border-t border-[#3C3C3C]">
                <div className="px-4 py-2 text-[11px] text-[#858585] uppercase tracking-wider hover:bg-[#2A2D2E] cursor-pointer">
                    Outline
                </div>
                <div className="px-4 py-2 text-[11px] text-[#858585] uppercase tracking-wider hover:bg-[#2A2D2E] cursor-pointer">
                    Timeline
                </div>
            </div>
        </div>
    );
};

