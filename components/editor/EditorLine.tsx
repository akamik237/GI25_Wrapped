import clsx from "clsx";
import React from "react";

export const EditorLine = ({
    number,
    active,
    children,
}: {
    number: number;
    active?: boolean;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={clsx(
                "flex items-start leading-[1.6] hover:bg-[#2A2D2E]",
                active && "bg-[#2A2D2E]"
            )}
        >
            <div className="w-12 shrink-0 pr-4 text-right text-[#858585] text-[13px] select-none font-mono pt-[1px]">
                {number}
            </div>
            <div className="whitespace-pre flex-1 pr-4">{children || <br />}</div>
        </div>
    );
};
