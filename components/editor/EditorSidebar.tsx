import React from 'react';
import { Files, Search, Github, Instagram, Linkedin, Music } from 'lucide-react';

export const EditorSidebar = () => {
    return (
        <div className="w-12 bg-[#333333] border-r border-[#3C3C3C] flex flex-col items-center py-3 gap-3 h-full">
            {/* Files Icon - Active */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-white hover:text-white border-l-2 border-white transition-colors" title="Files">
                <Files size={24} strokeWidth={1.5} />
            </button>

            {/* Search Icon */}
            <button className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-white hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-white transition-colors" title="Search">
                <Search size={24} strokeWidth={1.5} />
            </button>

            {/* GitHub Repo Link */}
            <a 
                href="https://github.com/akamik237/GI25_Wrapped" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-[#00FF00] hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-[#00FF00] transition-colors"
                title="GitHub Repository"
            >
                <Github size={22} strokeWidth={1.5} />
            </a>

            {/* Instagram Link */}
            <a 
                href="https://www.instagram.com/reel/DMVHnAKMdad/?igsh=MW93cDQwMmhvdWM0MA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-[#E1306C] hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-[#E1306C] transition-colors"
                title="Instagram - GI25 Soutenances"
            >
                <Instagram size={22} strokeWidth={1.5} />
            </a>

            {/* TikTok Link */}
            <a 
                href="https://vm.tiktok.com/ZNdmubXa1/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-[#00F2EA] hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-[#00F2EA] transition-colors"
                title="TikTok - GI25"
            >
                <Music size={22} strokeWidth={1.5} />
            </a>

            {/* LinkedIn Link */}
            <a 
                href="https://www.linkedin.com/posts/gi25-enspy_enspy-gi25-soutenances-activity-7352685745167319040-WWh-?utm_source=share&utm_medium=member_ios&rcm=ACoAAEAzViQBU1uNGNrMEAwDxy4neexBPDsoRoY" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-transparent text-[#858585] hover:text-[#0A66C2] hover:bg-[#2A2D2E] border-l-2 border-transparent hover:border-[#0A66C2] transition-colors"
                title="LinkedIn - GI25 ENSPY Soutenances"
            >
                <Linkedin size={22} strokeWidth={1.5} />
            </a>

            <div className="flex-1" />
        </div>
    );
};
