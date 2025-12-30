import React from 'react';

export const EditorShell = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full bg-editor-bg flex">
            {children}
        </div>
    );
};
