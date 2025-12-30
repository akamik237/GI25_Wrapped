import React from 'react';

export const EditorCode = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative bg-[#1E1E1E] flex-1 overflow-y-auto font-mono text-[14px]">
            <div className="py-4">
                {children}
            </div>
        </div>
    );
};
