import React from 'react';
import { Coffee, Briefcase, Camera, Users, Star, ArrowRight, MapPin, Sparkles } from 'lucide-react';

const HomeOverlay = ({ onOpenMatchmaker }) => {


    return (
        <div className="absolute top-0 left-[80px] w-[calc(100vw-80px)] h-full z-[10] pointer-events-none flex flex-col justify-end pb-8">

            {/* Minimalist Floating Search Bar - Bottom Center */}
            <div className="pointer-events-auto w-full px-[10px] animate-in slide-in-from-bottom-8 duration-700">
                <button
                    onClick={onOpenMatchmaker}
                    className="w-full bg-white rounded-full shadow-2xl p-2 flex items-center gap-4 hover:scale-[1.01] transition-transform border border-purple-100 group"
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-white shrink-0 shadow-md group-hover:rotate-12 transition-transform">
                        <Sparkles size={24} fill="currentColor" />
                    </div>

                    <div className="flex-1 text-left">
                        <span className="text-gray-400 font-medium text-lg block group-hover:hidden truncate">Start AI Vibe Check...</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-lg hidden group-hover:block animate-in fade-in truncate">Tap to find your perfect cafe match ✨</span>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-purple-50 group-hover:text-purple-500 transition-colors">
                        <ArrowRight size={24} />
                    </div>
                </button>
            </div>

        </div>
    );
};

export default HomeOverlay;
