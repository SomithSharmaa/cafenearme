import React from 'react';
import { Coffee, Briefcase, Camera, Users, Star, ArrowRight, MapPin, Sparkles } from 'lucide-react';

const HomeOverlay = ({ onOpenMatchmaker }) => {


    return (
        <div className="absolute top-0 left-[80px] w-[calc(100vw-80px)] h-full z-[10] pointer-events-none flex flex-col justify-end pb-8">
            {/* Minimalist Floating Search Bar - Bottom Center (Figma Match) */}
            <div className="pointer-events-auto w-full max-w-3xl mx-auto px-6 mb-2 animate-in slide-in-from-bottom-8 duration-700">
                {/* Gradient Border Wrapper */}
                <div
                    className="rounded-full p-[2px] bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 shadow-xl cursor-text hover:shadow-2xl transition-all group"
                    onClick={onOpenMatchmaker}
                >
                    <div className="w-full bg-white rounded-full py-[14px] px-6 flex items-center gap-4 transition-colors group-hover:bg-white/95">
                        <Sparkles size={20} className="text-pink-400" />
                        <span className="text-gray-500 font-sans font-medium text-[15px] flex-1 text-left">What kind of cafe you are looking for?</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeOverlay;
