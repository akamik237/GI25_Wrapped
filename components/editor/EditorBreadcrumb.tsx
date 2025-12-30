import React from 'react';
import { ChevronRight, FileCode2 } from 'lucide-react';

interface EditorBreadcrumbProps {
    path: string[];
}

export const EditorBreadcrumb = ({ path }: EditorBreadcrumbProps) => {
    return (
        <div className="h-9 px-4 bg-[#1E1E1E] border-b border-[#3C3C3C] flex items-center gap-2 text-[13px] text-[#CCCCCC]">
            <FileCode2 size={16} className="text-[#519ABA]" />
            {path.map((segment, index) => (
                <React.Fragment key={index}>
                    <span className="hover:text-white cursor-pointer">{segment}</span>
                    {index < path.length - 1 && (
                        <ChevronRight size={14} className="text-[#858585]" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

