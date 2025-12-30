import React from 'react';
import { Star, TrendingUp, Download, Settings } from 'lucide-react';

interface ExtensionItem {
    rank: number;
    title: string;
    description: string;
    author: string;
    image?: string;
    rating: number;
    downloads: string;
}

interface EditorExtensionsProps {
    title: string;
    items: ExtensionItem[];
    onItemClick?: (item: ExtensionItem) => void;
    onScrollEnd?: () => void;
}

export const EditorExtensions = ({ title, items, onItemClick, onScrollEnd }: EditorExtensionsProps) => {
    const listRef = React.useRef<HTMLDivElement>(null);
    const [hasScrolledToEnd, setHasScrolledToEnd] = React.useState(false);

    // Detect scroll to end
    React.useEffect(() => {
        const handleScroll = () => {
            if (!listRef.current || hasScrolledToEnd) return;

            const { scrollTop, scrollHeight, clientHeight } = listRef.current;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;

            if (isAtBottom && !hasScrolledToEnd) {
                setHasScrolledToEnd(true);
                if (onScrollEnd) {
                    setTimeout(() => {
                        onScrollEnd();
                    }, 5000); // Wait 5 seconds before moving to next section
                }
            }
        };

        const element = listRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, [hasScrolledToEnd, onScrollEnd]);

    return (
        <div className="w-64 bg-[#252526] border-r border-[#3C3C3C] flex flex-col h-full text-[#CCCCCC] text-[13px]">
            {/* Header */}
            <div className="px-4 py-3 text-[11px] text-[#CCCCCC] uppercase tracking-wider border-b border-[#3C3C3C] flex items-center justify-between">
                <span>{title}</span>
                <button className="hover:bg-[#2A2D2E] p-1 rounded" title="Settings">
                    <Settings size={14} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-2 border-b border-[#3C3C3C]">
                <input
                    type="text"
                    placeholder="Search Extensions"
                    className="w-full bg-[#3C3C3C] text-[#CCCCCC] text-[13px] px-3 py-1.5 rounded outline-none border border-transparent focus:border-[#007ACC]"
                    readOnly
                />
            </div>

            {/* Extensions List */}
            <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
                {items.map((item) => (
                    <div
                        key={item.rank}
                        className="border-b border-[#3C3C3C] hover:bg-[#2A2D2E] cursor-pointer transition-colors"
                        onClick={() => onItemClick?.(item)}
                    >
                        <div className="p-3 flex gap-3">
                            {/* Image or Rank Badge */}
                            <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-[#3C3C3C] flex items-center justify-center relative">
                                {item.image ? (
                                    <img 
                                        src={item.image} 
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-2xl font-bold text-[#007ACC]">
                                        #{item.rank}
                                    </div>
                                )}
                                {/* Rank Badge */}
                                <div className="absolute -top-1 -right-1 bg-[#007ACC] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {item.rank}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                {/* Title */}
                                <div className="font-semibold text-[#CCCCCC] mb-1 truncate">
                                    {item.title}
                                </div>

                                {/* Description */}
                                <div className="text-[11px] text-[#858585] mb-2 line-clamp-2">
                                    {item.description}
                                </div>

                                {/* Author */}
                                <div className="text-[11px] text-[#858585] mb-2">
                                    {item.author}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-3 text-[11px] text-[#858585]">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-[#007ACC] fill-[#007ACC]" />
                                        <span>{item.rating.toFixed(1)}</span>
                                    </div>

                                    {/* Downloads */}
                                    <div className="flex items-center gap-1">
                                        <Download size={12} />
                                        <span>{item.downloads}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Install Button (on hover) */}
                        <div className="px-3 pb-2 opacity-0 hover:opacity-100 transition-opacity">
                            <button className="w-full bg-[#0E639C] hover:bg-[#1177BB] text-white text-[12px] py-1.5 rounded font-medium transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recommended Section */}
            <div className="border-t border-[#3C3C3C] p-3">
                <div className="flex items-center gap-2 text-[11px] text-[#858585] mb-2">
                    <TrendingUp size={14} />
                    <span className="uppercase tracking-wider">Trending</span>
                </div>
                <div className="text-[12px] text-[#CCCCCC]">
                    {items.length} extensions found
                </div>
            </div>
        </div>
    );
};

