import { EditorTab } from "./EditorTab";

export const EditorTabs = () => {
    return (
        <div className="flex items-center bg-editor-panel border-b border-editor-border h-12 px-4 font-sans">
            {/* Mac-style Traffic Lights */}
            <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" /> {/* Red */}
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" /> {/* Yellow */}
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" /> {/* Green */}
            </div>

            {/* Tabs */}
            <div className="flex items-center h-full pt-1">
                <EditorTab label="intro.ts" active />
            </div>
        </div>
    );
};
