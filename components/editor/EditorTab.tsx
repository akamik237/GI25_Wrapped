import clsx from "clsx";

export const EditorTab = ({
    label,
    active = false,
}: {
    label: string;
    active?: boolean;
}) => {
    return (
        <div
            className={clsx(
                "px-4 h-full flex items-center text-sm font-medium transition-colors cursor-default",
                active
                    ? "text-white"
                    : "text-gray-500 opacity-60 hover:opacity-100"
            )}
        >
            {label}
        </div>
    );
};
