import React from 'react';
import { Star, TrendingUp, Download, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [hasReachedEnd, setHasReachedEnd] = React.useState(false);
    
    // Sort items by rank descending (5 to 1) for animation
    const sortedItems = [...items].sort((a, b) => b.rank - a.rank);

    // Auto-advance carousel
    React.useEffect(() => {
        if (hasReachedEnd) return;
        
        const timer = setTimeout(() => {
            if (currentIndex < sortedItems.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                // Last item reached, wait then move to next section
                setHasReachedEnd(true);
                if (onScrollEnd) {
                    setTimeout(() => {
                        onScrollEnd();
                    }, 5000);
                }
            }
        }, 3000); // Change image every 3 seconds

        return () => clearTimeout(timer);
    }, [currentIndex, sortedItems.length, hasReachedEnd, onScrollEnd]);

    const currentItem = sortedItems[currentIndex];

    const goToNext = () => {
        if (currentIndex < sortedItems.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="w-64 bg-[#252526] border-r border-[#3C3C3C] flex flex-col h-full text-[#CCCCCC] text-[13px]">
            {/* Header */}
            <div className="px-4 py-2 text-[11px] text-[#CCCCCC] uppercase tracking-wider border-b border-[#3C3C3C] flex items-center justify-between">
                <span>{title}</span>
                <button className="hover:bg-[#2A2D2E] p-1 rounded" title="Settings">
                    <Settings size={14} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="px-3 py-1.5 border-b border-[#3C3C3C]">
                <input
                    type="text"
                    placeholder="Search Extensions"
                    className="w-full bg-[#3C3C3C] text-[#CCCCCC] text-[12px] px-2 py-1 rounded outline-none border border-transparent focus:border-[#007ACC]"
                    readOnly
                />
            </div>

            {/* Carousel - One image at a time */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {currentItem && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentItem.rank}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex flex-col p-4"
                        >
                            {/* Large Image */}
                            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-[#3C3C3C] flex items-center justify-center">
                                {currentItem.image ? (
                                    <img 
                                        src={currentItem.image} 
                                        alt={currentItem.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-4xl font-bold text-[#007ACC]">
                                        #{currentItem.rank}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col">
                                {/* Title with Rank */}
                                <div className="font-semibold mb-3 text-[18px]">
                                    <span className="inline-block bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] bg-clip-text text-transparent font-black text-xl mr-2">
                                        #{currentItem.rank}
                                    </span>
                                    <span className="text-[#CCCCCC]">
                                        {currentItem.title}
                                    </span>
                                </div>

                                {/* Description */}
                                <div className="text-[15px] text-[#CCCCCC] mb-3 line-clamp-3 flex-1 leading-relaxed">
                                    {currentItem.description}
                                </div>

                                {/* Author */}
                                <div className="text-[14px] text-[#858585] mb-3">
                                    {currentItem.author}
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-4 text-[11px] text-[#858585] mb-4">
                                    {/* Rating */}
                                    <div className="flex items-center gap-1">
                                        <Star size={12} className="text-[#007ACC] fill-[#007ACC]" />
                                        <span>{currentItem.rating.toFixed(1)}</span>
                                    </div>

                                    {/* Downloads */}
                                    <div className="flex items-center gap-1">
                                        <Download size={12} />
                                        <span>{currentItem.downloads}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Navigation Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-[#3C3C3C]">
                    <button
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                        className="p-2 rounded hover:bg-[#2A2D2E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="flex gap-2">
                        {sortedItems.map((item, index) => (
                            <button
                                key={item.rank}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-[#007ACC] w-6' 
                                        : 'bg-[#3C3C3C] hover:bg-[#424242]'
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        disabled={currentIndex === sortedItems.length - 1}
                        className="p-2 rounded hover:bg-[#2A2D2E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Recommended Section */}
            <div className="border-t border-[#3C3C3C] p-2">
                <div className="flex items-center gap-2 text-[10px] text-[#858585] mb-1">
                    <TrendingUp size={12} />
                    <span className="uppercase tracking-wider">Trending</span>
                </div>
                <div className="text-[11px] text-[#CCCCCC]">
                    {items.length} extensions found
                </div>
            </div>
        </div>
    );
};

